import {
  Box,
  Image,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import NextLink from "next/link";
import { FavoriteButton } from "./FavoriteButton";

interface GameIconProps {
  index: number;
  game: RegularGameFragment;
}

export const GameIcon: React.FC<GameIconProps> = ({ index, game }) => {
  const bgColor = useColorModeValue("blue.100", "blue.800");

  return (
    <Box shadow="md" bg={bgColor}>
      <Box>
        <Image
          objectFit="cover"
          height="300px"
          src={game.thumbnail! || "https://i.imgur.com/PffO0zx.png"}
        />
        <FavoriteButton
          game={game}
          preset="sm"
          position="absolute"
          top={1}
          right={3}
        />
      </Box>
      <Box ml={5} mr="auto">
        <NextLink href={`games/${game.slug}`}>
          <Link variant="title">{game.title || "Untitled"}</Link>
        </NextLink>
        <Text fontSize="sm">{game.author || "Unknown"}</Text>
      </Box>
    </Box>
  );
};
