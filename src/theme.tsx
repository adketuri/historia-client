import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };
const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "md",
        backgroundColor: props.colorMode === "dark" ? "gray.800" : "gray.100", // this doesn't seem to work?
      },
      a: {
        color: props.colorMode === "dark" ? "pink.300" : "pink.500",
      },
    }),
  },
  components: {
    Link: {
      variants: {
        nav: (props) => ({
          color: props.colorMode === "dark" ? "pink.50" : "pink.900",
          fontWeight: "bold",
          fontSize: "sm",
          textTransform: "uppercase",
          _hover: {
            color: props.colorMode === "dark" ? "pink.100" : "pink.700",
            textDecoration: "none",
          },
        }),
        tiny: (props) => ({
          color: props.colorMode === "dark" ? "pink.50" : "pink.600",
          fontWeight: "bold",
          fontSize: "xs",
          _hover: {
            color: props.colorMode === "dark" ? "pink.100" : "pink.800",
            textDecoration: "none",
          },
        }),
        title: (props) => ({
          color: props.colorMode === "dark" ? "teal.200" : "teal.700",
          fontWeight: "bold",
          fontSize: "xl",
          _hover: {
            color: props.colorMode === "dark" ? "teal.100" : "teal.800",
            textDecoration: "none",
          },
        }),
        comment: (props) => ({
          color: props.colorMode === "dark" ? "teal.200" : "teal.700",
        }),
        footerLink: (props) => ({
          color: props.colorMode === "dark" ? "yellow.500" : "yellow.700",
          _hover: {
            color: props.colorMode === "dark" ? "yellow.100" : "yellow.900",
            textDecoration: "none",
          },
        }),
        pink: (props) => ({
          color: props.colorMode === "dark" ? "pink.300" : "pink.500",
          _hover: {
            color: props.colorMode === "dark" ? "pink.100" : "pink.700",
            textDecoration: "none",
          },
        }),
      },
    },
    Button: {
      variants: {
        nav: (props) => ({
          color: props.colorMode === "dark" ? "pink.50" : "pink.900",
          fontWeight: "bold",
          fontSize: "sm",
          textTransform: "uppercase",
          _hover: {
            color: props.colorMode === "dark" ? "pink.100" : "pink.700",
            textDecoration: "none",
          },
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
          color: props.colorMode === "dark" ? "yellow.100" : "yellow.800",
        }),
        footerContent: (props) => ({
          fontSize: "sm",
          color: props.colorMode === "dark" ? "yellow.100" : "yellow.800",
        }),
      },
    },
  },
  colors: {
    black: "#001f2b", // text color on light theme
    white: "#f2feff", // text color on dark theme
    transparent: "transparent",
    purple: {
      50: "#f3e7ff",
      100: "#d7bcf7",
      200: "#bb91ee",
      300: "#a065e6",
      400: "#853ade",
      500: "#6b21c5",
      600: "#54199a",
      700: "#3c116f",
      800: "#240a44",
      900: "#0e021b",
    },
    pink: {
      50: "#ffe5f7",
      100: "#fcb7e0",
      200: "#f689ca",
      300: "#f15bb5",
      400: "#ec2ea0",
      500: "#d21686",
      600: "#a40e68",
      700: "#76074a",
      800: "#48022e",
      900: "#1c0012",
    },
    yellow: {
      50: "#fffbdc",
      100: "#fff4af",
      200: "#feed7e",
      300: "#fee64d",
      400: "#fedf1f",
      500: "#e4c508",
      600: "#b29901",
      700: "#7f6e00",
      800: "#4c4200",
      900: "#1a1600",
    },
    blue: {
      50: "#d7fcff",
      100: "#abedff",
      200: "#7ae0ff",
      300: "#48d3ff",
      400: "#1ac6ff",
      500: "#00ace6",
      600: "#0086b4",
      700: "#006082",
      800: "#003a51",
      900: "#001520",
    },
    teal: {
      50: "#d7fffe",
      100: "#abfff5",
      200: "#7affee",
      300: "#48ffe7",
      400: "#1affe0",
      500: "#00e6c7",
      600: "#00b39a",
      700: "#00806e",
      800: "#004e42",
      900: "#001c16",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
