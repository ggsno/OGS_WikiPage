import { create } from "zustand";
import { WikiProps } from "../../../entities/wiki/type";

type Props = {
  wiki: WikiProps;
  setWiki: (newWiki: WikiProps) => void;
  resetWiki: () => void;
};

const INIT_WIKI = {
  id: "",
  title: "",
  content: "",
  containedTitles: [],
};

export const useWikiStore = create<Props>((set) => ({
  wiki: INIT_WIKI,
  setWiki: (newWiki) => set(() => ({ wiki: newWiki })),
  resetWiki: () => set(() => ({ wiki: INIT_WIKI })),
}));
