export type WalletProvider = {
  name: string;
  isAvailable: boolean;
  connect: () => void;
  disconnect: () => void;
  getAddress: () => string;
  getBalance: () => string;
};
