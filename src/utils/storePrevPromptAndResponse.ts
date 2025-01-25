import useGenerateId from "../hooks/useGenerateId";
import { PromptObj, ResponseObj } from "../types";

type SetPrevPromptsType = React.Dispatch<React.SetStateAction<{ id: string; prompt: string }[]>>;
type SetPrevResponses = React.Dispatch<React.SetStateAction<{ id: string; response: string }[]>>;

const StorePrevPromptAndResponse = (
    // {
        prompt ="Your prompt is not available.", 
        response="Response is not available.", 
        setPrevPrompts:SetPrevPromptsType, 
        setPrevResponses:SetPrevResponses
    // }: FunctionProps
        )=>{

    const id = useGenerateId();
    const promptObj:PromptObj = {
        id,
        prompt
    }
    const responseObj: ResponseObj = {
        id,
        response
    }

    setPrevPrompts(prev=>[...prev,promptObj]);
    setPrevResponses(prev=>[...prev, responseObj])
    return id;
}    

export default StorePrevPromptAndResponse;
