import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import TradeForm from "./components/trade-form/trade-form";

describe("Trade", () => {
  it("Render on Dom", async function () {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <TradeForm />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("btn-test")).toBeInTheDocument()
    );
  });
});

const getCryptoButtonList = () =>
  screen.getByRole("button", { name: /crypto iconbtc/i });
const getCryptoAmtInput = () =>
  screen.getByRole("spinbutton", { name: /Crypto Amount/i });
const getCurrencyAmtInput = () =>
  screen.getByRole("spinbutton", { name: /Crypto In currency USD/i });
