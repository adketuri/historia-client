import { Box, Image, Text } from "@chakra-ui/react";
import * as React from "react";
import { RegularScreenshotFragment } from "../generated/graphql";
interface ScreenshotListProps {
  screenshots: RegularScreenshotFragment[] | null | undefined;
}

export const ScreenshotList: React.FC<ScreenshotListProps> = ({
  screenshots,
}) => {
  return (
    <>
      <Text>HELLO</Text>
      {screenshots &&
        screenshots.map((s) => (
          <Box key={s.id}>
            <Image src={s.url} width={100} height={100} />
          </Box>
        ))}
    </>
  );
};
