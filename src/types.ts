export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
}

export interface PromptLevel {
  id: string;
  name: string;
  description: string;
  templates: PromptTemplate[];
  promptRequirements: string[];
}

export interface GeneratedPrompt {
  prompt: string;
  level: string;
}

export interface UserPromptInput {
  topic: string;
  context: string;
  requirements: string;
  audience: string;
  tone: string;
}