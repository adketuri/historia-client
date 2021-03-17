import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Fade,
  Button,
  Box,
  Collapse,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { ChunkyDivider } from "./ChunkyDivider";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { MenuLinks } from "./MenuLinks";
import { UserControls } from "./UserControls";

interface MobileMenuProps {}

export const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("black", "white");
  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="Menu"
        onClick={onOpen}
        icon={<HamburgerIcon />}
      />
      <Drawer size="xs" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton mr={6} color={color} />
            <DrawerHeader color={color} mt={-2}>
              Menu
            </DrawerHeader>
            <DrawerBody ml="auto" align="right" mr={5}>
              <MenuLinks vertical />
              <ChunkyDivider my={3} />
              <UserControls vertical />
              <ChunkyDivider my={3} />
              <ColorModeSwitcher mx={-2} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
