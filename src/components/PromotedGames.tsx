import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
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
  const color = useColorModeValue("white", "black");

  return (
    <>
      <TextSection heading="Weekly Showcase" spacer={false}>
        <Box pos="relative" width="100%">
          <CarouselProvider
            naturalSlideWidth={300}
            naturalSlideHeight={350}
            visibleSlides={3}
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
            <Box
              pos="absolute"
              top="30%"
              left={0}
              p={2}
              pb={3}
              ml={2}
              bg={color}
              rounded="lg"
              opacity={0.5}
            >
              <ButtonBack>
                <ArrowLeftIcon />
              </ButtonBack>
            </Box>
            <Box
              pos="absolute"
              top="30%"
              right={0}
              p={2}
              pb={3}
              mr={2}
              bg={color}
              rounded="lg"
              opacity={0.5}
            >
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
