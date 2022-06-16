import { ChangeEvent, FC } from "react";

type Props = {
  sortBy: "entryDate" | "travelDate";
  travelWithOptions: string[];
  onFilterByChange: (filterBy: string) => void;
  onSortByChange: (sortBy: Props["sortBy"]) => void;
};

export const ReviewsFilters: FC<Props> = ({
  sortBy,
  travelWithOptions,
  onFilterByChange,
  onSortByChange,
}) => {
  const handleFilterByChange = (event: ChangeEvent<HTMLSelectElement>) =>
    onFilterByChange(event.target.value);

  const handleSortByChange = (event: ChangeEvent<HTMLInputElement>) =>
    onSortByChange(event.target.value as "entryDate" | "travelDate");

  return (
    <form className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-100 border rounded-lg mb-6">
      <div className="flex flex-col gap-1 w-full">
        <label>
          Filter reviews by{" "}
          <span className="text-xs">(with whom was the trip)</span>
        </label>
        <select
          className="bg-white py-2 px-3 border rounded-lg capitalize lowercase"
          onChange={handleFilterByChange}
        >
          <option value="">All</option>
          {travelWithOptions.map((traveledWith) => (
            <option key={traveledWith} value={traveledWith}>
              {traveledWith}
            </option>
          ))}
        </select>
      </div>
      <div className="flex md:justify-center w-full gap-6">
        <label>Sort by:</label>
        <fieldset className="flex gap-4">
          <div className="flex gap-1 items-center">
            <input
              id="reviewDate"
              type="radio"
              name="filterBy"
              value="entryDate"
              checked={sortBy === "entryDate"}
              onChange={handleSortByChange}
            />
            <label htmlFor="reviewDate">Review Date</label>
          </div>
          <div className="flex gap-1 items-center">
            <input
              id="tripDate"
              type="radio"
              name="filterBy"
              value="travelDate"
              checked={sortBy === "travelDate"}
              onChange={handleSortByChange}
            />
            <label htmlFor="tripDate">Trip Date</label>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
