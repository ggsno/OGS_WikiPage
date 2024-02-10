import { Fragment, ReactNode, createContext, useContext } from "react";

const DataTableContext = createContext(0);

/** 컴파운드 컴포넌트: Row, RowContainer, TotalCount, Pagination */
export default function DataTable(props: {
  children: ReactNode;
  rowHeight: number;
}) {
  const { children, rowHeight } = props;

  return (
    <>
      <DataTableContext.Provider value={rowHeight}>
        {children}
      </DataTableContext.Provider>
    </>
  );
}

function Row(
  props: {
    data: string;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const { data, ...rest } = props;
  const rowHeight = useContext(DataTableContext);

  return (
    <div
      style={{ height: `calc(${rowHeight} * 0.25rem)` }}
      className={`flex items-center w-full px-2
      hover:bg-slate-50 hover:cursor-pointer`}
      {...rest}
    >
      {data}
    </div>
  );
}

function RowContainer(props: { children: ReactNode; rowCount: number }) {
  const { children, rowCount } = props;
  const rowHeight = useContext(DataTableContext);

  return (
    <div style={{ height: `calc(${rowHeight * rowCount} * 0.25rem)` }}>
      {children}
    </div>
  );
}

function TotalCount(
  props: {
    totalCount: number;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const { totalCount, ...rest } = props;

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

function Pagenation(
  props: {
    page: number;
    setPage: (page: number) => void;
    maxPage: number;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const { page, maxPage, setPage, ...rest } = props;

  return (
    <div {...rest}>
      {Array(maxPage)
        .fill(0)
        .map((_, i) => i + 1)
        .map((pageNumber) => {
          return (
            <Fragment key={`pagination button ${pageNumber}`}>
              <button
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-1 hover:bg-slate-50 ${
                  page === pageNumber && "font-bold"
                }`}
              >
                {pageNumber}
              </button>
            </Fragment>
          );
        })}
    </div>
  );
}

DataTable.Row = Row;
DataTable.RowContainer = RowContainer;
DataTable.TotalCount = TotalCount;
DataTable.Pagenation = Pagenation;
