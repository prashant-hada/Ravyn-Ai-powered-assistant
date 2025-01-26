import {} from 'react'
import "./Card.css"
import { useAiContext } from '../../hooks/useAiContext'

const Card = ({content, icon}:{content:string, icon:string}) => {
    const {onSent, prevPrompts, changeToPrevQuery, recentPrompt} = useAiContext()

    const cardClickHandler =()=>{
        const promptObj = prevPrompts.find(item=> item.prompt === content);
        if(promptObj?.prompt) changeToPrevQuery(promptObj.prompt, promptObj.id);
        else onSent(content);
    }

  return (
    <div
    onClick={cardClickHandler}
     className="card">
                    <p>{content}</p>
                    <img src={icon} alt="" />
    </div>
  )
}

export default Card