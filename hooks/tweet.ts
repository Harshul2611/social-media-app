import { graphQLClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphQLClient.request(createTweetMutation, { payload }),
    onMutate: () => toast.loading("Creating Tweet"),
    onSuccess: async (_, __, context) => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.dismiss(context);
      toast.success("Tweet created");
    },
    onError: (_, __, context) => {
      toast.dismiss(context);
      toast.error("Failed to create tweet");
    },
  });

  return mutation;
};

export const useGetAllTweets = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphQLClient.request(getAllTweetsQuery),
  });

  const tweets = data?.getAllTweets;
  return { tweets, loading: isLoading, isError };
};
