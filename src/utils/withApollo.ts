import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedGames } from "../generated/graphql";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          games: {
            keyArgs: [],
            merge(
              existing: PaginatedGames | undefined,
              incoming: PaginatedGames
            ): PaginatedGames {
              return {
                ...incoming,
                games: [...(existing?.games || []), ...incoming.games],
              };
            },
          },
        },
      },
    },
  }),
});

export const withApollo = createWithApollo(client);
