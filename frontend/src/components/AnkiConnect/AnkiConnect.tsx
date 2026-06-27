import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SharedFormPaper } from "../SharedFormPaper/SharedFormPaper";
import {
  getAnkiDecks,
  getAnkiModelNames,
} from "../../api/generated/endpoints/anki/anki";
import { useEffect, useState } from "react";
import { RadioGroupSelector } from "../RadioGroupSelector/RadioGroupSelector";
import Button from "@mui/material/Button";

export const AnkiConnect = () => {
  const [modelNames, setModelNames] = useState<string[] | undefined>(undefined);
  const [deckNames, setDeckNames] = useState<string[] | undefined>(undefined);
  const fetchDecks = async () => {
    try {
      const response = await getAnkiDecks();
      if (response.status === 200) {
        setDeckNames(response.data);
      }
    } catch (e) {
      console.error(e, "failed to fetch decks");
    }
  };

  const fetchModelNames = async () => {
    try {
      const response = await getAnkiModelNames();
      if (response.status === 200) {
        setModelNames(response.data);
      }
    } catch (e) {
      console.error(e, "failed to fetch model names");
    }
  };

  return (
    <SharedFormPaper maxWidth={760}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Button variant="contained" onClick={fetchDecks}>
            Fetch Decks
          </Button>
          {deckNames && (
            <>
              <Typography>Deck names</Typography>
              <RadioGroupSelector
                options={deckNames.filter((e) => e !== "Default")}
              />
            </>
          )}
        </Box>

        {deckNames && (
          <Box>
            <Button variant="contained" onClick={fetchModelNames}>
              Fetch Card types
            </Button>
          </Box>
        )}
      </Box>
    </SharedFormPaper>
  );
};
