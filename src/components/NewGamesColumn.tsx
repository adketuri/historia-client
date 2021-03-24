import * as React from "react";
import { RegularGameFragment, RegularPostFragment } from "../generated/graphql";
import { TextSection } from "./TextSection";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FALLBACK_THUMBNAIL } from "../utils/constants";
interface NewGamesColumnProps {
  data: RegularGameFragment[];
}

export const NewGamesColumn: React.FC<NewGamesColumnProps> = ({ data }) => {
  return (
    <Box mr="auto" flex={1}>
      <TextSection heading="Recently-Added Games">
        {data.map((g) => {
          const date = new Date(parseInt(g.createdAt)).toLocaleDateString();
          return (
            <Flex mb={3} key={g.slug}>
              <Image
                src={g.thumbnail || FALLBACK_THUMBNAIL}
                w={12}
                h={12}
                mr={3}
              />
              <Box mr={5}>
                <Text fontSize="sm" noOfLines={1}>
                  <NextLink href={`/games/${g.slug}`}>
                    <Link variant="comment">{g.title}</Link>
                  </NextLink>
                </Text>
                <Text noOfLines={1} fontSize="xs">
                  {g.author || "Unknown"}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </TextSection>
    </Box>
  );
};
