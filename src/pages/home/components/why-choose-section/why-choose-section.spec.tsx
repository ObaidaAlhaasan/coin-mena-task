import { render, screen } from "@testing-library/react";
import WhyChooseSection from "./why-choose-section";
import { chooseReasons } from "./constants";

describe("Why-Choose", () => {
  it('should render "BEST USER EXPERIENCE"', function () {
    render(<WhyChooseSection />);

    for (const reason of chooseReasons) {
      expect(screen.getByText(reason.firstParg)).toBeInTheDocument();
      expect(screen.getByText(reason.secondParg)).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: reason.iconId })
      ).toBeInTheDocument();
    }
  });
});
