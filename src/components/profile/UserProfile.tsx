import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import * as React from "react";
import {
  RegularUserFragment,
  useChangeProfileMutation,
  useMeQuery,
} from "../../generated/graphql";
import { AdminControls } from "./AdminControls";

interface EditableControlsProps {
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onEdit: () => void;
}
const EditableControls: React.FC<EditableControlsProps> = ({
  isEditing,
  onSubmit,
  onCancel,
  onEdit,
}) => {
  return isEditing ? (
    <ButtonGroup size="sm">
      <IconButton aria-label="Save" icon={<CheckIcon />} onClick={onSubmit} />
      <IconButton aria-label="Cancel" icon={<CloseIcon />} onClick={onCancel} />
    </ButtonGroup>
  ) : (
    <IconButton
      ml="auto"
      size="sm"
      aria-label="Edit"
      icon={<EditIcon />}
      onClick={onEdit}
    />
  );
};

interface UserProfileProps {
  user: RegularUserFragment;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [changeProfile] = useChangeProfileMutation();
  const { data } = useMeQuery();
  const editable = data?.me?.id === user.id;

  return (
    <Flex>
      <Box flex="1">
        <Editable
          defaultValue={user.profile || "No Profile"}
          isPreviewFocusable={false}
          submitOnBlur={false}
          contentEditable={editable}
          onSubmit={(input) =>
            changeProfile({ variables: { newProfile: input } })
          }
        >
          {(props) => (
            <Flex>
              <EditablePreview />
              <EditableInput />
              {editable && <EditableControls {...props} />}
            </Flex>
          )}
        </Editable>
      </Box>
      {data?.me?.isAdmin && <AdminControls username={user.username} />}
    </Flex>
  );
};
