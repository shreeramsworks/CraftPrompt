import { PromptLevel } from '../types';

export const promptLevels: PromptLevel[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Simple prompts that provide direct instructions to the AI.',
    templates: [],
    promptRequirements: [
      'Clear and concise instructions',
      'Single, focused request',
      'Minimal context needed'
    ]
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'More structured prompts with context and specific requirements.',
    templates: [],
    promptRequirements: [
      'Specific context for the AI',
      'Defined output format',
      'Persona or role specification',
      'Tone guidance'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Complex prompts with detailed context, constraints, and multi-step instructions.',
    templates: [],
    promptRequirements: [
      'Detailed background information',
      'Step-by-step reasoning process',
      'Specific constraints on output',
      'Multiple interconnected requests',
      'Audience specification'
    ]
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Highly sophisticated prompts with meta-instructions, evaluation criteria, and iterative refinement.',
    templates: [],
    promptRequirements: [
      'Meta-instructions on how to approach the problem',
      'Multiple perspective consideration',
      'Evaluation criteria for the response',
      'Specific methodologies to apply',
      'Constraints and ethical considerations',
      'Detailed audience and context information'
    ]
  }
];