import { create } from "zustand";
import { WikiProps } from "../../../entities/wiki/type";

type InputWikiProps = Pick<WikiProps, "id" | "title" | "content">;

type WikiStoreProps = {
  wiki: InputWikiProps;
  setWiki: (newWiki: InputWikiProps) => void;
  resetWiki: () => void;
};

const INIT_WIKI = {
  id: "",
  title: "",
  content: "",
};

export const useWikiStore = create<WikiStoreProps>((set) => ({
  wiki: INIT_WIKI,
  setWiki: (newWiki) => set(() => ({ wiki: newWiki })),
  resetWiki: () => set(() => ({ wiki: INIT_WIKI })),
}));
