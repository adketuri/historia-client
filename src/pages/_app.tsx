import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import { VerificationProvider } from "../components/VerificationProvider";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: false,
        }}
      >
        <VerificationProvider>
          <Component {...pageProps} />
        </VerificationProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
