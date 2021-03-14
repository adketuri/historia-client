import { Box, Button, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { GameCard } from "../components/GameCard";
import { Layout } from "../components/Layout";
import { useGamesQuery, useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

const Browse = () => {
  const meQuery = useMeQuery();
  const { data, error, loading, fetchMore, variables } = useGamesQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Layout>
      {(meQuery.data?.me?.isSubmitter || meQuery.data?.me?.isAdmin) && (
        <Flex>
          <NextLink href="/games/submit">
            <Button variant="solid" colorScheme="blue" mb={5} ml="auto">
              Submit Game
            </Button>
          </NextLink>
        </Flex>
      )}

      {!data || !data.games || !data.games.games ? (
        <div>Loading</div>
      ) : (
        <VStack spacing={5}>
          {data.games.games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </VStack>
      )}
      {data?.games.hasMore ? (
        <Button
          variant="solid"
          colorScheme="purple"
          mx="auto"
          my={8}
          isLoading={loading}
          onClick={() => {
            if (!data) return;
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: data.games.games[data.games.games.length - 1].createdAt,
              },
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

export default withApollo({ ssr: true })(Browse);
