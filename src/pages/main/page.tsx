import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";

const Page = AsyncBoundary(() => {
  const [serachParams, setSerachParams] = useSearchParams();
  const page = serachParams.get("page");
  const ITEM_COUNT_PER_PAGE = 5;

  const {
    data: { totalCount, data },
  } = useSuspenseQuery({
    queryKey: ["wiki", page],
    queryFn: async () => {
      const res = await axios.get<
        {
          id: string;
          title: string;
          content: string;
        }[]
      >(`/wikis?page=${page ?? 1}`);
      return {
        totalCount: Number(res.headers["x-total-count"]),
        data: res.data,
      };
    },
  });

  return (
    <>
      <div>총 {totalCount.toLocaleString()}개의 위키가 있어요!</div>
      {data.map(({ title }) => (
        <Fragment key={title}>
          <div>
            <Link to={`/wiki/${title}`}>{title}</Link>
          </div>
        </Fragment>
      ))}
      {Array(Math.ceil(totalCount / ITEM_COUNT_PER_PAGE))
        .fill(0)
        .map((_, i) => i + 1)
        .map((e) => {
          return (
            <button
              onClick={() => {
                setSerachParams({ page: String(e) });
              }}
            >
              {e}
            </button>
          );
        })}
    </>
  );
});

export default Page;
