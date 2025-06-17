import { ConnectKit } from "@cbtc/walletkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Home from "./Home";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/token/:tokenAddress",
    element: (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    ),
  },
]);

function App() {
  return (
    <ConnectKit>
      <RouterProvider router={router} />
    </ConnectKit>
  );
}

export default App;
