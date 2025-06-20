import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@cbtc/walletkit";
import type { ReactNode } from "react";
import { useOp20BalanceOf } from "./hooks/useOp20BalanceOf";
import { useOp20Contract } from "./hooks/useOp20Contract";
import { useTokenAddress } from "./hooks/useTokenAddress";

export default function Home() {
  const { isValid, address: tokenAddress } = useTokenAddress();
  const {
    address: walletAddress,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const { data: contractData, error } = useOp20Contract(tokenAddress);
  const { data: balanceOf } = useOp20BalanceOf(tokenAddress, walletAddress);

  if (!isValid) {
    return <div>Invalid token address: {tokenAddress}</div>;
  }
  if (error) {
    return <div>Error fetching contract data: {error.message}</div>;
  }
  if (!contractData) {
    return <div>Loading contract data...</div>;
  }
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>
          <div>{contractData.name}</div>
        </CardTitle>
      </CardHeader>
      <hr />
      <CardContent className="w-full flex flex-col divide-y p-0">
        <InfoRow
          label="Token Address"
          value={
            tokenAddress?.substring(0, 6) +
            "..." +
            tokenAddress?.substring(tokenAddress.length - 4)
          }
        />
        <InfoRow label="Symbol" value={contractData.symbol} />
        <InfoRow label="Decimals" value={contractData.decimals} />
        <InfoRow label="Max Supply" value={contractData.maxSupply} />
        <InfoRow label="Total Supply" value={contractData.totalSupply} />
        {walletAddress && (
          <>
            <InfoRow
              label="Wallet Address"
              value={
                walletAddress.substring(0, 6) +
                "..." +
                walletAddress.substring(walletAddress.length - 4)
              }
            />
            <InfoRow
              label="Your Balance"
              value={balanceOf?.properties.balance}
            />
          </>
        )}

        <div className="p-4">
          {walletAddress ? (
            <Button className="w-full" onClick={disconnectWallet}>
              Disconnect
            </Button>
          ) : (
            <Button className="w-full" onClick={connectWallet}>
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="flex justify-between items-center gap-2 text-xs px-3 py-4">
      <div>{label}</div>
      <div className="text-right flex-1 truncate">{value}</div>
    </div>
  );
}
