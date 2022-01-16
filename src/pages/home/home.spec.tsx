import {render} from "@testing-library/react";
import Home from "./home";

describe('Home', () => {
  it('Render on Dom', function () {
    render(<Home/>);
  });
});
