import * as React from "react";
import { Game, RegularGameFragment } from "../generated/graphql";
import { Layout } from "./Layout";
import {
  Box,
  Button,
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
            <Heading color="gray.200" as="h2" size="md" mb="25px">
              {game.year}
            </Heading>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
  return (
    <>
      <Layout header={header}>
        <Flex>
          <Box
            zIndex="1"
            flex="1"
            h="200px"
            mt="-100px"
            bgColor="red"
            mx="10px"
          >
            <Image
              src={game.thumbnail || "https://i.imgur.com/PffO0zx.png"}
              objectFit="cover"
              height="100%"
            />
            <Spacer h="20px" />
            <FavoriteButton game={game} preset="lg" />
          </Box>
          <Box flex="3">
            <Text>{game.longDescription}</Text>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};
