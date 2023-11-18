/** @format */

import { useQuery } from "@tanstack/react-query";

const getDonors = (
  url = `https://plasma-plus-server.vercel.app/donors/search`
) => {
  const {
    data: donors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donors?name"],
    enabled: !!url,
    queryFn: async () => {
      const res = await fetch(url);
      return res.json();
    },
  });

  return { donors, isLoading, refetch };
};

export default getDonors;
