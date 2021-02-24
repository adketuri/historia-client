import { Button, Flex, Link, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { NavBar } from "../../components/NavBar";
import { Wrapper } from "../../components/Wrapper";
import { useLoginMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

interface SubmitGameProps {}

const SubmitGame: React.FC<{}> = ({}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
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
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  Add Game
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(SubmitGame);
