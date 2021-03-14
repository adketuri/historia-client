import * as React from "react";
import { HomepageScreenshot } from "./NewScreenshots";
import { Box, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
interface ScreenshotPreviewProps {
  screenshot: HomepageScreenshot;
}

const INITIAL_OPACITY = 0.6;
const HOVER_OPACITY = 1;

export const ScreenshotPreview: React.FC<ScreenshotPreviewProps> = ({
  screenshot,
}) => {
  const [opacity, setOpacity] = useState(INITIAL_OPACITY);

  return (
    <NextLink href={`games/${screenshot.game.slug}`}>
      <Link>
        <Box pos="relative" w="100%" h="100%">
          <Box
            pos="absolute"
            w="100%"
            h="100%"
            bgGradient="linear(to-bl, transparent, green.900)"
            opacity={opacity}
            onMouseEnter={() => setOpacity(HOVER_OPACITY)}
            onMouseLeave={() => setOpacity(INITIAL_OPACITY)}
          />
          <Image w="100%" h="100%" objectFit="cover" src={screenshot.url} />
          <Text
            as="b"
            color="white"
            fontSize="lg"
            pos="absolute"
            bottom={2}
            left={2}
          >
            {screenshot.game.title}
          </Text>
        </Box>
      </Link>
    </NextLink>
  );
};
