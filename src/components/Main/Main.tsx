import assets from '../../assets'
import "highlight.js/styles/atom-one-dark.css";
import MarkdownWithCodeBlock from '../MarkdownWithCodeBlock/MarkdownWithCodeBlock';
import { useAiContext } from '../../hooks/useAiContext'
import Card from '../Card/Card';
import "./Main.css"

const Main = () => {
    const {onSent, recentPrompt, showResults, loading, setInput, input} = useAiContext();
  return (
    <div className='main'>
        <div className="nav">
            <p>Rayvyn</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResults? 
                <>
                <div className="greet">
                <p><span>Hey, Amigo</span></p>
                <p>Shall we get started?</p>
            </div>
            <div className="cards">
                <Card content='Suggest beatiful places to see on an upcomming road trip' icon={assets.compass_icon} />
                <Card content='Briefly summarize this concept: urban planning' icon={assets.bulb_icon} />
                <Card content='Brainstorm team bonding activities for our work retreat' icon={assets.message_icon} />
                <Card content='Improve the readability of the code' icon={assets.code_icon} />
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
                        <img className='hidden-img' src={assets.gallery_icon} alt="" />
                        <img className='hidden-img' src={assets.mic_icon} alt="" />
                        <img onClick={()=> onSent(input)} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <div className="bottom-info">
                    Ravyn uses third-party APIs to generate it's response, thus is not responsible for any info that proves out to be not true. Use Ravyn at your own discretion.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main