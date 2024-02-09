import { useLoaderData } from "react-router-dom";
import { WikiProps } from "../../entities/wiki/type";
import { useState } from "react";
import SaveWikiButton from "../../features/edit-wiki/ui/SaveWikiButton";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import Header from "../../widgets/header/ui/Header";

export default function Page() {
  const loadedWiki = useLoaderData() as WikiProps | null;
  const [wiki, setWiki] = useState<WikiProps>(
    loadedWiki ?? {
      id: "",
      title: "",
      content: "",
      containedTitles: [],
    }
  );
  const isEditMode = !!loadedWiki;

  return (
    <>
      <FlexCenterContainer>
        <Header
          MenuComponent={<SaveWikiButton wiki={wiki} isEditMode={isEditMode} />}
        />
        <form>
          <div>
            <input
              type="text"
              placeholder="위키 제목"
              onChange={(e) => {
                setWiki({ ...wiki, title: e.target.value });
              }}
              value={wiki.title}
            />
          </div>
          <div>
            <textarea
              placeholder="위키를 작성해주세요!"
              onChange={(e) => {
                setWiki({ ...wiki, content: e.target.value });
              }}
              value={wiki.content}
              className="w-full h-96"
            />
          </div>
        </form>
      </FlexCenterContainer>
    </>
  );
}
