import { graphQLClient } from "@/clients/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  const user = data?.getCurrentUser;

  return {
    user,
    isError,
    isLoading,
  };
};
