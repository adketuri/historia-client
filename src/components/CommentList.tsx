import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Link, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { useState } from "react";
import { RegularPostFragment, useMeQuery } from "../generated/graphql";
import { CommentEdit } from "./CommentEdit";
import { CommentEntry } from "./CommentEntry";

interface CommentListProps {
  posts: RegularPostFragment[] | undefined | null;
  gameId?: number;
  username?: string;
}

export const CommentList: React.FC<CommentListProps> = ({
  posts,
  gameId,
  username,
}) => {
  const { data } = useMeQuery();
  const [editing, setEditing] = useState<undefined | number>(undefined);

  return (
    <>
      {posts &&
        posts.map((p) => {
          const date = new Date(parseInt(p.createdAt));
          const linkPrefix = "Posted by ";
          const linkSuffix = " on " + date.toLocaleDateString();
          const displayUsername = username ? username : p.author.username;

          if (editing === p.id)
            return (
              <CommentEdit
                key={p.id}
                post={p}
                onCancel={() => setEditing(undefined)}
              />
            );

          return (
            <Box key={p.id} pb={5}>
              <Flex>
                <Text w={"100%"}>{p.body}</Text>
                {!editing && p.author?.id === data?.me?.id && (
                  <IconButton
                    aria-label="Edit Comment"
                    icon={<EditIcon />}
                    variant="ghost"
                    size="xs"
                    onClick={() => setEditing(p.id)}
                  />
                )}
              </Flex>
              <Flex>
                <Spacer />
                <Text as="i" fontSize="xs">
                  {linkPrefix}
                  <NextLink href={`../users/${displayUsername}`}>
                    <Link variant="comment">{displayUsername}</Link>
                  </NextLink>
                  {linkSuffix}
                </Text>
              </Flex>
            </Box>
          );
        })}
      {data?.me && gameId && <CommentEntry gameId={gameId} />}
    </>
  );
};
