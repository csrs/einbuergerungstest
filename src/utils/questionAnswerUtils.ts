import { Answer, Question } from "../types/questionAnswerTypes";

// export const populateArray = (
//   newArray: Question[],
//   newArrayLength: number,
//   originalArray: Question[],
//   alreadyPopulatedIndices: number[],
//   omittedQuestionIds: number[]
// ): Question[] => {
//   while (newArray.length < newArrayLength) {
//     const randomIndex = Math.floor(Math.random() * originalArray.length);
//     if (
//       !alreadyPopulatedIndices.includes(randomIndex) &&
//       !omittedQuestionIds?.includes(randomIndex)
//     ) {
//       newArray.push(originalArray[randomIndex]);
//       alreadyPopulatedIndices.push(randomIndex);
//     }
//   }
//   console.log(newArray);
//   return newArray;
// };

// export const chooseRandomQuestions = (
//   mainQuestions: Question[],
//   hamburgQuestions: Question[],
//   omittedQuestionIds: number[],
//   numberOfMainQuestions: number,
//   numberOfHamburgQuestions: number
// ): Question[] => {
//   let newArray: Question[] = [];

//   newArray = populateArray(
//     newArray,
//     numberOfMainQuestions,
//     mainQuestions,
//     [],
//     omittedQuestionIds
//   );
//   newArray = populateArray(
//     newArray,
//     numberOfMainQuestions + numberOfHamburgQuestions,
//     hamburgQuestions,
//     [],
//     omittedQuestionIds
//   );
//   return newArray;
// };

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
    const randomNumber =
      350 + Math.floor(Math.random() * hamburgQuestions.length);
    // todo: refactor how the questions array is structered
    console.log(
      "---",
      "chosenHamburgIndices: ",
      chosenHamburgIndices,
      "randomNumber: ",
      randomNumber - 350,
      chosenHamburgIndices.includes(randomNumber - 350)
    );
    if (
      !chosenHamburgIndices.includes(randomNumber - 350) &&
      !ommittedQuestionIds?.includes(randomNumber)
    ) {
      newArray.push(hamburgQuestions[randomNumber - 350]);
      chosenHamburgIndices.push(randomNumber - 350);
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

export const isSessionStorageAvailable = () => {
  try {
    const testKey = "test";
    sessionStorage.setItem(testKey, "testValue");
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};
