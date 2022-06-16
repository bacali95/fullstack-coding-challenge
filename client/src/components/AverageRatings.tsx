import { FC } from "react";
import { Rating } from "./Rating";
import { AccommodationReview } from "../types";

type Props = {
  aspectsAvg: Record<keyof AccommodationReview["ratings"]["aspects"], string>;
};

export const AverageRatings: FC<Props> = ({ aspectsAvg }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">The average ratings for this accommodation</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {Object.entries(aspectsAvg).map(([aspectKey, aspectValue]) => (
          <Rating key={aspectKey} label={aspectKey} value={+aspectValue} />
        ))}
      </div>
    </div>
  );
};
