import {useState} from 'react'
// import { motion } from 'framer-motion'
import "./Sidebar.css"
import assets from "../../assets"

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    // const [showContent, setShowContent] = useState(false)

    // const handleAnimationComplete = () => {
    //     setShowContent(prev=> !prev) // Make content visible after width transition is complete
    //     }

  return (
        <div 
        className="sidebar">
            <div className="top">
                <img 
                // onClick={()=>setExtended(prev=>!prev)}
                onClick={() => (setExtended((prev) => !prev))}
                 className='menu' src={assets.menu_icon} alt="menu-icon" />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended?<p>New Chat</p>:null}
                </div>
                {extended?<div className="recent">
                    <p className='recent-title'>Recent</p>
                    <div className="recent-entry">
                        <img src={assets.message_icon} alt="Title" />
                        <p>What is react ...</p>
                    </div>
                </div>: null}
            </div>
            <div className="bottom">
                <div className="bottom-items recent-entry">
                    <img src={assets.question_icon} alt="? Icon" />
                    {extended?<p>Help</p>:null}
                </div>
                <div className="bottom-items recent-entry">
                    <img src={assets.history_icon} alt="? Icon" />
                    {extended?<p>Activity</p>:null}
                </div>
                <div className="bottom-items recent-entry">
                    <img src={assets.setting_icon} alt="? Icon" />
                    {extended?<p>Settings</p>:null}
                </div>
            </div>
        </div>
  )
}

export default Sidebar