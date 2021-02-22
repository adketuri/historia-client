import { Box, Button, Flex, Link } from "@chakra-ui/react"
import NextLink from 'next/link';
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const[{data, fetching}] = useMeQuery()

    let body = null;

    if (fetching){
        // Loading
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
                <Button variant='link'>Logout</Button>
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