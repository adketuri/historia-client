import {
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";
import { RegularGameFragment } from "../generated/graphql";
const ReactS3Uploader = require("react-s3-uploader");
import { v4 as uuidv4 } from "uuid";

interface S3UploaderProps {
  path: string;
}

const S3Uploader: React.FC<S3UploaderProps> = ({ path }) => {
  const handleFinishedUpload = (info: { filename: any; fileUrl: any }) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
  };
  const uploadOptions = {
    server: process.env.NEXT_PUBLIC_SERVER_URL,
    s3path: path,
    signingUrlQueryParams: { uploadType: "screenshot" },
  };
  const textColor = useColorModeValue("gray.900", "gray.50");

  return (
    <>
      <Text color={textColor}>Drop Screenshots Below!</Text>
      <DropzoneS3Uploader
        onFinish={handleFinishedUpload}
        s3Url={process.env.NEXT_PUBLIC_S3_URL}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    </>
  );
};

interface UploadProps {
  game: RegularGameFragment;
  type: "screenshots" | "download";
}

export const Upload: React.FC<UploadProps> = ({ game, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.900", "gray.50");
  return (
    <>
      <Button onClick={onOpen}>Add Screenshot</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Add Screenshot</ModalHeader>
          <ModalCloseButton color={textColor} />
          <ModalBody>
            <S3Uploader path={`${type}/${game.slug}/${uuidv4()}`} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
