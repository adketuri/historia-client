import { Box, Button, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as React from "react";
import { useCreatePostMutation } from "../generated/graphql";
import { InputField } from "./InputField";

interface CommentEntryProps {
  gameId: number;
}

export const CommentEntry: React.FC<CommentEntryProps> = ({ gameId }) => {
  const [createPost, { loading }] = useCreatePostMutation();

  return (
    <Box mt={5}>
      <Formik
        initialValues={{ body: "" }}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await createPost({
              variables: { gameId, body: values.body },
              update: (cache) => {
                console.log("cache: ", cache);
                cache.evict({ fieldName: "posts:{}" });
                cache.gc();
              },
            });
            resetForm({ values: { body: "" } });
          } catch (e) {
            setErrors({ body: e.toString() });
          }
        }}
      >
        <Form>
          <InputField
            name="body"
            label=""
            placeholder="Say something nice about this game..."
            textarea
          />
          <Button type="submit" mt={5} isLoading={loading}>
            Add Comment
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};
