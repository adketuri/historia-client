import {
  Box,
  Flex,
  Link,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { MenuLinks } from "./MenuLinks";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";
import { UserControls } from "./UserControls";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const showHamburger = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
  });
  const router = useRouter();

  // Dark vs Light mode color values
  const { colorMode } = useColorMode();
  const bgColor = { light: "pink.300", dark: "pink.700" };

  return (
    <Box bg={bgColor[colorMode]} zIndex={10} top={0} position="sticky">
      <Box mx={[5, 10, 20]}>
        <Flex mx="auto" py={1} align="center">
          <NextLink href={"/"}>
            <Link variant="nav">rm2k.net</Link>
          </NextLink>

          <SearchBar />

          {!showHamburger ? (
            <>
              <MenuLinks />
              <Box ml={"auto"}>
                <UserControls />
              </Box>
              <ColorModeSwitcher justifySelf="flex-end" />
            </>
          ) : (
            <Box ml="auto">
              <MobileMenu />
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
