import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GameCard } from "../components/GameCard";
import { Layout } from "../components/Layout";
import { TextSection } from "../components/TextSection";
import { useFindGamesQuery, useGamesQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const SearchResults = () => {
  const router = useRouter();
  const search =
    typeof router.query.search === "string" ? router.query.search : "";

  const { data, error, loading, fetchMore, variables } = useFindGamesQuery({
    variables: { search },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Layout title="Search For Rare and Obscure RPG Maker Games">
      <TextSection heading="Search" />
      {!data || !data.findGames ? (
        <Text>Loading</Text>
      ) : (
        <>
          {!data.findGames.length && (
            <Box w="100%" align="center">
              <Text>No Results. Try Another term instead?</Text>
            </Box>
          )}
          <VStack spacing={5}>
            {data.findGames.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </VStack>
        </>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(SearchResults);
