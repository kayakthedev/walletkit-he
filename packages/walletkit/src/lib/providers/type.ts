export type WalletProvider = {
  name: string;
  isAvailable: boolean;
  connect: () => void;
  disconnect: () => void;
  getAddress: () => string;
  getBalance: () => string;
};

export type InjectedProvider = {
  requestAccounts: () => Promise<string[]>;
  disconnect: () => void;
  getAddress: () => Promise<string>;
  getBalance: () => Promise<string>;
};
