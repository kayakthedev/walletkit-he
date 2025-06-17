import { useWallet } from "@cbtc/walletkit";
import { useOp20BalanceOf } from "./hooks/useOp20BalanceOf";
import { useOp20Contract } from "./hooks/useOp20Contract";
import { useTokenAddress } from "./hooks/useTokenAddress";

export default function Home() {
  const { isValid, address: tokenAddress } = useTokenAddress();
  const { address: walletAddress, connectWallet } = useWallet();

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
    <div>
      <h3>{tokenAddress}</h3>
      <div>{contractData.name}</div>
      <div>{contractData.symbol}</div>
      <div>{contractData.decimals}</div>
      <div>{contractData.maxSupply}</div>
      <div>{contractData.totalSupply}</div>
      {walletAddress ? (
        <div>Your balance: {balanceOf?.properties.balance}</div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
