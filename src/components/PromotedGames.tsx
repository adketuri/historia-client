import { Box, useBreakpointValue } from "@chakra-ui/react";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { CarouselControls } from "./CarouselControls";
import { GameIcon } from "./GameIcon";
import { TextSection } from "./TextSection";

interface PromotedGamesProps {
  games: RegularGameFragment[];
}

export const PromotedGames: React.FC<PromotedGamesProps> = ({ games }) => {
  const slides = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 5 });
  return (
    <>
      <TextSection heading="Weekly Showcase" spacer={false}>
        <Box pos="relative" width="100%">
          <CarouselProvider
            naturalSlideWidth={300}
            naturalSlideHeight={350}
            visibleSlides={slides}
            isPlaying={true}
            interval={5000}
            totalSlides={games.length}
            infinite={true}
          >
            <Slider>
              {games.map((g, i) => (
                <Slide index={i} key={g.slug + i}>
                  <Box mx={1}>
                    <GameIcon index={i} game={g} />
                  </Box>
                </Slide>
              ))}
            </Slider>
            <CarouselControls />
          </CarouselProvider>
        </Box>
      </TextSection>
    </>
  );
};
