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
      const res = await fetch(`http://localhost:3000/article`);

      return res.json();
    },
  });

  return { articles, isLoading, refetch };
};

export default getArticles;
