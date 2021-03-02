import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

interface LayoutProps {
  variant?: WrapperVariant;
  header?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  variant,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };

  return (
    <Box bg={bgColor[colorMode]} minH="100vh" color={color[colorMode]}>
      <NavBar />
      {header}
      <Wrapper variant={variant}>{children}</Wrapper>
    </Box>
  );
};
