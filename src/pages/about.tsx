import { withApollo } from "../utils/withApollo";
import React from "react";
import { Layout } from "../components/Layout";
import { TextSection } from "../components/TextSection";
import { Heading, Link, Spacer, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Layout title="About RPG Maker Game Preservation">
      <TextSection heading="About RM2k.net" spacer={false}>
        RM2k.net is an effort to preserve games made with older RPG Maker game
        engines. Our goal is to archive an extensive database of games built
        with RM2k/3 and provide a space for fans to share their memories with
        those games.
      </TextSection>
      <Text my={4}>
        We believe these are not just games, but vignettes of our former selves.
        Snapshots of time in many cases disappearing without a trace. These are
        tools to learn from and cherish that otherwise would be lost.
      </Text>
      <TextSection heading="FAQ" spacer={false}>
        <Heading size="sm" mt="10px">
          How Can I Contribute?
        </Heading>
        If you'd like to submit games, please{" "}
        <Link variant="footerLink" to="mailto:support@alcuria.net" isExternal>
          email us
        </Link>
        .
        <Heading size="sm" mt="10px">
          How Is This Funded?
        </Heading>
        Everything's paid out-of-pocket. If you'd like to support RM2k.net, we
        are accepting donations.
        <Heading size="sm" mt="10px">
          Who Is Responsible For This?
        </Heading>
        RM2k.net is lovingly built by{" "}
        <Link variant="footerLink" href="https://twitter.com/zexyu" isExternal>
          @zexyu
        </Link>
        .
      </TextSection>
      <Spacer h={6} />
      <Text fontSize="xs" as="i">
        "If there's anything I've learned over these past 10 years, it's that,
        nothing lasts forever - now more than ever, everyone is very easily and
        willing to forget the past, especially when it comes to media on the
        internet. So if you ever feel the urge to back something up, do it -
        because it might be gone tomorrow." -LordBlueRouge
      </Text>
      <Spacer h={6} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(About);
