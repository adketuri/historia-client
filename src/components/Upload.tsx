import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";
import { v4 as uuidv4 } from "uuid";
import {
  CreateScreenshotMutation,
  RegularGameFragment,
  RegularGameFragmentDoc,
  useCreateScreenshotMutation,
} from "../generated/graphql";
const ReactS3Uploader = require("react-s3-uploader");

interface S3UploaderProps {
  path: string;
  gameId: number;
  onStart: () => void;
  onFinish: () => void;
}

const S3Uploader: React.FC<S3UploaderProps> = ({
  path,
  gameId,
  onStart,
  onFinish,
}) => {
  const [createScreenshot, { loading }] = useCreateScreenshotMutation({
    onCompleted: (data) => onFinish(),
  });

  const handleFinishedUpload = (info: { filename: any; fileUrl: any }) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
    createScreenshot({
      variables: {
        url: info.fileUrl,
        gameId,
      },
      update: (cache, { data: { createScreenshot } }) => {
        console.log(cache);
        const data: any = cache.readFragment({
          id: `Game:${gameId}`,
          fragmentName: "RegularGame",
          fragment: RegularGameFragmentDoc,
        });
        const newData = { ...data };
        newData.screenshots = [...data.screenshots, createScreenshot];
        cache.writeFragment({
          id: `Game:${gameId}`,
          fragmentName: "RegularGame",
          fragment: RegularGameFragmentDoc,
          data: newData,
        });
      },
    });
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
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.900", "gray.50");
  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="Add Screenshot"
        onClick={onOpen}
        icon={<AddIcon />}
      />
      <Modal
        closeOnOverlayClick={loading}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Add Screenshot</ModalHeader>
          <ModalCloseButton color={textColor} />
          <ModalBody>
            <S3Uploader
              gameId={game.id}
              onStart={() => console.log("START!!")}
              onFinish={() => console.log("FIN")}
              path={`${type}/${game.slug}/${uuidv4()}`}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              isLoading={loading}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
