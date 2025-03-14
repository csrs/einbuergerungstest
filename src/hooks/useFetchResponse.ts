import { useEffect } from "react";
import { Question } from "../types/questionAnswerTypes";
import { useApiContext } from "../context/ApiContext.tsx";
import { ResponseObject } from "../types/aiTypes";

export type SuccessOrFailObject = {
  responseObject: ResponseObject | null;
  loading: boolean;
  error: string | null;
};

export const useFetchResponse = (question: Question): SuccessOrFailObject => {
  const { responseObject, fetchResponse, loading, error } = useApiContext();

  useEffect(() => {
    fetchResponse(question);
  }, [question, fetchResponse]);

  return { responseObject, loading, error };
};
