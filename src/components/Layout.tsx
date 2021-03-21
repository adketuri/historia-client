import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Footer } from "./Footer";
import Head from "next/head";

interface LayoutProps {
  title: string;
  variant?: WrapperVariant;
  header?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  header,
  variant,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "black" };
  const color = { light: "blue.800", dark: "blue.50" };

  return (
    <>
      <Head>
        <link rel="Favicon" href="/favicon.ico" />
        <title>{`${title} : rm2k.net`}</title>
      </Head>
      <Flex direction="column" color={color[colorMode]} minHeight="100vh">
        <NavBar />
        {header && <Box height="300px">{header}</Box>}
        <Box flex={1} bg={bgColor[colorMode]}>
          <Wrapper variant={variant}>{children}</Wrapper>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};
