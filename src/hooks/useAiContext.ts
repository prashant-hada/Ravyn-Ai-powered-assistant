import { useContext } from "react";
import {AiContext} from "../context/AiContext"

export const useAiContext = () => {
    const context = useContext(AiContext);
    if (!context) {
      throw new Error("useAiContext must be used within a ContextProvider");
    }
    return context;
  };