import { useLoaderData, useNavigate } from "react-router-dom";
import { Header } from "../../widgets/header";
import { SaveWikiButton, WikiEditor } from "../../features/update-wiki";
import { WikiProps } from "../../entities/wiki/type";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import routePath from "../../shared/consts/routePath";
import escapeUrlKeywords from "../../shared/utils/escapeUrlKeywords";

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
              callback={(wiki) =>
                navigate(routePath.wiki(escapeUrlKeywords(wiki.title)))
              }
            />
          }
        />
        <WikiEditor initWiki={loadedWiki} />
      </FlexCenterContainer>
    </>
  );
}
