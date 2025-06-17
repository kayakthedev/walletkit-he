import { networks } from "@btc-vision/bitcoin";
import { JSONRpcProvider } from "opnet";

// Define the RPC endpoint and network
const url = "https://regtest.opnet.org";
const network = networks.regtest;

// Initialize the provider
export const provider = new JSONRpcProvider(url, network);
