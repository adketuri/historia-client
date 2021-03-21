import { CloseButton, Flex, Text, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { useMeQuery } from "../generated/graphql";
import { useVerification } from "./VerificationProvider";

interface VerificationReminderProps {}

export const VerificationReminder: React.FC<VerificationReminderProps> = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "blue.300", dark: "blue.700" };
  const outlineColor = { light: "blue.300", dark: "blue.700" };

  const { data } = useMeQuery();
  const verification = useVerification();

  if (data?.me?.isVerified || verification.dismissed) {
    return <></>;
  }

  return (
    <Flex
      w="100%"
      align="center"
      py={2}
      bg={bgColor[colorMode]}
      outlineColor={outlineColor[colorMode]}
    >
      <Text ml={[5, 10, 20]}>
        Please check your email to verify your account!
      </Text>
      <CloseButton
        ml="auto"
        mr={[5, 10, 20]}
        onClick={() => {
          verification.setDismissed(true);
        }}
      />
    </Flex>
  );
};
