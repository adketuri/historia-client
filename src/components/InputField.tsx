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
import { InfoButton } from "./InfoButton";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement & HTMLTextAreaElement
> & {
  label: string;
  name: string;
  textarea?: boolean;
  forgotPassword?: boolean;
  info?: string;
  ref?: any;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  forgotPassword,
  ref,
  info,
  size: _,
  ...props
}) => {
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
          {info && <InfoButton text={info} />}
        </Flex>
        {textarea ? (
          <Textarea
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
        ) : (
          <Input
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
        )}

        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
