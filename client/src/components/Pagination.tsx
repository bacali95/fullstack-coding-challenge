import { ComponentProps, FC } from "react";
import {
  HiDotsHorizontal,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import classNames from "classnames";
import { IconType } from "react-icons/lib/cjs/iconBase";
import { usePagination } from "../hooks/usePagination";

type Props = {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const Pagination: FC<Props> = ({ currentPage, totalPages, setPage }) => {
  const pages = usePagination({ currentPage, totalPages });

  return (
    <div className="flex border rounded-md divide-x">
      <PaginationItem
        Icon={HiOutlineChevronDoubleLeft}
        disabled={currentPage === 0}
        onClick={() => setPage(0)}
        data-testid="pagination-first-page"
      />
      <PaginationItem
        Icon={HiOutlineChevronLeft}
        disabled={currentPage === 0}
        onClick={() => setPage(currentPage - 1)}
        data-testid="pagination-previous-page"
      />
      {pages?.map((page, index) => (
        <PaginationItem
          key={`page-${page}-${index}`}
          className={classNames(
            page !== "DOTS" && {
              "bg-blue-500 text-white": currentPage === page - 1,
              "hover:bg-gray-100": currentPage !== page - 1,
            }
          )}
          onClick={page === "DOTS" ? undefined : () => setPage(page - 1)}
          disabled={page === "DOTS"}
          data-testid={page !== "DOTS" && `pagination-${page}-page`}
        >
          {page === "DOTS" ? <HiDotsHorizontal className="h-4 w-4" /> : page}
        </PaginationItem>
      ))}
      <PaginationItem
        Icon={HiOutlineChevronRight}
        disabled={currentPage + 1 === totalPages}
        onClick={() => setPage(currentPage + 1)}
        data-testid="pagination-next-page"
      />
      <PaginationItem
        Icon={HiOutlineChevronDoubleRight}
        disabled={currentPage + 1 === totalPages}
        onClick={() => setPage(totalPages - 1)}
        data-testid="pagination-last-page"
      />
    </div>
  );
};

const PaginationItem: FC<ComponentProps<"button"> & { Icon?: IconType }> = ({
  className,
  children,
  Icon,
  ...props
}) => (
  <button
    className={classNames(
      "h-10 w-10 flex items-center justify-center focus:bg-blue-500 focus:text-white hover:bg-gray-100 disabled:hover:bg-white disabled:text-gray-400",
      className
    )}
    {...props}
  >
    {Icon ? <Icon className="h-4 w-4" /> : children}
  </button>
);
