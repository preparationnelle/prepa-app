export interface GrammarSentence {
    id: string;
    category: string;
    theme: string;
    french: string;
    reference: string;
    grammar_points: string[];
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    specialized?: boolean;
}
