import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(
  `
    #graphql
    query GetAllTweets {
      getAllTweets {
        id
        content
        imageUrl
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  `
);

export const getImageURLQuery = graphql(
  `
    #graphql
    query GetSignedUrlForTweet($imageType: String!, $imageName: String!) {
      getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)
    }
  `
);
