import React from "react";
import { Question } from "../types/questionAnswerTypes.ts";
import { useApiContext } from "../context/ApiContext.tsx";

export const InfoAboutQuestion = () => {
  const { responseObject } = useApiContext();

  return responseObject ? (
    <div>
      <p>{responseObject.reasoning}</p>
    </div>
  ) : null;
};
