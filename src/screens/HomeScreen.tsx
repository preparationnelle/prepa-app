import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

import { GRAMMAR_SENTENCES } from '../data/grammarSentences';

interface HomeScreenProps {
    navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [translation, setTranslation] = useState('');

    // Use the first sentence for the demo
    const demoSentence = GRAMMAR_SENTENCES[0];

    const handleVerify = () => {
        if (!translation.trim()) {
            alert('Veuillez entrer une traduction');
            return;
        }

        navigation.navigate('Feedback', {
            sentence: demoSentence,
            userTranslation: translation,
            translationId: null // No ID for demo mode
        });
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
                        <Text style={styles.demoLabel}>Phrase a traduire</Text>
                        <View style={styles.sentenceBox}>
                            <View style={styles.sentenceQuote}>
                                <Text style={styles.quoteIcon}>"</Text>
                            </View>
                            <Text style={styles.sentenceText}>
                                {demoSentence.french}
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
                        <Button
                            title="Vérifier ma traduction"
                            onPress={handleVerify}
                            variant="primary"
                            style={styles.demoButton}
                        />
                    </Card>
                </View>

                {/* Features */}
                <View style={styles.features}>
                    <Text style={styles.featuresTitle}>Fonctionnalites</Text>

                    <Card style={styles.featureCard}>
                        <View style={styles.featureHeader}>
                            <View style={[styles.featureIndicator, { backgroundColor: '#FF6A00' }]} />
                            <Text style={styles.featureTitle}>Traduction Interactive</Text>
                        </View>
                        <Text style={styles.featureText}>
                            Traduisez des phrases et recevez un feedback immediat sur votre grammaire
                        </Text>
                    </Card>

                    <Card style={styles.featureCard}>
                        <View style={styles.featureHeader}>
                            <View style={[styles.featureIndicator, { backgroundColor: '#34C759' }]} />
                            <Text style={styles.featureTitle}>Suivi de Progression</Text>
                        </View>
                        <Text style={styles.featureText}>
                            Visualisez vos progres et identifiez vos axes d'amelioration
                        </Text>
                    </Card>

                    <Card style={styles.featureCard}>
                        <View style={styles.featureHeader}>
                            <View style={[styles.featureIndicator, { backgroundColor: '#007AFF' }]} />
                            <Text style={styles.featureTitle}>Lecons de Grammaire</Text>
                        </View>
                        <Text style={styles.featureText}>
                            Accedez a des lecons completes pour renforcer vos connaissances
                        </Text>
                    </Card>

                    <Card style={styles.featureCard}>
                        <View style={styles.featureHeader}>
                            <View style={[styles.featureIndicator, { backgroundColor: '#5856D6' }]} />
                            <Text style={styles.featureTitle}>Mode Test</Text>
                        </View>
                        <Text style={styles.featureText}>
                            Testez vos competences avec des series de phrases chronometrees
                        </Text>
                    </Card>
                </View>

                {/* Call to Action */}
                <View style={styles.ctaContainer}>
                    <Button
                        title="Explorer la banque de phrases"
                        onPress={() => navigation.navigate('SentencesList')}
                        variant="outline"
                        style={styles.ctaButton}
                    />
                </View>



                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Développé pour les étudiants en prépa
                    </Text>
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
    },
    hero: {
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xxl,
        paddingBottom: SPACING.xl,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
    },
    logoText: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.white,
    },
    title: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: '800',
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '600',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: SPACING.lg,
    },
    description: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 400,
    },
    features: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    featuresTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
    featureCard: {
        marginBottom: SPACING.sm,
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
    ctaContainer: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    ctaButton: {
        marginBottom: SPACING.md,
    },
    footer: {
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
    },
    footerText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.light,
        textAlign: 'center',
    },
    demoSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
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
    sentenceBox: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border.light,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
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
        marginBottom: SPACING.md,
    },
    demoHint: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
