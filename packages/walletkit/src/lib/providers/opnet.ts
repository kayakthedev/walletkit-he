export function opnet() {
  const opnet = window.opnet;

  return {
    name: "OP Wallet",
    isAvailable: !!opnet,
    installUrl:
      "https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb?hl=en",
    connect: () => {
      return opnet.requestAccounts();
    },
    disconnect: () => {
      opnet.disconnect();
    },
    getAddress: async () => {
      return opnet.getAccounts().then((accounts: string[]) => accounts[0]);
    },
    onAccountChanged: (callback: (address: string) => void) => {
      const onAccountChanged = (accounts: string[]) => {
        callback(accounts[0]);
      };
      opnet.on("accountsChanged", onAccountChanged);
      return () => opnet.off("accountsChanged", onAccountChanged);
    },
    onWalletConnected: (callback: () => void) => {
      opnet.on("walletConnected", callback);
      return () => opnet.off("walletConnected", callback);
    },
  } as const;
}
