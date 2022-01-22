import CryptoAssetsTable from "./crypto-assets-table";
import { renderWithQueryClient } from "../../home.spec";

describe("Crypto assets table", () => {
  it("should show on Dom", function () {
    renderWithQueryClient(<CryptoAssetsTable />);
  });
});
