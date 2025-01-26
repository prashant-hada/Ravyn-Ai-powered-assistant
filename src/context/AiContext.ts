import { createContext } from "react";

interface AiContextType {
    onSent: (content: string) => void;
    prevPrompts: { prompt: string; id: string }[];
    changeToPrevQuery: (prompt: string, id: string) => void;
    recentPrompt: string;
    showResults: boolean;
    loading: boolean;
    setInput: (input: string) => void;
    input: string;
    setResultData: (data: string) => void;
    newChat: () => void;
    resultData: string,
    newResponseFlag: boolean
  }
  
  export const AiContext = createContext<AiContextType | undefined>(undefined);