import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as React from "react";
import { useRef } from "react";
import {
  RegularGameFragment,
  RegularScreenshotFragment,
  useMeQuery,
} from "../generated/graphql";
import { CarouselControls } from "./CarouselControls";
import { Upload } from "./Upload";

interface ScreenshotListProps {
  game?: RegularGameFragment;
  screenshots?: RegularScreenshotFragment[];
}

export const ScreenshotList: React.FC<ScreenshotListProps> = ({
  game,
  screenshots,
}) => {
  const { data } = useMeQuery();

  const screens: RegularScreenshotFragment[] =
    (game?.screenshots ? game.screenshots : screenshots) || [];

  const lastRef = useRef(null);
  const slides = useBreakpointValue({ base: 1, md: 2 });
  return (
    <Box pos="relative">
      <CarouselProvider
        naturalSlideWidth={320}
        naturalSlideHeight={240}
        visibleSlides={slides}
        totalSlides={screens.length}
        infinite={true}
      >
        {screens.length > 0 ? (
          <>
            <Slider>
              {screens.map((s, i) => (
                <Slide index={i} key={s.url + i}>
                  <Image
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    src={s.url}
                  />
                </Slide>
              ))}
            </Slider>
            <CarouselControls offset="40%" />
            {/* <ButtonLast ref={lastRef.current}>last</ButtonLast> */}
            {/* <Button onClick={() => console.log(lastRef)}>Last REF?</Button> */}
          </>
        ) : (
          <Text>There are no screenshots for this game.</Text>
        )}

        <Box pos="absolute" top={"-50px"} right={0}>
          {game && data?.me?.isSubmitter && (
            <Upload game={game} type="screenshot" />
          )}
        </Box>
      </CarouselProvider>
    </Box>
  );
};
