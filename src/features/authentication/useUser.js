import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { isAuthApiError } from "@supabase/supabase-js";

export function useUser() {
  const {
    isPending,
    data: user,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    isPending,
    user,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  };
}
