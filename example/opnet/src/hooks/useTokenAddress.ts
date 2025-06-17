import { networks } from "@btc-vision/bitcoin";
import { Address } from "@btc-vision/transaction";
import { useParams } from "react-router";
import { validateAddress } from "../lib/utils";

export function useTokenAddress() {
  const { tokenAddress } = useParams();
  if (!tokenAddress) {
    return {
      address: null,
      isValid: false,
    };
  }

  if (!validateAddress(tokenAddress)) {
    return {
      address: tokenAddress,
      isValid: false,
    };
  }

  return {
    address: Address.fromString(tokenAddress).p2op(networks.regtest),
    isValid: true,
  };
}
