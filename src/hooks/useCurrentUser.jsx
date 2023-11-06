/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCurrentUser = () => {
  const { user } = useAuth();
  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["user"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/users?email=${user?.email}`
      );
      return res.json();
    },
  });

  return { currentUser, isLoading };
};

export default useCurrentUser;
