import "./MarkdownWithCodeBlock.css"
import  { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or choose any other theme
import { useAiContext } from "../../hooks/useAiContext";

// interface Props {
//   resultData: string; // The markdown content
// }

const MarkdownWithCopyBlock = () => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const indexRef = useRef<number>(0); 
  const {resultData} = useAiContext();

  useEffect(() => {
    if (!resultData || resultData.length === 0) return;

    // Clear previous text when resultData changes
    setDisplayedText("");

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + resultData[indexRef.current]);

      // Update the index
      if (indexRef.current + 1 < resultData.length) {
        indexRef.current += 1;
      } else {
        clearInterval(intervalId); // Stop the interval when done
      }
    }, 15); // Typing speed (50ms)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [resultData]);


  return (
    <div className="markdown-container">
      <ReactMarkdown
        className="response-data"
        components={{
          // Custom component for code blocks to add a copy button
          code({ node, inline, className, children, ...props }) {
            const codeString = children ? String(children).trim() : ''; // Ensure we're working with the raw code text
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [copied, setCopied] = useState(false); // State to track if copied for each code block

            const handleCopy = () => {
              setCopied(true);
              setTimeout(() => setCopied(false), 3000); // Reset the copied text after 2 seconds
            };

            if (inline) {
              return <code className={className} {...props}>{children}</code>;
            }

            return (
              <div className="code-block">
                <SyntaxHighlighter language="typescript" style={tomorrow}>
                  {children as string}
                </SyntaxHighlighter>
                <CopyToClipboard text={codeString} onCopy={handleCopy}>
                  <button className="copy-button">{copied ? 'Copied' : 'Copy'}</button>
                </CopyToClipboard>
              </div>
            );
          }
        }}
      >
        {/* This is where we render the typed-out text (markdown text, not code blocks) */}
        {displayedText}
      </ReactMarkdown>
    </div>
  );
};



export default MarkdownWithCopyBlock;
