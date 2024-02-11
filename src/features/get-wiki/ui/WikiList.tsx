import { Fragment } from "react";
import List from "../../../shared/ui/List";
import useWikiQuery from "../model/useWikiQuery";
import DivisionLine from "../../../shared/ui/DivisionLine";
import Margin from "../../../shared/ui/Margin";
import Pagination from "../../../shared/ui/Pagination";

const ROW_COUNT_PER_PAGE = 5;

type Props = {
  page: number;
  setPage: (newPage: number) => void;
  handleClickRow: (title: string) => void;
};

export default function WikiList({ page, setPage, handleClickRow }: Props) {
  const { totalCount, wikis } = useWikiQuery(page);
  const maxPage = Math.ceil(totalCount / ROW_COUNT_PER_PAGE);

  return (
    <>
      <List itemHeight={12}>
        <List.TotalCount totalCount={totalCount} />
        <Margin size={2} />
        <DivisionLine />
        <List.Container rowCount={ROW_COUNT_PER_PAGE}>
          {totalCount === 0 && (
            <div className="flex justify-center items-center w-full h-full text-center">
              작성된 위키가 없습니다.
              <br />
              위키를 작성해주세요!
            </div>
          )}
          {wikis.map((wiki) => (
            <Fragment key={wiki.title}>
              <List.ItemText
                text={wiki.title}
                onClick={() => {
                  handleClickRow(wiki.title);
                }}
              />
            </Fragment>
          ))}
        </List.Container>
        <DivisionLine />
        <Margin size={2} />
        <Pagination
          page={page}
          maxPage={maxPage}
          setPage={(page) => setPage(page)}
          range={9}
        />
      </List>
    </>
  );
}
