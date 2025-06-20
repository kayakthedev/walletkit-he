import { networks } from "@btc-vision/bitcoin";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { provider } from "./provider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateAddress(address: string) {
  return !!provider.validateAddress(address, networks.regtest);
}
