import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  RegularGameFragmentDoc,
  RegularPostFragment,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import { CommentEdit } from "./CommentEdit";
import { CommentEntry } from "./CommentEntry";
import { TextChunk } from "./TextChunk";

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

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const color = useColorModeValue("black", "white");

  const [deletePost] = useDeletePostMutation();
  const [deletingId, setDeletingId] = useState(-1);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={color}>
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody color={color}>
              Are you sure you want to delete this comment?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                ref={cancelRef.current}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await deletePost({
                    variables: {
                      id: deletingId,
                    },
                    update: (cache, { data: { deletePost } }) => {
                      console.log(cache);
                      const data: any = cache.readFragment({
                        id: `Game:${gameId}`,
                        fragmentName: "RegularGame",
                        fragment: RegularGameFragmentDoc,
                      });
                      const newData = { ...data };
                      newData.posts = data.posts.filter(
                        (p: RegularPostFragment) => p.id !== deletingId
                      );
                      cache.writeFragment({
                        id: `Game:${gameId}`,
                        fragmentName: "RegularGame",
                        fragment: RegularGameFragmentDoc,
                        data: newData,
                      });
                    },
                  });
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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
                <TextChunk text={p.body} />
                {!editing && p.author?.id === data?.me?.id && (
                  <IconButton
                    aria-label="Edit Comment"
                    icon={<EditIcon />}
                    variant="ghost"
                    size="xs"
                    onClick={() => setEditing(p.id)}
                  />
                )}
                {(data?.me?.isAdmin || p.author?.id === data?.me?.id) && (
                  <IconButton
                    aria-label="Delete Comment"
                    icon={<DeleteIcon />}
                    variant="ghost"
                    size="xs"
                    ml={1}
                    onClick={() => {
                      setDeletingId(p.id);
                      setIsOpen(true);
                    }}
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
      {!data?.me?.isBanned && data?.me?.isVerified && gameId && (
        <CommentEntry gameId={gameId} />
      )}
    </>
  );
};
