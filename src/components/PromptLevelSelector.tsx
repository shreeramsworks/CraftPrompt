import React from 'react';
import { PromptLevel } from '../types';

interface PromptLevelSelectorProps {
  levels: PromptLevel[];
  selectedLevel: string;
  onSelectLevel: (levelId: string) => void;
}

const PromptLevelSelector: React.FC<PromptLevelSelectorProps> = ({
  levels,
  selectedLevel,
  onSelectLevel
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">Select Prompt Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedLevel === level.id
                ? 'bg-blue-600 border-2 border-blue-400 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/70 border-2 border-slate-700 hover:bg-slate-700/80'
            }`}
            onClick={() => onSelectLevel(level.id)}
          >
            <h3 className="text-lg font-medium text-white mb-1">{level.name}</h3>
            <p className="text-sm text-slate-300">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLevelSelector;