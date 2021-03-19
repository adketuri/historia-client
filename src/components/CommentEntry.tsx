import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as React from "react";
import {
  RegularGameFragmentDoc,
  useCreatePostMutation,
} from "../generated/graphql";
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
              update: (cache, { data }) => {
                const readData: any = cache.readFragment({
                  id: `Game:${gameId}`,
                  fragmentName: "RegularGame",
                  fragment: RegularGameFragmentDoc,
                });
                const newData = { ...readData };
                newData.posts = [...readData.posts, data?.createPost];
                cache.writeFragment({
                  id: `Game:${gameId}`,
                  fragmentName: "RegularGame",
                  fragment: RegularGameFragmentDoc,
                  data: newData,
                });
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
          <Button type="submit" colorScheme="blue" mt={5} isLoading={loading}>
            Add Comment
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};
