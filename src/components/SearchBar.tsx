import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = () => {
  const { colorMode } = useColorMode();
  const textColor = { light: "gray.900", dark: "gray.100" };

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
        <InputGroup w={[null, "120px", "200px"]} mx={5} bg={"whiteAlpha.200"}>
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
                opacity: 0.8,
              },
            }}
          />
          <InputRightElement
            children={
              <IconButton
                aria-label="Search"
                type="submit"
                variant="unstyled"
                icon={<SearchIcon color={textColor[colorMode]} />}
              />
            }
          />
        </InputGroup>
      </Form>
    </Formik>
  );
};
