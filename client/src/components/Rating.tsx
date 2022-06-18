import { FC } from "react";
import { HiStar } from "react-icons/hi";
import classNames from "classnames";

type Props = {
  label: string;
  value: number;
  outOf?: number;
};

export const Rating: FC<Props> = ({ label, value, outOf = 10 }) => (
  <div className="flex flex-col gap-2" data-testid="rating">
    <span className="text-sm" data-testid="rating-label">
      <span className="capitalize">{label}</span> ({value}/{outOf})
    </span>
    <div className="flex gap-0.5">
      {new Array(outOf).fill(null).map((_, index) => (
        <HiStar
          key={`${label}-${index}`}
          className={classNames("h-5 w-5", {
            "text-gray-200": index > value,
            "text-amber-500": index <= value,
          })}
          data-testid="rating-star"
        />
      ))}
    </div>
  </div>
);
