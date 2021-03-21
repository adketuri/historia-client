import { EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { RegularGameFragment, useMeQuery } from "../generated/graphql";
import { FALLBACK_BANNER, FALLBACK_THUMBNAIL } from "../utils/constants";
import { CommentList } from "./CommentList";
import { DownloadList } from "./DownloadList";
import { FavoriteButton } from "./FavoriteButton";
import { Layout } from "./Layout";
import { ScreenshotList } from "./ScreenshotList";
import { TextChunk } from "./TextChunk";
import { TextSection } from "./TextSection";

interface GameDetailsProps {
  game: RegularGameFragment;
}

const GameThumbnail: React.FC<GameDetailsProps> = ({ game }) => {
  const height = useBreakpointValue({ base: "150px", sm: "200px" });
  return (
    <Box zIndex="1" flex="1" h={height} mt="-100px" mx="20px">
      <Image
        src={game.thumbnail || ""}
        fallbackSrc={FALLBACK_THUMBNAIL}
        objectFit="cover"
        height="100%"
        width="100%"
        mb="20px"
      />
      <FavoriteButton game={game} preset="lg" />
    </Box>
  );
};

export const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  const { data } = useMeQuery();
  const router = useRouter();

  const canEdit = data?.me?.isAdmin || data?.me?.id === game.submitter.id;

  const vertical = useBreakpointValue({ base: true, sm: false });
  const header = (
    <Box
      height="300px"
      flex={1}
      overflow="hidden"
      sx={{ transform: "translate3d(0, 0, 0)" }}
    >
      <Image
        src={game.banner || ""}
        fallbackSrc={FALLBACK_BANNER}
        w="100%"
        objectFit="cover"
        h="300px"
        sx={{ transform: "scale(1.3)", filter: "blur(16px)" }}
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
      <Layout header={header} title={`${game.title}, Classic RPG Maker Game`}>
        <Flex>
          {!vertical && <GameThumbnail game={game} />}
          <Box flex="3">
            <Box position="absolute" top="200px" width="100%">
              <Flex>
                <Box>
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
                {vertical && (
                  <Box w="200px" right={5} top={-7} position="absolute">
                    <GameThumbnail game={game} />
                  </Box>
                )}
              </Flex>
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
