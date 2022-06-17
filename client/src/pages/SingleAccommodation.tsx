import { FC, useEffect, useState } from "react";
import { Accommodation, AccommodationReview } from "../types";
import { useParams } from "react-router";
import { request } from "../helpers";
import { HiStar } from "react-icons/hi";
import { ReviewsList } from "../components/ReviewsList";
import { ReviewsFilters } from "../components/ReviewsFilters";
import { TraveledWithPercentages } from "../components/TraveledWithPercentages";
import { AverageRatings } from "../components/AverageRatings";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const SingleAccommodation: FC = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [reviews, setReviews] = useState<{
    data: AccommodationReview[];
    total: number;
    page: number;
  }>();
  const [averageReviews, setAverageReviews] = useState<{
    generalAvg: string;
    aspectsAvg: Record<keyof AccommodationReview["ratings"]["aspects"], string>;
    traveledWithAvg: Record<string, string>;
  }>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [filterBy, setFilterBy] = useState<string>("");
  const [sortBy, setSortBy] = useState<"entryDate" | "travelDate">("entryDate");

  useEffect(() => {
    const abortController = new AbortController();

    Promise.all([
      request(`/api/accommodations/${id}`, abortController.signal).then(
        setAccommodation
      ),
      request(`/api/reviews/average/${id}`, abortController.signal).then(
        setAverageReviews
      ),
    ]).catch(() => setError(true));

    return () => abortController.abort();
  }, [id]);

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);
    request(
      `/api/reviews/${id}?page=${page}&filterBy=${filterBy}&sortBy=${sortBy}`,
      abortController.signal
    )
      .then(setReviews)
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [id, page, filterBy, sortBy]);

  const handleFilterByChange = (filterBy: string) => {
    setPage(0);
    setFilterBy(filterBy);
  };

  const handleSortByChange = (sortBy: "entryDate" | "travelDate") => {
    setPage(0);
    setSortBy(sortBy);
  };

  return (
    <div className="flex flex-col gap-4 mx-auto md:max-w-6xl p-4">
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <div className="flex justify-between items-center my-10">
            <h1 className="text-4xl">{accommodation?.name}</h1>
            <div className="relative h-20 w-20 flex items-center justify-center text-white">
              <HiStar className="-z-10 absolute inset-0 h-20 w-20 text-amber-500" />
              {averageReviews ? averageReviews.generalAvg : <Spinner />}
            </div>
          </div>
          {averageReviews ? (
            <div className="flex flex-col mb-6 gap-4">
              <AverageRatings aspectsAvg={averageReviews.aspectsAvg} />
              <TraveledWithPercentages
                traveledWithAvg={averageReviews.traveledWithAvg}
              />
            </div>
          ) : (
            <Spinner />
          )}
          <div className="relative">
            {loading && (
              <div className="absolute bg-gray-200 inset-0 bg-opacity-50">
                <Spinner />
              </div>
            )}
            {reviews && (
              <>
                <ReviewsFilters
                  sortBy={sortBy}
                  travelWithOptions={Object.keys(
                    averageReviews?.traveledWithAvg ?? {}
                  )}
                  onFilterByChange={handleFilterByChange}
                  onSortByChange={handleSortByChange}
                />
                <ReviewsList {...reviews} setPage={setPage} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
