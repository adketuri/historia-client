import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Layout variant="small">
      <Box align="center">
        <Heading>Register for an account</Heading>
        <Text mt={5} mb={10}>
          Already have an account? Please{" "}
          <NextLink href={"/login"}>
            <Link variant="pink">sign in.</Link>
          </NextLink>
        </Text>
      </Box>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ variables: { options: values } });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField name="email" placeholder="email" label="Email" />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Button
              mt={5}
              w="100%"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
