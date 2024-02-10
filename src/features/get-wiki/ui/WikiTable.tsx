import { Fragment } from "react";
import DataTable from "../../../shared/ui/DataTable";
import useWikiQuery from "../model/useWikiQuery";
import DivisionLine from "../../../shared/ui/DivisionLine";
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
      <DataTable rowHeight={12}>
        <DataTable.TotalCount totalCount={totalCount} />
        <Margin size={2} />
        <DivisionLine />
        <DataTable.RowContainer rowCount={ROW_COUNT_PER_PAGE}>
          {wikis.map(({ title }, i) => (
            <Fragment key={title + i}>
              <DataTable.Row
                data={title}
                onClick={() => {
                  handleClickRow(title);
                }}
              />
            </Fragment>
          ))}
        </DataTable.RowContainer>
        <DivisionLine />
        <Margin size={2} />
        <DataTable.Pagenation
          page={page}
          maxPage={maxPage}
          setPage={(page) => setPage(page)}
        />
      </DataTable>
    </>
  );
}
