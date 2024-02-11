import { Link, useLoaderData, useParams } from "react-router-dom";
import { Header } from "../../widgets/header";
import { WikiProps } from "../../entities/wiki/type";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import Button from "../../shared/ui/Button";
import { routePath } from "../../shared/consts/routePath";
import ReplaceMatches from "../../shared/utils/ReplaceMatches";
import getGroupRegExp from "../../shared/utils/regular-expressions/getGroupRegExp";
import escapeUrlKeywords from "../../shared/utils/regular-expressions/escapeUrlKeywords";

export default function Page() {
  const params = useParams();
  const title = params["title"] as string;
  const wiki = useLoaderData() as WikiProps;

  return (
    <>
      <FlexCenterContainer>
        <Header
          MenuComponent={
            <Link to={routePath["wiki-editor"](escapeUrlKeywords(title))}>
              <Button variant="sub">수정</Button>
            </Link>
          }
        />
        <h2 className="text-3xl py-4">{wiki.title}</h2>
        <p className="whitespace-pre-wrap">
          <ReplaceMatches
            wholeText={wiki.content}
            regExp={getGroupRegExp(wiki.containedTitles)}
            replacedRender={(match) => (
              <>
                {match === wiki.title && match}
                {match !== wiki.title && (
                  <Link
                    to={routePath.wiki(escapeUrlKeywords(match))}
                    className="text-blue-600 hover:underline"
                  >
                    {match}
                  </Link>
                )}
              </>
            )}
          />
        </p>
      </FlexCenterContainer>
    </>
  );
}
