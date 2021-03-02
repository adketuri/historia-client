import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      w="100%"
      h="100%"
      maxW={variant === "regular" ? "800px" : "400px"}
    >
      {children}
    </Box>
  );
};
