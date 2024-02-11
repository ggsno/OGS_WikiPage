import axios from "axios";
import { WikiProps } from "../../../entities/wiki/type";
import apiUrl from "../../../shared/consts/apiUrl";

export const editWiki = async (
  wiki: Pick<WikiProps, "id" | "title" | "content">
) => {
  return axios.put(apiUrl.putWiki, wiki);
};

export const createWiki = async (
  wiki: Pick<WikiProps, "title" | "content">
) => {
  return axios.post(apiUrl.postWiki, wiki);
};
