import { Flex, Link } from "@chakra-ui/react";
import router from "next/router";
import * as React from "react";
import NextLink from "next/link";

interface MenuLinksProps {
  vertical?: boolean;
}

export const MenuLinks: React.FC<MenuLinksProps> = ({ vertical }) => {
  return (
    <Flex direction={vertical ? "column" : "row"}>
      {vertical && (
        <NextLink href="/">
          <Link
            ml={vertical ? 5 : 0}
            variant="nav"
            fontSize={vertical ? "xl" : "sm"}
            onClick={() => router.push("/")}
          >
            Home
          </Link>
        </NextLink>
      )}

      <NextLink href="/browse">
        <Link
          ml={vertical ? 5 : 0}
          variant="nav"
          fontSize={vertical ? "xl" : "sm"}
          onClick={() => router.push("/browse")}
        >
          Games
        </Link>
      </NextLink>

      <NextLink href="/about">
        <Link
          ml={5}
          variant="nav"
          fontSize={vertical ? "xl" : "sm"}
          onClick={() => router.push("/about")}
        >
          About
        </Link>
      </NextLink>
    </Flex>
  );
};
