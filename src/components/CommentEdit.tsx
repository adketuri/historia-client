import { Button, Box, Flex, Spacer } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as React from "react";
import {
  RegularGameFragmentDoc,
  RegularPostFragment,
  RegularPostFragmentDoc,
  useUpdatePostMutation,
} from "../generated/graphql";
import { InputField } from "./InputField";

interface CommentEditProps {
  post: RegularPostFragment;
  onCancel: () => void;
}

export const CommentEdit: React.FC<CommentEditProps> = ({ post, onCancel }) => {
  const [updatePost, { loading }] = useUpdatePostMutation();

  return (
    <Box w="100%">
      <Formik
        initialValues={{ body: post.body }}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await updatePost({
              variables: { id: post.id, body: values.body },
              update: (cache, { data: { updatePost } }) => {
                const data: any = cache.readFragment({
                  id: `Post:${post.id}`,
                  fragmentName: "RegularPost",
                  fragment: RegularPostFragmentDoc,
                });
                const newData = { ...data };
                newData.body = updatePost.body;
                cache.writeFragment({
                  id: `Post:${post.id}`,
                  fragmentName: "RegularPost",
                  fragment: RegularPostFragmentDoc,
                  data: newData,
                });
              },
            });
            onCancel();
          } catch (e) {
            setErrors({ body: e.toString() });
          }
        }}
      >
        <Form>
          <InputField
            width="100%"
            name="body"
            label=""
            placeholder="Say something nice about this game..."
            textarea
          />
          <Flex mb={2}>
            <Spacer />
            <Button
              size="xs"
              type="submit"
              colorScheme="teal"
              isLoading={false}
            >
              Save
            </Button>
            <Button
              size="xs"
              ml={2}
              variant="outline"
              isLoading={false}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
};
