import { Box, Text, Heading } from "@chakra-ui/react";
import * as React from "react";

interface FormHeaderProps {
  title: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, children }) => {
  return (
    <Box align="center">
      <Heading>{title}</Heading>
      <Text mt={5} mb={10}>
        {children}
      </Text>
    </Box>
  );
};
