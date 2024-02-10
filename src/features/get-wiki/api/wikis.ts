import axios from "axios";
import apiUrl from "../../../shared/consts/apiUrl";
import { WikiProps } from "../../../entities/wiki/type";

export const getWikis = async (page: number) => {
  const res = await axios.get<WikiProps[]>(apiUrl.getWikis(page));
  return {
    totalCount: Number(res.headers["x-total-count"]),
    wikis: res.data,
  };
};

export const getWikiByTitle = async (title: string) => {
  const res = await axios.get<WikiProps>(apiUrl.getWikiByTitle(title));
  return res.data;
};
