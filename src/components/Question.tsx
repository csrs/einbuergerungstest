import React from "react";
import { Question as QuestionType } from "../types/questionAnswerTypes.ts";

import "./../App.css";
import { Colors } from "../consts/colors.ts";
import { InfoButton } from "../components/InfoButton.tsx";
import { useApiContext } from "../context/ApiContext.tsx";

export const Question = ({
  question,
  isSubmitted,
  isCorrectlyAnswered,
}: {
  question: QuestionType;
  isSubmitted?: boolean;
  isCorrectlyAnswered?: boolean;
}) => {
  const { responseObject, loading } = useApiContext();
  console.log(loading, responseObject);
  return (
    <div key={question.id} className="question-item">
      {isSubmitted && <InfoButton question={question} />}
      <div
        className="question-content"
        style={{
          borderRadius: 10,
          padding: "5px 10px",
          backgroundColor: !isSubmitted
            ? ""
            : isCorrectlyAnswered
            ? Colors.GREEN
            : Colors.YELLOW,
        }}
      >
        <strong>
          Question #{question.id + 1}: {question.question}
        </strong>
        {question.image && (
          <img src={question.image} style={{ width: "200px" }} />
        )}
      </div>
      {question.possibleAnswers.map((a, index) => {
        return (
          <div key={index}>
            <input
              required
              type="radio"
              id={`question${question.id.toString()}-${index}`}
              name={question.id.toString()}
              value={index.toString()}
            />
            <label htmlFor={`question${question.id.toString()}-${index}`}>
              {a}
              {!loading && responseObject && (
                <span
                  style={{
                    fontStyle: "italic",
                    backgroundColor:
                      index === question.answer ? Colors.GREEN : "transparent",
                    padding: "3px 10px",
                    borderRadius: 10,
                    marginLeft: 10,
                  }}
                >
                  {responseObject?.possibleAnswers[index]}
                </span>
              )}
            </label>
          </div>
        );
      })}
      <br />
    </div>
  );
};
