import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { supabase } from '../config/supabase';
import { COLORS, SPACING, FONT_SIZES } from '../config/theme';

interface LessonsScreenProps {
    navigation: any;
}

interface Lesson {
    id: string;
    titre: string;
    contenu: string;
    niveau: string;
}

export const LessonsScreen: React.FC<LessonsScreenProps> = ({ navigation }) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLessons();
    }, []);

    const loadLessons = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('grammar_lessons')
                .select('*')
                .order('niveau', { ascending: true });

            if (error) throw error;
            setLessons(data || []);
        } catch (error) {
            console.error('Erreur lors du chargement des leçons:', error);
            // Leçons d'exemple si la base est vide
            setLessons([
                {
                    id: '1',
                    titre: 'Le Présent Simple',
                    contenu: 'Le présent simple est utilisé pour exprimer des habitudes, des vérités générales et des faits...',
                    niveau: 'A1',
                },
                {
                    id: '2',
                    titre: 'Le Passé Composé',
                    contenu: 'Le passé composé est utilisé pour parler d\'actions passées et terminées...',
                    niveau: 'A2',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const getLevelColor = (niveau: string) => {
        switch (niveau) {
            case 'A1': return '#4CAF50';
            case 'A2': return '#8BC34A';
            case 'B1': return '#FFC107';
            case 'B2': return '#FF9800';
            case 'C1': return '#FF5722';
            case 'C2': return '#F44336';
            default: return COLORS.gray.medium;
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Leçons de Grammaire</Text>
                    <Text style={styles.subtitle}>
                        Renforcez vos connaissances avec nos leçons détaillées
                    </Text>
                </View>

                {lessons.length === 0 ? (
                    <Card>
                        <Text style={styles.emptyTitle}>Aucune leçon disponible</Text>
                        <Text style={styles.emptyText}>
                            Les leçons seront bientôt disponibles !
                        </Text>
                    </Card>
                ) : (
                    lessons.map((lesson) => (
                        <Card
                            key={lesson.id}
                            onPress={() => {
                                // Navigation vers les détails de la leçon
                            }}
                            style={styles.lessonCard}
                        >
                            <View style={styles.lessonHeader}>
                                <Text style={styles.lessonTitle}>{lesson.titre}</Text>
                                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(lesson.niveau) }]}>
                                    <Text style={styles.levelText}>{lesson.niveau}</Text>
                                </View>
                            </View>
                            <Text style={styles.lessonContent} numberOfLines={3}>
                                {lesson.contenu}
                            </Text>
                            <Text style={styles.readMore}>Lire la suite →</Text>
                        </Card>
                    ))
                )}
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
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: '800',
        color: COLORS.secondary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        lineHeight: 22,
    },
    emptyTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
    lessonCard: {
        marginHorizontal: SPACING.lg,
    },
    lessonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    lessonTitle: {
        flex: 1,
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginRight: SPACING.md,
    },
    levelBadge: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: 12,
    },
    levelText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        color: COLORS.white,
    },
    lessonContent: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        lineHeight: 20,
        marginBottom: SPACING.sm,
    },
    readMore: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
});
