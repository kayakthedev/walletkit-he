import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from "@/lib/hooks/useWallet";
import { providers } from "@/lib/providers";
import { CheckIcon } from "lucide-react";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

const ConnectModalContext = createContext<{
  isConnectModalOpen: boolean;
  setIsConnectModalOpen: (isOpen: boolean) => void;
}>({
  isConnectModalOpen: false,
  setIsConnectModalOpen: () => {},
});

export function useConnectModal() {
  return useContext(ConnectModalContext);
}

export default function ConnectModal(props: PropsWithChildren) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const { connectToProvider } = useWallet();

  const handleProviderClick = async (provider: string) => {
    await connectToProvider(provider);
    setIsConnectModalOpen(false);
  };

  return (
    <ConnectModalContext.Provider
      value={{ isConnectModalOpen, setIsConnectModalOpen }}
    >
      {props.children}
      <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Select a wallet provider to connect to.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col divide-y">
            {providers.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleProviderClick(provider.name)}
                className="text-left p-2 hover:bg-gray-100 cursor-pointer rounded-sm flex justify-between items-center"
              >
                <div>{provider.name}</div>
                <div>
                  {provider.isAvailable ? (
                    <div>
                      <CheckIcon className="w-4 h-4" />
                    </div>
                  ) : (
                    <div>Install</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </ConnectModalContext.Provider>
  );
}
