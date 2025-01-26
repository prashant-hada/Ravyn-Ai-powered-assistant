import "./MarkdownWithCodeBlock.css";
import { useState, useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"; // Or choose any other theme
import { useAiContext } from "../../hooks/useAiContext";

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MarkdownWithCopyBlock = () => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const { resultData, newResponseFlag } = useAiContext();

  useEffect(() => {
    if (!resultData) return;

    if (!newResponseFlag) {
      setDisplayedText(resultData);
      return;
    }

    setDisplayedText("");

    const words = resultData.split(" ");
    let currentWordIndex = 0;

    const typeWords = () => {
      if (currentWordIndex < words.length) {
        setDisplayedText((prev) => prev + " " + words[currentWordIndex]);
        currentWordIndex++;
        setTimeout(typeWords, 50); // Type next word every 50ms
      }
    };

    typeWords(); // Start typing effect
  }, [resultData, newResponseFlag]);

  // Custom component for rendering code blocks with copy functionality
  const components: Components = {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const codeString = children ? String(children).trim() : ""; // Ensure we're working with the raw code text
      const [copied, setCopied] = useState(false); // State to track if copied for each code block

      const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset the copied text after 3 seconds
      };

      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <div className="code-block">
          <SyntaxHighlighter language="typescript" style={tomorrow}>
            {children as string}
          </SyntaxHighlighter>
          <CopyToClipboard text={codeString} onCopy={handleCopy}>
            <button className="copy-button">
              {copied ? "Copied" : "Copy"}
            </button>
          </CopyToClipboard>
        </div>
      );
    },
  };

  return (
    <div className="markdown-container">
      <ReactMarkdown className="response-data" components={components}>
        {displayedText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownWithCopyBlock;
