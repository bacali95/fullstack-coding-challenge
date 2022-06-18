import { render, screen } from "@testing-library/react";
import { Rating } from "../Rating";

test("Renders rating component", () => {
  render(<Rating label="Test" value={3.3} outOf={6} />);
  const label = screen.getByTestId("rating-label");
  const stars = screen.getAllByTestId("rating-star");

  expect(label.textContent).toBe("Test (3.3/6)");
  expect(stars.length).toBe(6);
  for (const [index, star] of stars.entries()) {
    expect(star.classList).toContain(
      index < 3.3 ? "text-amber-500" : "text-gray-200"
    );
  }
});
