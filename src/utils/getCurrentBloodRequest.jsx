/** @format */

import { useQuery } from "@tanstack/react-query";

const getCurrentBloodRequest = (limit = 0) => {
  const {
    data: requestedBloods = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blood_request"],
    queryFn: async () => {
      const res = await fetch(
        `https://plasma-plus-server.vercel.app/blood_request?limit=${limit}`
      );
      return res.json();
    },
  });

  return { requestedBloods, isLoading, refetch };
};

export default getCurrentBloodRequest;
