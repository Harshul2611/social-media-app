import { graphQLClient } from "@/clients/api";
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  const users = data?.getCurrentUser;

  return {
    users,
    isError,
    isLoading,
  };
};

export const useCurrentUserById = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-by-id"],
    queryFn: () => graphQLClient.request(getUserByIdQuery, { id }),
  });

  const user = data?.getUserById;

  return { user, isError, isLoading };
};
