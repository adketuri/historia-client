import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GameForm } from "../../../components/GameForm";
import { Layout } from "../../../components/Layout";
import {
  useCreateGameMutation,
  useGameQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { withApollo } from "../../../utils/withApollo";

const EditGame: React.FC<{}> = () => {
  const submitterId = useIsAuth();

  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : null;
  const { data, loading, error } = useGameQuery({ variables: { slug } });

  return (
    <Layout title={data?.game ? `Editing ${data.game.title}` : "Editing"}>
      {!data?.game ? (
        <Box>Loading</Box>
      ) : (
        <GameForm editing={true} game={data?.game} />
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditGame);
