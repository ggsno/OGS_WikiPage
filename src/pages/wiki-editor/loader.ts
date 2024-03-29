import { LoaderFunctionArgs } from "react-router-dom";
import { getWikiByTitle } from "../../features/get-wiki";
import escapeUrlKeywords from "../../shared/utils/escapeUrlKeywords";

export default async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  if (!title) return null;

  return getWikiByTitle(escapeUrlKeywords(title));
};
