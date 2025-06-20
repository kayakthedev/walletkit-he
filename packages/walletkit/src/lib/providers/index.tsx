import { createContext, useContext, useState } from "react";
import { opnet } from "./opnet";
import { unisat } from "./unisat";

export const providers = [opnet(), unisat()];

type WalletProviderContextType = {
  selectedProvider: string | undefined;
  setSelectedProvider: (provider?: string) => void;
};

const WalletProviderContext = createContext<WalletProviderContextType>({
  selectedProvider: undefined,
  setSelectedProvider: () => {},
});

export function useWalletProvider() {
  const { selectedProvider, setSelectedProvider: _setSelectedProvider } =
    useContext(WalletProviderContext);

  const setSelectedProvider = (provider?: string) => {
    if (provider === selectedProvider) return;
    _setSelectedProvider(provider);
    if (provider === undefined) {
      window.localStorage.removeItem("walletkit:selectedProvider");
    } else {
      window.localStorage.setItem("walletkit:selectedProvider", provider);
    }
  };

  return {
    selectedProvider,
    setSelectedProvider,
  };
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(
    window.localStorage.getItem("walletkit:selectedProvider") || undefined
  );

  return (
    <WalletProviderContext.Provider
      value={{ selectedProvider, setSelectedProvider }}
    >
      {children}
    </WalletProviderContext.Provider>
  );
}
