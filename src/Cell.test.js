import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell.js";

it('renders', function() {
  render(
    <table>
      <tr>
        <Cell flipCellsAroundMe={()=>{}} isLit={true}/>
      </tr>
    </table>
  );
});
it("matches snapshot", function() {
  const { asFragment } = render(
    <table>
      <tr>
        <Cell flipCellsAroundMe={()=>{}} isLit={true}/>
      </tr>
    </table>
  );

  expect(asFragment).toMatchSnapshot();
});