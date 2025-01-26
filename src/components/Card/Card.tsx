import {} from 'react'
import "./Card.css"

const Card = ({content, icon}:{content:string, icon:string}) => {
  return (
    <div className="card">
                    <p>{content}</p>
                    <img src={icon} alt="" />
    </div>
  )
}

export default Card