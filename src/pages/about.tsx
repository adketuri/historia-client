import { withApollo } from "../utils/withApollo";
import React from "react";
import { Layout } from "../components/Layout";
import { TextSection } from "../components/TextSection";
import { Heading, Link } from "@chakra-ui/react";

const About = () => {
  return (
    <Layout>
      <TextSection heading="About RM2k.net">
        RM2k.net is an effort to preserve games made with older RPG Maker game
        engines. Our goal is to archive an extensive database of games built
        with RM2k/3 and provide a space for fans to share their memories with
        those games.
      </TextSection>

      <TextSection heading="FAQ">
        <Heading size="sm" mt="10px">
          How Can I Contribute?
        </Heading>
        If you'd like to submit games, please{" "}
        <Link to="mailto:support@alcuria.net" isExternal>
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
        <Link href="https://twitter.com/zexyu" isExternal>
          @zexyu
        </Link>
        . Everything is{" "}
        <Link href="https://github.com/adketuri/historia-client" isExternal>
          open-source
        </Link>
        . (PR's welcome!)
      </TextSection>
    </Layout>
  );
};

export default withApollo({ ssr: true })(About);
