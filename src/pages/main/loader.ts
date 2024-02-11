import { LoaderFunctionArgs } from "react-router-dom";
import { getWikis } from "../../features/get-wiki";
import queryClient from "../../shared/config/queryClient";
import queryKey from "../../shared/consts/queryKey";

export default async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");

  queryClient.ensureQueryData({
    queryKey: [queryKey.wikis, page],
    queryFn: () => getWikis(page),
  });

  return null;
};
