import * as React from "react";
import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterListProps {
  header: string;
  links: FooterLink[];
  external?: boolean;
}

export const FooterList: React.FC<FooterListProps> = ({
  header,
  links,
  external,
}) => {
  return (
    <>
      <Text variant="footerHeading" mb={2}>
        {header}
      </Text>
      {links.map((link, i) => (
        <Text variant="footerContent" key={i + link.url}>
          <NextLink href={link.url}>
            <Link variant="footerLink" isExternal={external}>
              {link.text}
            </Link>
          </NextLink>
        </Text>
      ))}
    </>
  );
};
