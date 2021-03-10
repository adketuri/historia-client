import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { TextSection } from "../../components/TextSection";
import { useUserQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { Text } from "@chakra-ui/react";
import { GameCard } from "../../components/GameCard";
import { CommentList } from "../../components/CommentList";

const UserLoading = () => {
  return <Text>Loading...</Text>;
};

const UserPage = () => {
  const router = useRouter();
  const username =
    typeof router.query.username === "string" ? router.query.username : "";
  const { data, loading, error } = useUserQuery({
    variables: { username },
  });

  console.log(loading);

  return (
    <Layout>
      {loading || !data?.user?.username ? (
        <UserLoading />
      ) : (
        <>
          <TextSection heading={data?.user?.username}>
            {data?.user?.profile || "No Profile"}
          </TextSection>
          {data?.user?.favorites && (
            <TextSection heading="Favorite Games">
              {data.user.favorites.map((g) => (
                <GameCard game={g} />
              ))}
            </TextSection>
          )}
          {data?.user?.submissions && (
            <TextSection heading="Submissions">
              {data.user.submissions.map((g) => (
                <GameCard game={g} />
              ))}
            </TextSection>
          )}
          {data?.user?.posts && (
            <TextSection heading="Comments">
              <CommentList
                posts={data.user.posts}
                username={data?.user?.username}
              />
            </TextSection>
          )}
        </>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(UserPage);
