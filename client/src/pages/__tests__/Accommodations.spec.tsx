import * as helpers from "../../helpers";
import { act, render, screen } from "@testing-library/react";
import { Accommodations } from "../Accommodations";
import { MemoryRouter } from "react-router";

describe("Renders the accommodations page", () => {
  test("when api response with data", async () => {
    const requestMock = jest.spyOn(helpers, "request");
    requestMock.mockResolvedValueOnce([
      {
        id: "test",
        name: "test",
        nameFallback: "fallback-test",
      },
      {
        id: "test-2",
        nameFallback: "fallback-test-2",
      },
    ]);

    await act(async () => {
      render(
        <MemoryRouter>
          <Accommodations />
        </MemoryRouter>
      );
    });

    const accommodations = screen.getAllByTestId("accommodation");
    expect(accommodations.length).toBe(2);
    expect(accommodations[0].textContent).toBe("test");
    expect(accommodations[0].getAttribute("href")).toBe("/accommodations/test");
    expect(accommodations[1].textContent).toBe("fallback-test-2");
    expect(accommodations[1].getAttribute("href")).toBe(
      "/accommodations/test-2"
    );
  });

  test("when api response with error", async () => {
    const requestMock = jest.spyOn(helpers, "request");
    requestMock.mockRejectedValueOnce("Server Error");

    await act(async () => {
      render(
        <MemoryRouter>
          <Accommodations />
        </MemoryRouter>
      );
    });

    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
