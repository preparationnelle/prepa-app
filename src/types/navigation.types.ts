// Types pour la navigation

export type RootStackParamList = {
    // Public screens
    Home: undefined;
    SignUp: undefined;
    SignIn: undefined;

    // Protected screens
    Dashboard: undefined;
    Translation: undefined;
    Feedback: {
        sentence: {
            id: string;
            phrase_originale: string;
            langue_source: string;
            langue_cible: string;
            theme_grammatical: string;
            niveau: string;
        };
        userTranslation: string;
        translationId?: string;
    };
    History: undefined;
    Lessons: undefined;
    Test: undefined;
};
