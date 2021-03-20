import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
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
  useCreateDownloadMutation,
  useCreateScreenshotMutation,
} from "../generated/graphql";
const ReactS3Uploader = require("react-s3-uploader");

interface S3UploaderProps {
  path: string;
  gameId: number;
  type: UploadType;
  onStart?: () => void;
  onFinish?: (url: string) => void;
}

const S3Uploader: React.FC<S3UploaderProps> = ({
  path,
  gameId,
  type,
  onStart,
  onFinish,
}) => {
  const [createScreenshot, { loading }] = useCreateScreenshotMutation({
    onCompleted: (data) => onFinish && onFinish(data.createScreenshot.url),
  });
  const [createDownload] = useCreateDownloadMutation({
    onCompleted: (data) => onFinish && onFinish(data.createDownload.url),
  });
  const handleFinishedUpload = (info: { filename: any; fileUrl: any }) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
    if (type === "screenshot") {
      createScreenshot({
        variables: {
          url: info.fileUrl,
          gameId,
        },
        update: (cache, { data }) => {
          const readData: any = cache.readFragment({
            id: `Game:${gameId}`,
            fragmentName: "RegularGame",
            fragment: RegularGameFragmentDoc,
          });
          const newData = { ...readData };
          newData.screenshots = [
            ...readData.screenshots,
            data?.createScreenshot,
          ];
          cache.writeFragment({
            id: `Game:${gameId}`,
            fragmentName: "RegularGame",
            fragment: RegularGameFragmentDoc,
            data: newData,
          });
        },
      });
    } else if (type === "download") {
      createDownload({
        variables: {
          url: info.fileUrl,
          gameId,
        },
        update: (cache, { data }) => {
          const readData: any = cache.readFragment({
            id: `Game:${gameId}`,
            fragmentName: "RegularGame",
            fragment: RegularGameFragmentDoc,
          });
          const newData = { ...readData };
          if (readData.downloads) {
            newData.downloads = [...readData.downloads, data?.createDownload];
          } else {
            newData.downloads = [createDownload];
          }
          cache.writeFragment({
            id: `Game:${gameId}`,
            fragmentName: "RegularGame",
            fragment: RegularGameFragmentDoc,
            data: newData,
          });
        },
      });
    }
    onFinish && onFinish(info.fileUrl);
  };
  const uploadOptions = {
    server: process.env.NEXT_PUBLIC_SERVER_URL,
    s3path: path,
    accept:
      type === "download"
        ? "application/zip,application/x-rar-compressed,application/octet-stream,application/x-zip-compressed,multipart/x-zip"
        : "image/png",
    signingUrlQueryParams: { uploadType: type },
  };
  const textColor = useColorModeValue("blue.900", "blue.50");
  const sizeMb = type === "download" ? 150 : 1;
  return (
    <Flex align="center" direction="column">
      <DropzoneS3Uploader
        onFinish={handleFinishedUpload}
        s3Url={process.env.NEXT_PUBLIC_S3_URL}
        maxSize={1024 * 1024 * sizeMb}
        upload={uploadOptions}
      />
      <Text color={textColor} fontSize="sm" mt={5}>
        Max filesize is {sizeMb}mb
      </Text>
    </Flex>
  );
};

export type UploadType = "screenshot" | "download" | "thumbnail" | "banner";

interface UploadProps {
  game?: RegularGameFragment;
  type: UploadType;
  icon?: React.ReactElement;
  onFinish?: (url: string) => void;
}

export const Upload: React.FC<UploadProps> = ({
  game,
  type,
  icon,
  onFinish,
}) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("blue.900", "blue.50");

  let path = undefined;
  if (game) {
    path = `${type}/${game.slug}/`;
    if (type === "screenshot") {
      path = path + `${uuidv4()}`;
    }
  }

  return (
    <>
      <IconButton
        variant="ghost"
        aria-label={`Add ${type}`}
        onClick={onOpen}
        icon={icon ? icon : <AddIcon />}
      />
      <Modal
        closeOnOverlayClick={loading}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            align="center"
            color={textColor}
          >{`Drop ${type}s below!`}</ModalHeader>
          <ModalCloseButton color={textColor} />
          <ModalBody>
            {game && path && (
              <S3Uploader
                gameId={game.id}
                onStart={() => console.log("START!!")}
                onFinish={onFinish}
                type={type}
                path={path}
              />
            )}
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
