import { useState } from "react";
import runGemini from "../config/gemini";
import { AiContext } from "./AiContext";
import StorePrevPromptAndResponse from "../utils/storePrevPromptAndResponse";


const ContextProvider = ({children}:{children:React.ReactNode})=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState ([]);
    const [prevResponses, setPrevResponses] = useState ([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    const onSent = async (prompt:string)=>{
        setResultData("");
        setLoading(true);
        setShowResults(true);
        setRecentPrompt(prompt);
        setInput("");
       const response = await runGemini(prompt);
       const formattedResponse = response.replace(/<b>(.*?)<\/b>/g, "**$1**"); 
       setResultData(formattedResponse);
       StorePrevPromptAndResponse(prompt, formattedResponse, setPrevPrompts, setPrevResponses)
        setLoading(false);
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
        setResultData,
        prevResponses,
        setPrevResponses
    }

    return(
        <AiContext.Provider value={contextValue}>
            {children}
        </AiContext.Provider> 
    )
}

export default ContextProvider