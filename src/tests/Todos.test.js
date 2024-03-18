import Todos from "../components/todos";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { UserProvider } from "../components/UserContext";

test("Todos render correctly", () => {
  const tree = renderer.create(
    <UserProvider>
      <MemoryRouter>
        <Todos />
      </MemoryRouter>
    </UserProvider>
  );

  expect(tree).toMatchSnapshot();
});
