import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as React from "react";
import { RegularGameFragment } from "../generated/graphql";
import { GameIcon } from "./GameIcon";
import { TextSection } from "./TextSection";

interface PromotedGamesProps {
  games: RegularGameFragment[];
}

export const PromotedGames: React.FC<PromotedGamesProps> = ({ games }) => {
  return (
    <>
      <TextSection heading="Weekly Showcase">
        <Box pos="relative">
          <CarouselProvider
            naturalSlideWidth={250}
            naturalSlideHeight={300}
            visibleSlides={3}
            totalSlides={games.length}
            infinite={true}
          >
            <Slider>
              {games.map((g, i) => (
                <Slide index={i} key={g.slug + i}>
                  <GameIcon index={i} game={g} />
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
          </CarouselProvider>
        </Box>
      </TextSection>
    </>
  );
};
