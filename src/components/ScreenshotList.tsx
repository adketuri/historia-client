import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Image, Text } from "@chakra-ui/react";
import {
  ButtonBack,
  ButtonNext,
  ButtonLast,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as React from "react";
import { useRef } from "react";
import {
  RegularGameFragment,
  RegularScreenshotFragment,
  useMeQuery,
} from "../generated/graphql";
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
  return (
    <Box pos="relative">
      <CarouselProvider
        naturalSlideWidth={320}
        naturalSlideHeight={240}
        visibleSlides={2}
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
            <Box pos="absolute" top="40%" left={0}>
              <ButtonBack>
                <ArrowLeftIcon />
              </ButtonBack>
            </Box>
            <Box pos="absolute" top="40%" right={0}>
              <ButtonNext>
                <ArrowRightIcon />
              </ButtonNext>
            </Box>
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
