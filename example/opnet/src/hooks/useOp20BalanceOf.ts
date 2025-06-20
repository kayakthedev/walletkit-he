import { networks } from "@btc-vision/bitcoin";
import { useQuery } from "@tanstack/react-query";
import { getContract, type IOP_20Contract, OP_20_ABI } from "opnet";
import { provider } from "../lib/provider";

export function useOp20BalanceOf(
  tokenAddress?: string | null,
  walletAddress?: string | null
) {
  return useQuery({
    queryKey: ["op20BalanceOf", walletAddress, tokenAddress],
    queryFn: async () => {
      const op20Contract = getContract<IOP_20Contract>(
        tokenAddress || "",
        OP_20_ABI,
        provider,
        networks.regtest
      );

      return op20Contract.balanceOf(
        await provider.getPublicKeyInfo(walletAddress!)
      );
    },
    enabled: !!walletAddress && !!tokenAddress,
  });
}
