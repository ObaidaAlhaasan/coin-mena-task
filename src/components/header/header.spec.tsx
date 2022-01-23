import { renderWithRouter } from "../../pages/not-found/not-found.spec";
import {Header} from "./header";

describe("Header", () => {
  it("Render on Dom", function () {
    renderWithRouter(<Header />);
  });
});
