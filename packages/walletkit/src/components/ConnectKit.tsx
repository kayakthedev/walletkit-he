import { WalletProvider } from "@/lib/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import "../index.css";
import ConnectModal from "./ConnectModal";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

export default function ConnectKit(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WalletProvider>
          <ConnectModal>{props.children}</ConnectModal>
        </WalletProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
