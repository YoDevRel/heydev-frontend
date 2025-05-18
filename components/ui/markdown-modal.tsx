import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

interface MarkdownModalProps {
  open: boolean
  onClose: () => void
  title?: string
  markdown: string
}

export function MarkdownModal({ open, onClose, title, markdown }: MarkdownModalProps) {
  const [copySuccess, setCopySuccess] = useState(false); // State to manage copy success message

  if (!open) return null;

  // Preprocess: replace every single newline with two newlines
  const processedMarkdown = markdown;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(processedMarkdown); // Copy to clipboard
      setCopySuccess(true); // Set success state
      setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div key={title} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full p-6 relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        {title && <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>}
        <button 
          onClick={copyToClipboard} 
          className="mb-4 text-gray-400 hover:text-white"
          aria-label="Copied"
        >
          Copy
        </button>
        <div className="prose prose-invert max-h-[60vh] overflow-y-auto text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{processedMarkdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 