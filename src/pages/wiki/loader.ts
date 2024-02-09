import { LoaderFunctionArgs } from "react-router-dom";
import { getWikiByTitle } from "../../features/get-wiki/api/wikis";

export default async ({ params }: LoaderFunctionArgs) => {
  const title = params.title as string;

  return getWikiByTitle(title);
};
