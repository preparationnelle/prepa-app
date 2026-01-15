import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import { GRAMMAR_SENTENCES } from '../data/grammarSentences';
import { getGrammarExplanation } from '../data/grammarExplanations';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface SentencesListScreenProps {
    navigation: any;
}

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
                    <Text style={styles.backButtonText}>← Retour</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Bibliothèque de Phrases</Text>
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.themeTag}>{item.theme}</Text>
                            <View style={[styles.badge, item.difficulty_level === 'advanced' && styles.badgeAdvanced]}>
                                <Text style={styles.badgeText}>{item.difficulty_level}</Text>
                            </View>
                        </View>
                        <Text style={styles.frenchText}>{item.french}</Text>
                        <View style={styles.translationContainer}>
                            <Text style={styles.englishLabel}>EN</Text>
                            <Text style={styles.englishText}>{item.reference}</Text>
                        </View>

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
                )}
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
    themeTag: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        fontWeight: '600',
        textTransform: 'uppercase',
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
        backgroundColor: COLORS.primary + '10', // Light orange background
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
