// Types pour la base de données Supabase
// Version simplifiée pour éviter les erreurs TypeScript

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            sentences: {
                Row: {
                    id: string
                    langue_source: string
                    langue_cible: string
                    phrase_originale: string
                    theme_grammatical: string
                    niveau: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    langue_source: string
                    langue_cible: string
                    phrase_originale: string
                    theme_grammatical: string
                    niveau: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    langue_source?: string
                    langue_cible?: string
                    phrase_originale?: string
                    theme_grammatical?: string
                    niveau?: string
                    created_at?: string
                }
            }
            translations: {
                Row: {
                    id: string
                    user_id: string
                    sentence_id: string
                    reponse_utilisateur: string
                    score: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    sentence_id: string
                    reponse_utilisateur: string
                    score: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    sentence_id?: string
                    reponse_utilisateur?: string
                    score?: number
                    created_at?: string
                }
            }
            feedbacks: {
                Row: {
                    id: string
                    translation_id: string
                    correction_complete: string
                    traduction_modele: string
                    explication_grammaticale: string
                }
                Insert: {
                    id?: string
                    translation_id: string
                    correction_complete: string
                    traduction_modele: string
                    explication_grammaticale: string
                }
                Update: {
                    id?: string
                    translation_id?: string
                    correction_complete?: string
                    traduction_modele?: string
                    explication_grammaticale?: string
                }
            }
            grammar_lessons: {
                Row: {
                    id: string
                    titre: string
                    contenu: string
                    niveau: string
                }
                Insert: {
                    id?: string
                    titre: string
                    contenu: string
                    niveau: string
                }
                Update: {
                    id?: string
                    titre?: string
                    contenu?: string
                    niveau?: string
                }
            }
            grammar_exercises: {
                Row: {
                    id: string
                    lesson_id: string
                    question: string
                    bonne_reponse: string
                }
                Insert: {
                    id?: string
                    lesson_id: string
                    question: string
                    bonne_reponse: string
                }
                Update: {
                    id?: string
                    lesson_id?: string
                    question?: string
                    bonne_reponse?: string
                }
            }
            tests: {
                Row: {
                    id: string
                    user_id: string
                    score_final: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    score_final: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    score_final?: number
                    created_at?: string
                }
            }
            test_results: {
                Row: {
                    id: string
                    test_id: string
                    sentence_id: string
                    reponse_utilisateur: string
                    score: number
                }
                Insert: {
                    id?: string
                    test_id: string
                    sentence_id: string
                    reponse_utilisateur: string
                    score: number
                }
                Update: {
                    id?: string
                    test_id?: string
                    sentence_id?: string
                    reponse_utilisateur?: string
                    score?: number
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
