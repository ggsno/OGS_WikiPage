import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import Header from "../../widgets/header/ui/Header";
import EditWikiLink from "../../features/edit-wiki/ui/EditWikiLink";
import { routePath } from "../../shared/consts/routePath";

const Page = AsyncBoundary(() => {
  const params = useParams();
  const title = params["title"] as string;

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
          <Link
            to={routePath.wiki(matchedString)}
            className="text-blue-600 hover:underline"
          >
            {matchedString}
          </Link>,
        ];
      }
      return [part];
    });
  }

  return (
    <>
      <FlexCenterContainer>
        <Header MenuComponent={<EditWikiLink title={title} />} />
        <h2 className="text-3xl py-4">{data.title}</h2>
        <p className="whitespace-pre-wrap">
          {splitAndInsertLink(data.content, data.title)}
        </p>
      </FlexCenterContainer>
    </>
  );
});

export default Page;
