import { Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { useGamesQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
const Index = () => {
  const [{ data }] = useGamesQuery({
    variables: {
      limit: 5,
    },
  });
  return (
    <Layout>
      <NextLink href="/games/submit">
        <Link mr={2}>Submit Game</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>Loading</div>
      ) : (
        data.games.map((g) => <div key={g.id}>{g.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
