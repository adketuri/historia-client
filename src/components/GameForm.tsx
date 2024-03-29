import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import * as React from "react";
import { ReactText, useCallback, useState } from "react";
import {
  RegularGameFragment,
  useCreateGameMutation,
  useUpdateGameMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { FormHeader } from "./FormHeader";
import { GameStaticMediaUploader } from "./GameStaticMediaUploader";
import { InfoButton } from "./InfoButton";
import { InputField } from "./InputField";

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
    author: game?.author || "",
    year: game?.year || 2000,
    shortDescription: game?.shortDescription || "",
    longDescription: game?.longDescription || "",
  };

  // Convert our InputGroup from an array of strings to a single comma-separated string
  const [taglist, setTaglist] = useState(game?.tags || "");
  const updateCheckboxes = useCallback((value: ReactText[]) => {
    setTaglist(
      value
        .filter((t) => (t as string).length > 0)
        .sort()
        .join()
    );
  }, []);

  // Track our thumbnail and banner urls so they get updated as well
  const [banner, setBanner] = useState(game?.banner);
  const [thumbnail, setThumbnail] = useState(game?.thumbnail);

  return (
    <>
      <FormHeader title={editing ? "Update Game" : "Submit New Game"}>
        {editing
          ? "Update the game below. Be sure to save when you're done."
          : "Thanks for your interest in submitting a new game! Please fill out as many fields as possible. Screenshots and downloads can be added after submitting."}
      </FormHeader>
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
              variables: { input },
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
              type="number"
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

            <Flex align="center" mt={5}>
              <FormLabel htmlFor="tags">Tags</FormLabel>
              <InfoButton text="Although there is no hard limit, please select no more than 5 or so." />
            </Flex>
            <CheckboxGroup
              colorScheme="pink"
              defaultValue={taglist.split(",") || []}
              onChange={updateCheckboxes}
            >
              <SimpleGrid minChildWidth={160} spacing={2}>
                {tags.map((tag) => (
                  <Checkbox value={tag} key={tag} name={tag} label={tag}>
                    {tag}
                  </Checkbox>
                ))}
              </SimpleGrid>
            </CheckboxGroup>

            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              variant="solid"
              my={5}
            >
              {editing ? "Save Changes" : "Submit Game"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
