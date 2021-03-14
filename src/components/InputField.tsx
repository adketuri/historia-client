import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Link,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import NextLink from "next/link";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  forgotPassword?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  forgotPassword,
  size: _,
  ...props
}) => {
  let InputOrTextArea = Input;
  if (textarea) InputOrTextArea = Textarea;
  const [field, { error }] = useField(props);
  return (
    <Box mt={5}>
      <FormControl isInvalid={!!error}>
        <Flex align="center">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          {forgotPassword && (
            <NextLink href="/forgot-password">
              <Link variant="tiny" ml="auto">
                Forgot Password?
              </Link>
            </NextLink>
          )}
        </Flex>
        <InputOrTextArea
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
