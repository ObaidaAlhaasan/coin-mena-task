import { render } from "@testing-library/react";
import Home from "./home";
import { QueryClient, QueryClientProvider } from "react-query";

export const renderWithQueryClient = (children: JSX.Element) => {
  const q = new QueryClient();
  return render(
    <QueryClientProvider client={q}>{children}</QueryClientProvider>
  );
};

describe("Home", () => {
  it("Render on Dom", function () {
    renderWithQueryClient(<Home />);
  });
});
