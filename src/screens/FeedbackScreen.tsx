import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { supabase } from '../config/supabase';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import { getGrammarExplanation } from '../data/grammarExplanations';
import { analyzeTranslation } from '../services/aiService';
import { GRAMMAR_SENTENCES } from '../data/grammarSentences';

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
    ai_analysis?: string;
}

const markdownStyles: any = {
    body: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 24,
    },
    heading1: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    },
    heading2: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    },
    strong: {
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    em: {
        fontStyle: 'italic',
    },
    li: {
        marginBottom: SPACING.xs,
    },
};

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ navigation, route }) => {
    const { sentence, userTranslation, translationId } = route.params;
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [loadingAI, setLoadingAI] = useState(true);

    // Static data available immediately
    const modelTranslation = sentence.reference || 'Traduction non disponible';

    // Find current sentence index
    const currentIndex = GRAMMAR_SENTENCES.findIndex(s => s.id === sentence.id);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < GRAMMAR_SENTENCES.length - 1;

    useEffect(() => {
        generateAIFeedback();
    }, []);

    const generateAIFeedback = async () => {
        setLoadingAI(true);
        try {
            console.log('Starting AI analysis...');

            // Analyse par l'IA
            const aiResult = await analyzeTranslation(
                sentence.french || sentence.phrase_originale,
                userTranslation,
                sentence.reference || ''
            );

            console.log('AI analysis complete:', aiResult);

            setScore(aiResult.score);
            setAiAnalysis(aiResult.analysis);

            // Enregistrer le feedback en base de données
            if (translationId) {
                await supabase.from('feedbacks').insert({
                    translation_id: translationId,
                    correction_complete: userTranslation,
                    traduction_modele: modelTranslation,
                    explication_grammaticale: aiResult.analysis,
                });

                await supabase
                    .from('translations')
                    .update({ score: aiResult.score })
                    .eq('id', translationId);
            }
        } catch (error) {
            console.error('Erreur lors de la generation du feedback:', error);
            setAiAnalysis('Erreur lors de l\'analyse. Veuillez reessayer.');
            setScore(0);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleNextSentence = () => {
        if (hasNext) {
            navigation.navigate('Home');
        }
    };

    const handlePreviousSentence = () => {
        if (hasPrevious) {
            navigation.navigate('Home');
        }
    };

    const getScoreColor = (s: number) => {
        if (s >= 80) return COLORS.success;
        if (s >= 60) return COLORS.warning;
        return COLORS.error;
    };

    const getScoreLabel = (s: number) => {
        if (s >= 90) return 'Excellent';
        if (s >= 80) return 'Tres bien';
        if (s >= 60) return 'Bien';
        return 'A ameliorer';
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Resultat de l'analyse</Text>
                </View>

                {/* Score Circle - Shows loading or actual score */}
                <View style={styles.scoreContainer}>
                    <View style={[
                        styles.scoreCircle,
                        { borderColor: loadingAI ? COLORS.gray.medium : getScoreColor(score || 0) }
                    ]}>
                        {loadingAI ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : (
                            <>
                                <Text style={[
                                    styles.scoreValue,
                                    { color: getScoreColor(score || 0) }
                                ]}>
                                    {score || 0}
                                </Text>
                                <Text style={styles.scoreMax}>/100</Text>
                            </>
                        )}
                    </View>
                    {!loadingAI && score !== null && (
                        <Text style={[
                            styles.scoreLabel,
                            { color: getScoreColor(score) }
                        ]}>
                            {getScoreLabel(score).toUpperCase()}
                        </Text>
                    )}
                </View>

                {/* Comparison - Available immediately */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>COMPARAISON</Text>
                    <Card style={styles.comparisonCard}>
                        <View style={styles.comparisonSection}>
                            <Text style={styles.comparisonLabel}>Votre version</Text>
                            <Text style={styles.comparisonText}>{userTranslation}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.comparisonSection}>
                            <Text style={styles.comparisonLabel}>Modele</Text>
                            <Text style={styles.comparisonText}>{modelTranslation}</Text>
                        </View>
                    </Card>
                </View>

                {/* Grammar Analysis - Available immediately */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>POINTS GRAMMATICAUX</Text>
                    <Card style={styles.analysisCard}>
                        {sentence.grammar_points ? (
                            <View style={styles.grammarContainer}>
                                {sentence.grammar_points.map((point: string, index: number) => (
                                    <View key={index} style={styles.grammarItem}>
                                        <View style={styles.grammarHeader}>
                                            <View style={styles.grammarBullet} />
                                            <Text style={styles.grammarTitle}>{point}</Text>
                                        </View>
                                        <Text style={styles.grammarExplanation}>
                                            {getGrammarExplanation(point)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text style={styles.explanationText}>
                                Points grammaticaux non disponibles pour cette phrase.
                            </Text>
                        )}
                    </Card>
                </View>

                {/* AI Analysis - Loads asynchronously */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>ANALYSE DETAILLEE DE L'IA</Text>
                    <Card style={styles.analysisCard}>
                        {loadingAI ? (
                            <View style={styles.aiLoadingContainer}>
                                <ActivityIndicator size="small" color={COLORS.primary} />
                                <Text style={styles.aiLoadingText}>
                                    Analyse de votre traduction en cours...
                                </Text>
                            </View>
                        ) : (
                            <Markdown style={markdownStyles}>
                                {aiAnalysis || 'Analyse non disponible'}
                            </Markdown>
                        )}
                    </Card>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    {hasPrevious && (
                        <Button
                            title="Phrase precedente"
                            onPress={handlePreviousSentence}
                            variant="outline"
                            style={styles.navigationButton}
                        />
                    )}
                    {hasNext && (
                        <Button
                            title="Nouvelle phrase"
                            onPress={handleNextSentence}
                            style={styles.mainButton}
                        />
                    )}
                    <Button
                        title="Retour au menu"
                        onPress={() => navigation.navigate('Dashboard')}
                        variant="outline"
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
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.light,
    },
    screenTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        textAlign: 'center',
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.md,
        color: COLORS.text.secondary,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
        marginTop: SPACING.sm,
    },
    scoreCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    scoreValue: {
        fontSize: 42,
        fontWeight: '800',
    },
    scoreTotal: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.light,
        marginTop: -4,
    },
    scoreVerdict: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        color: COLORS.text.light,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: SPACING.sm,
        marginLeft: 4,
    },
    comparisonCard: {
        padding: 0,
        overflow: 'hidden',
    },
    comparisonRow: {
        padding: SPACING.md,
    },
    comparisonLabelContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: COLORS.gray.light,
        marginBottom: SPACING.xs,
    },
    modelLabelContainer: {
        backgroundColor: COLORS.success + '20',
    },
    comparisonLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.text.secondary,
        textTransform: 'uppercase',
    },
    modelLabel: {
        color: COLORS.success,
    },
    userText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 24,
    },
    modelText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        fontWeight: '600',
        lineHeight: 24,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border.light,
    },
    analysisCard: {
        padding: SPACING.md,
    },
    grammarContainer: {
        gap: SPACING.lg,
    },
    grammarItem: {
        marginBottom: SPACING.xs,
    },
    grammarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    grammarBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
        marginRight: SPACING.sm,
    },
    grammarTitle: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        color: COLORS.primary,
        textTransform: 'uppercase',
    },
    grammarExplanation: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        lineHeight: 20,
        paddingLeft: SPACING.md + 6, // Align with title text
    },
    explanationText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.primary,
        lineHeight: 22,
    },
    aiLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingVertical: SPACING.md,
    },
    aiLoadingText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        flex: 1,
    },
    actions: {
        gap: SPACING.md,
    },
    mainButton: {
        backgroundColor: COLORS.secondary,
    },
    navigationButton: {
        marginBottom: SPACING.sm,
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    scoreMax: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    scoreLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        marginTop: SPACING.sm,
    },
    comparisonSection: {
        marginBottom: SPACING.md,
    },
    comparisonText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 22,
    },
});
