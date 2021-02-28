import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useFavoriteMutation, useGamesQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

export const GAME_FETCH_LIMIT = 20;

const Index = () => {
  const [variables, setVariables] = useState({
    limit: GAME_FETCH_LIMIT,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useGamesQuery({ variables });
  const [{}, favorite] = useFavoriteMutation();
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
            <Box p={5} shadow="md" borderWidth="1px">
              <Text>{g.favoriteCount}</Text>
              <IconButton
                onClick={() => {
                  favorite({ gameId: g.id });
                }}
                aria-label="Favorite"
                icon={<StarIcon />}
              />
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
          isLoading={fetching}
          onClick={() => {
            if (!data) return;
            setVariables({
              limit: variables.limit,
              cursor: data.games.games[data.games.games.length - 1].createdAt,
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
