import {
  Box,
  color,
  Flex,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { FavoriteButton } from "./FavoriteButton";

interface GameCardProps {
  game: RegularGameFragment;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.800" };

  return (
    <Box shadow="sm" key={game.id} width="100%">
      <Flex bgColor={bgColor[colorMode]}>
        <Box>
          <Image
            src={game.thumbnail || "https://i.imgur.com/PffO0zx.png"}
            objectFit="cover"
            width="140px"
          />
        </Box>
        <Box ml={5} mr="auto">
          <NextLink href={`games/${game.slug}`}>
            <Link variant="title">{game.title || "Untitled"}</Link>
          </NextLink>
          <Text>{game.author || "Unknown"}</Text>
          <Text mt={4}>{game.shortDescription}</Text>
        </Box>
        <FavoriteButton game={game} preset="sm" />
      </Flex>
    </Box>
  );
};
