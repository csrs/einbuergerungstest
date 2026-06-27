import { Router } from "express";
import { getDeckNames, getModelNames } from "./ankiConnect.js";

export const router = Router();

router.get("/decks", async (_req, res) => {
  void _req;
  try {
    const decks = await getDeckNames();
    res.json(decks);
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(502).json({ error: "Failed to reach AnkiConnect" });
  }
});

router.get("/modelNames", async (_req, res) => {
  void _req;
  try {
    const decks = await getModelNames();
    res.json(decks);
  } catch (error) {
    console.error("Error fetching model names:", error);
    res.status(502).json({ error: "Failed to reach AnkiConnect" });
  }
});
