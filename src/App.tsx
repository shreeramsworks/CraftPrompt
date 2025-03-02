import React, { useState, useEffect } from 'react';
import VantaBackground from './components/VantaBackground';
import Header from './components/Header';
import PromptLevelSelector from './components/PromptLevelSelector';
import UserPromptForm from './components/UserPromptForm';
import GeneratedPrompt from './components/GeneratedPrompt';
import { promptLevels } from './data/promptLevels';
import { GeneratedPrompt as GeneratedPromptType, UserPromptInput } from './types';
import { generatePromptFromUserInput, enhancePromptWithAI, enhancePromptWithAIUsingAxios } from './services/promptService';

function App() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('basic');
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPromptType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get the selected level
  const selectedLevel = promptLevels.find(level => level.id === selectedLevelId);
  const levelName = selectedLevel?.name || 'Basic';
  const promptRequirements = selectedLevel?.promptRequirements || [];
  
  // Reset generated prompt when level changes
  useEffect(() => {
    setGeneratedPrompt(null);
    setError(null);
  }, [selectedLevelId]);

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevelId(levelId);
  };

  const handleGeneratePrompt = async (input: UserPromptInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate basic prompt from user input
      const basicPrompt = generatePromptFromUserInput(input, selectedLevelId);
      
      let enhancedPrompt;
      
      try {
        // Try using the HfInference client first
        enhancedPrompt = await enhancePromptWithAI(basicPrompt);
      } catch (primaryError) {
        console.error('Primary API method failed, trying fallback:', primaryError);
        
        try {
          // If that fails, try the axios implementation
          enhancedPrompt = await enhancePromptWithAIUsingAxios(basicPrompt);
        } catch (fallbackError) {
          console.error('Fallback API method also failed:', fallbackError);
          // If both fail, use the basic prompt
          enhancedPrompt = basicPrompt;
          setError("Could not connect to AI service. Using basic prompt instead.");
        }
      }
      
      // Set generated prompt
      setGeneratedPrompt({
        prompt: enhancedPrompt,
        level: levelName
      });
    } catch (error) {
      console.error('Error generating prompt:', error);
      setError("An error occurred while generating the prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VantaBackground>
      <div className="min-h-screen text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Craft Powerful AI Prompts
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Design prompts that unlock the full potential of AI models using our multi-level prompt engineering framework.
              </p>
            </div>
            
            <PromptLevelSelector 
              levels={promptLevels}
              selectedLevel={selectedLevelId}
              onSelectLevel={handleLevelSelect}
            />
            
            <UserPromptForm 
              selectedLevel={selectedLevelId}
              levelName={levelName}
              promptRequirements={promptRequirements}
              onGeneratePrompt={handleGeneratePrompt}
              isLoading={isLoading}
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                <p>{error}</p>
              </div>
            )}
            
            <GeneratedPrompt generatedPrompt={generatedPrompt} />
            
            <div className="mt-16 text-center text-sm text-slate-400">
              <p>PromptCraft - Advanced Prompt Engineering Tool</p>
            </div>
          </div>
        </main>
      </div>
    </VantaBackground>
  );
}

export default App;