import { chooseRandomQuestions } from "./questionAnswerUtils";
import { Question, QuestionAnswerKey } from "../types/questionAnswerTypes";

describe("chooseRandomQuestions", () => {
  it("should choose random questions from both arrays", () => {
    const mainQuestions: Question[] = [
      { id: 1, question: "Q1", possibleAnswers: ["A", "B", "C"], answer: 0 },
      { id: 2, question: "Q2", possibleAnswers: ["A", "B", "C"], answer: 1 },
    ];
    const hamburgQuestions: Question[] = [
      { id: 3, question: "Q3", possibleAnswers: ["A", "B", "C"], answer: 2 },
      { id: 4, question: "Q4", possibleAnswers: ["A", "B", "C"], answer: 0 },
    ];
    const randomQuestions = chooseRandomQuestions(
      mainQuestions,
      hamburgQuestions
    );
    expect(randomQuestions.length).toBeGreaterThan(0);
    expect(randomQuestions.length).toBeLessThanOrEqual(
      mainQuestions.length + hamburgQuestions.length
    );
  });
});
