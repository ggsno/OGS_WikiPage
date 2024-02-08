import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
        containedTitles: string[];
      }>(`/wikis/${title}`);
      return res.data;
    },
  });

  const regexPattern = new RegExp(
    data.containedTitles
      .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "g"
  );

  function splitAndInsertLink(inputStr: string, myTitle: string) {
    return inputStr.split(regexPattern).flatMap((part, index, array) => {
      if (index < array.length - 1) {
        const matchedString = regexPattern.exec(inputStr)![0];
        if (myTitle === matchedString) return [part, matchedString];
        return [
          part,
          <Link to={`/wiki/${matchedString}`}>{matchedString}</Link>,
        ];
      }
      return [part];
    });
  }

  return (
    <>
      <h2>{data.title}</h2>
      <p>{splitAndInsertLink(data.content, data.title)}</p>
      <Link to={`/wiki-editor?title=${title}`}>위키 수정하기</Link>
    </>
  );
});

export default Page;
