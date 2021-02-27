import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { title } from "process";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useGamesQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 20,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useGamesQuery({
    variables,
  });
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
              <Heading fontSize="xl">{g.title}</Heading>
              <Text mt={4}>{g.shortDescription}</Text>
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
