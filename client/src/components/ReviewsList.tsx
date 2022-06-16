import { FC } from "react";
import { AccommodationReview } from "../types";
import { Review } from "./Review";
import { Pagination } from "./Pagination";

type Props = {
  data: AccommodationReview[];
  total: number;
  page: number;
  setPage: (page: number) => void;
};

export const ReviewsList: FC<Props> = ({ data, total, page, setPage }) => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / 10)}
          setPage={setPage}
        />
        <div className="italic text-center">
          Show {page * 10 + 1}-{Math.min((page + 1) * 10, total)} out of {total}{" "}
          Reviews
        </div>
      </div>
      <div className="divide-y">
        {data.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
