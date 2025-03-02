import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { UserPromptInput } from '../types';

interface UserPromptFormProps {
  selectedLevel: string;
  levelName: string;
  promptRequirements: string[];
  onGeneratePrompt: (input: UserPromptInput) => void;
  isLoading: boolean;
}

const UserPromptForm: React.FC<UserPromptFormProps> = ({ 
  selectedLevel, 
  levelName,
  promptRequirements,
  onGeneratePrompt, 
  isLoading 
}) => {
  const [promptInput, setPromptInput] = useState<UserPromptInput>({
    topic: '',
    context: '',
    requirements: '',
    audience: '',
    tone: ''
  });

  const handleInputChange = (field: keyof UserPromptInput, value: string) => {
    setPromptInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePrompt(promptInput);
  };

  // Determine which fields to show based on the selected level
  const showContext = selectedLevel !== 'basic';
  const showRequirements = true;
  const showAudience = selectedLevel === 'advanced' || selectedLevel === 'expert';
  const showTone = selectedLevel !== 'basic';

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border-2 border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Create Your {levelName} Prompt</h2>
        <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-md text-sm">
          {levelName} Level
        </span>
      </div>
      
      {promptRequirements.length > 0 && (
        <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-300 mb-2">Recommended for {levelName} prompts:</h3>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
            {promptRequirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Main Topic or Question <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              value={promptInput.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What do you want the AI to address?"
              required
            />
          </div>
          
          {showContext && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Context or Background Information
              </label>
              <textarea
                value={promptInput.context}
                onChange={(e) => handleInputChange('context', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                placeholder="Provide relevant background information or context"
              />
            </div>
          )}
          
          {showRequirements && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Specific Requirements or Constraints
              </label>
              <textarea
                value={promptInput.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                placeholder="What specific requirements, format, or constraints should the AI follow?"
              />
            </div>
          )}
          
          {showAudience && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={promptInput.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Who is the intended audience for this content?"
              />
            </div>
          )}
          
          {showTone && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tone or Style
              </label>
              <input
                type="text"
                value={promptInput.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What tone or style should the AI use? (e.g., professional, casual, technical)"
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-6 py-3 rounded-md text-white font-medium transition-all ${
              isLoading
                ? 'bg-indigo-700 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Prompt
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPromptForm;