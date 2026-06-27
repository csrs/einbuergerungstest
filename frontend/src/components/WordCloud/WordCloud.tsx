import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { getAllWords } from "../../api/generated/endpoints/words/words";
import type { WordListItem } from "../../api/generated/types";

export const WordCloud = () => {
  const [droppedButtons, setDroppedButtons] = useState<string[]>([]);
  const [words, setWords] = useState<WordListItem[] | undefined>(undefined);

  function handleDragStart(
    event: React.DragEvent<HTMLButtonElement>,
    id: string,
  ) {
    event.dataTransfer.setData("text/plain", id);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const id = event.dataTransfer.getData("text/plain");

    setDroppedButtons((prev) => [...prev, id]);
  }

  const fetchWords = async () => {
    try {
      const response = await getAllWords();
      if (response.status === 200) {
        setWords(response.data);
      }
    } catch (e) {
      console.error(e, "failed to fetch words");
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        {words ? (
          words.map((w) => (
            <Button
              key={w.id}
              variant="contained"
              draggable
              onDragStart={(e) => handleDragStart(e, w.value)} // event, string (this is the "id")
              sx={{ height: 3 }}
            >
              {w.value}
            </Button>
          ))
        ) : (
          <CircularProgress aria-label="Loading…" />
        )}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          height: "200px",
          display: "flex",
          gap: 2,
          border: " 1px dashed black",
          padding: 2,
        }}
      >
        {droppedButtons.map((id, index) => (
          <Button variant="contained" key={`${id}-${index}`} sx={{ height: 3 }}>
            {id}
          </Button>
        ))}
      </div>
    </div>
  );
};
