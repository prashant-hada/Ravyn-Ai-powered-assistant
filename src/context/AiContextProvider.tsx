import { useState } from "react";
import runGemini from "../config/gemini";
import { AiContext } from "./AiContext";
import { PromptObj, ResponseObj } from "../types";
import StorePrevPromptAndResponse from "../utils/storePrevPromptAndResponse";


const ContextProvider = ({children}:{children:React.ReactNode})=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState<PromptObj[]>([]);
    const [prevResponses, setPrevResponses] = useState<ResponseObj[]> ([]);
    const [newResponseFlag, setNewResponseFlag] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    const onSent = async (prompt:string)=>{
        setLoading(true);
        setShowResults(true);
        setRecentPrompt(prompt);
        setInput("");
        setNewResponseFlag(true);
       const response = await runGemini(prompt);
       const formattedResponse = response.replace(/<b>(.*?)<\/b>/g, "**$1**"); 
       setResultData(formattedResponse);
       StorePrevPromptAndResponse(prompt, formattedResponse, setPrevPrompts, setPrevResponses)
       setLoading(false);
    }

    const changeToPrevQuery =(prompt:string,id:string)=>{
        const responseObj:ResponseObj = (prevResponses.filter((item:ResponseObj)=>item.id=== id))[0];
        setShowResults(true);
        setRecentPrompt(prompt);
        setNewResponseFlag(false);
        setResultData(responseObj.response);
    }

    const newChat=()=>{
        setShowResults(false);
        setRecentPrompt("");
        setResultData("")
    }
    // onSent('what is react js');
    const contextValue ={
        onSent,
        changeToPrevQuery,
        newChat,
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
        setPrevResponses,
        newResponseFlag,
        setNewResponseFlag
    }

    return(
        <AiContext.Provider value={contextValue}>
            {children}
        </AiContext.Provider> 
    )
}

export default ContextProvider