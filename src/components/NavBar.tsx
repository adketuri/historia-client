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
  const bgColor = { light: "pink.700", dark: "pink.400" };
  const textColor = { dark: "gray.900", light: "gray.100" };

  // Construct our top nav
  let body = null;
  if (loading) {
    // Loading state
  } else if (!data?.me) {
    // Not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
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
      <Flex mx="auto" maxW={800} px={5} py={1} align="center">
        <Button variant="nav" size="xs" onClick={() => router.push("/")}>
          rm2k.net
        </Button>

        <SearchBar />

        <NextLink href="/browse">
          <Button
            variant="nav"
            size="xs"
            onClick={() => router.push("/browse")}
          >
            Games
          </Button>
        </NextLink>
        <Button variant="nav" size="xs" onClick={() => router.push("/about")}>
          About
        </Button>
        <Box ml={"auto"}>{body}</Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
};
