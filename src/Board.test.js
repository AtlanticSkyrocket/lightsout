import { render, fireEvent } from "@testing-library/react";
import Board from "./Board.js";

it('renders', function() {
  render(
    <Board />
  );
});
it("matches snapshot", function() {
  const { asFragment } = render(
    <Board />
  );

  expect(asFragment).toMatchSnapshot();
});