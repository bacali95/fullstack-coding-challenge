import { FC } from "react";
import { AccommodationReview } from "../types";
import { formatDate } from "../helpers";
import { Rating } from "./Rating";

export const Review: FC<{ review: AccommodationReview }> = ({ review }) => (
  <div
    key={review.id}
    className="grid grid-cols-12 py-4 gap-x-2"
    data-testid="review"
  >
    <div className="flex flex-col col-span-12 md:col-span-9 p-2 gap-3">
      <span
        className="text-sm text-gray-600"
        data-testid="review-user-and-date"
      >
        Added by <b className="text-gray-700">{review.userName}</b> On{" "}
        <b className="text-gray-700">
          {formatDate(new Date(review.entryDate))}
        </b>
      </span>
      <h1 className="text-2xl" data-testid="review-title">
        {review.title}
      </h1>
      <div data-testid="review-text">{review.text}</div>
    </div>
    <div
      className="flex flex-col col-span-12 md:col-span-3 gap-4 p-2"
      data-testid="review-about"
    >
      {review.ratings.general && (
        <Rating label="General" value={review.ratings.general} />
      )}
      <div className="text-sm p-3 rounded-lg bg-blue-100 text-gray-700">
        About the trip
        <br />
        <br />
        date:{" "}
        <b className="text-gray-700" data-testid="review-trip-date">
          {formatDate(new Date(review.entryDate))}
        </b>
        <br />
        with:{" "}
        <b className="text-gray-700" data-testid="review-traveled-with">
          {review.traveledWith}
        </b>
      </div>
    </div>
    {!Object.values(review.ratings.aspects).every((item) => item === null) && (
      <div
        className="flex flex-col col-span-12 p-2 gap-2"
        data-testid="review-aspect-ratings"
      >
        <h2 className="text-xl">Ratings of aspects</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {Object.entries(review.ratings.aspects).map(
            ([aspectKey, aspectValue]) =>
              aspectValue && (
                <Rating key={aspectKey} label={aspectKey} value={aspectValue} />
              )
          )}
        </div>
      </div>
    )}
  </div>
);
