import { Box, Button, Flex, Link } from "@chakra-ui/react"
import NextLink from 'next/link';
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    // Hooks into our api calls (mutations)
    const[{data, fetching}] = useMeQuery();
    const[{fetching: logoutFetch}, logout] = useLogoutMutation();

    // Construct our top nav
    let body = null;
    if (fetching){
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
        )
    } else {
        // Logged in
        body = (
            <Flex>
                <Box mr={2}>{`Hello, ${data.me.username}!`}</Box>
                <Button onClick={() => logout()} isLoading={logoutFetch} variant='link'>Logout</Button>
            </Flex>
        )
    }

    return(
        <Flex p={4} bg="tomato">
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )

}