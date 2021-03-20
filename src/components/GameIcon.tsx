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
  const bgColor = useColorModeValue("blue.50", "blue.800");

  return (
    <Box shadow="md" bg={bgColor}>
      <Box>
        <Image
          objectFit="cover"
          width="100%"
          src={game.thumbnail! || "https://i.imgur.com/PffO0zx.png"}
        />
        <FavoriteButton
          game={game}
          preset="sm"
          position="absolute"
          top={1}
          right={5}
        />
      </Box>
      <Box ml={[1, 3, 5]} mr="auto">
        <NextLink href={`games/${game.slug}`}>
          <Link variant="title" fontSize={["sm", "md", "lg"]}>
            <Text noOfLines={1}>{game.title || "Untitled"}</Text>
          </Link>
        </NextLink>
        <Text fontSize="sm">{game.author || "Unknown"}</Text>
      </Box>
    </Box>
  );
};
