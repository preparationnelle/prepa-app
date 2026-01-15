import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import { GRAMMAR_SENTENCES } from '../data/grammarSentences';
import { getGrammarExplanation } from '../data/grammarExplanations';
import { GrammarSentence } from '../types/grammar';
import { analyzeTranslation } from '../services/aiService';

interface SentencesListScreenProps {
    navigation: any;
}

// Markdown styles for AI feedback
const markdownStyles: any = {
    body: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.primary,
        lineHeight: 20,
    },
    heading1: {
        fontSize: FONT_SIZES.md,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginTop: SPACING.sm,
        marginBottom: SPACING.xs,
    },
    heading2: {
        fontSize: FONT_SIZES.sm,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginTop: SPACING.sm,
        marginBottom: SPACING.xs,
    },
    strong: {
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    em: {
        fontStyle: 'italic',
    },
    bullet_list: {
        marginLeft: SPACING.sm,
    },
    ordered_list: {
        marginLeft: SPACING.sm,
    },
    list_item: {
        marginBottom: SPACING.xs,
    },
};

// Component for individual sentence card with tentative mode
const SentenceCard: React.FC<{ item: GrammarSentence }> = ({ item }) => {
    const [tentativeMode, setTentativeMode] = useState(false);
    const [userAttempt, setUserAttempt] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

    const handleStartTentative = () => {
        setTentativeMode(true);
        setShowAnswer(false);
        setUserAttempt('');
        setHasSubmitted(false);
        setScore(null);
        setAiAnalysis(null);
    };

    const handleSubmitAttempt = async () => {
        if (userAttempt.trim()) {
            setHasSubmitted(true);
            setShowAnswer(true);
            setIsAnalyzing(true);

            try {
                // Call the AI service for analysis
                const result = await analyzeTranslation(
                    item.french,
                    userAttempt,
                    item.reference
                );
                setScore(result.score);
                setAiAnalysis(result.analysis);
            } catch (error) {
                console.error('Error analyzing translation:', error);
                setAiAnalysis('Erreur lors de l\'analyse. Veuillez réessayer.');
                setScore(0);
            } finally {
                setIsAnalyzing(false);
            }
        }
    };

    const handleReset = () => {
        setTentativeMode(false);
        setShowAnswer(false);
        setUserAttempt('');
        setHasSubmitted(false);
        setScore(null);
        setAiAnalysis(null);
    };

    const getScoreColor = (s: number) => {
        if (s >= 80) return '#FF8533';  // Orange clair (excellent)
        if (s >= 60) return '#FF6A00';  // Orange principal (bien)
        return '#CC5500';               // Orange foncé (à améliorer)
    };

    const getScoreLabel = (s: number) => {
        if (s >= 90) return 'Excellent';
        if (s >= 80) return 'Très bien';
        if (s >= 60) return 'Bien';
        return 'À améliorer';
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.themeTag}>{item.theme}</Text>
                <View style={styles.headerRight}>
                    {!tentativeMode && (
                        <TouchableOpacity
                            style={styles.tentativeButton}
                            onPress={handleStartTentative}
                        >
                            <Text style={styles.tentativeButtonText}>Tentative</Text>
                        </TouchableOpacity>
                    )}
                    <View style={[styles.badge, item.difficulty_level === 'advanced' && styles.badgeAdvanced]}>
                        <Text style={styles.badgeText}>{item.difficulty_level}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.frenchText}>{item.french}</Text>

            {/* Tentative Mode: Input field */}
            {tentativeMode && !showAnswer && (
                <View style={styles.tentativeContainer}>
                    <Text style={styles.tentativeLabel}>Votre tentative de traduction :</Text>
                    <TextInput
                        style={styles.tentativeInput}
                        placeholder="Écrivez votre traduction en anglais..."
                        placeholderTextColor={COLORS.text.light}
                        value={userAttempt}
                        onChangeText={setUserAttempt}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                    <View style={styles.tentativeActions}>
                        <TouchableOpacity
                            style={[styles.submitAttemptButton, !userAttempt.trim() && styles.submitButtonDisabled]}
                            onPress={handleSubmitAttempt}
                            disabled={!userAttempt.trim()}
                        >
                            <Text style={styles.submitAttemptButtonText}>Valider ma tentative</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleReset}
                        >
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Show results after submission */}
            {tentativeMode && showAnswer && hasSubmitted && (
                <View style={styles.comparisonContainer}>
                    {/* Score Display */}
                    <View style={styles.scoreContainer}>
                        {isAnalyzing ? (
                            <View style={styles.scoreLoadingContainer}>
                                <ActivityIndicator size="small" color={COLORS.primary} />
                                <Text style={styles.scoreLoadingText}>Analyse en cours...</Text>
                            </View>
                        ) : score !== null && (
                            <View style={styles.scoreDisplay}>
                                <View style={[styles.scoreCircle, { borderColor: getScoreColor(score) }]}>
                                    <Text style={[styles.scoreValue, { color: getScoreColor(score) }]}>{score}</Text>
                                    <Text style={styles.scoreMax}>/100</Text>
                                </View>
                                <Text style={[styles.scoreLabel, { color: getScoreColor(score) }]}>
                                    {getScoreLabel(score)}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* User's attempt */}
                    <View style={styles.attemptSection}>
                        <Text style={styles.attemptLabel}>VOTRE TRADUCTION</Text>
                        <Text style={styles.attemptText}>{userAttempt}</Text>
                    </View>

                    {/* Reference translation */}
                    <View style={styles.referenceSection}>
                        <Text style={styles.referenceLabel}>TRADUCTION DE RÉFÉRENCE</Text>
                        <Text style={styles.referenceText}>{item.reference}</Text>
                    </View>

                    {/* AI Detailed Feedback */}
                    <View style={styles.feedbackSection}>
                        <Text style={styles.feedbackLabel}>ANALYSE DÉTAILLÉE</Text>
                        {isAnalyzing ? (
                            <View style={styles.feedbackLoadingContainer}>
                                <ActivityIndicator size="small" color={COLORS.primary} />
                                <Text style={styles.feedbackLoadingText}>
                                    Analyse de votre traduction en cours...
                                </Text>
                            </View>
                        ) : aiAnalysis ? (
                            <View style={styles.feedbackContent}>
                                <Markdown style={markdownStyles}>
                                    {aiAnalysis}
                                </Markdown>
                            </View>
                        ) : (
                            <Text style={styles.feedbackErrorText}>Analyse non disponible</Text>
                        )}
                    </View>

                    {/* Reset button */}
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleReset}
                    >
                        <Text style={styles.resetButtonText}>Réessayer</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Normal mode: show translation directly */}
            {!tentativeMode && (
                <View style={styles.translationContainer}>
                    <Text style={styles.englishLabel}>EN</Text>
                    <Text style={styles.englishText}>{item.reference}</Text>
                </View>
            )}

            <View style={styles.grammarContainer}>
                {item.grammar_points.map((point, index) => (
                    <View key={index} style={styles.grammarTag}>
                        <Text style={styles.grammarText}>{point}</Text>
                        <Text style={styles.grammarExplanationText}>
                            {getGrammarExplanation(point)}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export const SentencesListScreen: React.FC<SentencesListScreenProps> = ({ navigation }) => {
    // Group sentences by category
    const sections = useMemo(() => {
        const grouped = GRAMMAR_SENTENCES.reduce((acc, sentence) => {
            const category = sentence.category || 'Divers';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(sentence);
            return acc;
        }, {} as Record<string, typeof GRAMMAR_SENTENCES>);

        return Object.keys(grouped).map(category => ({
            title: category,
            data: grouped[category]
        }));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Bibliothèque de Phrases</Text>
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SentenceCard item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.text.secondary }}>Aucune phrase disponible.</Text>
                        <Text style={{ color: COLORS.text.light, marginTop: 8 }}>{GRAMMAR_SENTENCES.length} phrases chargées en mémoire.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.light,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    backButtonText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.primary,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
    },
    listContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    sectionHeader: {
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.background,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '800',
        color: COLORS.primary,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border.light,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    themeTag: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        fontWeight: '600',
        textTransform: 'uppercase',
        flex: 1,
    },
    tentativeButton: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.sm,
    },
    tentativeButtonText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
        color: COLORS.white,
    },
    badge: {
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        backgroundColor: COLORS.success + '20',
        borderRadius: BORDER_RADIUS.sm,
    },
    badgeAdvanced: {
        backgroundColor: COLORS.error + '20',
    },
    badgeText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    frenchText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.secondary,
        lineHeight: 22,
    },
    // Tentative Mode Styles
    tentativeContainer: {
        marginTop: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.light,
    },
    tentativeLabel: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: SPACING.sm,
    },
    tentativeInput: {
        borderWidth: 1,
        borderColor: COLORS.primary + '50',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.primary,
        minHeight: 80,
        backgroundColor: COLORS.white,
        marginBottom: SPACING.sm,
    },
    tentativeActions: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    submitAttemptButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.xs,
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitAttemptButtonText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.white,
    },
    cancelButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.medium,
        borderRadius: BORDER_RADIUS.md,
    },
    cancelButtonText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '500',
        color: COLORS.text.secondary,
    },
    // Results after submission
    comparisonContainer: {
        marginTop: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.light,
    },
    // Score display
    scoreContainer: {
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    scoreLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingVertical: SPACING.md,
    },
    scoreLoadingText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    scoreDisplay: {
        alignItems: 'center',
    },
    scoreCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    scoreValue: {
        fontSize: 28,
        fontWeight: '800',
    },
    scoreMax: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.secondary,
        marginTop: -2,
    },
    scoreLabel: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        marginTop: SPACING.xs,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    // Attempt section
    attemptSection: {
        backgroundColor: COLORS.primary + '10',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
    },
    attemptLabel: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: SPACING.xs,
        letterSpacing: 0.5,
    },
    attemptText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.secondary,
        lineHeight: 20,
    },
    // Reference section
    referenceSection: {
        backgroundColor: COLORS.success + '10',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.success,
    },
    referenceLabel: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        color: COLORS.success,
        marginBottom: SPACING.xs,
        letterSpacing: 0.5,
    },
    referenceText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.secondary,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    // Feedback section
    feedbackSection: {
        backgroundColor: COLORS.secondary + '08',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.secondary + '20',
    },
    feedbackLabel: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
        letterSpacing: 0.5,
    },
    feedbackLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingVertical: SPACING.sm,
    },
    feedbackLoadingText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        flex: 1,
    },
    feedbackContent: {
        paddingTop: SPACING.xs,
    },
    feedbackErrorText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.error,
        fontStyle: 'italic',
    },
    // Reset button
    resetButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
    },
    resetButtonText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.primary,
    },
    // Normal Translation Display
    translationContainer: {
        marginTop: SPACING.sm,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.light,
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    englishLabel: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        color: COLORS.text.light,
        marginTop: 2,
    },
    englishText: {
        flex: 1,
        fontSize: FONT_SIZES.md,
        color: COLORS.primary,
        fontStyle: 'italic',
        lineHeight: 22,
    },
    grammarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.xs,
        marginTop: SPACING.md,
    },
    grammarTag: {
        backgroundColor: COLORS.primary + '10',
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
        marginBottom: 4,
        marginRight: 4,
        maxWidth: '100%',
    },
    grammarText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.primary,
        fontWeight: '700',
        marginBottom: 2,
    },
    grammarExplanationText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
        marginTop: 2,
    },
});

