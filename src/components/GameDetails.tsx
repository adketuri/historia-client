import * as React from "react";
import { Game, RegularGameFragment } from "../generated/graphql";
import { Layout } from "./Layout";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FavoriteButton } from "./FavoriteButton";

interface GameDetailsProps {
  game: RegularGameFragment;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  const header = (
    <Box overflow="hidden" sx={{ transform: "translate3d(0, 0, 0)" }}>
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
        height="50%"
        width="100%"
        bgGradient="linear(to-b, transparent, black)"
        opacity="0.6"
      />
      <Box w="100%" position="absolute" bottom="0px">
        <Flex mx="auto" maxW="800px">
          <Spacer flex="1" />
          <Box flex="3" ml="20px">
            <Heading color="gray.100" as="h1" size="lg" mb="5px">
              {game.title}
            </Heading>
            <Heading color="gray.200" as="h2" size="md" mb="5px">
              {game.author}
            </Heading>
            <Heading color="gray.200" as="h2" size="md" mb="15px">
              {game.year}
            </Heading>
            <Badge mb="15px" mr="5px">
              Fantasy
            </Badge>
            <Badge mb="15px" mr="5px">
              Adventure
            </Badge>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
  return (
    <>
      <Layout header={header}>
        <Flex>
          <Box zIndex="1" flex="1" h="200px" mt="-100px" mx="10px">
            <Image
              src={game.thumbnail || "https://i.imgur.com/PffO0zx.png"}
              objectFit="cover"
              height="100%"
            />
            <Text my="20px" fontSize="xs">
              {game.shortDescription}
            </Text>
            <FavoriteButton game={game} preset="lg" />
          </Box>
          <Box flex="3">
            <Heading as="h1" size="md" mb="10px">
              About
            </Heading>
            <Divider w="40px" mb="10px" />
            <Text>{game.longDescription}</Text>
            <Heading as="h1" size="md" my="10px">
              Screenshots
            </Heading>
            <Divider w="40px" mb="10px" />
            <Text mt="20px">{`Submitted by ${game.submitter.username}`}</Text>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};
