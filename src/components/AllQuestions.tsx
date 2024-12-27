import React, { useState } from "react";
import { allQuestions } from "../consts/questions.ts";
import { QuestionAnswerKey } from "../types/questionAnswerTypes.ts";

import "./../App.css";
import { Instructions } from "./Instructions.tsx";
import { Question as QuestionType } from "../types/questionAnswerTypes.ts";
import { Question } from "./Question.tsx";

export const AllQuestions = () => {
  const [submittedAnswers, setSubmittedAnswers] = useState<QuestionAnswerKey>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] =
    useState<QuestionType[]>(allQuestions);

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

    setIncorrectAnswers((prev) =>
      prev.filter((q) => submittedAnswers[q.id] !== q.answer)
    );
  };

  return (
    <>
      <div className="column form">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Questions</legend>
            <div className="questions-container">
              {incorrectAnswers.map((q) => {
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
              <button type="submit">
                Submit and remove correctly-answered questions
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <Instructions allQuestionsMode />
    </>
  );
};
