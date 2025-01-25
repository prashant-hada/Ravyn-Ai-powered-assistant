import assets from '../../assets'
import "highlight.js/styles/atom-one-dark.css";
import MarkdownWithCodeBlock from '../MarkdownWithCodeBlock/MarkdownWithCodeBlock';
import { useAiContext } from '../../hooks/useAiContext'
import "./Main.css"

const Main = () => {
    const {onSent, recentPrompt, showResults, loading, setInput, input} = useAiContext();
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResults? 
                <>
                <div className="greet">
                <p><span>Hello, Dev</span></p>
                <p>How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beatiful places to see on an upcomming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the code</p>
                    <img src={assets.code_icon} alt="" />
                </div> 
            </div>
                </> 

                :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading? <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div> :
                        <div className="response">
                            {/* <ReactMarkdown className="response-data" rehypePlugins={[rehypeHighlight]}>{resultData}</ReactMarkdown>
                            <Response markdownText={resultData} /> */}
                            <MarkdownWithCodeBlock/>
                        </div>
                        // <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
            }
            
            {/* Input section */}
            <div className="main-bottom">
                <div className="search-box">
                    <input
                     onChange={(e)=>setInput(e.target.value)}
                     value={input}
                     type="text" placeholder='Enter a prompt here'
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && input.trim() !== '') {
                          onSent(input); // Trigger the onSent function when Enter is pressed
                        }
                      }}
                     />
                    <div className="">
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={()=> onSent(input)} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <div className="bottom-info">
                    Gemini may display info, including about people, so double-check its responses.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main