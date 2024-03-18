import Login from "../components/login";
import React from "react";
import Renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../components/UserContext";

test("Login renders correctly", () => {
  const tree = Renderer.create(
    <UserProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </UserProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
