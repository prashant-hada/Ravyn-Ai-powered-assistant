import useGenerateId from "../hooks/useGenerateId";

interface FunctionProps {
    prompt: string;
    response: string;
    setPrevPrompts: React.Dispatch<React.SetStateAction<{ id: string; prompt: string }[]>>;
    setPrevResponses:React.Dispatch<React.SetStateAction<{ id: string; response: string }[]>>;
}

type SetPrevPromptsType = React.Dispatch<React.SetStateAction<{ id: string; prompt: string }[]>>;
type SetPrevResponses = React.Dispatch<React.SetStateAction<{ id: string; response: string }[]>>;

interface Id {
    id: string;
}

interface PromptObj extends Id{
    prompt: string;
}

interface ResponseObj extends Id{
    response: string;
}
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
    return;
}    

export default StorePrevPromptAndResponse;
