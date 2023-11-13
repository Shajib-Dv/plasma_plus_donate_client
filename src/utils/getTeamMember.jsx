/** @format */

import { useQuery } from "@tanstack/react-query";

const getTeamMember = () => {
  const {
    data: teamMembers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["team_member"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/team_member`);
      return res.json();
    },
  });

  return { teamMembers, isLoading, refetch };
};

export default getTeamMember;
