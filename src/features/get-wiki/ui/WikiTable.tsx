import { Fragment } from "react";
import DataTable from "../../../shared/ui/DataTable";
import useWikiQuery from "../model/useWikiQuery";
import Margin from "../../../shared/ui/Margin";

const ROW_COUNT_PER_PAGE = 5;

type Props = {
  page: number;
  setPage: (newPage: number) => void;
  handleClickRow: (row: string) => void;
};

export default function WikiTable({ page, setPage, handleClickRow }: Props) {
  const { totalCount, wikis } = useWikiQuery(page);
  const maxPage = Math.ceil(totalCount / ROW_COUNT_PER_PAGE);

  return (
    <>
      <DataTable>
        <DataTable.TotalCount totalCount={totalCount} />
        <Margin size={4} />
        <div className="h-52">
          {wikis.map(({ title }, i) => (
            <Fragment key={title + i}>
              <DataTable.Row
                data={title}
                onClick={() => {
                  console.log("hi");
                  handleClickRow(title);
                }}
              />
            </Fragment>
          ))}
        </div>
        <DataTable.Pagenation
          page={page}
          maxPage={maxPage}
          setPage={(page) => setPage(page)}
        />
      </DataTable>
    </>
  );
}
