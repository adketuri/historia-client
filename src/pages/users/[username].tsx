import { Badge, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { CommentList } from "../../components/CommentList";
import { GameCard } from "../../components/GameCard";
import { Layout } from "../../components/Layout";
import { UserProfile } from "../../components/profile/UserProfile";
import { TextSection } from "../../components/TextSection";
import { useMeQuery, useUserQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

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
  const meQuery = useMeQuery();

  return (
    <Layout
      title={
        data?.user?.username ? `${data.user.username}'s Profile` : "Profile"
      }
    >
      {loading || !data?.user?.username ? (
        <UserLoading />
      ) : (
        <>
          <Box>
            <Flex>
              {data.user.isAdmin && (
                <Badge mb={2} mr={2}>
                  admin
                </Badge>
              )}
              {data.user.isSubmitter && (
                <Badge mb={2} mr={2}>
                  contributor
                </Badge>
              )}
            </Flex>
            <TextSection heading={data?.user?.username}>
              <UserProfile user={data.user} />
            </TextSection>
          </Box>
          {data?.user?.favorites && (
            <TextSection heading="Favorite Games">
              <VStack spacing={5}>
                {data.user.favorites.map((g) => (
                  <GameCard key={"fave" + g.id} game={g} />
                ))}
              </VStack>
            </TextSection>
          )}
          {data?.user?.submissions && (
            <TextSection heading="Submissions">
              <VStack spacing={5}>
                {data.user.submissions.map((g) => (
                  <GameCard key={"sub" + g.id} game={g} />
                ))}
              </VStack>
            </TextSection>
          )}
          {data?.user?.posts && (
            <TextSection heading="Comments">
              <CommentList
                posts={data.user.posts}
                username={data?.user?.username}
                editable={false}
              />
            </TextSection>
          )}
        </>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(UserPage);
