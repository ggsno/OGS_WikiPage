import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

export default async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  if (!title) return null;

  const res = await axios.get(`/wikis/${title}`);
  return res.data;
};
