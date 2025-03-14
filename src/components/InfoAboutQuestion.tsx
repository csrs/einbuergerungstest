import React from "react";
import { getResponse } from "../utils/aiUtils.ts";
import { Question } from "../types/questionAnswerTypes.ts";

export const InfoAboutQuestion = (question: Question) => {
  const responseText = getResponse(question);
  const [];
  return (
    <div>
      <p>{responseText}</p>
    </div>
  );
};
