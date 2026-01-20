import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Dimensions, NativeSyntheticEvent, NativeScrollEvent, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import { GRAMMAR_SENTENCES } from '../data/grammarSentences';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = SPACING.md;
const SENTENCE_CARD_WIDTH = SCREEN_WIDTH - SPACING.lg * 2; // Card takes full width of demoCard minus padding

interface HomeScreenProps {
    navigation: any;
}

interface Feature {
    title: string;
    description: string;
    color: string;
}

const FEATURES: Feature[] = [
    {
        title: 'Traduction Interactive',
        description: 'Traduisez des phrases et recevez un feedback immediat sur votre grammaire',
        color: '#FF6A00',
    },
    {
        title: 'Suivi de Progression',
        description: 'Visualisez vos progres et identifiez vos axes d\'amelioration',
        color: '#34C759',
    },
    {
        title: 'Lecons de Grammaire',
        description: 'Accedez a des lecons completes pour renforcer vos connaissances',
        color: '#007AFF',
    },
    {
        title: 'Mode Test',
        description: 'Testez vos competences avec des series de phrases chronometrees',
        color: '#5856D6',
    },
];

// All sentences are available in the carousel
const DEMO_SENTENCES = GRAMMAR_SENTENCES;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [translation, setTranslation] = useState('');
    const [showFeatures, setShowFeatures] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const sentenceScrollRef = useRef<FlatList>(null);

    // Get current sentence
    const currentSentence = DEMO_SENTENCES[currentSentenceIndex];

    // Handle scroll event to update current index
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / SENTENCE_CARD_WIDTH);
        if (newIndex !== currentSentenceIndex && newIndex >= 0 && newIndex < DEMO_SENTENCES.length) {
            setCurrentSentenceIndex(newIndex);
            setTranslation(''); // Reset translation when changing sentence
            setShowAnswer(false); // Hide answer when changing sentence
        }
    };

    const handleVerify = () => {
        if (!translation.trim()) {
            alert('Veuillez entrer une traduction');
            return;
        }

        navigation.navigate('Feedback', {
            sentence: currentSentence,
            userTranslation: translation,
            translationId: null
        });
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleHideAnswer = () => {
        setShowAnswer(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.hero}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>PR</Text>
                    </View>
                    <Text style={styles.title}>Prepa Rationnelle</Text>
                    <Text style={styles.subtitle}>Translations</Text>
                </View>

                {/* Interactive Demo Section */}
                <View style={styles.demoSection}>
                    <Card style={styles.demoCard}>
                        <Text style={styles.demoTitle}>Essayez maintenant !</Text>
                        <Text style={styles.demoLabel}>Phrase à traduire</Text>

                        {/* Swipeable Sentence Container */}
                        <View style={styles.sentenceCarouselContainer}>
                            <FlatList
                                ref={sentenceScrollRef as any}
                                data={DEMO_SENTENCES}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={handleScroll}
                                onMomentumScrollEnd={handleScroll}
                                scrollEventThrottle={16}
                                decelerationRate="fast"
                                keyExtractor={(item) => item.id}
                                getItemLayout={(_, index) => ({
                                    length: SENTENCE_CARD_WIDTH,
                                    offset: SENTENCE_CARD_WIDTH * index,
                                    index,
                                })}
                                renderItem={({ item: sentence }) => (
                                    <View style={[styles.sentenceBox, { width: SENTENCE_CARD_WIDTH }]}>
                                        <View style={styles.sentenceQuote}>
                                            <Text style={styles.quoteIcon}>"</Text>
                                        </View>
                                        <Text style={styles.sentenceText}>
                                            {sentence.french}
                                        </Text>
                                        <View style={styles.sentenceMetaContainer}>
                                            <Text style={styles.sentenceMeta}>{sentence.category}</Text>
                                            <View style={styles.difficultyBadge}>
                                                <Text style={styles.difficultyText}>
                                                    {sentence.difficulty_level === 'advanced' ? 'Avancé' :
                                                        sentence.difficulty_level === 'intermediate' ? 'Intermédiaire' : 'Débutant'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />

                            {/* Progress Bar */}
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${((currentSentenceIndex + 1) / DEMO_SENTENCES.length) * 100}%` }
                                        ]}
                                    />
                                </View>
                            </View>

                            {/* Sentence Counter */}
                            <Text style={styles.sentenceCounter}>
                                {currentSentenceIndex + 1} / {DEMO_SENTENCES.length} phrases
                            </Text>
                        </View>
                        <Text style={styles.demoLabel}>Votre traduction :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Écrivez votre traduction ici..."
                            placeholderTextColor={COLORS.text.light}
                            value={translation}
                            onChangeText={setTranslation}
                            multiline
                        />

                        {/* Answer Box - shows when user clicks 'Voir la réponse' */}
                        {showAnswer && (
                            <View style={styles.answerBox}>
                                <Text style={styles.answerLabel}>Réponse correcte :</Text>
                                <Text style={styles.answerText}>{currentSentence.reference}</Text>
                                <TouchableOpacity
                                    style={styles.hideAnswerButton}
                                    onPress={handleHideAnswer}
                                >
                                    <Text style={styles.hideAnswerText}>Masquer</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Two Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={handleShowAnswer}
                            >
                                <Text style={styles.secondaryButtonText}>Voir la réponse</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.primaryButton, !translation.trim() && styles.primaryButtonDisabled]}
                                onPress={handleVerify}
                                disabled={!translation.trim()}
                            >
                                <Text style={styles.primaryButtonText}>Analyser ma phrase</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>

                {/* Features Button */}
                <View style={styles.featuresButtonContainer}>
                    <TouchableOpacity
                        style={styles.featuresButton}
                        onPress={() => setShowFeatures(true)}
                    >
                        <Text style={styles.featuresButtonText}>Fonctionnalités supplémentaires</Text>
                        <Text style={styles.featuresButtonArrow}>→</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Features Modal */}
            <Modal
                visible={showFeatures}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFeatures(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Fonctionnalités</Text>
                            <TouchableOpacity
                                onPress={() => setShowFeatures(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.featuresList}>
                            {FEATURES.map((feature, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.featureCard}
                                    onPress={() => {
                                        setShowFeatures(false);
                                        // Navigate based on feature
                                        if (feature.title === 'Traduction Interactive') {
                                            navigation.navigate('Translation');
                                        }
                                        // Add other navigation routes as needed
                                    }}
                                >
                                    <View style={styles.featureHeader}>
                                        <View style={[styles.featureIndicator, { backgroundColor: feature.color }]} />
                                        <Text style={styles.featureTitle}>{feature.title}</Text>
                                    </View>
                                    <Text style={styles.featureText}>{feature.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={() => {
                                setShowFeatures(false);
                                navigation.navigate('Translation');
                            }}
                        >
                            <Text style={styles.exploreButtonText}>Explorer la banque de phrases</Text>
                        </TouchableOpacity>
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
    hero: {
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    logoContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
        // Premium shadow effect
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 12,
    },
    logoText: {
        fontSize: 38,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: SPACING.xs,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.primary,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    demoSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    demoCard: {
        padding: SPACING.lg,
    },
    demoTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    demoLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
    },
    sentenceCarouselContainer: {
        marginBottom: SPACING.lg,
    },
    sentenceScrollContent: {
        alignItems: 'center',
    },
    sentenceBox: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        paddingTop: SPACING.xl,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border.light,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        minHeight: 140,
    },
    sentenceQuote: {
        position: 'absolute',
        top: -8,
        left: SPACING.md,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quoteIcon: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
        marginTop: -4,
    },
    sentenceText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '500',
        color: COLORS.text.primary,
        lineHeight: 28,
        marginTop: SPACING.sm,
    },
    sentenceMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.md,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.light,
    },
    sentenceMeta: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    difficultyBadge: {
        backgroundColor: COLORS.primary + '15',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    difficultyText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.primary,
        fontWeight: '600',
    },
    progressContainer: {
        marginTop: SPACING.md,
        paddingHorizontal: SPACING.sm,
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.gray.light,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    sentenceCounter: {
        textAlign: 'center',
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        marginTop: SPACING.sm,
        fontWeight: '500',
    },
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.gray.medium,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: SPACING.lg,
    },
    demoButton: {
        marginBottom: 0,
    },
    featuresButtonContainer: {
        paddingHorizontal: SPACING.lg,
    },
    featuresButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border.light,
    },
    featuresButtonText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    featuresButtonArrow: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.primary,
        fontWeight: '700',
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
        height: '70%',
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
    featuresList: {
        flex: 1,
    },
    featureCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border.light,
    },
    featureHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    featureIndicator: {
        width: 4,
        height: 24,
        borderRadius: 2,
        marginRight: SPACING.sm,
    },
    featureTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    featureText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        lineHeight: 20,
        paddingLeft: SPACING.md + 4,
    },
    exploreButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        marginTop: SPACING.md,
    },
    exploreButtonText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.white,
    },
    answerBox: {
        backgroundColor: '#E8F5E9',
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    answerLabel: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        color: '#2E7D32',
        marginBottom: SPACING.sm,
        textTransform: 'uppercase',
    },
    answerText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        lineHeight: 24,
        fontWeight: '500',
    },
    hideAnswerButton: {
        marginTop: SPACING.md,
        alignSelf: 'flex-end',
    },
    hideAnswerText: {
        fontSize: FONT_SIZES.sm,
        color: '#2E7D32',
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'column',
        gap: SPACING.md,
    },
    secondaryButton: {
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    secondaryButtonText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.primary,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
    },
    primaryButtonDisabled: {
        opacity: 0.5,
    },
    primaryButtonText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.white,
    },
});
