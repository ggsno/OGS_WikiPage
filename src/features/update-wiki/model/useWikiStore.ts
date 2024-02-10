import { create } from "zustand";
import { WikiProps } from "../../../entities/wiki/type";

type EditWikiProps = Omit<WikiProps, "containedTitles">;

type WikiStoreProps = {
  wiki: EditWikiProps;
  setWiki: (newWiki: EditWikiProps) => void;
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
