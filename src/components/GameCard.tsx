import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { FavoriteButton } from "./FavoriteButton";

interface GameCardProps {
  game: RegularGameFragment;
}

export const GameCard: React.SFC<GameCardProps> = ({ game, ...props }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" key={game.id} {...props}>
      <Flex>
        <Box>
          <Image
            src={game.thumbnail || "https://i.imgur.com/PffO0zx.png"}
            objectFit="cover"
            mb="20px"
            width="140px"
          />
          <FavoriteButton game={game} preset="lg" />
        </Box>
        <Box ml={5}>
          <NextLink href={`games/${game.slug}`}>
            <Link variant="title">{game.title || "Untitled"}</Link>
          </NextLink>
          <Text>{game.author || "Unknown"}</Text>
          <Text mt={4}>{game.shortDescription}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
