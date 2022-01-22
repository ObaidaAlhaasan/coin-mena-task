import { render } from "@testing-library/react";
import Trade from "./trade";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Trade", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Trade />
      </QueryClientProvider>
    );
  });

  it("Render on Dom", function () {});
});
