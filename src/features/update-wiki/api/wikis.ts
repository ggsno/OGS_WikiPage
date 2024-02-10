import axios from "axios";
import { WikiProps } from "../../../entities/wiki/type";
import apiUrl from "../../../shared/consts/apiUrl";

export const editWiki = async (wiki: WikiProps) => {
  return axios.put(apiUrl.putWiki, wiki);
};

export const createWiki = async (wiki: WikiProps) => {
  return axios.post(apiUrl.postWiki, wiki);
};
