import React, { useState } from 'react';
import { Copy, Check, Download, Sparkles } from 'lucide-react';
import { GeneratedPrompt as GeneratedPromptType } from '../types';

interface GeneratedPromptProps {
  generatedPrompt: GeneratedPromptType | null;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ generatedPrompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedPrompt) {
      const blob = new Blob([generatedPrompt.prompt], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt-${generatedPrompt.level}-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!generatedPrompt) {
    return null;
  }

  return (
    <div className="mt-8 bg-slate-800/70 p-6 rounded-lg border-2 border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-white">AI-Enhanced Prompt</h2>
          <Sparkles className="ml-2 h-5 w-5 text-yellow-400" />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5 text-slate-300" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
            title="Download as text file"
          >
            <Download className="h-5 w-5 text-slate-300" />
          </button>
        </div>
      </div>
      <div className="bg-slate-900/80 p-4 rounded-md">
        <p className="text-slate-300 whitespace-pre-wrap">{generatedPrompt.prompt}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="inline-block px-2 py-1 bg-blue-600/30 text-blue-300 rounded-md">
          {generatedPrompt.level} Level Prompt
        </span>
        <span className="text-xs text-slate-400">
          Enhanced by Gemma 2 AI
        </span>
      </div>
    </div>
  );
};

export default GeneratedPrompt;