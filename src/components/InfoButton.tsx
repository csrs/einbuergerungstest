import React from "react";
import { Question } from "../types/questionAnswerTypes";
import { useApiContext } from "../context/ApiContext.tsx";

export const InfoButton = ({ question }: { question: Question }) => {
  const { responseObject, fetchResponse, loading, error } = useApiContext();

  return (
    <>
      <button onClick={() => fetchResponse(question)}>See the answer</button>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {responseObject && (
          <div style={{ border: "1px solid black", padding: "0px 20px" }}>
            <p>{responseObject.reasoning}</p>
          </div>
        )}
      </div>
    </>
  );
};
