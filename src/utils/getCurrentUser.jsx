/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

const getCurrentUser = () => {
  const { user } = useAuth();
  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["user"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `https://plasma-plus-server.vercel.app/users?email=${user?.email}`
      );
      return res.json();
    },
  });

  return { currentUser, isLoading };
};

export default getCurrentUser;
