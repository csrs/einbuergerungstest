import React, { useState } from "react";
import { mainQuestions, hamburgQuestions } from "../consts/questions.ts";
import { QuestionAnswerKey } from "../types/questionAnswerTypes.ts";
import {
  calculateScore,
  chooseRandomQuestions,
} from "../utils/questionAnswerUtils.ts";
import "./../App.css";

export const QuestionGroup = () => {
  const [submittedAnswers, setSubmittedAnswers] = useState<QuestionAnswerKey>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [randomQs, setRandomQs] = useState(() =>
    chooseRandomQuestions(mainQuestions, hamburgQuestions)
  );
  const [score, setScore] = useState(0);

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
      }
    });
    setScore(newScore);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setRandomQs(chooseRandomQuestions(mainQuestions, hamburgQuestions));
    setSubmittedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <fieldset>
        <legend>Select options:</legend>
        <div className="questions-container">
          {randomQs.map((q) => {
            const isCorrectlyAnswered = submittedAnswers[q.id] === q.answer;
            return (
              <div key={q.id} className="question-item">
                <div
                  className="question-content"
                  style={{
                    backgroundColor: !isSubmitted
                      ? ""
                      : isCorrectlyAnswered
                      ? "lightgreen"
                      : "yellow",
                  }}
                >
                  <strong>
                    {q.id + 1}: {q.question}
                  </strong>
                  {q.image && <img src={q.image} style={{ width: "200px" }} />}
                </div>
                <span style={{ color: "red" }}> *</span>

                {q.possibleAnswers.map((a, index) => {
                  return (
                    <div key={index}>
                      <input
                        required
                        type="radio"
                        id={`question${q.id.toString()}-${index}`}
                        name={q.id.toString()}
                        value={index.toString()}
                      />
                      <label htmlFor={`question${q.id.toString()}-${index}`}>
                        {a}
                      </label>
                    </div>
                  );
                })}
                <br />
              </div>
            );
          })}
        </div>
        <button type="submit">Submit</button>
        <button type="reset">New Questions</button>
        <span>{score}</span>
      </fieldset>
    </form>
  );
};
