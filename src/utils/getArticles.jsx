/** @format */

import { useQuery } from "@tanstack/react-query";

const getArticles = () => {
  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch(`https://plasma-plus-server.vercel.app/article`);

      return res.json();
    },
  });

  return { articles, isLoading, refetch };
};

export default getArticles;
