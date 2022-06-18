import { render, screen } from "@testing-library/react";
import { Pagination } from "../Pagination";

test("Renders pagination component", () => {
  let currentPage = 0;
  let setPage = (page: number) => (currentPage = page);

  const { rerender } = render(
    <Pagination currentPage={currentPage} totalPages={100} setPage={setPage} />
  );

  function clickPage(
    page: `${number | "first" | "previous" | "next" | "last"}-page`
  ) {
    const item = screen.getByTestId(`pagination-${page}`);
    item.click();
    rerender(
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        setPage={setPage}
      />
    );
  }

  clickPage("last-page");
  expect(currentPage).toBe(99);

  clickPage("previous-page");
  expect(currentPage).toBe(98);

  clickPage("first-page");
  expect(currentPage).toBe(0);

  clickPage("next-page");
  expect(currentPage).toBe(1);

  clickPage("5-page");
  expect(currentPage).toBe(4);
});
