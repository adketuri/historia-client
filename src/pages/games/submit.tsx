import React from "react";
import { GameForm } from "../../components/GameForm";
import { Layout } from "../../components/Layout";
import { useIsSubmitter } from "../../hooks/useIsSubmitter";
import { withApollo } from "../../utils/withApollo";

interface SubmitGameProps {}

const SubmitGame: React.FC<{}> = ({}) => {
  useIsSubmitter();
  return (
    <Layout>
      <GameForm editing={false} />
    </Layout>
  );
};

export default withApollo({ ssr: false })(SubmitGame);
