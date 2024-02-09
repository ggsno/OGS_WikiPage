import { useSuspenseQuery } from "@tanstack/react-query";
import queryKey from "../../../shared/consts/queryKey";
import { getWikis } from "../api/wikis";

export default function useWikiQuery(page: number) {
  const {
    data: { totalCount, wikis },
  } = useSuspenseQuery({
    queryKey: [queryKey.wikis, page],
    queryFn: () => getWikis(page),
  });

  return { totalCount, wikis };
}
