import { EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Button,
  FormLabel,
  Checkbox,
  Grid,
  Image,
  CheckboxGroup,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import * as React from "react";
import { ReactText, useCallback, useState } from "react";
import {
  RegularGameFragment,
  useCreateGameMutation,
  useGameQuery,
  useUpdateGameMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { GameStaticMediaUploader } from "./GameStaticMediaUploader";
import { InputField } from "./InputField";
import { Upload } from "./Upload";

interface GameFormProps {
  editing: boolean;
  game?: RegularGameFragment;
}

const tags: string[] = [
  "action",
  "adventure",
  "arcade",
  "comedy",
  "cyberpunk",
  "dark",
  "dungeon crawler",
  "fantasy",
  "fighting",
  "futuristic",
  "historical",
  "horror",
  "modern",
  "mystery",
  "platformer",
  "post-apocalyptic",
  "rpg",
  "shooter",
  "steampunk",
  "tactics",
  "text",
  "visual novel",
  "western",
];

export const GameForm: React.FC<GameFormProps> = ({ editing, game }) => {
  const [createGame] = useCreateGameMutation();
  const [updateGame] = useUpdateGameMutation();

  const initialValues = {
    title: game?.title || "",
    shortDescription: game?.shortDescription || "",
    longDescription: game?.longDescription || "",
    tags: game?.tags || "",
    author: game?.author || "",
  };

  // Convert our InputGroup from an array of strings to a single comma-separated string
  const [taglist, setTaglist] = useState("");
  const updateCheckboxes = useCallback((value: ReactText[]) => {
    setTaglist(value.sort().join());
  }, []);

  // Track our thumbnail and banner urls so they get updated as well
  const [banner, setBanner] = useState(game?.banner);
  const [thumbnail, setThumbnail] = useState(game?.thumbnail);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const input = { ...values, tags: taglist, thumbnail, banner };
        if (editing) {
          const { data } = await updateGame({
            variables: {
              input,
              id: game!.id,
            },
            update: (cache) => {
              cache.evict({ fieldName: "games:{}" });
            },
          });
          if (data?.updateGame.errors) {
            setErrors(toErrorMap(data.updateGame.errors));
          } else if (data?.updateGame.game) {
            router.push(`/games/${data.updateGame.game.slug}`);
          }
        } else {
          const { data } = await createGame({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "games:{}" });
            },
          });
          if (data?.createGame.errors) {
            setErrors(toErrorMap(data.createGame.errors));
          } else if (data?.createGame.game) {
            router.push(`/games/${data.createGame.game.slug}`);
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="title"
            placeholder="Game Title"
            label="Game Title"
          />
          <InputField
            name="author"
            placeholder="Game Author"
            label="Game Author"
          />
          <InputField
            name="year"
            type={"number"}
            placeholder="Release Year"
            label="Release Year"
          />
          <InputField
            name="shortDescription"
            placeholder="Short Description"
            label="Short Description"
          />
          <InputField
            name="longDescription"
            placeholder="Long Description"
            label="Long Description"
            textarea
          />
          {game && (
            <Flex>
              <GameStaticMediaUploader
                label="Thumbnail"
                type="thumbnail"
                game={game}
                url={thumbnail}
                onFinish={(url: string) => setThumbnail(url)}
              />
              <GameStaticMediaUploader
                label="Banner"
                type="banner"
                game={game}
                url={banner}
                onFinish={(url: string) => setBanner(url)}
              />
            </Flex>
          )}

          <FormLabel htmlFor="tags">Tags</FormLabel>
          <CheckboxGroup
            colorScheme="pink"
            defaultValue={initialValues.tags.split(",")}
            onChange={updateCheckboxes}
          >
            <SimpleGrid minChildWidth={120} spacing={2}>
              {tags.map((tag) => (
                <Checkbox value={tag} key={tag} name={tag} label={tag}>
                  {tag}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>

          <Flex>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
              mb={5}
            >
              {editing ? "Save Changes" : "Add Game"}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
