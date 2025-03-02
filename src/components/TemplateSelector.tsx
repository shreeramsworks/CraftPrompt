import React from 'react';
import { PromptTemplate } from '../types';

interface TemplateSelectorProps {
  templates: PromptTemplate[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'bg-indigo-600 border-2 border-indigo-400 shadow-lg shadow-indigo-500/20'
                : 'bg-slate-800/70 border-2 border-slate-700 hover:bg-slate-700/80'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <h3 className="text-lg font-medium text-white mb-1">{template.name}</h3>
            <p className="text-sm text-slate-300 mb-2">{template.description}</p>
            <div className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded">
              {template.template}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;