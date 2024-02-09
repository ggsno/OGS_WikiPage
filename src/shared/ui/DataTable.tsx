import { Fragment, ReactNode } from "react";

type RowProps = {
  data: string;
} & React.HTMLAttributes<HTMLDivElement>;

type TotalCountProps = {
  totalCount: number;
} & React.HTMLAttributes<HTMLDivElement>;

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * 컴파운드 컴포넌트: Row, TotalCount, Pagination
 */
export default function DataTable({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Row({ data, ...rest }: RowProps) {
  return (
    <div
      className="flex items-center w-full h-10 px-2
      hover:bg-slate-50 hover:cursor-pointer"
      {...rest}
    >
      {data}
    </div>
  );
}

function TotalCount({ totalCount, ...rest }: TotalCountProps) {
  return (
    <div className="text-sm px-2" {...rest}>
      {totalCount === 0 && "자료가 없습니다."}
      {totalCount !== 0 && (
        <>
          총 <span className="font-bold">{totalCount.toLocaleString()}개</span>
          의 자료가 있어요!
        </>
      )}
    </div>
  );
}

function Pagenation({ page, maxPage, setPage, ...rest }: PaginationProps) {
  return (
    <div {...rest}>
      {Array(maxPage)
        .fill(0)
        .map((_, i) => i + 1)
        .map((e) => {
          return (
            <Fragment key={`pagination button ${e}`}>
              <button
                onClick={() => setPage(e)}
                className={`px-4 py-1 hover:bg-slate-50 ${
                  (page === e || (!page && e === 1)) && "font-bold"
                }`}
              >
                {e}
              </button>
            </Fragment>
          );
        })}
    </div>
  );
}

DataTable.Row = Row;
DataTable.TotalCount = TotalCount;
DataTable.Pagenation = Pagenation;
