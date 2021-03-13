import * as React from "react";
import { RegularGameFragment, RegularPostFragment } from "../generated/graphql";
import { TextSection } from "./TextSection";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
interface NewGamesColumnProps {
  data: RegularGameFragment[];
}

export const NewGamesColumn: React.FC<NewGamesColumnProps> = ({ data }) => {
  return (
    <Box mr="auto" minWidth={300}>
      <TextSection heading="Recently-Added Games">
        {data.map((g) => {
          const date = new Date(parseInt(g.createdAt)).toLocaleDateString();
          return (
            <Flex mb={3} key={g.slug}>
              <Image
                src={g.thumbnail || "https://i.imgur.com/PffO0zx.png"}
                w={12}
                h={12}
                mr={3}
              />
              <Box>
                <Text fontSize="sm">
                  <NextLink href={`/games/${g.slug}`}>
                    <Link>{g.title}</Link>
                  </NextLink>
                </Text>
                <Text fontSize="sm">{date}</Text>
              </Box>
            </Flex>
          );
        })}
      </TextSection>
    </Box>
  );
};
