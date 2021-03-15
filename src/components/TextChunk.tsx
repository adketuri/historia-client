import * as React from "react";
import { Text, Box } from "@chakra-ui/react";

interface TextChunkProps {
  text: string;
}

export const TextChunk: React.FC<TextChunkProps> = ({ text }) => {
  return (
    <Box w="100%">
      {text
        .split("\n")
        .filter((t) => t.length > 0)
        .map((t, i) => {
          return (
            <Text mt={i === 0 ? 0 : 4} key={"txt" + i}>
              {t}
            </Text>
          );
        })}
    </Box>
  );
};

//
// {text.split('\n').map((value, index) => {
//   return (
//     <Text key={index}>
//       {value}
//     </Text>
//   );
