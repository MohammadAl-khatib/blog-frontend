// UserContextProvider.test.js
import { act, render, screen, waitFor } from "@testing-library/react";
import { UserContextProvider, UserContext } from "./UserContext";
import React from "react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: "John Doe" }),
  })
);

jest.mock('../../constants.js', () =>( {
    API: 'mock API host',
}))

describe("UserContextProvider", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should provide context values and render children correctly", async () => {
    // await act(async () => {
      const TestComponent = () => {
        const { userData } = React.useContext(UserContext);
        return <div>{userData.name}</div>;
      };
      render(
        <UserContextProvider>
          <TestComponent />
        </UserContextProvider>
      );

      // Verify that fetch was called
      expect(global.fetch).toHaveBeenCalledWith('mock API host/profile', {
        credentials: "include",
      });

      // Wait for the context to update
      await waitFor(() => screen.getByText("John Doe"));

      // Verify that the TestComponent receives the context data
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    // });
  });
});
