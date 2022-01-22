import { render, screen } from "@testing-library/react";
import GetStart from "./get-start";
import { startItems } from "./constants";

describe("Get Start", () => {
  beforeEach(() => {
    render(<GetStart />);
  });

  it("should render easy-illustration image", function () {
    expect(
      screen.getByRole("img", { name: "easy-illustration" })
    ).toBeInTheDocument();
  });

  it("should render heading", function () {
    expect(screen.getByText("Getting started is easy")).toBeInTheDocument();
  });

  it('should render get start sections"', function () {
    for (const item of startItems) {
      expect(
        screen.getByText(item.title, { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText(item.description, { exact: false })
      ).toBeInTheDocument();
    }
  });
});
