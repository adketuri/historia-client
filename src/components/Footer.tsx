import { Box, Button, Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { FooterAbout } from "./FooterAbout";
import { FooterList } from "./FooterList";

interface FooterProps {}

const siteLinks = [
  { text: "Home", url: "/" },
  { text: "Games", url: "/browse" },
  { text: "About", url: "/about" },
  { text: "Terms of Service", url: "/terms-of-service" },
  { text: "Privacy Policy", url: "/privacy-policy" },
];

const externalLinks = [
  { text: "RPGMaker.net", url: "https://rpgmaker.net/" },
  { text: "RPG Maker Historia", url: "https://rpgmakerhistoria.home.blog/" },
  { text: "RPG Maker Archive", url: "https://www.rpgmakerarchive.net/" },
  { text: "Alcuria Games", url: "https://discord.com/invite/jC3D2sU" },
];

export const Footer: React.FC<FooterProps> = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "yellow.300", dark: "yellow.800" };

  return (
    <Box bg={bgColor[colorMode]}>
      <Box mx={[5, 10, 20]}>
        <Flex mx="auto" direction={["column", "row"]} py={1} my={5} align="top">
          <Box flex="4" mr={10} mb={5}>
            <FooterAbout />
          </Box>
          <Box flex="1" minW={110} mr={10} mb={5}>
            <FooterList header="Site Links" links={siteLinks} />
          </Box>
          <Box flex="1" minW={140}>
            <FooterList header="Our Friends" links={externalLinks} external />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
