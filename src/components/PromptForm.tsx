import React, { useState, useEffect } from 'react';
import { PromptTemplate } from '../types';
import { Wand2 } from 'lucide-react';

interface PromptFormProps {
  template: PromptTemplate | null;
  onGeneratePrompt: (variables: Record<string, string>) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ template, onGeneratePrompt, isLoading }) => {
  const [variables, setVariables] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (template) {
      // Extract variables from template
      const variableRegex = /\{\{([^}]+)\}\}/g;
      const matches = [...template.template.matchAll(variableRegex)];
      const extractedVars: Record<string, string> = {};
      
      matches.forEach(match => {
        const varName = match[1].trim();
        extractedVars[varName] = '';
      });
      
      setVariables(extractedVars);
    } else {
      setVariables({});
    }
  }, [template]);

  const handleInputChange = (varName: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [varName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePrompt(variables);
  };

  if (!template) {
    return (
      <div className="bg-slate-800/70 p-6 rounded-lg border-2 border-slate-700 text-center">
        <p className="text-slate-300">Select a template to customize your prompt</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border-2 border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Customize Your Prompt</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.keys(variables).map((varName) => (
            <div key={varName} className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {varName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <input
                type="text"
                value={variables[varName]}
                onChange={(e) => handleInputChange(varName, e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${varName.replace(/_/g, ' ')}`}
                required
              />
            </div>
          ))}
        </div>
        <div className="text-center">
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

export default PromptForm;