import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Image,
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
  Input,
} from "@chakra-ui/react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { useCallback, useRef, useState } from "react";
const ReactS3Uploader = require("react-s3-uploader");
import DropzoneS3Uploader from "react-dropzone-s3-uploader";

// elsewhere
class UploadDisplay extends React.Component {
  renderFileUpload = (
    uploadedFile: { filename: any; fileUrl: any; file: any },
    i: string | number | null | undefined
  ) => {
    const {
      filename, // s3 filename
      fileUrl, // full s3 url of the file
      file, // file descriptor from the upload
    } = uploadedFile;

    return (
      <div key={i}>
        <img src={fileUrl} />
        <p>{file.name}</p>
      </div>
    );
  };

  render() {
    const { uploadedFiles, s3Url } = this.props;
    return <div>{uploadedFiles.map(this.renderFileUpload)}</div>;
  }
}

export default class S3Uploader extends React.Component {
  handleFinishedUpload = (info: { filename: any; fileUrl: any }) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
  };

  render() {
    const uploadOptions = {
      server: "http://localhost:4000",
      signingUrlQueryParams: { uploadType: "screenshot" },
    };
    const s3Url = "https://rm2k.s3.amazonaws.com";
    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    );
  }
}

interface UploadProps {}

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const Upload: React.FC<UploadProps> = ({}) => {
  const fileInput = useRef();
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState("");

  // const uploadFile = (file: any) => {
  //   console.log("Uploading ", file);
  //   console.log("fileinput ", fileInput.current);
  //   console.log(process.env.NEXT_PUBLIC_AWS_BUCKET_NAME);
  //   // const newFilename = fileInput.current?.files[0].name;
  //   const config = {
  //     bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  //     // dirName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  //     region: process.env.NEXT_PUBLIC_AWS_REGION,
  //     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID,
  //     secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  //   };
  //   const s3client = new S3(config);
  //   s3client.uploadFile(file, "myupload").then((data: any) => {
  //     console.log("Upload data", data);
  //   });
  // };

  const onDrop = useCallback(async ([file]) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      //uploadFile(file);
    } else {
      setErrors("Something went wrong. Check file type and size (max. 1 MB)");
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxSize: 1024000,
  });
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
            <Box
              {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
              <S3Uploader />
            </Box>
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
