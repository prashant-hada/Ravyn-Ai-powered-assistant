import {createContext, useContext, useState } from "react";
import runGemini from "../config/gemini";

const AiContext = createContext({});

const ContextProvider = ({children}:{children:React.ReactNode})=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    const onSent = async (prompt:string)=>{
        const response = await runGemini(prompt);
    }

    // onSent('what is react js');
    const contextValue ={
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResults,
        loading,
        setLoading,
        setShowResults,
        resultData,
        setResultData
    }

    return(
        <AiContext.Provider value={contextValue}>
            {children}
        </AiContext.Provider> 
    )
}

export const useAiContext =()=> useContext(AiContext);

export default ContextProvider