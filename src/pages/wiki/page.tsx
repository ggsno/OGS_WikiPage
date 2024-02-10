import { Link, useLoaderData, useParams } from "react-router-dom";
import Header from "../../widgets/header/ui/Header";
import ReplaceTextsWithLinks from "../../features/replace-texts-with-links";
import { WikiProps } from "../../entities/wiki/type";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import Button from "../../shared/ui/Button";
import { routePath } from "../../shared/consts/routePath";

export default function Page() {
  const params = useParams();
  const title = params["title"] as string;
  const wiki = useLoaderData() as WikiProps;

  return (
    <>
      <FlexCenterContainer>
        <Header
          MenuComponent={
            <Link to={routePath["wiki-editor"](title)}>
              <Button variant="sub">수정</Button>
            </Link>
          }
        />
        <h2 className="text-3xl py-4">{wiki.title}</h2>
        <p className="whitespace-pre-wrap">
          <ReplaceTextsWithLinks
            wholeText={wiki.content}
            targetTexts={wiki.containedTitles}
            except={wiki.title}
          />
        </p>
      </FlexCenterContainer>
    </>
  );
}
