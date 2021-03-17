import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const ChunkyDivider: React.FC<BoxProps> = ({ ...props }) => {
  const color = useColorModeValue("purple.200", "purple.400");
  return <Box w={12} h={1} bgColor={color} {...props} />;
};
