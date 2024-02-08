import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

export default (page?: number) => {
  useSuspenseQuery({
    queryKey: ["wiki"],
    queryFn: async () => {
      const res = await axios.get<
        {
          id: string;
          title: string;
          content: string;
        }[]
      >(`/wikis?page=${page ?? 1}`);
      return res.data;
    },
  });
};
