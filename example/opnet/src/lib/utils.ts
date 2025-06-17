import { networks } from "@btc-vision/bitcoin";
import { provider } from "./provider";

export function validateAddress(address: string) {
  return !!provider.validateAddress(address, networks.regtest);
}
