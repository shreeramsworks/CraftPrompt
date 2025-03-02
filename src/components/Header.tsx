import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            PromptCraft
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-blue-300">
          <Lightbulb className="h-5 w-5" />
          <span className="hidden md:inline">Craft powerful AI prompts</span>
        </div>
      </div>
    </header>
  );
};

export default Header;