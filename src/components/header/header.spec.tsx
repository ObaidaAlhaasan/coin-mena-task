import Header from "./header";
import { renderWithRouter } from "../../pages/not-found/not-found.spec";

describe("Header", () => {
  it("Render on Dom", function () {
    renderWithRouter(<Header />);
  });
});
