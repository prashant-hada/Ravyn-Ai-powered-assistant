import "./MarkdownWithCodeBlock.css"
import  { useState, useEffect,  } from 'react';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or choose any other theme

interface Props {
  resultData: string; // The markdown content
}

const MarkdownWithCopyBlock = ({ resultData }: Props) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (resultData.length === 0) return;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + resultData[index]);
      setIndex((prevIndex) => {
        if (prevIndex + 1 < resultData.length) {
          return prevIndex + 1;
        } else {
          clearInterval(intervalId);
          return prevIndex;
        }
      });
    }, 15); // Typing speed (50ms)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [resultData, index]);


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
