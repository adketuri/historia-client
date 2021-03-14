import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/react";
import * as React from "react";
import { useUpdateUserMutation, useUserQuery } from "../../generated/graphql";

interface ToggleProps {
  text: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ text, enabled, onToggle }) => {
  return (
    <Flex my={2}>
      <Text mr={2} w={20}>
        {text}
      </Text>
      <Switch
        defaultChecked={enabled}
        id={text}
        size="lg"
        color="red.100"
        onChange={(event) => onToggle(event.target.checked)}
      />
    </Flex>
  );
};

interface AdminControlsProps {
  username: string;
}

export const AdminControls: React.FC<AdminControlsProps> = ({ username }) => {
  const { data } = useUserQuery({ variables: { username } });
  const [updateUser] = useUpdateUserMutation();

  if (!data) return <></>;

  return (
    <Box ml={5}>
      <Toggle
        text="Submitter"
        enabled={!!data?.user?.isSubmitter}
        onToggle={(enabled) =>
          updateUser({
            variables: { id: data.user!.id, isSubmitter: enabled },
          })
        }
      />
      <Toggle
        text="Banned"
        enabled={!!data?.user?.isBanned}
        onToggle={(enabled) =>
          updateUser({
            variables: { id: data.user!.id, isBanned: enabled },
          })
        }
      />
      <Toggle
        text="Verified"
        enabled={!!data?.user?.isVerified}
        onToggle={(enabled) =>
          updateUser({
            variables: { id: data.user!.id, isVerified: enabled },
          })
        }
      />
    </Box>
  );
};
