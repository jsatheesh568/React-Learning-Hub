// Line 1: Import useState from 'react' to handle copy state.
import { useState } from 'react';
// Line 3: Import Lucide icons.
import { Copy, Check, FileCode } from 'lucide-react';

// Line 6: CodeViewer component
export function CodeViewer({ code, filePath }) {
  // Line 8: State to show "Copied!" feedback.
  const [copied, setCopied] = useState(false);

  // Line 11: Copy to clipboard function.
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Line 18: Split code lines to render line numbers.
  const lines = code.trim().split('\n');

  return (
    <div className="code-viewer-container">
      {/* Code Header Bar */}
      <div className="code-viewer-header">
        <div className="code-viewer-path">
          <FileCode size={16} color="#6366f1" />
          <span>{filePath}</span>
        </div>
        <button onClick={handleCopy} className="code-copy-btn" title="Copy code snippet">
          {copied ? (
            <>
              <Check size={14} color="#10b981" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Pre/Code Block */}
      <pre className="code-viewer-content">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="code-line">
              <span className="code-line-number">{idx + 1}</span>
              <span className="code-line-text">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
