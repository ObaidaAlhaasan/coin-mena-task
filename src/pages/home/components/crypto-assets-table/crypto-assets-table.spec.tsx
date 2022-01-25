import CryptoAssetsTable from "./crypto-assets-table";
import {renderWithQueryClient} from "../../home.spec";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {ExternalUrlsConstants} from "../../../../services/constants";
import {ICryptoAssetResponse} from "../../../../types/cryptos";
import {screen} from "@testing-library/react";
import exp from "constants";
import {CryptoTableColumns} from "./crypto-table-columns";

const server = setupServer(
  rest.get(
    `${ExternalUrlsConstants.CryptoAssets}`,
    (req, res, ctx) => {
      const page = req.url.searchParams.get("page") || "unknown";

      return res(
        ctx.json({
            "status": {
              "elapsed": 162,
              "timestamp": "2022-01-25T19:13:55.194978355Z"
            },
            "data": [
              {
                "id": "1e31218a-e44e-4285-820c-8282ee222035",
                "slug": "bitcoin",
                "symbol": "BTC",
                "metrics": {
                  "market_data": {
                    "price_usd": 37330.192172580144
                  }
                }
              },
              {
                "id": "21c795f5-1bfd-40c3-858e-e9d7e820c6d0",
                "slug": "ethereum",
                "symbol": "ETH",
                "metrics": {
                  "market_data": {
                    "price_usd": 2498.8426168283504
                  }
                }
              },
              {
                "id": "51f8ea5e-f426-4f40-939a-db7e05495374",
                "slug": "tether",
                "symbol": "USDT",
                "metrics": {
                  "market_data": {
                    "price_usd": 1.001139033882329
                  }
                }
              },
              {
                "id": "7dc551ba-cfed-4437-a027-386044415e3e",
                "slug": "binance-coin",
                "symbol": "BNB",
                "metrics": {
                  "market_data": {
                    "price_usd": 386.51836281101606
                  }
                }
              },
              {
                "id": "4515ba15-2719-4183-b0ca-b9255d55b67e",
                "slug": "usd-coin",
                "symbol": "USDC",
                "metrics": {
                  "market_data": {
                    "price_usd": 1.001546363944945
                  }
                }
              },
              {
                "id": "362f0140-ecdd-4205-b8a0-36f0fd5d8167",
                "slug": "cardano",
                "symbol": "ADA",
                "metrics": {
                  "market_data": {
                    "price_usd": 1.0635707836174422
                  }
                }
              },
              {
                "id": "b3d5d66c-26a2-404c-9325-91dc714a722b",
                "slug": "solana",
                "symbol": "SOL",
                "metrics": {
                  "market_data": {
                    "price_usd": 99.16591915302338
                  }
                }
              },
              {
                "id": "86da9b7d-922b-4abb-8599-e75c6fa5a138",
                "slug": "terra",
                "symbol": "LUNA",
                "metrics": {
                  "market_data": {
                    "price_usd": 66.40325751867981
                  }
                }
              },
              {
                "id": "7d793fa7-5fc6-432a-b26b-d1b10769d42e",
                "slug": "dogecoin",
                "symbol": "DOGE",
                "metrics": {
                  "market_data": {
                    "price_usd": 0.1469234512279196
                  }
                }
              },
              {
                "id": "86da9b7d-922b-4abb-8599-e75c6fa5a138",
                "slug": "terra",
                "symbol": "LUNA",
                "metrics": {
                  "market_data": {
                    "price_usd": 66.40325751867981
                  }
                }
              },
              {
                "id": "7d793fa7-5fc6-432a-b26b-d1b10769d42e",
                "slug": "dogecoin",
                "symbol": "DOGE",
                "metrics": {
                  "market_data": {
                    "price_usd": 0.1469234512279196
                  }
                }
              },
              {
                "id": "86da9b7d-922b-4abb-8599-e75c6fa5a138",
                "slug": "terra",
                "symbol": "LUNA",
                "metrics": {
                  "market_data": {
                    "price_usd": 66.40325751867981
                  }
                }
              },
              {
                "id": "7d793fa7-5fc6-432a-b26b-d1b10769d42e",
                "slug": "dogecoin",
                "symbol": "DOGE",
                "metrics": {
                  "market_data": {
                    "price_usd": 0.1469234512279196
                  }
                }
              },
              {
                "id": "da6a0575-ec95-4c47-855d-5fc6a3e22ada",
                "slug": "polkadot",
                "symbol": "DOT",
                "metrics": {
                  "market_data": {
                    "price_usd": 18.928536116591584
                  }
                }
              }
            ]
          } as ICryptoAssetResponse
        )
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Crypto assets table", () => {
  beforeEach(() => {
    renderWithQueryClient(<CryptoAssetsTable/>);
  });
  describe('Initial Load', () => {

    it('should  show correct row per page', function () {
      expect(rowPerPage()).toBeEnabled();
      expect(rowPerPage()).toHaveValue('10');
    });

    it('should disabled prev first ', function () {
      expect(paginationFirstPageBtn()).toBeDisabled();
      expect(paginationPreviousPageBtn()).toBeDisabled();
    });


    it.todo('should enable prev first ', function () {
      expect(paginationNextPageBtn()).toBeEnabled();
      expect(paginationLastPageBtn()).toBeEnabled();
    });
  });

});

const rowPerPage = () => screen.getByTestId('pagination-row-per-page');
const paginationFirstPageBtn = () => screen.getByTestId('pagination-first-page');
const paginationLastPageBtn = () => screen.getByTestId('pagination-last-page');
const paginationNextPageBtn = () => screen.getByTestId('pagination-next-page');
const paginationPreviousPageBtn = () => screen.getByTestId('pagination-previous-page');
