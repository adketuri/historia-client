import { Box } from "@chakra-ui/layout";
import { Flex, Image } from "@chakra-ui/react";
import * as React from "react";
import {
  RegularGameFragment,
  RegularScreenshotFragment,
} from "../generated/graphql";
import { ScreenshotPreview } from "./ScreenshotPreview";
import { TextSection } from "./TextSection";

export interface HomepageScreenshot {
  url: string;
  game: RegularGameFragment;
}

interface NewScreenshotsProps {
  screenshots: HomepageScreenshot[];
}

export const NewScreenshots: React.FC<NewScreenshotsProps> = ({
  screenshots,
}) => {
  const h = 340;
  return (
    <TextSection heading="Latest Screenshots">
      <Flex>
        <Box flex="2" h={h}>
          <ScreenshotPreview screenshot={screenshots[0]} />
        </Box>
        <Box flex="1">
          {screenshots.slice(1, 3).map((s) => (
            <Box key={s.url} w={"100%"} h={h / 2}>
              <ScreenshotPreview screenshot={s} />
            </Box>
          ))}
        </Box>
      </Flex>
      <Flex>
        {screenshots.slice(3).map((s) => (
          <Box key={s.url} w="100%" h={h / 2}>
            <ScreenshotPreview screenshot={s} />
          </Box>
        ))}
      </Flex>
    </TextSection>
  );
};
