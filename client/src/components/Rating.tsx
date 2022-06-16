import { FC } from "react";
import { HiStar } from "react-icons/hi";
import classNames from "classnames";

export const Rating: FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm">
      <span className="capitalize">{label}</span> ({value}
      /10)
    </span>
    <div className="flex gap-0.5">
      {new Array(10).fill(null).map((_, index) => (
        <HiStar
          key={`${label}-${index}`}
          className={classNames("h-5 w-5", {
            "text-gray-200": index > value,
            "text-amber-500": index <= value,
          })}
        />
      ))}
    </div>
  </div>
);
