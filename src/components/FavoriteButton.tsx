import {
  Game,
  RegularGameFragment,
  useFavoriteMutation,
} from "../generated/graphql";
import { Text, IconButton, Button, BoxProps } from "@chakra-ui/react";
import React, { ButtonHTMLAttributes, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import gql from "graphql-tag";

type FavoriteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  BoxProps & {
    game: RegularGameFragment;
    preset: "sm" | "lg";
  };

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  game,
  preset,
  ...props
}) => {
  const [favorite, { loading }] = useFavoriteMutation();

  const label = game.favorited ? "Favorited" : "Favorite";
  const onClick = async () => {
    await favorite({
      variables: { gameId: game.id, add: !game.favorited },
      update: (cache) => {
        const data = cache.readFragment<RegularGameFragment>({
          id: "Game:" + game.id,
          fragment: gql`
            fragment _ on Game {
              id
              favoriteCount
              favorited
            }
          `,
        });
        if (data) {
          if (data.favorited != game.favorited) return;
          cache.writeFragment({
            id: "Game:" + game.id,
            fragment: gql`
              fragment __ on Game {
                favoriteCount
                favorited
              }
            `,
            data: {
              favoriteCount: data.favorited
                ? data.favoriteCount - 1
                : data.favoriteCount + 1,
              favorited: !data.favorited,
            },
          });
        }
      },
    });
  };

  if (preset == "sm") {
    return (
      <IconButton
        aria-label={label}
        variant="ghost"
        onClick={onClick}
        icon={<StarIcon color={game.favorited ? "yellow.300" : "gray"} />}
        {...props}
      />
    );
  }

  return (
    <>
      <Button
        onClick={onClick}
        disabled={loading}
        w="100%"
        colorScheme={game.favorited ? "yellow" : "gray"}
        aria-label="Favorite"
        leftIcon={<StarIcon />}
      >
        {label}
      </Button>
      <Text align="center" mt="20px">
        {game.favoriteCount} Favorite{game.favoriteCount !== 1 && "s"}
      </Text>
    </>
  );
};
