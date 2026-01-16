import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, ActivityIndicator, TouchableOpacity, Modal, FlatList, Animated, PanResponder, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 80;
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LanguageTabs } from '../components/common/LanguageTabs';
import { CollapsibleCard } from '../components/common/CollapsibleCard';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import { GRAMMAR_SENTENCES } from '../data/grammarSentences';
import { GrammarSentence } from '../types/grammar';

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
    const [showSentenceList, setShowSentenceList] = useState(false);

    // Animation for swipe
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    // Track sentence index within local data
    const [sentenceArrayIndex, setSentenceArrayIndex] = useState(0);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 10;
            },
            onPanResponderMove: (_, gestureState) => {
                swipeAnim.setValue(gestureState.dx);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > SWIPE_THRESHOLD) {
                    // Swipe right - previous sentence
                    handleSwipe('right');
                } else if (gestureState.dx < -SWIPE_THRESHOLD) {
                    // Swipe left - next sentence
                    handleSwipe('left');
                } else {
                    // Reset position
                    Animated.spring(swipeAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const handleSwipe = (direction: 'left' | 'right') => {
        const targetX = direction === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH;

        Animated.parallel([
            Animated.timing(swipeAnim, {
                toValue: targetX,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Change sentence
            if (direction === 'left') {
                goToNextSentence();
            } else {
                goToPreviousSentence();
            }

            // Reset animation from opposite side
            swipeAnim.setValue(direction === 'left' ? SCREEN_WIDTH : -SCREEN_WIDTH);

            Animated.parallel([
                Animated.spring(swipeAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 8,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const goToNextSentence = () => {
        const localSentences = GRAMMAR_SENTENCES || [];
        const newIndex = (sentenceArrayIndex + 1) % localSentences.length;
        setSentenceArrayIndex(newIndex);
        loadSentenceByIndex(newIndex);
        setUserTranslation('');
        if (currentIndex < totalSentences) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPreviousSentence = () => {
        const localSentences = GRAMMAR_SENTENCES || [];
        const newIndex = sentenceArrayIndex === 0 ? localSentences.length - 1 : sentenceArrayIndex - 1;
        setSentenceArrayIndex(newIndex);
        loadSentenceByIndex(newIndex);
        setUserTranslation('');
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const loadSentenceByIndex = (index: number) => {
        const localSentences = GRAMMAR_SENTENCES || [];
        if (localSentences.length > 0) {
            const sentence = localSentences[index];
            setCurrentSentence({
                id: sentence.id,
                phrase_originale: sentence.french,
                langue_source: 'Français',
                langue_cible: 'Anglais',
                theme_grammatical: sentence.theme,
                niveau: sentence.difficulty_level.charAt(0).toUpperCase() + sentence.difficulty_level.slice(1),
            });
        }
    };

    useEffect(() => {
        loadRandomSentence();
    }, [selectedLanguage]);


    const getRandomLocalSentence = (language: string): Sentence => {
        // Filter for sentences where the target language matches (currently all are English targets from French source in the data)
        const localSentences = GRAMMAR_SENTENCES || [];
        if (localSentences.length === 0) {
            // Fallback if data is missing
            return {
                id: 'fallback-1',
                phrase_originale: 'Les tensions géopolitiques...',
                langue_source: 'Français',
                langue_cible: 'Anglais',
                theme_grammatical: 'Exemple',
                niveau: 'Intermédiaire'
            };
        }

        const randomIndex = Math.floor(Math.random() * localSentences.length);
        const sentence = localSentences[randomIndex];

        return {
            id: sentence.id,
            phrase_originale: sentence.french,
            langue_source: 'Français',
            langue_cible: 'Anglais', // Hardcoded as the dataset is specifically English target
            theme_grammatical: sentence.theme,
            niveau: sentence.difficulty_level.charAt(0).toUpperCase() + sentence.difficulty_level.slice(1),
        };
    };

    const loadRandomSentence = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('sentences')
                .select('*')
                .eq('langue_cible', selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1))
                .limit(1)
                .single();

            if (error || !data) {
                console.log('Utilisation des données locales');
                setCurrentSentence(getRandomLocalSentence(selectedLanguage));
            } else {
                setCurrentSentence(data);
            }
        } catch (error) {
            console.log('Erreur Supabase, repli sur local:', error);
            setCurrentSentence(getRandomLocalSentence(selectedLanguage));
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
            // OLD VERIFICATION CODE - Commented out as feedback is now generated in FeedbackScreen
            // console.log("Requesting AI feedback...");
            // const feedback = await getGrammarFeedback(userTranslation);
            // console.log("AI Feedback received:", feedback);
            // Alert.alert("AI Feedback Verification", feedback || "No feedback received");

            // Enregistrer la traduction
            const { data: translationData, error: translationError } = await supabase
                .from('translations')
                .insert({
                    user_id: user?.id || '',
                    sentence_id: currentSentence.id,
                    reponse_utilisateur: userTranslation,
                    score: 0,
                } as any)
                .select()
                .single();

            if (translationError) {
                console.error('Erreur lors de l\'enregistrement:', translationError);
            }

            // Naviguer vers l'écran de feedback
            navigation.navigate('Feedback', {
                sentence: currentSentence,
                userTranslation,
                translationId: (translationData as any)?.id,
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

    const handleSelectSentence = (sentence: GrammarSentence) => {
        // Map GrammarSentence to the component's Sentence interface
        // Note: GrammarSentence uses 'french' for the text, Sentence uses 'phrase_originale'
        const selectedSentence: Sentence = {
            id: sentence.id,
            phrase_originale: sentence.french,
            langue_source: 'Français',
            langue_cible: 'Anglais',
            theme_grammatical: sentence.theme,
            niveau: sentence.difficulty_level.charAt(0).toUpperCase() + sentence.difficulty_level.slice(1),
        };

        setCurrentSentence(selectedSentence);
        setUserTranslation('');
        setShowSentenceList(false);
    };

    const handlePrevious = () => {
        goToPreviousSentence();
    };

    const handleNext = () => {
        goToNextSentence();
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

                {/* Sentence Selection Button */}
                <View style={styles.selectionButtonContainer}>
                    <TouchableOpacity
                        style={styles.selectionButton}
                        onPress={() => setShowSentenceList(true)}
                    >
                        <Text style={styles.selectionButtonText}>Voir toutes les phrases</Text>
                    </TouchableOpacity>
                </View>

                {/* Grammatical Theme Card */}
                {currentSentence && (
                    <View style={styles.section}>
                        <CollapsibleCard
                            title={currentSentence.theme_grammatical}
                            defaultExpanded={false}
                        >
                            <Text style={styles.themeDescription}>
                                Ce thème aborde les concepts clés de la géopolitique moderne et les relations internationales.
                            </Text>
                        </CollapsibleCard>
                    </View>
                )}

                {/* Phrase to Translate Card - Swipeable */}
                {currentSentence && (
                    <View style={styles.section}>
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={[
                                styles.swipeContainer,
                                {
                                    transform: [{ translateX: swipeAnim }],
                                    opacity: opacityAnim,
                                },
                            ]}
                        >
                            <Card style={styles.phraseCard}>
                                <View style={styles.phraseHeader}>
                                    <View style={styles.phraseLabel}>
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

                                {/* Swipe hint */}
                                <View style={styles.swipeHint}>
                                    <Text style={styles.swipeHintText}>← Swipez pour changer de phrase →</Text>
                                </View>
                            </Card>
                        </Animated.View>
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
            </ScrollView>

            {/* Sentence Selection Modal */}
            <Modal
                visible={showSentenceList}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowSentenceList(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Choisir une phrase</Text>
                            <TouchableOpacity
                                onPress={() => setShowSentenceList(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={GRAMMAR_SENTENCES}
                            keyExtractor={(item) => item.id}
                            style={styles.list}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.sentenceItem}
                                    onPress={() => handleSelectSentence(item)}
                                >
                                    <View style={styles.sentenceHeader}>
                                        <Text style={styles.sentenceTheme}>{item.theme}</Text>
                                        <Text style={styles.sentenceLevel}>{item.difficulty_level}</Text>
                                    </View>
                                    <Text style={styles.sentenceText} numberOfLines={2}>{item.french}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
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
    selectionButtonContainer: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    selectionButton: {
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    selectionButtonText: {
        color: COLORS.primary,
        fontWeight: '600',
        fontSize: FONT_SIZES.md,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: BORDER_RADIUS.xl,
        borderTopRightRadius: BORDER_RADIUS.xl,
        height: '80%',
        padding: SPACING.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.light,
        paddingBottom: SPACING.md,
    },
    modalTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.secondary,
    },
    closeButton: {
        padding: SPACING.sm,
    },
    closeButtonText: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.text.secondary,
    },
    list: {
        flex: 1,
    },
    sentenceItem: {
        paddingVertical: SPACING.md,
    },
    sentenceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    sentenceTheme: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.primary,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    sentenceLevel: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.light,
    },
    sentenceText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.secondary,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border.light,
    },
    swipeContainer: {
        width: '100%',
    },
    swipeHint: {
        marginTop: SPACING.md,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.light,
        alignItems: 'center',
    },
    swipeHintText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.light,
        fontStyle: 'italic',
    },
});
