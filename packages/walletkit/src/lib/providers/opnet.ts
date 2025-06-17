export function opnet() {
  const opnet = (window as any).opnet;

  return {
    name: "OP Wallet",
    isAvailable: !!opnet,
    installUrl:
      "https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb?hl=en",
    connect: () => {
      return opnet.requestAccounts().then(console.log);
    },
    disconnect: () => {
      opnet.disconnect().then(console.log);
    },
    getAddress: () => {
      return opnet.requestAccounts().then((accounts: string[]) => accounts[0]);
    },
    onAccountChanged: (callback: (address: string) => void) => {
      return opnet.on("accountsChanged", (accounts: string[]) => {
        callback(accounts[0]);
      });
    },
    onWalletConnected: (callback: () => void) => {
      return opnet.on("walletConnected", callback);
    },
  } as const;
}
