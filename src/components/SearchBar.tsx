import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Form, Formik, useField, useFormik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { InputField } from "./InputField";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "pink.700", dark: "pink.400" };
  const textColor = { dark: "gray.900", light: "gray.100" };

  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      if (values.search.length < 2) return;
      router.replace(`/search-results?search=${values.search}`);
    },
  });

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup w={40} mx={5} bg={"whiteAlpha.200"}>
          <Input
            size="md"
            id="search"
            value={formik.values.search}
            onChange={formik.handleChange}
            placeholder="Search"
            color={textColor[colorMode]}
            borderColor={textColor[colorMode]}
            sx={{
              "::placeholder": {
                color: textColor[colorMode],
                opacity: 0.5,
              },
            }}
          />
          <InputRightElement
            children={
              <IconButton
                aria-label="Search"
                type="submit"
                isLoading={submitting}
                disabled={formik.values.search.length < 2}
                icon={<SearchIcon color={textColor[colorMode]} />}
              />
            }
          />
        </InputGroup>
      </Form>
    </Formik>
  );
};
