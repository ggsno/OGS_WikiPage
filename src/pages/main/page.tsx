import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";
import { WikiProps } from "../../entities/wiki/type";
import Card from "../../shared/ui/Card";

const Page = AsyncBoundary(() => {
  const [serachParams, setSerachParams] = useSearchParams();
  const page = serachParams.get("page");
  const ITEM_COUNT_PER_PAGE = 5;

  const {
    data: { totalCount, data },
  } = useSuspenseQuery({
    queryKey: ["wiki", page],
    queryFn: async () => {
      const res = await axios.get<WikiProps[]>(`/wikis?page=${page ?? 1}`);
      return {
        totalCount: Number(res.headers["x-total-count"]),
        data: res.data,
      };
    },
  });

  return (
    <>
      <div className="pb-4 text-sm">
        {totalCount === 0 && "아직 위키가 없어요! 위키를 작성해주세요."}
        {totalCount !== 0 && (
          <>
            총{" "}
            <span className="font-bold">{totalCount.toLocaleString()}개</span>의
            위키가 있어요!
          </>
        )}
      </div>
      {data.map(({ title }) => (
        <Fragment key={title}>
          <Link to={`/wiki/${title}`}>
            <Card>{title}</Card>
          </Link>
        </Fragment>
      ))}
      <div className="mt-6">
        {Array(Math.ceil(totalCount / ITEM_COUNT_PER_PAGE))
          .fill(0)
          .map((_, i) => i + 1)
          .map((e, i) => {
            return (
              <Fragment key={`pagination button ${i}`}>
                <button
                  onClick={() => {
                    setSerachParams({ page: String(e) });
                  }}
                  className={`px-4 py-1 hover:bg-slate-50 ${
                    (page === String(e) || (!page && e === 1)) && "font-bold"
                  }`}
                >
                  {e}
                </button>
              </Fragment>
            );
          })}
      </div>
    </>
  );
});

export default Page;
