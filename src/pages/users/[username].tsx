import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { TextSection } from "../../components/TextSection";
import { useUserQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { GameCard } from "../../components/GameCard";
import { CommentList } from "../../components/CommentList";
import { EditIcon } from "@chakra-ui/icons";
import { UserProfile } from "../../components/UserProfile";

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

  console.log("!AK ", data);

  return (
    <Layout>
      {loading || !data?.user?.username ? (
        <UserLoading />
      ) : (
        <>
          <Box>
            <TextSection heading={data?.user?.username}>
              <UserProfile user={data.user} />
            </TextSection>
          </Box>
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
