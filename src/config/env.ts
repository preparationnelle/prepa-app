// Configuration for environment variables
// This file is used to expose environment variables to the app
// In production, these should be set via environment variables

export const config = {
    OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
};

// Log for debugging (remove in production)
console.log('🔧 Config loaded:', {
    hasOpenAIKey: !!config.OPENAI_API_KEY,
    keyPrefix: config.OPENAI_API_KEY?.substring(0, 10) + '...'
});
