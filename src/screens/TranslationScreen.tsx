import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LanguageTabs } from '../components/common/LanguageTabs';
import { CollapsibleCard } from '../components/common/CollapsibleCard';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import { getGrammarFeedback } from '../services/openai';

interface TranslationScreenProps {
    navigation: any;
}

interface Sentence {
    id: string;
    phrase_originale: string;
    langue_source: string;
    langue_cible: string;
    theme_grammatical: string;
    niveau: string;
}

export const TranslationScreen: React.FC<TranslationScreenProps> = ({ navigation }) => {
    const { user } = useAuth();
    const [selectedLanguage, setSelectedLanguage] = useState('anglais');
    const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
    const [userTranslation, setUserTranslation] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [totalSentences] = useState(102);
    const [examMode, setExamMode] = useState(false);

    useEffect(() => {
        loadRandomSentence();
    }, [selectedLanguage]);

    const loadRandomSentence = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('sentences')
                .select('*')
                .eq('langue_cible', selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1))
                .limit(1)
                .single();

            if (error) {
                // Si aucune phrase n'existe, créer une phrase d'exemple
                console.log('Aucune phrase trouvée, utilisation d\'une phrase d\'exemple');
                setCurrentSentence({
                    id: 'example-1',
                    phrase_originale: 'Les tensions géopolitiques entre la Chine et les États-Unis s\'intensifient dans le domaine technologique.',
                    langue_source: 'Français',
                    langue_cible: selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1),
                    theme_grammatical: 'Relations internationales et géopolitique',
                    niveau: 'Avancé',
                });
            } else {
                setCurrentSentence(data);
            }
        } catch (error) {
            // Utiliser une phrase d'exemple en cas d'erreur
            setCurrentSentence({
                id: 'example-1',
                phrase_originale: 'Les tensions géopolitiques entre la Chine et les États-Unis s\'intensifient dans le domaine technologique.',
                langue_source: 'Français',
                langue_cible: selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1),
                theme_grammatical: 'Relations internationales et géopolitique',
                niveau: 'Avancé',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!userTranslation.trim()) {
            Alert.alert('Attention', 'Veuillez entrer une traduction');
            return;
        }

        if (!currentSentence) return;

        setSubmitting(true);
        try {
            // VERIFICATION: Test OpenAI API
            console.log("Requesting AI feedback...");
            const feedback = await getGrammarFeedback(userTranslation);
            console.log("AI Feedback received:", feedback);
            Alert.alert("AI Feedback Verification", feedback || "No feedback received");

            // Enregistrer la traduction
            const { data: translationData, error: translationError } = await supabase
                .from('translations')
                .insert({
                    user_id: user?.id || '',
                    sentence_id: currentSentence.id,
                    reponse_utilisateur: userTranslation,
                    score: 0,
                })
                .select()
                .single();

            if (translationError) {
                console.error('Erreur lors de l\'enregistrement:', translationError);
            }

            // Naviguer vers l'écran de feedback
            navigation.navigate('Feedback', {
                sentence: currentSentence,
                userTranslation,
                translationId: translationData?.id,
                aiFeedback: feedback // Pass it along if we want
            });

            // Réinitialiser
            setUserTranslation('');
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Une erreur est survenue');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
            setUserTranslation('');
            loadRandomSentence();
        }
    };

    const handleNext = () => {
        if (currentIndex < totalSentences) {
            setCurrentIndex(currentIndex + 1);
            setUserTranslation('');
            loadRandomSentence();
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Chargement...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Thème Grammatical</Text>
                        <LanguageTabs
                            selectedLanguage={selectedLanguage}
                            onLanguageChange={setSelectedLanguage}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.examModeButton}
                        onPress={() => setExamMode(!examMode)}
                    >
                        <Text style={styles.examModeIcon}>▶</Text>
                        <Text style={styles.examModeText}>Mode examen</Text>
                    </TouchableOpacity>
                </View>

                {/* Grammatical Theme Card */}
                {currentSentence && (
                    <View style={styles.section}>
                        <CollapsibleCard
                            title={currentSentence.theme_grammatical}
                            icon="📚"
                            defaultExpanded={false}
                        >
                            <Text style={styles.themeDescription}>
                                Ce thème aborde les concepts clés de la géopolitique moderne et les relations internationales.
                            </Text>
                        </CollapsibleCard>
                    </View>
                )}

                {/* Phrase to Translate Card */}
                {currentSentence && (
                    <View style={styles.section}>
                        <Card style={styles.phraseCard}>
                            <View style={styles.phraseHeader}>
                                <View style={styles.phraseLabel}>
                                    <Text style={styles.phraseLabelIcon}>✏️</Text>
                                    <Text style={styles.phraseLabelText}>PHRASE À TRADUIRE</Text>
                                </View>
                                <View style={styles.badges}>
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>Spécialisé</Text>
                                    </View>
                                    <View style={[styles.badge, styles.badgeAdvanced]}>
                                        <Text style={styles.badgeText}>Avancé</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.phraseText}>{currentSentence.phrase_originale}</Text>
                        </Card>
                    </View>
                )}

                {/* Navigation */}
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={[styles.navButton, currentIndex === 1 && styles.navButtonDisabled]}
                        onPress={handlePrevious}
                        disabled={currentIndex === 1}
                    >
                        <Text style={styles.navButtonText}>← Précédent</Text>
                    </TouchableOpacity>
                    <Text style={styles.progressText}>
                        Phrase {currentIndex} sur {totalSentences}
                    </Text>
                    <TouchableOpacity
                        style={[styles.navButton, styles.navButtonNext]}
                        onPress={handleNext}
                    >
                        <Text style={styles.navButtonText}>Suivant →</Text>
                    </TouchableOpacity>
                </View>

                {/* Translation Input */}
                <View style={styles.section}>
                    <Card style={styles.inputCard}>
                        <View style={styles.inputHeader}>
                            <Text style={styles.inputLabelIcon}>💬</Text>
                            <Text style={styles.inputLabel}>
                                Votre traduction en {selectedLanguage} :
                            </Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Écrivez votre traduction en anglais..."
                            placeholderTextColor={COLORS.text.light}
                            value={userTranslation}
                            onChangeText={setUserTranslation}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                        <TouchableOpacity
                            style={[styles.submitButton, !userTranslation.trim() && styles.submitButtonDisabled]}
                            onPress={handleSubmit}
                            disabled={!userTranslation.trim() || submitting}
                        >
                            <Text style={styles.submitButtonIcon}>✓</Text>
                            <Text style={styles.submitButtonText}>
                                {submitting ? 'Correction en cours...' : 'Corriger ma traduction'}
                            </Text>
                        </TouchableOpacity>
                    </Card>
                </View>

                {/* Keyboard Hint */}
                <Text style={styles.keyboardHint}>
                    Utilisez les flèches ← → du clavier pour naviguer
                </Text>
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
    },
    headerLeft: {
        flex: 1,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.md,
    },
    examModeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border.light,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.white,
    },
    examModeIcon: {
        fontSize: FONT_SIZES.sm,
    },
    examModeText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '500',
        color: COLORS.secondary,
    },
    section: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    themeDescription: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        lineHeight: 20,
    },
    phraseCard: {
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
    },
    phraseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    phraseLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    phraseLabelIcon: {
        fontSize: FONT_SIZES.md,
    },
    phraseLabelText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    badges: {
        flexDirection: 'row',
        gap: SPACING.xs,
    },
    badge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.primary + '20',
    },
    badgeAdvanced: {
        backgroundColor: COLORS.error + '20',
    },
    badgeText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '500',
        color: COLORS.secondary,
    },
    phraseText: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '400',
        color: COLORS.secondary,
        lineHeight: 32,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    navButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border.medium,
        backgroundColor: COLORS.white,
    },
    navButtonNext: {
        // Style for next button if needed
    },
    navButtonDisabled: {
        opacity: 0.4,
    },
    navButtonText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '500',
        color: COLORS.secondary,
    },
    progressText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.light,
    },
    inputCard: {
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
    },
    inputHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.md,
    },
    inputLabelIcon: {
        fontSize: FONT_SIZES.md,
    },
    inputLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    textInput: {
        borderWidth: 1,
        borderColor: COLORS.border.light,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        minHeight: 120,
        backgroundColor: COLORS.white,
        marginBottom: SPACING.md,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonIcon: {
        fontSize: FONT_SIZES.md,
        color: COLORS.white,
    },
    submitButtonText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.white,
    },
    keyboardHint: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.light,
        textAlign: 'center',
        marginTop: SPACING.md,
        fontStyle: 'italic',
    },
});
