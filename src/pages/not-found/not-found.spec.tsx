import {render} from "@testing-library/react";
import NotFound from "./not-found";

describe('Not Found', () => {
  it('Render on Dom', function () {
    render(<NotFound/>);
  });
})
