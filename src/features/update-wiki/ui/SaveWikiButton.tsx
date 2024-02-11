import Button from "../../../shared/ui/Button";
import { InputWikiProps, useWikiStore } from "../model/useWikiStore";
import { createWiki, editWiki } from "../api/wikis";
import { AxiosError } from "axios";

type Props = {
  isEditMode?: boolean;
  callback?: (wiki: InputWikiProps) => void;
};

export default function SaveWikiButton({ isEditMode, callback }: Props) {
  const [wiki, resetWiki, errorMessage, setErrorMessage] = useWikiStore((e) => [
    e.wiki,
    e.resetWiki,
    e.errorMessage,
    e.setErrorMessage,
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

          try {
            isEditMode && (await editWiki(wiki));
            !isEditMode && (await createWiki(wiki));
            resetWiki();
            callback && callback(wiki);
          } catch (err) {
            setErrorMessage(
              (err instanceof AxiosError && err.response?.data) ??
                "요청에 실패했습니다. 잠시 후 다시 시도해주세요."
            );
            console.error(err);
          }
        }}
      >
        저장
      </Button>
    </>
  );
}
