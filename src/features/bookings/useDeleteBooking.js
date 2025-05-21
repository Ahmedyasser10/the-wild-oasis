import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deletebooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("booking deleted successfully");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deletebooking };
}
