import { Box, Text, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { useVerifyEmailMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

function verifyResults(verified: boolean) {
  const text = verified
    ? "Email verified, thanks!"
    : "Error verifying. Did you already confirm your account?";
  return (
    <Box>
      <Text mb={5}>{text}</Text>
      <NextLink href="/">
        <Link>Return Home</Link>
      </NextLink>
    </Box>
  );
}

export const VerifyEmail: NextPage = () => {
  const router = useRouter();
  const token =
    typeof router.query.token === "string" ? router.query.token : "";
  const [verifyEmail, { data }] = useVerifyEmailMutation();
  useEffect(() => {
    if (token) {
      console.log("Verifying token: ", token);
      verifyEmail({ variables: { token } });
    }
  }, [token]);

  return (
    <Layout variant="small">
      {!data ? "Verifying..." : verifyResults(data.verifyEmail)}
    </Layout>
  );
};

export default withApollo({ ssr: false })(VerifyEmail);
