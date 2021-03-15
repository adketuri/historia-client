import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

interface InfoButtonProps {
  text: string;
}

export const InfoButton: React.FC<InfoButtonProps> = ({ text }) => {
  const bgColor = useColorModeValue("blue.100", "blue.700");
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton
          mb={2}
          size="xs"
          variant="unstyled"
          aria-label="Info"
          icon={<InfoIcon />}
        />
      </PopoverTrigger>
      <PopoverContent bg={bgColor}>
        <PopoverArrow bg={bgColor} />
        <PopoverBody>{text}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
