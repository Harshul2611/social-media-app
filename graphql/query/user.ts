import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(
  `
    #graphql
    query VerifyUserGoogleTokenQuery($token: String!) {
      verifyGoogleToken(token: $token)
    }
  `
);

export const getCurrentUserQuery = graphql(
  `
    #graphql
    query GetCurrentUser {
      getCurrentUser {
        firstName
        lastName
        id
        profileImageURL
        email
        tweets {
          id
          content
          author {
            id
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `
);

export const getUserByIdQuery = graphql(
  `
    #graphql
    query GetUserById($id: ID!) {
      getUserById(id: $id) {
        id
        firstName
        lastName
        profileImageURL
        tweets {
          id
          content
          imageUrl
          author {
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `
);
