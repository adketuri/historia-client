import { Link, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";
import { Layout } from "../components/Layout";
import { TextSection } from "../components/TextSection";
import { withApollo } from "../utils/withApollo";

const PrivacyPage: React.FC = () => {
  return (
    <Layout title="Privacy Policy">
      <TextSection heading="Privacy Policy" spacer={false}>
        RM2k.net requires a valid email address to access additional site
        features. Your email address is kept private and only used for verifying
        your account and resetting your password (if required). It is not used
        for marketing or newsletters.
        <br />
        <br />
        This site uses cookies to track whether or not you're logged in. Your
        data is kept private. Stay tuned for more details.
        <br />
        <br />
        Please{" "}
        <Link variant="comment" href="mailto:support@alcuria.net">
          email us
        </Link>{" "}
        if you have any questions.
      </TextSection>
      <Spacer h={10} />
      <Text as="i" fontSize="xs">
        Last Updated March 21, 2021
      </Text>
      <Spacer h={5} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(PrivacyPage);
