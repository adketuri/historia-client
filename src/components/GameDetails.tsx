import { EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { RegularGameFragment, useMeQuery } from "../generated/graphql";
import { CommentList } from "./CommentList";
import { DownloadList } from "./DownloadList";
import { FavoriteButton } from "./FavoriteButton";
import { Layout } from "./Layout";
import { ScreenshotList } from "./ScreenshotList";
import { TextSection } from "./TextSection";
import NextLink from "next/link";
import { TextChunk } from "./TextChunk";

interface GameDetailsProps {
  game: RegularGameFragment;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  const { data } = useMeQuery();
  const router = useRouter();

  const canEdit = data?.me?.isAdmin || data?.me?.id === game.submitter.id;
  const header = (
    <Box
      height="300px"
      flex={1}
      overflow="hidden"
      sx={{ transform: "translate3d(0, 0, 0)" }}
    >
      <Image
        src={game.banner || "https://i.imgur.com/PffO0zx.png"}
        w="100%"
        objectFit="cover"
        h="300px"
        sx={{ filter: "blur(16px)" }}
      />
      <Box
        position="absolute"
        bottom="0"
        height="100%"
        width="100%"
        bgGradient="linear(to-b, #ffffff44, #00000088)"
      />
    </Box>
  );

  return (
    <>
      <Layout header={header}>
        <Flex>
          <Box zIndex="1" flex="1" h="200px" mt="-100px" mx="20px">
            <Image
              src={game.thumbnail || "https://i.imgur.com/PffO0zx.png"}
              objectFit="cover"
              height="100%"
              mb="20px"
            />
            <FavoriteButton game={game} preset="lg" />
          </Box>
          <Box flex="3">
            <Box position="absolute" top="200px">
              <Heading color="blue.50" as="h1" size="lg" mb="5px">
                {game.title}
                {canEdit && (
                  <IconButton
                    ml={1}
                    size="sm"
                    variant="ghost"
                    color="blue.50"
                    aria-label="Edit Game"
                    onClick={() => router.push(`/games/edit/${game.slug}`)}
                    icon={<EditIcon />}
                  />
                )}
              </Heading>
              <Heading color="blue.100" as="h2" size="md" mb="5px">
                {game.author || "Unknown Author"}
              </Heading>
              <Heading color="blue.100" as="h2" size="md" mb="15px">
                {game.year || "2000"}
              </Heading>
              {game?.tags?.split(",").map(
                (tag) =>
                  tag.length > 0 && (
                    <Badge key={tag} mb="15px" mr="5px">
                      {tag}
                    </Badge>
                  )
              )}
            </Box>
            <TextSection heading="About">
              <TextChunk text={game.longDescription || "No description"} />
            </TextSection>
            <TextSection heading="Screenshots">
              <ScreenshotList game={game} />
            </TextSection>
            {data?.me?.isVerified && !data.me.isBanned && (
              <TextSection heading="Downloads">
                <DownloadList game={game} />
              </TextSection>
            )}
            <TextSection heading="Comments" spacer={false}>
              <CommentList posts={game.posts} gameId={game.id} />
            </TextSection>
            <Flex ml="auto" mr={0}>
              <Text my="20px" mr={0} ml={"auto"} fontSize="xs">
                Submitted by{" "}
                <NextLink href={`../users/${game.submitter.username}`}>
                  <Link variant="comment">{game.submitter.username}</Link>
                </NextLink>
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};
