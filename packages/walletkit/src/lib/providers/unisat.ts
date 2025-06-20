export function unisat() {
  const unisat = window.unisat;

  return {
    name: "UniSat Wallet",
    isAvailable: !!unisat,
    installUrl:
      "https://chromewebstore.google.com/detail/unisat-wallet/ppbibelpcjmhbdihakflkdcoccbgbkpo?hl=en",
    connect: () => {
      return unisat.requestAccounts();
    },
    disconnect: () => {
      unisat.disconnect();
    },
    getAddress: async () => {
      return unisat.getAccounts().then((accounts: string[]) => accounts[0]);
    },
    onAccountChanged: (callback: (address: string) => void) => {
      function onAccountChanged(accounts: string[]) {
        callback(accounts[0]);
      }
      unisat.on("accountsChanged", onAccountChanged);
      return () => unisat.off("accountsChanged", onAccountChanged);
    },
    onWalletConnected: (callback: () => void) => {
      unisat.on("walletConnected", callback);
      return () => unisat.off("walletConnected", callback);
    },
  } as const;
}
