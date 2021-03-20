import * as React from "react";
import { TextSection } from "../components/TextSection";
import { withApollo } from "../utils/withApollo";

const TermsPage: React.FC = () => {
  return (
    <TextSection heading="Terms of Service">
      RM2k.net was created to share, discuss, and surface rare and obscure RPG
      Maker games.
    </TextSection>
  );
};

export default withApollo({ ssr: true })(TermsPage);
