import { FC } from "react";

type Props = {
  traveledWithAvg: Record<string, string>;
};

export const TraveledWithPercentages: FC<Props> = ({ traveledWithAvg }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">The percentages of travelledWith</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {Object.entries(traveledWithAvg).map(([aspectKey, aspectValue]) => (
          <div key={aspectKey} className="flex flex-col gap-2">
            <span className="text-sm">
              <span className="capitalize">{aspectKey}</span> (
              {(+aspectValue * 10).toFixed(0)}
              /100)
            </span>
            <div
              className="w-full h-5 bg-blue-500"
              style={{
                background: `linear-gradient(90deg, rgb(59 130 246) ${
                  +aspectValue * 10
                }%, rgb(229 231 235) ${+aspectValue * 10}%)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
