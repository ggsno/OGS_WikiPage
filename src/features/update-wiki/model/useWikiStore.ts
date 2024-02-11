import { create } from "zustand";
import { WikiProps } from "../../../entities/wiki/type";

export type InputWikiProps = Pick<WikiProps, "id" | "title" | "content">;

type WikiStoreProps = {
  wiki: InputWikiProps;
  setWiki: (newWiki: InputWikiProps) => void;
  resetWiki: () => void;
  errorMessage: string | null;
  setErrorMessage: (newErrorMessage: string | null) => void;
};

const INIT_WIKI = {
  id: "",
  title: "",
  content: "",
};

export const useWikiStore = create<WikiStoreProps>((set) => ({
  wiki: INIT_WIKI,
  setWiki: (wiki) => set(() => ({ wiki })),
  resetWiki: () => set(() => ({ wiki: INIT_WIKI })),
  errorMessage: null,
  setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),
}));
