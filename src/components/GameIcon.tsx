import {
  AspectRatio,
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
import { FALLBACK_THUMBNAIL } from "../utils/constants";

interface GameIconProps {
  index: number;
  game: RegularGameFragment;
}

export const GameIcon: React.FC<GameIconProps> = ({ index, game }) => {
  const bgColor = useColorModeValue("blue.50", "blue.800");

  return (
    <Box shadow="md" bg={bgColor}>
      <Box>
        <AspectRatio ratio={7 / 6}>
          <Image objectFit="cover" src={game.thumbnail || FALLBACK_THUMBNAIL} />
        </AspectRatio>
        <FavoriteButton
          game={game}
          preset="sm"
          position="absolute"
          top={1}
          right={2}
        />
      </Box>
      <Box ml={[1, 2, 3]} mr="auto">
        <NextLink href={`games/${game.slug}`}>
          <Link variant="title" fontSize={["sm", "md", "lg"]}>
            <Text noOfLines={1}>{game.title || "Untitled"}</Text>
          </Link>
        </NextLink>
        <Text fontSize="xs">{game.author || "Unknown"}</Text>
      </Box>
    </Box>
  );
};
