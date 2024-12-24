import React, { useEffect, useState } from "react";
import { mainQuestions, hamburgQuestions } from "../consts/questions.ts";
import { QuestionAnswerKey, Storage } from "../types/questionAnswerTypes.ts";
import {
  chooseRandomQuestions,
  isSessionStorageAvailable,
} from "../utils/questionAnswerUtils.ts";
import "./../App.css";

export const QuestionGroup = () => {
  const GREEN = "lightgreen";
  const YELLOW = "yellow";
  const [submittedAnswers, setSubmittedAnswers] = useState<QuestionAnswerKey>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [randomQs, setRandomQs] = useState(() =>
    chooseRandomQuestions(mainQuestions, hamburgQuestions, [])
  );
  const [ommittedQuestions, setOmmittedQuestions] = useState<number[]>([]);
  const [score, setScore] = useState<number | undefined>(undefined);
  const [storageObject, setStorageObject] = useState<Storage>({});

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
            setOmmittedQuestions((prev) => {
              return [...prev, question.id];
            });
          }
          return updatedStorageObject;
        });
      }
    });
    setScore(newScore);
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log("right before resetting qs: ", ommittedQuestions);
    setRandomQs(
      chooseRandomQuestions(mainQuestions, hamburgQuestions, ommittedQuestions)
    );
    setSubmittedAnswers({});
    setIsSubmitted(false);
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
    <div className="container">
      <div className="column form">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <fieldset>
            <legend>33 Questions</legend>
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
                          ? GREEN
                          : YELLOW,
                      }}
                    >
                      <strong>
                        Question #{q.id + 1}: {q.question}
                      </strong>
                      {q.image && (
                        <img src={q.image} style={{ width: "200px" }} />
                      )}
                    </div>
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
                          <label
                            htmlFor={`question${q.id.toString()}-${index}`}
                          >
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
                      backgroundColor: score >= 17 ? GREEN : YELLOW,
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
      <div className="column instructions">
        {ommittedQuestions.length > 0 && (
          <p>
            Hidden questions:
            <span style={{ marginLeft: "5px" }}>
              {ommittedQuestions
                .map((q) => q + 1)
                .sort((a, b) => a - b)
                .join(", ")}
            </span>
          </p>
        )}
        <p>
          Questions come from <em>Mein Einbürgerungstest</em> by Hans Jörg
          Schrötter. 30 questions have been randomly chosen from the Allgemeine
          Fragen question bank, and 3 from the Hamburg question bank. The
          "Question #" refers to the actual question number in the book.
          <br />
          <br />
          <strong>Instructions:</strong>
          <ol>
            <li>Answer all questions.</li>
            <li>
              Click "Submit". Correctly answered questions will be highlighed in
              green. Incorrectly answered questions will be highlighted in
              yellow.
            </li>
            <li>
              Click "New questions" to get a set of 33 more randomly chosen
              questions.
            </li>
            <li>
              If you correctly answer the same question 3 times, it won't appear
              again. This is kept track of in your browser's Session Storage (if
              your browser allows it).
            </li>
            <li>
              If you want to delete your session storage, click "Delete Session
              Storage". You don't need to refresh the page afterwards.
            </li>
          </ol>
        </p>
      </div>
    </div>
  );
};
