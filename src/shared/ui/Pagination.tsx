import { Fragment } from "react";

export default function Pagination(
  props: {
    page: number;
    setPage: (page: number) => void;
    maxPage: number;
    range: number;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const { page, setPage, maxPage, range, ...rest } = props;

  const pageNumbers = Array(
    maxPage > range ? range : maxPage !== 0 ? maxPage : 1
  )
    .fill(0)
    .map((_, i) => i + 1)
    .map((num) => {
      if (maxPage <= range || page <= range / 2) return num;
      if (page >= maxPage - range / 2 + 1) return num + maxPage - range;
      return num + page - Math.floor((range + 1) / 2);
    });

  return (
    <div className="flex justify-center w-full" {...rest}>
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className=" disabled:text-slate-300"
      >
        &lt;
      </button>
      {pageNumbers.map((pageNumber) => (
        <Fragment key={`pagination button ${pageNumber}`}>
          <button
            onClick={() => setPage(pageNumber)}
            className={`w-12 px-4 py-1 hover:bg-slate-50 ${
              page === pageNumber && "font-bold"
            }`}
          >
            {pageNumber}
          </button>
        </Fragment>
      ))}
      <button
        disabled={page >= maxPage}
        onClick={() => setPage(page + 1)}
        className=" disabled:text-slate-300"
      >
        &gt;
      </button>
    </div>
  );
}
