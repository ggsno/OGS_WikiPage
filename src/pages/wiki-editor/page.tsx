import { useLoaderData, useNavigate } from "react-router-dom";
import Header from "../../widgets/header/ui/Header";
import SaveWikiButton from "../../features/update-wiki/ui/SaveWikiButton";
import WikiEditor from "../../features/update-wiki/ui/WikiEditor";
import { WikiProps } from "../../entities/wiki/type";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import { routePath } from "../../shared/consts/routePath";

export default function Page() {
  const loadedWiki = useLoaderData() as WikiProps | null;
  const navigate = useNavigate();

  return (
    <>
      <FlexCenterContainer>
        <Header
          MenuComponent={
            <SaveWikiButton
              isEditMode={!!loadedWiki}
              callback={(wiki) => navigate(routePath.wiki(wiki.title))}
            />
          }
        />
        <WikiEditor initWiki={loadedWiki!} />
      </FlexCenterContainer>
    </>
  );
}
