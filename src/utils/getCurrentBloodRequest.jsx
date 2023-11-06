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
        `http://localhost:3000/blood_request?limit=${limit}`
      );
      return res.json();
    },
  });

  return { requestedBloods, isLoading, refetch };
};

export default getCurrentBloodRequest;
