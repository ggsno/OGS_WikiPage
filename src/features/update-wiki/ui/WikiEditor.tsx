import { useEffect } from "react";
import { WikiProps } from "../../../entities/wiki/type";
import { useWikiStore } from "../model/useWikiStore";

type Props = {
  initWiki?: WikiProps;
};

export default function WikiEditor({ initWiki }: Props) {
  const { wiki, setWiki } = useWikiStore(({ wiki, setWiki }) => ({
    wiki,
    setWiki,
  }));

  useEffect(() => {
    if (initWiki) setWiki(initWiki);
  }, [initWiki, setWiki]);

  return (
    <>
      <div className="py-4 text-3xl ">
        <input
          type="text"
          placeholder="위키 제목"
          onChange={(e) => {
            setWiki({ ...wiki, title: e.target.value });
          }}
          value={wiki.title}
          className="bg-slate-50 w-full p-2"
        />
      </div>
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
