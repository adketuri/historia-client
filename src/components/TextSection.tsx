import {
  Text,
  Heading,
  Divider,
  Spacer,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { ChunkyDivider } from "./ChunkyDivider";

interface TextSectionProps {
  heading: string;
  spacer?: boolean;
}

export const TextSection: React.FC<TextSectionProps> = ({
  heading,
  children,
  spacer = true,
}) => {
  return (
    <>
      <Heading as="h1" size="md" mb="10px">
        {heading}
      </Heading>
      <ChunkyDivider mb={4} />
      {children}
      {spacer && <Spacer h={10} />}
    </>
  );
};
