import { render } from "@testing-library/react";
import NotFound from "./not-found";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (children: JSX.Element) =>
  render(<BrowserRouter>{children}</BrowserRouter>);

describe("Not Found", () => {
  it("Render on Dom", function () {
    renderWithRouter(<NotFound />);
  });
});
