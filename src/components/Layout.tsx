import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Footer } from "./Footer";

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
  const bgColor = { light: "white", dark: "black" };
  const color = { light: "blue.800", dark: "blue.50" };

  return (
    <Flex direction="column" color={color[colorMode]} height="100vh">
      <NavBar />
      {header && <Box height="300px">{header}</Box>}
      <Box flex={1} bg={bgColor[colorMode]}>
        <Wrapper variant={variant}>{children}</Wrapper>
      </Box>
      <Footer />
    </Flex>
  );
};
