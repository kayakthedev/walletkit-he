import { networks } from "@btc-vision/bitcoin";
import { useQuery } from "@tanstack/react-query";
import { getContract, type IOP_20Contract, OP_20_ABI } from "opnet";
import { provider } from "../lib/provider";
import { validateAddress } from "../lib/utils";

export function useOp20Contract(tokenAddress?: string | null) {
  return useQuery({
    queryKey: ["op20Contract", tokenAddress],
    queryFn: async () => {
      const op20Contract = getContract<IOP_20Contract>(
        tokenAddress || "", // Contract address as a string
        OP_20_ABI, // OP_20 token contract ABI
        provider,
        networks.regtest
      );

      const [name, symbol, decimals, maxSupply, totalSupply] =
        await Promise.all([
          op20Contract.name(),
          op20Contract.symbol(),
          op20Contract.decimals(),
          op20Contract.maximumSupply(),
          op20Contract.totalSupply(),
        ]);

      return {
        name: name.properties.name,
        symbol: symbol.properties.symbol,
        decimals: decimals.properties.decimals,
        maxSupply: maxSupply.properties.maximumSupply,
        totalSupply: totalSupply.properties.totalSupply,
      };
    },
    enabled: !!tokenAddress && validateAddress(tokenAddress),
  });
}
