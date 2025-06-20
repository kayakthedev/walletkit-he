type InjectedProvider = {
  requestAccounts: () => Promise<string[]>;
  getAccounts: () => Promise<string[]>;
  disconnect: () => void;
  getAddress: () => Promise<string>;
  getBalance: () => Promise<string>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
};

interface Window {
  opnet: InjectedProvider;
  unisat: InjectedProvider;
}
