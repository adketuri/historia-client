import { Button, Flex, Link, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

export const Login: React.FC<{}> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ variables: values });
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
            />
            <Flex>
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Login
              </Button>
              <Spacer />
              <NextLink href="/forgot-password">
                <Link>Forgot Password?</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
