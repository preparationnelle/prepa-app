import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

interface HistoryScreenProps {
    navigation: any;
}

interface Translation {
    id: string;
    reponse_utilisateur: string;
    score: number;
    created_at: string;
    sentences: {
        phrase_originale: string;
        langue_source: string;
        langue_cible: string;
    };
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
    const { user } = useAuth();
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('translations')
                .select(`
          *,
          sentences (
            phrase_originale,
            langue_source,
            langue_cible
          )
        `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTranslations(data || []);
        } catch (error) {
            console.error('Erreur lors du chargement de l\'historique:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return COLORS.success;
        if (score >= 60) return COLORS.warning;
        return COLORS.error;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                    <Text style={styles.title}>Historique</Text>
                    <Text style={styles.subtitle}>
                        {translations.length} traduction{translations.length > 1 ? 's' : ''}
                    </Text>
                </View>

                {translations.length === 0 ? (
                    <Card>
                        <Text style={styles.emptyTitle}>Aucune traduction pour le moment</Text>
                        <Text style={styles.emptyText}>
                            Commencez à traduire des phrases pour voir votre historique ici !
                        </Text>
                    </Card>
                ) : (
                    translations.map((translation) => (
                        <Card key={translation.id} style={styles.translationCard}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(translation.score) }]}>
                                    <Text style={styles.scoreBadgeText}>{translation.score}/100</Text>
                                </View>
                                <Text style={styles.dateText}>{formatDate(translation.created_at)}</Text>
                            </View>

                            <Text style={styles.originalSentence}>
                                {translation.sentences?.phrase_originale || 'Phrase supprimée'}
                            </Text>

                            <View style={styles.divider} />

                            <Text style={styles.userTranslation}>{translation.reponse_utilisateur}</Text>

                            <TouchableOpacity
                                style={styles.viewButton}
                                onPress={() => {
                                    // Navigation vers les détails (à implémenter)
                                }}
                            >
                                <Text style={styles.viewButtonText}>Voir les détails</Text>
                            </TouchableOpacity>
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
        lineHeight: 22,
    },
    translationCard: {
        marginHorizontal: SPACING.lg,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    scoreBadge: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    scoreBadgeText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        color: COLORS.white,
    },
    dateText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.light,
    },
    originalSentence: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
        marginBottom: SPACING.sm,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.gray.light,
        marginVertical: SPACING.sm,
    },
    userTranslation: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        fontWeight: '600',
        marginBottom: SPACING.md,
    },
    viewButton: {
        alignSelf: 'flex-start',
    },
    viewButtonText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
});
