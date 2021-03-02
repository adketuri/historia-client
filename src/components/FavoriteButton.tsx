import {
  Game,
  RegularGameFragment,
  useFavoriteMutation,
} from "../generated/graphql";
import { Text, IconButton, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import gql from "graphql-tag";

interface FavoriteButtonProps {
  game: RegularGameFragment;
  preset: "sm" | "lg";
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ game }) => {
  //   const [loading, setLoading] = useState(false);
  const [favorite, { loading }] = useFavoriteMutation();
  return (
    <>
      <Button
        onClick={async () => {
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
        }}
        disabled={loading}
        w="100%"
        colorScheme={game.favorited ? "yellow" : "gray"}
        aria-label="Favorite"
        leftIcon={<StarIcon />}
      >
        {game.favorited ? "Favorited" : "Favorite"}
      </Button>
      <Text align="center" mt="20px">
        {game.favoriteCount} Favorite{game.favoriteCount !== 1 && "s"}
      </Text>
    </>
  );
};
