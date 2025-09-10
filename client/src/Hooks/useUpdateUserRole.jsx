import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.put(`/user/role/${email}`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch the user profile query
      queryClient.invalidateQueries(["userProfile", data.email]);
    },
  });
};

export default useUpdateUserRole;
