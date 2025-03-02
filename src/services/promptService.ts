import axios from 'axios';
import { HfInference } from "@huggingface/inference";
import { PromptTemplate, UserPromptInput } from '../types';

// Load environment variables from .env file
dotenv.config();

// Initialize Hugging Face client using environment variable for the API key
const HF_API_KEY = process.env.HF_API_KEY;
const client = new HfInference(HF_API_KEY);

// Function to replace template variables with actual values
export const generatePromptFromTemplate = (
  template: PromptTemplate,
  variables: Record<string, string>
): string => {
  let result = template.template;
  
  // Replace all variables in the template
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
};

// Function to generate prompt from user input
export const generatePromptFromUserInput = (
  input: UserPromptInput,
  level: string
): string => {
  let prompt = '';
  
  // Basic level prompt
  if (level === 'basic') {
    prompt = `${input.topic}`;
    
    if (input.requirements) {
      prompt += `\n\n${input.requirements}`;
    }
  }
  
  // Intermediate level prompt
  else if (level === 'intermediate') {
    if (input.tone) {
      prompt = `Please respond in a ${input.tone} tone.\n\n`;
    }
    
    prompt += `${input.topic}`;
    
    if (input.context) {
      prompt = `${prompt}\n\nContext: ${input.context}`;
    }
    
    if (input.requirements) {
      prompt = `${prompt}\n\nRequirements: ${input.requirements}`;
    }
  }
  
  // Advanced level prompt
  else if (level === 'advanced') {
    prompt = `Topic: ${input.topic}\n\n`;
    
    if (input.context) {
      prompt += `Background Information: ${input.context}\n\n`;
    }
    
    if (input.audience) {
      prompt += `Target Audience: ${input.audience}\n\n`;
    }
    
    if (input.tone) {
      prompt += `Tone: Please respond in a ${input.tone} tone.\n\n`;
    }
    
    if (input.requirements) {
      prompt += `Specific Requirements:\n${input.requirements}\n\n`;
    }
    
    prompt += `Please provide a comprehensive response addressing all aspects of the topic and following all specified requirements.`;
  }
  
  // Expert level prompt
  else if (level === 'expert') {
    prompt = `I need a detailed analysis on the following topic: ${input.topic}\n\n`;
    
    if (input.context) {
      prompt += `Context and Background:\n${input.context}\n\n`;
    }
    
    if (input.audience) {
      prompt += `This content is intended for: ${input.audience}\n\n`;
    }
    
    if (input.tone) {
      prompt += `Please maintain a ${input.tone} tone throughout your response.\n\n`;
    }
    
    prompt += `Approach this task as follows:\n`;
    prompt += `1. Begin with a concise overview of the key concepts\n`;
    prompt += `2. Analyze the topic from multiple perspectives\n`;
    prompt += `3. Provide evidence-based insights and examples\n`;
    prompt += `4. Address potential counterarguments or limitations\n`;
    prompt += `5. Conclude with practical implications or applications\n\n`;
    
    if (input.requirements) {
      prompt += `Additional Requirements and Constraints:\n${input.requirements}\n\n`;
    }
    
    prompt += `Your response will be evaluated based on depth of analysis, logical coherence, evidence quality, and practical relevance.`;
  }
  
  return prompt;
};

// Function to enhance prompt using Hugging Face API
export const enhancePromptWithAI = async (prompt: string): Promise<string> => {
  try {
    // Create the message for the AI
    const messages = [
      {
        role: "user",
        content: `You are an expert prompt engineer. Please enhance the following prompt to make it more effective for AI models. The prompt is: "${prompt}"`
      }
    ];

    // Call the Hugging Face API
    const chatCompletion = await client.chatCompletion({
      model: "google/gemma-2-9b-it",
      messages: messages,
      provider: "hf-inference",
      max_tokens: 500,
    });

    // Extract the enhanced prompt from the response
    const enhancedPrompt = chatCompletion.choices[0].message.content;
    
    // If the API call fails or returns empty content, return the original prompt
    if (!enhancedPrompt) {
      console.warn("API returned empty response, using original prompt");
      return prompt;
    }
    
    return enhancedPrompt;
  } catch (error) {
    console.error('Error enhancing prompt with AI:', error);
    
    // Fallback to a simple enhancement if the API call fails
    return `${prompt}\n\nPlease provide a detailed and well-structured response. Include relevant examples and consider different perspectives where appropriate.`;
  }
};

// Alternative implementation using axios if @huggingface/inference doesn't work
export const enhancePromptWithAIUsingAxios = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://router.huggingface.co/hf-inference/models/google/gemma-2-9b-it/v1/chat/completions',
      {
        model: "google/gemma-2-9b-it",
        messages: [
          {
            role: "user",
            content: `You are an expert prompt engineer. Please enhance the following prompt to make it more effective for AI models. The prompt is: "${prompt}"`
          }
        ],
        max_tokens: 500,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract the enhanced prompt from the response
    const enhancedPrompt = response.data.choices[0].message.content;
    
    // If the API call fails or returns empty content, return the original prompt
    if (!enhancedPrompt) {
      console.warn("API returned empty response, using original prompt");
      return prompt;
    }
    
    return enhancedPrompt;
  } catch (error) {
    console.error('Error enhancing prompt with AI using axios:', error);
    
    // Fallback to a simple enhancement if the API call fails
    return `${prompt}\n\nPlease provide a detailed and well-structured response. Include relevant examples and consider different perspectives where appropriate.`;
  }
};


