import {
  Button,
  Flex,
  Text,
  Heading,
  Link,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

export const Login: React.FC<{}> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Layout variant="small">
      <Box align="center">
        <Heading>Sign in to your account</Heading>
        <Text mt={5} mb={10}>
          New here? Please{" "}
          <NextLink href={"/register"}>
            <Link variant="pink">register first.</Link>
          </NextLink>
        </Text>
      </Box>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              forgotPassword
            />
            <Button
              mt={5}
              w="100%"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
