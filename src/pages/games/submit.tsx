import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useCreateGameMutation } from "../../generated/graphql";
import { useIsAuth } from "../../hooks/useIsAuth";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { withApollo } from "../../utils/withApollo";

interface SubmitGameProps {}

const SubmitGame: React.FC<{}> = ({}) => {
  const submitterId = useIsAuth();

  const router = useRouter();
  const [createGame] = useCreateGameMutation();

  return (
    <Layout>
      <Formik
        initialValues={{ title: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const { errors } = await createGame({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "games:{}" });
            },
          });
          if (errors) {
            console.log("Errors", errors);
            // setErrors(toErrorMap(errors));
          } else {
            router.push("/");
          }
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // } else if (response.data?.login.user) {
          //   router.push("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Game Title"
              label="Game Title"
            />
            <InputField
              name="shortDescription"
              placeholder="Short Description (Optional)"
              label="Short Description"
            />
            <InputField
              name="longDescription"
              placeholder="Long Description"
              label="Long Description"
              textarea
            />
            <Flex>
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Add Game
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(SubmitGame);
