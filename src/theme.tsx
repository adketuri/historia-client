import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };
import { mode } from "@chakra-ui/theme-tools";
const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

// const { colorMode } = useColorMode();
// const bgColor = { light: "gray.50", dark: "gray.900" };
// const color = { light: "black", dark: "white" };

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "md",
        bgColor: props.colorMode === "dark" ? "gray.800" : "gray.100", // this doesn't seem to work?
      },
      a: {
        color: props.colorMode === "dark" ? "teal.300" : "teal.500",
      },
    }),
  },
  components: {
    Link: {
      variants: {
        nav: (props) => ({
          color: props.colorMode === "dark" ? "gray.800" : "gray.100",
          fontWeight: "bold",
          fontSize: "sm",
          textTransform: "uppercase",
        }),
        title: (props) => ({
          color: props.colorMode === "dark" ? "pink.200" : "pink.700",
          fontWeight: "bold",
          fontSize: "xl",
        }),
        comment: (props) => ({
          color: props.colorMode === "dark" ? "pink.200" : "pink.700",
        }),
        footerLink: (props) => ({
          color: props.colorMode === "dark" ? "pink.500" : "pink.500",
          _hover: {
            color: props.colorMode === "dark" ? "pink.100" : "pink.100",
            textDecoration: "none",
          },
        }),
      },
    },
    Button: {
      variants: {
        nav: (props) => ({
          color: props.colorMode === "dark" ? "gray.800" : "gray.100",
          fontWeight: "bold",
          fontSize: "sm",
          textTransform: "uppercase",
        }),
      },
    },
    Text: {
      variants: {
        nav: (props) => ({
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "sm",
          color: props.colorMode === "dark" ? "gray.800" : "gray.100",
        }),
        footerHeading: (props) => ({
          fontWeight: "bold",
          fontSize: "sm",
          color: "pink.100",
        }),
        footerContent: (props) => ({
          fontSize: "sm",
          color: "pink.500",
        }),
      },
    },
  },
  colors: {
    black: "#444444", // text color on light theme
    white: "#ffcccc", // text color on dark theme
  },
  fonts,
  breakpoints,
});

export default theme;
