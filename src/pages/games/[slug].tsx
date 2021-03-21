import { useRouter } from "next/router";
import * as React from "react";
import { GameDetails } from "../../components/GameDetails";
import { Layout } from "../../components/Layout";
import { useGameQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface ViewGameProps {}

export const ViewGame: React.FC<ViewGameProps> = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : null;
  const { data, loading, error } = useGameQuery({ variables: { slug } });

  let content = undefined;
  if (!data) {
    content = <Layout title="Loading Game">Loading</Layout>;
  } else if (data?.game) {
    content = <GameDetails game={data.game} />;
  } else if (error) {
    content = <Layout title="Error Loading Game">{error.message}</Layout>;
  }
  return <>{content}</>;
};

export default withApollo({ ssr: true })(ViewGame);
