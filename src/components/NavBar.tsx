import {
  Box,
  Button,
  color,
  Flex,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  // Hooks into our api calls (mutations)
  const { data, loading } = useMeQuery({ skip: isServer() });
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetch }] = useLogoutMutation();

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
      <Flex>
        <Box mr={2}>{`Hello, ${data.me.username}!`}</Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetch}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  const { colorMode } = useColorMode();
  const bgColor = { light: "red.500", dark: "red.800" };

  return (
    <Flex p={4} bg={bgColor[colorMode]}>
      <Box ml={"auto"}>{body}</Box>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};
