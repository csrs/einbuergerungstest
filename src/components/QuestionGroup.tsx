import React, { useEffect, useState } from "react";
import { mainQuestions, hamburgQuestions } from "../consts/questions.ts";
import { QuestionAnswerKey, Storage } from "../types/questionAnswerTypes.ts";
import {
  chooseRandomQuestions,
  isSessionStorageAvailable,
} from "../utils/questionAnswerUtils.ts";
import "./../App.css";
import { Question } from "./Question.tsx";
import { useApiContext } from "../context/ApiContext.tsx";

export const QuestionGroup = () => {
  const { resetResponse } = useApiContext();

  const [submittedAnswers, setSubmittedAnswers] = useState<QuestionAnswerKey>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [omittedQuestions, setOmittedQuestions] = useState<number[]>([]);

  const [randomQs, setRandomQs] = useState(() =>
    chooseRandomQuestions(mainQuestions, hamburgQuestions, omittedQuestions)
  );
  const [score, setScore] = useState<number | undefined>(undefined);
  const [storageObject, setStorageObject] = useState<Storage>(() => {
    const savedStorageObject = sessionStorage.getItem("storageObject");
    return savedStorageObject !== null ? JSON.parse(savedStorageObject) : {};
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submittedAnswers = Array.from(formData.entries()).reduce(
      (acc, entry) => {
        const [questionId, submittedAnswer] = entry; // name and value from each form element
        const questionIdAsNumber = Number(questionId);
        const submittedAnswerAsNumber = Number(submittedAnswer as string);
        acc[questionIdAsNumber] = submittedAnswerAsNumber;
        return acc;
      },
      {}
    );
    setSubmittedAnswers(submittedAnswers);
    setIsSubmitted(true);

    let newScore = 0;
    randomQs.forEach((question) => {
      if (submittedAnswers[question.id] === question.answer) {
        newScore += 1;
        setStorageObject((prevStorageObject) => {
          const updatedStorageObject = {
            ...prevStorageObject,
            [question.id]: (prevStorageObject[question.id] || 0) + 1,
          };
          if (updatedStorageObject[question.id] === 3) {
            setOmittedQuestions((prev) => {
              return [...prev, question.id];
            });
          }
          return updatedStorageObject;
        });
      }
    });
    setScore(newScore);
    window.scrollTo(0, 0);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setRandomQs(
      chooseRandomQuestions(mainQuestions, hamburgQuestions, omittedQuestions)
    );
    setSubmittedAnswers({});
    setIsSubmitted(false);
    resetResponse(null, null, false);
  };

  const handleDeleteSessionStorage = () => {
    if (isSessionStorageAvailable()) {
      setStorageObject({});
      sessionStorage.removeItem("correctQuestions");
    } else {
      console.warn("Session storage is not available.");
    }
  };

  useEffect(() => {
    if (isSessionStorageAvailable()) {
      sessionStorage.setItem("correctQuestions", JSON.stringify(storageObject));
    } else {
      console.warn("Session storage is not available.");
    }
  }, [storageObject]);

  return (
    <div className="column form">
      {omittedQuestions && omittedQuestions.length > 0 && (
        <p>
          <strong>Hidden questions:</strong>
          <span style={{ marginLeft: "5px" }}>
            {omittedQuestions
              .map((q) => q + 1)
              .sort((a, b) => a - b)
              .join(", ") || "none"}
          </span>
        </p>
      )}
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <fieldset>
          <legend>
            33 Questions. Hidden questions:
            <span style={{ marginLeft: "5px" }}>
              {omittedQuestions
                .map((q) => q + 1)
                .sort((a, b) => a - b)
                .join(", ") || "none"}
            </span>
          </legend>
          <div className="questions-container">
            {randomQs.map((q) => {
              const isCorrectlyAnswered = submittedAnswers[q.id] === q.answer;
              return (
                <Question
                  question={q}
                  isSubmitted={isSubmitted}
                  isCorrectlyAnswered={isCorrectlyAnswered}
                />
              );
            })}
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="reset">New Questions</button>
            <button type="button" onClick={handleDeleteSessionStorage}>
              Delete Session Storage
            </button>
            {score && (
              <span>
                Score:
                <span
                  style={{
                    // backgroundColor: score >= 17 ? Colors.GREEN : Colors.YELLOW,
                    marginLeft: "5px",
                  }}
                >
                  {score}
                </span>
              </span>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};
