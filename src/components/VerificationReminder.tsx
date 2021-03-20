import { makeVar } from "@apollo/client";
import { Box, CloseButton, Flex, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { useMeQuery } from "../generated/graphql";

interface VerificationReminderProps {}

export const VerificationReminder: React.FC<VerificationReminderProps> = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "blue.300", dark: "blue.700" };
  const outlineColor = { light: "blue.300", dark: "blue.700" };

  const { data } = useMeQuery();
  const dismissed = makeVar(false);

  if (dismissed() || data?.me?.isVerified) {
    return <></>;
  }

  return (
    <Flex
      align="center"
      p={3}
      bg={bgColor[colorMode]}
      outlineColor={outlineColor[colorMode]}
    >
      Please check your email {dismissed()}
      <CloseButton
        ml="auto"
        onClick={() => {
          console.log(dismissed());
          dismissed(true);
        }}
      />
    </Flex>
  );
};
