import {
  Text,
  Heading,
  Divider,
  Spacer,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface TextSectionProps {
  heading: string;
}

export const TextSection: React.FC<TextSectionProps> = ({
  heading,
  children,
}) => {
  const color = useColorModeValue("purple.200", "purple.600");

  return (
    <>
      <Heading as="h1" size="md" mb="10px">
        {heading}
      </Heading>
      <Box w={12} h={1} mb={4} bgColor={color} />
      {children}
      <Spacer h={10} />
    </>
  );
};
