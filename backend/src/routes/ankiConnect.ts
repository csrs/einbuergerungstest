const ANKI_HOST = process.env.ANKI_HOST ?? "127.0.0.1";
const ANKI_PORT = process.env.ANKI_PORT ?? "8765";
const url = `http://${ANKI_HOST}:${ANKI_PORT}`;

type AnkiResponse<T> = {
  result: T;
  error: string | null;
};

async function invokeAnki<T>(action: string, params = {}): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, version: 5, params }),
    });
    const data = (await res.json()) as AnkiResponse<T>;
    if (data.error) throw new Error(data.error);
    return data.result;
  } catch (err) {
    console.error("AnkiConnect request failed:", { url, err });
    throw err;
  }
}

export async function getDeckNames(): Promise<string[]> {
  return invokeAnki<string[]>("deckNames");
}

export async function getModelNames(): Promise<string[]> {
  return invokeAnki<string[]>("modelNames");
}
