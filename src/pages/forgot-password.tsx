import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface ForgotPassword {}

export const ForgotPassword: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting, values }) =>
          complete ? (
            <Box>Check your email for instructions to reset your password!</Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />
              <Button
                my={10}
                w="100%"
                type="submit"
                isLoading={isSubmitting}
                disabled={
                  values.email.length === 0 || !values.email.includes("@")
                }
                colorScheme="blue"
              >
                Help Me!
              </Button>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
