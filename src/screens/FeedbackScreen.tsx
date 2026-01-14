import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { supabase } from '../config/supabase';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

interface FeedbackScreenProps {
    navigation: any;
    route: {
        params: {
            sentence: any;
            userTranslation: string;
            translationId?: string;
        };
    };
}

interface Feedback {
    correction_complete: string;
    traduction_modele: string;
    explication_grammaticale: string;
    score: number;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ navigation, route }) => {
    const { sentence, userTranslation, translationId } = route.params;
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        generateFeedback();
    }, []);

    const generateFeedback = async () => {
        setLoading(true);
        try {
            // Dans une vraie application, ceci appellerait une API d'IA (OpenAI, Claude, etc.)
            // Pour la démo, nous générons un feedback simulé

            // Simuler un délai de traitement
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Feedback simulé (à remplacer par un vrai appel API)
            const mockFeedback: Feedback = {
                correction_complete: userTranslation,
                traduction_modele: 'I go to school every day.',
                explication_grammaticale: `
**Analyse de votre traduction :**

1. **Structure de la phrase** : Bonne utilisation de la structure sujet-verbe-complément.

2. **Temps verbal** : Le présent simple est correctement utilisé pour exprimer une habitude.

3. **Vocabulaire** : 
   - "go to" est le bon choix pour exprimer le déplacement
   - "school" sans article en anglais (contrairement au français)
   - "every day" pour exprimer la fréquence

4. **Points à améliorer** :
   - Attention à l'ordre des mots en anglais
   - Vérifiez l'utilisation des articles

**Règles grammaticales :**
- Le présent simple s'utilise pour les habitudes et vérités générales
- Pas d'article devant "school" quand on y va pour étudier
- Les adverbes de fréquence se placent généralement avant le verbe principal
        `,
                score: 85,
            };

            setFeedback(mockFeedback);

            // Enregistrer le feedback en base de données
            if (translationId) {
                await supabase.from('feedbacks').insert({
                    translation_id: translationId,
                    correction_complete: mockFeedback.correction_complete,
                    traduction_modele: mockFeedback.traduction_modele,
                    explication_grammaticale: mockFeedback.explication_grammaticale,
                });

                // Mettre à jour le score de la traduction
                await supabase
                    .from('translations')
                    .update({ score: mockFeedback.score })
                    .eq('id', translationId);
            }
        } catch (error) {
            console.error('Erreur lors de la génération du feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return COLORS.success;
        if (score >= 60) return COLORS.warning;
        return COLORS.error;
    };

    const getScoreEmoji = (score: number) => {
        if (score >= 90) return '🌟';
        if (score >= 80) return '🎉';
        if (score >= 70) return '👍';
        if (score >= 60) return '💪';
        return '📚';
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Analyse de votre traduction...</Text>
                    <Text style={styles.loadingSubtext}>
                        Notre IA examine votre réponse et prépare un feedback détaillé
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Score Card */}
                {feedback && (
                    <Card style={[styles.scoreCard, { borderColor: getScoreColor(feedback.score) }]}>
                        <View style={styles.scoreHeader}>
                            <Text style={styles.scoreEmoji}>{getScoreEmoji(feedback.score)}</Text>
                            <View style={styles.scoreInfo}>
                                <Text style={styles.scoreLabel}>Votre score</Text>
                                <Text style={[styles.scoreValue, { color: getScoreColor(feedback.score) }]}>
                                    {feedback.score}/100
                                </Text>
                            </View>
                        </View>
                    </Card>
                )}

                {/* Original Sentence */}
                <Card>
                    <Text style={styles.cardTitle}>📝 Phrase originale</Text>
                    <Text style={styles.originalText}>{sentence.phrase_originale}</Text>
                </Card>

                {/* User Translation */}
                <Card>
                    <Text style={styles.cardTitle}>✍️ Votre traduction</Text>
                    <Text style={styles.userText}>{userTranslation}</Text>
                </Card>

                {/* Model Translation */}
                {feedback && (
                    <Card style={styles.modelCard}>
                        <Text style={styles.cardTitle}>✅ Traduction modèle</Text>
                        <Text style={styles.modelText}>{feedback.traduction_modele}</Text>
                    </Card>
                )}

                {/* Grammar Explanation */}
                {feedback && (
                    <Card>
                        <Text style={styles.cardTitle}>📚 Explication grammaticale</Text>
                        <Text style={styles.explanationText}>{feedback.explication_grammaticale}</Text>
                    </Card>
                )}

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        title="Traduire une nouvelle phrase"
                        onPress={() => navigation.navigate('Translation')}
                    />
                    <Button
                        title="Voir l'historique"
                        onPress={() => navigation.navigate('History')}
                        variant="outline"
                        style={styles.historyButton}
                    />
                    <Button
                        title="Retour au tableau de bord"
                        onPress={() => navigation.navigate('Dashboard')}
                        variant="secondary"
                        style={styles.dashboardButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: SPACING.xxl,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    loadingText: {
        marginTop: SPACING.lg,
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        color: COLORS.secondary,
        textAlign: 'center',
    },
    loadingSubtext: {
        marginTop: SPACING.sm,
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
    scoreCard: {
        borderLeftWidth: 4,
        backgroundColor: COLORS.white,
    },
    scoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreEmoji: {
        fontSize: 60,
        marginRight: SPACING.lg,
    },
    scoreInfo: {
        flex: 1,
    },
    scoreLabel: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        marginBottom: SPACING.xs,
    },
    scoreValue: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: '800',
    },
    cardTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.md,
    },
    originalText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    userText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 24,
    },
    modelCard: {
        backgroundColor: COLORS.success + '10',
        borderLeftWidth: 4,
        borderLeftColor: COLORS.success,
    },
    modelText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 24,
        fontWeight: '600',
    },
    explanationText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.primary,
        lineHeight: 22,
    },
    actions: {
        marginTop: SPACING.lg,
    },
    historyButton: {
        marginTop: SPACING.md,
    },
    dashboardButton: {
        marginTop: SPACING.md,
    },
});
