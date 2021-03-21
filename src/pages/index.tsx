import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { NewCommentsColumn } from "../components/NewCommentsColumn";
import { NewGamesColumn } from "../components/NewGamesColumn";
import { NewScreenshots } from "../components/NewScreenshots";
import { PromotedGames } from "../components/PromotedGames";
import { useFavoriteMutation, useHomepageQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading } = useHomepageQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [favorite] = useFavoriteMutation();
  return (
    <Layout title="Discover Rare and Obscure RPG Maker Games">
      {!data || !data.homepage ? (
        <Box>Loading</Box>
      ) : (
        <>
          <PromotedGames games={data.homepage.promotedGames} />
          <NewScreenshots screenshots={data.homepage.newScreenshots} />
          <Flex direction={["column", "row"]}>
            <NewGamesColumn data={data.homepage.newGames} />
            <NewCommentsColumn data={data.homepage.newPosts} />
          </Flex>
        </>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
