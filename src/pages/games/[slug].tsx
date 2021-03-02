import { useRouter } from "next/router";
import * as React from "react";
import { GameDetails } from "../../components/GameDetails";
import { useGameQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface ViewGameProps {}

export const ViewGame: React.FC<ViewGameProps> = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : null;
  const { data, loading, error } = useGameQuery({ variables: { slug } });

  let content = undefined;
  if (!data) {
    content = "Loading";
  } else if (data?.game) {
    content = <GameDetails game={data.game} />;
  } else if (error) {
    content = error.message;
  }
  return <>{content}</>;
};

export default withApollo({ ssr: true })(ViewGame);
