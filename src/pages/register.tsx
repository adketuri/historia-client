import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";
import { FormHeader } from "../components/FormHeader";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Layout title="Register An Account" variant="small">
      <FormHeader title="Register An Account">
        Already have an account? Please{" "}
        <NextLink href={"/login"}>
          <Link variant="pink">sign in.</Link>
        </NextLink>
      </FormHeader>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              info="We value your privacy! Your email is kept private and only used to verify your account."
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Button
              my={10}
              w="100%"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              disabled={
                values.username.length === 0 ||
                values.email.length === 0 ||
                values.password.length === 0
              }
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
