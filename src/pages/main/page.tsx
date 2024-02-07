import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";

const Page = AsyncBoundary(() => {
  const { data } = useSuspenseQuery({
    queryKey: ["wiki"],
    queryFn: async () => {
      const res = await axios.get<
        {
          id: string;
          title: string;
          content: string;
        }[]
      >(`/wikis`);
      return res.data;
    },
  });
  return (
    <>
      {data.map(({ title }) => (
        <Fragment key={title}>
          <Link to={`/wiki/${title}`}>{title}</Link>
        </Fragment>
      ))}
    </>
  );
});

export default Page;
