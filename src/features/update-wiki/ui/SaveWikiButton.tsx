import { WikiProps } from "../../../entities/wiki/type";
import Button from "../../../shared/ui/Button";
import { createWiki, editWiki } from "../api/wikis";
import { useWikiStore } from "../model/useWikiStore";

type Props = {
  isEditMode?: boolean;
  callback?: (wiki: WikiProps) => void;
};

export default function SaveWikiButton({ isEditMode, callback }: Props) {
  const { wiki, resetWiki } = useWikiStore(({ wiki, resetWiki }) => ({
    wiki,
    resetWiki,
  }));

  return (
    <>
      <Button
        disabled={!wiki || wiki.title.length === 0 || wiki.content.length === 0}
        onClick={async (e) => {
          e.preventDefault();
          await (isEditMode && editWiki(wiki));
          await (!isEditMode && createWiki(wiki));
          resetWiki();
          callback && callback(wiki);
        }}
      >
        저장
      </Button>
    </>
  );
}
