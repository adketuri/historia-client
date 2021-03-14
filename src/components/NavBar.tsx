import { useApolloClient } from "@apollo/client";
import { Box, Button, Flex, Link, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SearchBar } from "./SearchBar";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();

  // Hooks into our api calls (mutations)
  const { data, loading } = useMeQuery({ skip: isServer() });
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetch }] = useLogoutMutation();

  // Dark vs Light mode color values
  const { colorMode } = useColorMode();
  const bgColor = { light: "pink.300", dark: "pink.700" };

  // Construct our top nav
  let body = null;
  if (loading) {
    // Loading state
  } else if (!data?.me) {
    // Not logged in
    body = (
      <>
        <Button
          mr={2}
          onClick={() => router.push("/login")}
          size="xs"
          variant="nav"
        >
          Login
        </Button>
        <Button
          onClick={() => router.push("/register")}
          size="xs"
          variant="nav"
        >
          Register
        </Button>
      </>
    );
  } else {
    // Logged in
    body = (
      <Flex align="center">
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetch}
          size="xs"
          variant="nav"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Box bg={bgColor[colorMode]}>
      <Flex mx="auto" maxW={800} py={1} align="center">
        <NextLink href={"/"}>
          <Link variant="nav">rm2k.net</Link>
        </NextLink>

        <SearchBar />

        <NextLink href="/browse">
          <Link variant="nav" onClick={() => router.push("/browse")}>
            Games
          </Link>
        </NextLink>

        <NextLink href="/about">
          <Link ml={5} variant="nav" onClick={() => router.push("/about")}>
            About
          </Link>
        </NextLink>

        <Box ml={"auto"}>{body}</Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
};
