/** @format */

import { useQuery } from "@tanstack/react-query";

const getSliderCampaigns = (limit) => {
  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["slider_campaigns"],
    enabled: !!limit,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/campaigns?limit=${limit}`);
      return res.json();
    },
  });

  return { campaigns, isLoading, refetch };
};

export default getSliderCampaigns;
