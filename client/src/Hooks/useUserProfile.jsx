import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUserProfile = (email) => {
  const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: ["userProfile", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
    // Don't cache the data for too long
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 30, // 30 seconds - after this, data will be considered stale and will be refetched
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
  });
};

export default useUserProfile;
