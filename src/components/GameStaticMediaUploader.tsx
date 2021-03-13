import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, FormLabel, Image } from "@chakra-ui/react";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { Upload, UploadType } from "./Upload";

interface GameStaticMediaUploaderProps {
  game: RegularGameFragment;
  onFinish: (url: string) => void;
  label: string;
  url?: string | null;
  type: UploadType;
}
const IMAGE_SZ = 300;
export const GameStaticMediaUploader: React.FC<GameStaticMediaUploaderProps> = ({
  game,
  label,
  type,
  url,
  onFinish,
}) => {
  return (
    <Box flex="1">
      <Flex align="center">
        <FormLabel>{label}</FormLabel>
        <Upload
          type={type}
          game={game}
          onFinish={onFinish}
          icon={<EditIcon />}
        />
      </Flex>
      <Image
        src={url || "https://i.imgur.com/PffO0zx.png"}
        width={IMAGE_SZ}
        height={IMAGE_SZ}
        objectFit="cover"
      />
    </Box>
  );
};
