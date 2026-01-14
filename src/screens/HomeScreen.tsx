import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

interface HomeScreenProps {
    navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [translation, setTranslation] = useState('');

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
                    <Text style={styles.description}>
                        Progressez en langues étrangères grâce à des exercices de thème grammatical
                        avec feedback pédagogique détaillé
                    </Text>
                </View>

                {/* Interactive Demo Section */}
                <View style={styles.demoSection}>
                    <Card style={styles.demoCard}>
                        <Text style={styles.demoTitle}>Essayez maintenant !</Text>
                        <Text style={styles.demoLabel}>Phrase à traduire :</Text>
                        <View style={styles.sentenceBox}>
                            <Text style={styles.sentenceText}>
                                Je voudrais apprendre à parler couramment l'anglais.
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
                            onPress={() => alert('Fonctionnalité en cours de développement')}
                            variant="primary"
                            style={styles.demoButton}
                        />
                    </Card>
                </View>

                {/* Features */}
                <View style={styles.features}>
                    <Card style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Traduction Interactive</Text>
                        <Text style={styles.featureText}>
                            Traduisez des phrases et recevez un feedback immédiat sur votre grammaire
                        </Text>
                    </Card>

                    <Card style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Suivi de Progression</Text>
                        <Text style={styles.featureText}>
                            Visualisez vos progrès et identifiez vos axes d'amélioration
                        </Text>
                    </Card>

                    <Card style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Leçons de Grammaire</Text>
                        <Text style={styles.featureText}>
                            Accédez à des leçons complètes pour renforcer vos connaissances
                        </Text>
                    </Card>

                    <Card style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Mode Test</Text>
                        <Text style={styles.featureText}>
                            Testez vos compétences avec des séries de phrases chronométrées
                        </Text>
                    </Card>
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
    featureCard: {
        alignItems: 'center',
    },
    featureIcon: {
        fontSize: 40,
        marginBottom: SPACING.md,
    },
    featureTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    featureText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
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
        backgroundColor: COLORS.primary + '10',
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.lg,
    },
    sentenceText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        fontStyle: 'italic',
        lineHeight: 22,
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
