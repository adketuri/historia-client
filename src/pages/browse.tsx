import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { GameCard } from "../components/GameCard";
import { Layout } from "../components/Layout";
import { useGamesQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Browse = () => {
  const { data, error, loading, fetchMore, variables } = useGamesQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Layout>
      {!data || !data.games || !data.games.games ? (
        <div>Loading</div>
      ) : (
        <VStack spacing={5}>
          {data.games.games.map((g) => (
            <GameCard game={g} width={"100%"} />
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