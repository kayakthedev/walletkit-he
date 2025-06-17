export function unisat() {
  const unisat = (window as any).unisat;

  return {
    name: "UniSat Wallet",
    isAvailable: !!unisat,
    installUrl:
      "https://chromewebstore.google.com/detail/unisat-wallet/ppbibelpcjmhbdihakflkdcoccbgbkpo?hl=en",
    connect: () => {
      return unisat.requestAccounts().then(console.log);
    },
    disconnect: () => {
      unisat.disconnect().then(console.log);
    },
    getAddress: () => {
      return unisat.requestAccounts().then((accounts: string[]) => accounts[0]);
    },
    onAccountChanged: (callback: (address: string) => void) => {
      return unisat.on("accountsChanged", (accounts: string[]) => {
        callback(accounts[0]);
      });
    },
    onWalletConnected: (callback: () => void) => {
      return unisat.on("walletConnected", callback);
    },
  } as const;
}
