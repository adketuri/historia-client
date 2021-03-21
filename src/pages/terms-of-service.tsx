import * as React from "react";
import { Layout } from "../components/Layout";
import { TextSection } from "../components/TextSection";
import { withApollo } from "../utils/withApollo";

const TermsPage: React.FC = () => {
  return (
    <Layout title="Terms of Service">
      <TextSection heading="Terms of Service">
        RM2k.net was created to share, discuss, and surface rare and obscure RPG
        Maker games.
      </TextSection>
    </Layout>
  );
};

export default withApollo({ ssr: true })(TermsPage);
