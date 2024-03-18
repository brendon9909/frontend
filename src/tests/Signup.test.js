import Signup from "../components/signup";
import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

test("Signup renders correctly", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
