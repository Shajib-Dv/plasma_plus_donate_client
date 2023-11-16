/** @format */

import { useQuery } from "@tanstack/react-query";

const getSingleCampaign = (id) => {
  const {
    data: campaign = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaign_detail"],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/campaigns?campaignId=${id}`
      );

      return res.json();
    },
  });

  return { campaign, isLoading, refetch };
};

export default getSingleCampaign;
