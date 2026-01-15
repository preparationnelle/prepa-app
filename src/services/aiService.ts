// OpenAI API service using fetch for React Native compatibility
// The official OpenAI SDK has issues with React Native, so we use direct API calls

import { config } from '../config/env';

const OPENAI_API_KEY = config.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface AIAnalysisResult {
    score: number;
    analysis: string; // Markdown formatted analysis
}

export const analyzeTranslation = async (
    frenchSentence: string,
    userTranslation: string,
    referenceTranslation: string
): Promise<AIAnalysisResult> => {
    try {
        console.log('🤖 AI Service: Starting analysis');
        console.log('API Key present:', !!OPENAI_API_KEY);
        console.log('API Key prefix:', OPENAI_API_KEY?.substring(0, 10) + '...');

        if (!OPENAI_API_KEY) {
            console.warn('⚠️ OpenAI API key is missing');
            return {
                score: 0,
                analysis: "⚠️ **Erreur de configuration**\n\nLa clé API OpenAI est manquante. Veuillez vérifier votre fichier `.env.local`."
            };
        }

        const prompt = `You are an expert English teacher for French students.

Task: Evaluate the student's translation of a French sentence into English, comparing it with the reference translation.

French sentence: "${frenchSentence}"
Student translation: "${userTranslation}"
Reference translation: "${referenceTranslation}"

Output format: JSON object with the following fields:
- "score": A number between 0 and 100 representing the quality of the translation.
- "analysis": A detailed critique in French (Markdown formatted). 

Instructions for specific fields:
- "score": Be strict but fair. 100 is for perfect, native-level accuracy. Deduct points for grammar errors, wrong vocabulary, spelling mistakes, and awkward phrasing.
- "analysis": 
    1. Start with a brief overall assessment.
    2. List specific errors using bullet points. For each error, explain WHY it is wrong and what is the correct rule.
    3. Highlight any good points if present.
    4. Keep the tone encouraging but educational.
    5. Use Markdown for formatting (bold, italic, lists).
    6. DO NOT repeat the reference grammar points (like "Present perfect", "Passive voice") as a simple list, but explain the actual mistakes made by the student relative to these points if applicable.
    7. Write in French.`;

        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful and strict language tutor. Always respond in valid JSON format.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                response_format: { type: 'json_object' },
                temperature: 0.7,
            })
        });

        console.log('📡 API Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ OpenAI API error:', errorData);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('📦 API Response data:', data);

        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('No content in response');
        }

        const result = JSON.parse(content);

        return {
            score: result.score || 0,
            analysis: result.analysis || "Impossible d'analyser la réponse."
        };

    } catch (error) {
        console.error('Error analyzing translation:', error);
        return {
            score: 0,
            analysis: `**Erreur lors de l'analyse**\n\nUne erreur est survenue lors de l'analyse par l'IA : ${error instanceof Error ? error.message : 'Erreur inconnue'}\n\nVeuillez réessayer plus tard.`
        };
    }
};
