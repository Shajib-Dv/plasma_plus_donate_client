/** @format */

import { useQuery } from "@tanstack/react-query";

const getGalleryPhotos = () => {
  const {
    data: photos = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await fetch(`https://plasma-plus-server.vercel.app/gallery`);
      return res.json();
    },
  });

  return { photos, isLoading, refetch };
};

export default getGalleryPhotos;
