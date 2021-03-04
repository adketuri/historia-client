import { Text, Heading, Divider, Spacer } from "@chakra-ui/react";
import React from "react";

interface TextSectionProps {
  heading: string;
}

export const TextSection: React.FC<TextSectionProps> = ({
  heading,
  children,
}) => {
  return (
    <>
      <Heading as="h1" size="md" mb="10px">
        {heading}
      </Heading>
      <Divider w="40px" mb="10px" />
      {children}
      <Spacer h={10} />
    </>
  );
};
