import { useEffect } from "react";
import { WikiProps } from "../../../entities/wiki/type";
import { useWikiStore } from "../model/useWikiStore";

type Props = {
  initWiki: WikiProps | null;
};

const TITLE_MAX_LENGTH = 30;

export default function WikiEditor({ initWiki }: Props) {
  const [wiki, setWiki, errorMessage, setErrorMessage, resetWiki] =
    useWikiStore((e) => [
      e.wiki,
      e.setWiki,
      e.errorMessage,
      e.setErrorMessage,
      e.resetWiki,
    ]);

  useEffect(() => {
    initWiki && setWiki(initWiki);
    !initWiki && resetWiki();
    setErrorMessage(null);
  }, [initWiki, setWiki, setErrorMessage, resetWiki]);

  return (
    <>
      <div className={`pt-4 text-3xl ${errorMessage && "text-red-500"}`}>
        <input
          type="text"
          placeholder="위키 제목"
          onChange={(e) => {
            setWiki({ ...wiki, title: e.target.value });
            if (e.target.value.length > TITLE_MAX_LENGTH) {
              setErrorMessage(
                `${TITLE_MAX_LENGTH}자 미만의 제목을 지어주세요.`
              );
            } else {
              setErrorMessage(null);
            }
          }}
          value={wiki.title}
          className={`bg-slate-50 w-full p-2`}
        />
      </div>
      <div className="h-4 text-xs pl-3 text-red-500">{errorMessage}</div>
      <div>
        <textarea
          placeholder="위키를 작성해주세요!"
          onChange={(e) => {
            setWiki({ ...wiki, content: e.target.value });
          }}
          value={wiki.content}
          className="w-full h-96 bg-slate-50 p-2"
        />
      </div>
    </>
  );
}
