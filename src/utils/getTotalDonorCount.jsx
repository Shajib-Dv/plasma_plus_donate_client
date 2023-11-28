/** @format */

import { useQuery } from "@tanstack/react-query";

const getTotalDonorCount = () => {
  const { data: totalDonors = 0 } = useQuery({
    queryKey: ["totalDonorCount"],
    queryFn: async () => {
      const res = await fetch(
        `https://plasma-plus-server.vercel.app/donors/length`
      );
      return res.json();
    },
  });
  return { totalDonors: totalDonors.totalDonors };
};

export default getTotalDonorCount;
