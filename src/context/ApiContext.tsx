import React, { createContext, useContext, useState, ReactNode } from "react";
import { getResponse } from "../utils/aiUtils.ts";
import { Question } from "../types/questionAnswerTypes";
import { ResponseObject } from "../types/aiTypes.ts";

interface ApiContextType {
  responseObject: ResponseObject | null;
  fetchResponse: (question: Question) => void;
  loading: boolean;
  error: string | null;
  resetResponse: (responseObject: null, error: null, loading: boolean) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [responseObject, setResponseObject] = useState<ResponseObject | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponse = async (question: Question) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getResponse(question);
      if (response) {
        setResponseObject(response);
      }
    } catch (err) {
      setError("Failed to fetch response");
    } finally {
      setLoading(false);
    }
  };

  const resetResponse = () => {
    setResponseObject(null);
    setLoading(false);
    setError(null);
  };

  return (
    <ApiContext.Provider
      value={{
        responseObject,
        fetchResponse,
        loading,
        error,
        resetResponse,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};
