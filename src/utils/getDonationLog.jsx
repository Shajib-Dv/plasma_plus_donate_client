/** @format */

import { useQuery } from "@tanstack/react-query";

const getDonationLog = (id) => {
  const { data: donationLog = {}, isLoading } = useQuery({
    queryKey: ["donation-log"],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(
        `https://plasma-plus-server.vercel.app/donor/log?donorId=${id}`
      );

      return res.json();
    },
  });

  return { donationLog, isLoading };
};

export default getDonationLog;
