import Button from "../../../shared/ui/Button";
import { InputWikiProps, useWikiStore } from "../model/useWikiStore";
import { createWiki, editWiki } from "../api/wikis";

type Props = {
  isEditMode?: boolean;
  callback?: (wiki: InputWikiProps) => void;
};

export default function SaveWikiButton({ isEditMode, callback }: Props) {
  const [wiki, resetWiki, errorMessage] = useWikiStore((e) => [
    e.wiki,
    e.resetWiki,
    e.errorMessage,
  ]);

  return (
    <>
      <Button
        disabled={
          !wiki ||
          wiki.title.length === 0 ||
          wiki.content.length === 0 ||
          !!errorMessage
        }
        onClick={async (e) => {
          e.preventDefault();

          isEditMode && (await editWiki(wiki));
          !isEditMode && (await createWiki(wiki));
          resetWiki();
          callback && callback(wiki);
        }}
      >
        저장
      </Button>
    </>
  );
}
