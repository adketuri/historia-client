import { Box, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { TextSection } from "./TextSection";
import NextLink from "next/link";
interface NewCommentsColumnProps {
  data: Array<{ body: string; game: RegularGameFragment }>;
}

export const NewCommentsColumn: React.FC<NewCommentsColumnProps> = ({
  data,
}) => {
  return (
    <Box mr="auto" flex={1}>
      <TextSection heading="Latest Comments">
        {data.map((p, i) => (
          <Box mb={3} key={i + p.body}>
            <Text fontSize="sm" noOfLines={1}>
              {p.body}
            </Text>
            <Text fontSize="sm">
              on{" "}
              <NextLink href={`/games/${p.game.slug}`}>
                <Link>{p.game.title}</Link>
              </NextLink>
            </Text>
          </Box>
        ))}
      </TextSection>
    </Box>
  );
};
