import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";

const Page = AsyncBoundary(() => {
  const { title } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: ["wiki", title],
    queryFn: async () => {
      const res = await axios.get<{
        id: string;
        title: string;
        content: string;
      }>(`/wikis/${title}`);
      return res.data;
    },
  });

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </>
  );
});

export default Page;