import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import { RegularGameFragment, useMeQuery } from "../generated/graphql";
import { Upload } from "./Upload";

interface DownloadListProps {
  game: RegularGameFragment;
}

export const DownloadList: React.FC<DownloadListProps> = ({ game }) => {
  const { data } = useMeQuery();

  if (!data?.me) return <Text>Please log in to access game downloads.</Text>;

  return (
    <Box pos="relative">
      <Box pos="absolute" top={"-50px"} right={0}>
        {game && data?.me?.isSubmitter && (
          <Upload
            game={game}
            type="download"
            onFinish={(url) => console.log("Uploaded ", url)}
          />
        )}
      </Box>
      {game.downloads && game.downloads.length > 0 ? (
        game.downloads.map((d, i) => {
          const split = d.url.split("/");
          const filename = split[split.length - 1];
          return (
            <Text key={i + d.url} my={3}>
              <Link variant="footerLink" href={d.url}>
                {filename} <DownloadIcon />
              </Link>
            </Text>
          );
        })
      ) : (
        <Text>There are no downloads for this game yet.</Text>
      )}
    </Box>
  );
};
