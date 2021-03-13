import { Box, Button, Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { FooterAbout } from "./FooterAbout";
import { FooterList } from "./FooterList";

interface FooterProps {}

const siteLinks = [
  { text: "Home", url: "/" },
  { text: "Games", url: "/browse" },
  { text: "About", url: "/about" },
  { text: "Terms of Service", url: "#" },
  { text: "Privacy Policy", url: "#" },
];

const externalLinks = [
  { text: "RPGMaker.net", url: "https://rpgmaker.net/" },
  { text: "RPG Maker Historia", url: "https://rpgmakerhistoria.home.blog/" },
  { text: "RPG Maker Archive", url: "https://www.rpgmakerarchive.net/" },
  { text: "Alcuria Games", url: "https://www.alcuria.net/" },
];

export const Footer: React.FC<FooterProps> = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "pink.900", dark: "pink.900" };
  const color = { light: "gray.00", dark: "gray.50" };

  return (
    <Box bg={bgColor[colorMode]} color={color[colorMode]}>
      <Flex mx="auto" maxW={800} py={1} my={5} align="top">
        <Box flex="4" mr={10}>
          <FooterAbout />
        </Box>
        <Box flex="1" minW={110} mr={10}>
          <FooterList header="Site Links" links={siteLinks} />
        </Box>
        <Box flex="1" minW={140}>
          <FooterList header="Our Friends" links={externalLinks} external />
        </Box>
      </Flex>
    </Box>
  );
};
