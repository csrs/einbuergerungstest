import { Answer, Question } from "../types/questionAnswerTypes";

export const chooseRandomQuestions = (
  mainQuestions: Question[],
  hamburgQuestions: Question[],
  ommittedQuestionIds?: number[]
): Question[] => {
  const newArray: Question[] = [];
  const chosenMainIndices: number[] = [];
  const chosenHamburgIndices: number[] = [];
  while (newArray.length < 30) {
    const randomNumber = Math.floor(Math.random() * mainQuestions.length);
    if (
      !chosenMainIndices.includes(randomNumber) &&
      !ommittedQuestionIds?.includes(randomNumber)
    ) {
      newArray.push(mainQuestions[randomNumber]);
      chosenMainIndices.push(randomNumber);
    }
  }
  while (newArray.length < 33) {
    const randomNumber = Math.floor(Math.random() * hamburgQuestions.length);
    if (
      !chosenHamburgIndices.includes(randomNumber) &&
      !ommittedQuestionIds?.includes(randomNumber)
    ) {
      newArray.push(hamburgQuestions[randomNumber]);
      chosenHamburgIndices.push(randomNumber);
    }
  }

  return newArray;
};

export const findQuestionStringById = (
  questions: Question[],
  questionId: number
): string | undefined => {
  const questionResult: Question | undefined = questions.find(
    (q) => q.id === questionId
  );
  if (!questionResult) {
    return undefined;
  }
  return questionResult.question;
};

export const convertAnswerNumberToString = (
  questions: Question[],
  questionId: number,
  answerNumber: number
): string | undefined => {
  const questionResult: Question | undefined = questions.find((q) => {
    q.id = questionId;
  });
  if (!questionResult) {
    return undefined;
  }
  return questionResult.possibleAnswers[answerNumber];
};

export const compareSubmittedAnswer = (
  questionId: number,
  submittedAnswer: number,
  answers: Answer[]
): boolean => {
  const answer = answers.find((a) => a.id === questionId);
  if (!answer) {
    return false;
  }
  return answer.answer === submittedAnswer;
};
