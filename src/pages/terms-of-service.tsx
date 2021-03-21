import { Link, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";
import { Layout } from "../components/Layout";
import { TextSection } from "../components/TextSection";
import { withApollo } from "../utils/withApollo";

const TermsPage: React.FC = () => {
  return (
    <Layout title="Terms of Service">
      <TextSection heading="Terms of Service">
        RM2k.net was created to share, discuss, and surface rare and obscure RPG
        Maker games. Please note the following features and usage terms. Failure
        to comply may result in loss of access to website features.
      </TextSection>
      <TextSection heading="Downloading Games">
        By supplying a valid email address you may register an account to
        download games. Please download at your own risk. Files are not scanned
        for viruses.
      </TextSection>
      <TextSection heading="Contributing Content">
        By default, only verified contributors are unable to add screenshots and
        downloads. This is purely a safety measure. If you're interested in
        contributing to RM2k.net please{" "}
        <Link variant="comment" href="mailto:support@alcuria.net">
          email us
        </Link>{" "}
        and say hello.
      </TextSection>
      <Text as="i" fontSize="xs">
        Last Updated March 21, 2021
      </Text>
      <Spacer h={5} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(TermsPage);
