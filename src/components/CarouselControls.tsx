import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { ButtonBack, ButtonNext } from "pure-react-carousel";
import * as React from "react";

interface CarouselControlsProps {
  offset?: string;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  offset = "30%",
}) => {
  const color = useColorModeValue("white", "black");
  return (
    <>
      <Box
        pos="absolute"
        top={offset}
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
        top={offset}
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
    </>
  );
};
