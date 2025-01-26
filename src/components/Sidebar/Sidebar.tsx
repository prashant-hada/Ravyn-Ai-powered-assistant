import { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import assets from "../../assets";
import { useAiContext } from "../../hooks/useAiContext";
import { PromptObj } from "../../types";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, recentPrompt, changeToPrevQuery, newChat } =
    useAiContext()!;
  const sidebarRef = useRef<HTMLDivElement>(null);

  const prevQueryClickHandler = ({ id, prompt }: PromptObj) => {
    changeToPrevQuery(prompt, id);
  };

  const newChatHandler = () => {
    newChat();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setExtended(false); // Close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sidebarRef} className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu-icon"
        />
        <div onClick={newChatHandler} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p className="para">New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item: PromptObj) => (
              <div
                onClick={() => prevQueryClickHandler(item)}
                key={item.id}
                className={`recent-entry ${
                  recentPrompt === item.prompt ? "selected" : ""
                }`}
              >
                <img src={assets.message_icon} alt="Title" />
                <p>
                  {item.prompt.slice(0, 18)}
                  {item.prompt.length > 18 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-items recent-entry">
          <img src={assets.question_icon} alt="? Icon" />
          {extended ? <p className="para">Help</p> : null}
        </div>
        <div className="bottom-items recent-entry">
          <img src={assets.history_icon} alt="? Icon" />
          {extended ? <p className="para">Activity</p> : null}
        </div>
        <div className="bottom-items recent-entry">
          <img src={assets.setting_icon} alt="? Icon" />
          {extended ? <p className="para">Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
