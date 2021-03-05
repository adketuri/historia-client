import * as React from "react";
import {
  Maybe,
  Post,
  RegularGameFragment,
  RegularPostFragment,
  useMeQuery,
} from "../generated/graphql";
import { Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";
import { useIsAuth } from "../hooks/useIsAuth";
import { CommentEntry } from "./CommentEntry";

interface CommentListProps {
  posts: RegularPostFragment[] | undefined | null;
  gameId?: number;
}

export const CommentList: React.FC<CommentListProps> = ({ posts, gameId }) => {
  const { data } = useMeQuery();

  return (
    <>
      {(!posts || posts.length == 0) && <Text>No Comments Yet!</Text>}
      {posts &&
        posts.map((p) => {
          const date = new Date(parseInt(p.createdAt));
          return (
            <Box key={p.id}>
              <Text>{p.body}</Text>
              <Flex>
                <Spacer />
                <Text justifyContent="flex-end" as="i" fontSize="xs">
                  Posted by {p.author.username} on {date.toLocaleDateString()}
                </Text>
              </Flex>
            </Box>
          );
        })}
      {data?.me && gameId && <CommentEntry gameId={gameId} />}
    </>
  );
};
