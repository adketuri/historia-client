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
      },
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default theme;
