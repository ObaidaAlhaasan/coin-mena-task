import {render} from "@testing-library/react";
import Header from "./header";

describe('Header', () => {
  it('Render on Dom', function () {
    render(<Header/>);
  });
});
