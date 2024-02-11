import { LoaderFunctionArgs } from "react-router-dom";
import { getWikiByTitle } from "../../features/get-wiki";
import escapeUrlKeywords from "../../shared/utils/regular-expressions/escapeUrlKeywords";

export default async ({ params }: LoaderFunctionArgs) => {
  const title = params.title as string;

  return getWikiByTitle(escapeUrlKeywords(title));
};
