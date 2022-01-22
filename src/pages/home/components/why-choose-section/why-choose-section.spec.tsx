import { render, screen } from "@testing-library/react";
import WhyChooseSection from "./why-choose-section";
import { chooseReasons } from "./constants";

describe("Why-Choose", () => {
  beforeEach(() => {
    render(<WhyChooseSection />);
  });

  it("should render section heading", function () {
    expect(screen.getByText("Why Choose Coin Sorla?")).toBeInTheDocument();
  });

  it('should render why choose sections"', function () {
    for (const reason of chooseReasons) {
      expect(screen.getByText(reason.firstParg)).toBeInTheDocument();
      expect(screen.getByText(reason.secondParg)).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: reason.iconId })
      ).toBeInTheDocument();
    }
  });
});
