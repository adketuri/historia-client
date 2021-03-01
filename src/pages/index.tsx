import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FavoriteButton } from "../components/FavoriteButton";
import { Layout } from "../components/Layout";
import { useFavoriteMutation, useGamesQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = useGamesQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [favorite] = useFavoriteMutation();
  return (
    <Layout>
      <NextLink href="/games/submit">
        <Link mr={2}>Submit Game</Link>
      </NextLink>
      <br />
      {!data || !data.games || !data.games.games ? (
        <div>Loading</div>
      ) : (
        <VStack spacing={8}>
          {data.games.games.map((g) => (
            <Box p={5} shadow="md" borderWidth="1px" key={g.id}>
              <FavoriteButton game={g} />
              <Heading fontSize="xl">{g.title}</Heading>
              <Text mt={4}>{g.shortDescription}</Text>
              <Text mt={4}>Submitted by {g.submitter.username}</Text>
            </Box>
          ))}
        </VStack>
      )}
      {data?.games.hasMore ? (
        <Button
          m="auto"
          my={8}
          isLoading={loading}
          onClick={() => {
            if (!data) return;
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: data.games.games[data.games.games.length - 1].createdAt,
              },
              // updateQuery: (
              //   previousValues,
              //   { fetchMoreResult }: { fetchMoreResult: GamesQuery }
              // ): GamesQuery => {
              //   if (!fetchMoreResult) return previousValues as GamesQuery;
              //   return {
              //     __typename: "Query",
              //     games: {
              //       __typename: "PaginatedGames",
              //       hasMore: (fetchMoreResult as GamesQuery).games.hasMore,
              //       games: [
              //         ...(previousValues as GamesQuery).games.games,
              //         ...(fetchMoreResult as GamesQuery).games.games,
              //       ],
              //     },
              //   };
              // },
            });
          }}
        >
          Load More
        </Button>
      ) : (
        <Flex justify="center">
          <Text m={8}>You've reached the end. Wow!!</Text>
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
