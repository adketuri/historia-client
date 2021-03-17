import { useApolloClient } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/react";
import router from "next/router";
import * as React from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface UserControlsProps {
  vertical?: boolean;
}

export const UserControls: React.FC<UserControlsProps> = ({ vertical }) => {
  // Hooks into our api calls (mutations)
  const { data, loading } = useMeQuery({ skip: isServer() });
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetch }] = useLogoutMutation();

  // Construct our top nav
  let body = null;
  if (!data?.me) {
    // Not logged in
    body = (
      <Flex direction={vertical ? "column" : "row"}>
        <Button
          mr={2}
          onClick={() => router.push("/login")}
          size={vertical ? "xl" : "xs"}
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
      </Flex>
    );
  } else {
    // Logged in
    body = (
      <Flex align="center" direction={vertical ? "column" : "row"}>
        <Button
          mr={vertical ? -8 : 2}
          onClick={() => router.push(`/users/${data.me?.username}`)}
          size="xs"
          variant="nav"
        >
          Profile
        </Button>
        <Button
          mr={vertical ? -8 : 0}
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

  return body;
};
