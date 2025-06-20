import { useConnectModal } from "@/components/ConnectModal";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { providers, useWalletProvider } from "../providers";

export function useWallet() {
  const { selectedProvider, setSelectedProvider } = useWalletProvider();
  const { setIsConnectModalOpen } = useConnectModal();
  const {
    data: address,
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["wallet", "address", selectedProvider],
    queryFn: async () => {
      if (!selectedProvider) return;
      const provider = getProvider(selectedProvider);
      if (!provider) return;
      return provider.getAddress();
    },
    enabled: !!selectedProvider,
  });

  useEffect(() => {
    if (!selectedProvider) return;
    const provider = getProvider(selectedProvider);
    if (!provider) return;
    const unsubscribe = provider.onAccountChanged((accountAddress) => {
      if (accountAddress === address) return;
      refetch();
    });
    return () => unsubscribe();
  }, [selectedProvider]);

  useEffect(() => {
    if (!selectedProvider) return;
    const provider = getProvider(selectedProvider);
    if (!provider) return;
    const unsubscribe = provider.onWalletConnected(() => {
      refetch();
    });
    return () => unsubscribe();
  }, [selectedProvider]);

  const getProvider = (name: string) => {
    return providers.find((p) => p.name === name);
  };

  const connectToProvider = async (providerName: string) => {
    const provider = getProvider(providerName);
    if (!provider) return;
    setSelectedProvider(providerName);
    await provider.connect();
    await refetch();
  };

  const connectWallet = async () => {
    if (!selectedProvider) {
      setIsConnectModalOpen(true);
      return;
    }

    const provider = getProvider(selectedProvider);
    if (!provider) return;
    await provider.connect();
    await refetch();
  };

  const disconnectWallet = () => {
    setSelectedProvider(undefined);
  };

  return {
    isConnected: !!selectedProvider && !!address,
    isConnecting: isLoading,
    error,
    address,
    connectToProvider,
    disconnectWallet,
    connectWallet,
    provider: selectedProvider ? getProvider(selectedProvider) : undefined,
  };
}
