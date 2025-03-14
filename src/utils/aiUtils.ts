import {
  GenerateContentRequest,
  GoogleGenerativeAI,
  ObjectSchema,
  SchemaType,
} from "@google/generative-ai";
import { Question } from "../types/questionAnswerTypes";
import { ResponseObject } from "../types/aiTypes";

const GEMENI_API_KEY = process.env.REACT_APP_GEMENI_API_KEY || "";

const genAI = new GoogleGenerativeAI(GEMENI_API_KEY);

const schema: ObjectSchema = {
  description: "Question, list of answers, and correct answer",
  type: SchemaType.OBJECT,
  properties: {
    question: { type: SchemaType.STRING },
    possibleAnswers: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
      },
      minItems: 4,
      maxItems: 4,
    },
    correctAnswer: { type: SchemaType.STRING },
    reasoning: { type: SchemaType.STRING },
  },
  required: ["question", "possibleAnswers", "correctAnswer"],
  // This is what Gemini AI says to use to order the data
  propertyOrdering: ["question", "possibleAnswers", "correctAnswer"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
  systemInstruction: `Imagine you are a teacher who is teaching me about German history, structure of government and society, 
so I can prepare for the German Citizenship Test. 
In your answer, don't include anything related to the fact that you're a 
teacher or any filler text like 'let's break down the question'. 
Just simply relay the factual answer. First, in the "question" part of the response, give me the question translated into English. 
Then in the "possibleAnswers" part of the schema, give me each of the possible answers translated into English, 
and keep the same order that you recieved them in.
Then, in the "correctAnswer" section, give me the reasoning for why the answer is correct and the others are incorrect. Use the original possible answers to justify your reasoning. 
When you mention any of these answers, write them in their German with the English translation in parenthesis. `,
});

export const getResponse = async (
  question: Question
): Promise<ResponseObject | undefined> => {
  const prompt = `Explain this question which is written in German: ${
    question.question
  }. Here are the possible answers which are written in German: ${
    question.possibleAnswers[0]
  }, ${question.possibleAnswers[1]}, ${question.possibleAnswers[2]}, ${
    question.possibleAnswers[3]
  }. The correct answer is: ${
    question.possibleAnswers[question.answer]
  }, which is also written in German. `;

  const requestObject: GenerateContentRequest = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    },
  };
  try {
    // const result = await model.generateContent(requestObject);
    const result = await model.generateContent(prompt);

    const responseText = result.response.text();
    console.log("PROMPT: ", prompt);
    console.log("RESPONSE: ", responseText);
    const responseObject = JSON.parse(responseText) as ResponseObject;
    console.log(responseObject.possibleAnswers[2]);
    return responseObject;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
