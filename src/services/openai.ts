import OpenAI from 'openai';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OpenAI API key is missing. Please check your .env.local file.');
}

const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key', // Prevent crash on init if key is missing, but calls will fail
    dangerouslyAllowBrowser: true // Enable client-side usage (for prototype)
});

export const getTranslation = async (text: string, sourceLang: string, targetLang: string) => {
    if (!apiKey) throw new Error("OpenAI API Key is missing");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful translation assistant. Translate the following text from ${sourceLang} to ${targetLang}.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Translation Error:", error);
        throw error;
    }
};

export const getGrammarFeedback = async (text: string) => {
    if (!apiKey) throw new Error("OpenAI API Key is missing");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a strict grammar teacher. Analyze the following text and provide corrections and explanations for any grammatical errors. If the text is correct, praise the user.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Feedback Error:", error);
        throw error;
    }
};

export default openai;
