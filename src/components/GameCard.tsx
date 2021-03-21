import {
  Box,
  color,
  Flex,
  Image,
  Link,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { FALLBACK_THUMBNAIL } from "../utils/constants";
import { FavoriteButton } from "./FavoriteButton";

interface GameCardProps {
  game: RegularGameFragment;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "blue.50", dark: "blue.800" };

  return (
    <Box shadow="sm" key={game.id} width="100%">
      <Flex bgColor={bgColor[colorMode]}>
        <Image
          src={game.thumbnail || ""}
          objectFit="cover"
          fallbackSrc={FALLBACK_THUMBNAIL}
          height="100%"
        />
        <Box ml={5} mt={3} width="100%">
          <NextLink href={`/games/${game.slug}`}>
            <Link variant="title">{game.title || "Untitled"}</Link>
          </NextLink>
          <Text>{game.author || "Unknown"}</Text>
          <Text mt={3} noOfLines={3}>
            {game.shortDescription || ""}
          </Text>
        </Box>
        <FavoriteButton game={game} preset="sm" />
      </Flex>
    </Box>
  );
};
