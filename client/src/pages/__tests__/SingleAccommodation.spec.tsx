import * as helpers from "../../helpers";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Route, Routes } from "react-router-dom";
import { SingleAccommodation } from "../SingleAccommodation";
import { formatDate } from "../../helpers";

const ID = "test-id";
const accommodation = {
  id: ID,
  name: "test",
  nameFallback: "fallback-test",
};
const reviewsAverage: any = {
  generalAvg: "6.6",
  aspectsAvg: {
    accessibility: 4,
    activities: 5,
    advancedSkiArea: 6,
    apresSki: 7,
    atmosphere: 8,
  },
  traveledWithAvg: {
    FAMILY: "5.4",
    FRIENDS: "6.5",
    COUPLE: "7.6",
  },
};
const reviews = {
  data: [
    {
      id: "review-1",
      title: "Review 1",
      text: "Review description 1",
      travelDate: 1563141600000,
      traveledWith: "FAMILY",
      userName: "user 1",
      entryDate: 1563573600000,
      ratings: {
        general: "6.6",
        aspects: {
          accessibility: 4,
          activities: 5,
          advancedSkiArea: 6,
          apresSki: 7,
          atmosphere: 8,
        },
      },
    },
    {
      id: "review-2",
      title: "Review 2",
      text: "Review description 2",
      travelDate: 1532037600000,
      traveledWith: "FRIENDS",
      userName: "user 2",
      entryDate: 1532469600000,
      ratings: {
        general: "6.6",
        aspects: {
          accessibility: 4,
          activities: 5,
          advancedSkiArea: 6,
          apresSki: 7,
          atmosphere: 8,
        },
      },
    },
    {
      id: "review-3",
      title: "Review 3",
      text: "Review description 3",
      travelDate: 1500933600000,
      traveledWith: "COUPLE",
      userName: "user 3",
      entryDate: 1501365600000,
      ratings: {
        general: "6.6",
        aspects: {
          accessibility: 4,
          activities: 5,
          advancedSkiArea: 6,
          apresSki: 7,
          atmosphere: 8,
        },
      },
    },
  ],
  total: 3,
  page: 0,
};

describe("Renders the single accommodation page", () => {
  test("when api response with data", async () => {
    const requestMock = jest.spyOn(helpers, "request");
    requestMock.mockImplementation(async (url) => {
      switch (url) {
        case `/api/accommodations/${ID}`:
          return accommodation;
        case `/api/reviews/average/${ID}`:
          return reviewsAverage;
        case `/api/reviews/${ID}?page=0&filterBy=&sortBy=entryDate`:
          return reviews;
        default:
          console.log(url);
          throw new Error("Server Error");
      }
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/accommodations/${ID}`]}>
          <Routes>
            <Route
              path="/accommodations/:id"
              element={<SingleAccommodation />}
            />
          </Routes>
        </MemoryRouter>
      );
    });

    const title = screen.getByTestId("accommodation-title");
    const generalReviewAverage = screen.getByTestId(
      "accommodation-general-review-average"
    );
    const averageRatings = screen.getByTestId("accommodation-average-ratings");
    const traveledWithPercentages = screen.getByTestId(
      "accommodation-traveled-with"
    );

    expect(title.textContent).toBe(accommodation.name);
    expect(generalReviewAverage.textContent).toBe(reviewsAverage.generalAvg);
    expect(averageRatings).toBeInTheDocument();
    expect(traveledWithPercentages).toBeInTheDocument();

    const averageRatingsItems = averageRatings.querySelectorAll(
      "[data-testid=rating]"
    );
    const reviewsAverageKeys = Object.keys(reviewsAverage.aspectsAvg);
    expect(averageRatingsItems.length).toBe(reviewsAverageKeys.length);
    for (const [index, item] of averageRatingsItems.entries()) {
      const ratingLabel = item.querySelector("[data-testid=rating-label]");
      expect(ratingLabel?.textContent).toBe(
        `${reviewsAverageKeys[index]} (${
          reviewsAverage.aspectsAvg[reviewsAverageKeys[index]]
        }/10)`
      );
    }

    const traveledWithItems = traveledWithPercentages.querySelectorAll(
      "[data-testid=accommodation-traveled-with-item]"
    );
    const traveledWithAvgKeys = Object.keys(reviewsAverage.traveledWithAvg);
    expect(traveledWithItems.length).toBe(traveledWithAvgKeys.length);
    for (const [index, item] of traveledWithItems.entries()) {
      const itemLabel = item.querySelector(
        "[data-testid=accommodation-traveled-with-item-label]"
      );
      expect(itemLabel?.textContent).toBe(
        `${traveledWithAvgKeys[index]} (${
          +reviewsAverage.traveledWithAvg[traveledWithAvgKeys[index]] * 10
        }/100)`
      );
    }

    const filterByInput = screen.getByTestId("accommodation-filter-by-input");
    const filterByOptions = filterByInput.querySelectorAll("option");
    expect(filterByOptions.length).toBe(traveledWithAvgKeys.length + 1);
    expect([...filterByOptions].map((item) => item.textContent)).toEqual([
      "All",
      ...traveledWithAvgKeys,
    ]);

    const reviewsItems = screen.getAllByTestId("review");
    expect(reviewsItems.length).toBe(reviews.data.length);
    for (const [index, item] of reviewsItems.entries()) {
      const review = reviews.data[index];
      const userAndDate = item.querySelector(
        "[data-testid=review-user-and-date]"
      );
      const title = item.querySelector("[data-testid=review-title]");
      const text = item.querySelector("[data-testid=review-text]");
      const about = item.querySelector("[data-testid=review-about]");
      const generalRatingLabel = about?.querySelector(
        "[data-testid=rating] > [data-testid=rating-label]"
      );
      const aspectsRatings = item.querySelectorAll(
        "[data-testid=review-aspect-ratings] [data-testid=rating]"
      );

      expect(userAndDate?.textContent).toBe(
        `Added by ${review.userName} On ${formatDate(
          new Date(review.entryDate)
        )}`
      );
      expect(title?.textContent).toBe(review.title);
      expect(text?.textContent).toBe(review.text);
      expect(generalRatingLabel?.textContent).toBe(
        `General (${review.ratings.general}/10)`
      );
      expect(aspectsRatings.length).toBe(
        Object.keys(review.ratings.aspects).length
      );
    }
  });

  test("when api response with error", async () => {
    const requestMock = jest.spyOn(helpers, "request");
    requestMock.mockRejectedValue("Server Error");

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/accommodations/${ID}`]}>
          <Routes>
            <Route
              path="/accommodations/:id"
              element={<SingleAccommodation />}
            />
          </Routes>
        </MemoryRouter>
      );
    });

    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
