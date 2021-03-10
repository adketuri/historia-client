import * as React from "react";
import { Button, Link, Text } from "@chakra-ui/react";

interface FooterAboutProps {}

export const FooterAbout: React.SFC<FooterAboutProps> = (props) => {
  return (
    <>
      <Text variant="footerHeading" mb={2}>
        About RM2k.net
      </Text>
      <Text variant="footerContent" mb={4}>
        RM2k.net is a database of classic RPG Maker games. The main goal of this
        site is the discovery, preservation, and discussion of amateur games
        otherwise lost in the turn of the millennium.
      </Text>
      <Button size="sm">
        <Link
          variant="footerLink"
          href="https://ko-fi.com/E1E33Q8T1"
          isExternal
        >
          Support Us
        </Link>
      </Button>
    </>
  );
};
