/** @format */

import { useQuery } from "@tanstack/react-query";

const getCampaigns = () => {
  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/campaigns`);
      return res.json();
    },
  });

  return { campaigns, isLoading, refetch };
};

export default getCampaigns;
