import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

interface TestScreenProps {
    navigation: any;
}

export const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconBadge}>
                        <Text style={styles.iconBadgeText}>TEST</Text>
                    </View>
                    <Text style={styles.title}>Mode Test</Text>
                    <Text style={styles.subtitle}>
                        Testez vos compétences avec une série de phrases chronométrées
                    </Text>
                </View>

                <Card>
                    <Text style={styles.cardTitle}>Comment ça marche ?</Text>
                    <Text style={styles.cardText}>
                        • Vous aurez 10 phrases à traduire{'\n'}
                        • Chaque phrase a un temps limité{'\n'}
                        • Vous recevrez un score final{'\n'}
                        • Des recommandations personnalisées
                    </Text>
                </Card>

                <Card style={styles.comingSoon}>
                    <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonBadgeText}>EN DEVELOPPEMENT</Text>
                    </View>
                    <Text style={styles.comingSoonTitle}>Bientot disponible</Text>
                    <Text style={styles.comingSoonText}>
                        Le mode test est en cours de developpement. Revenez bientot pour tester vos competences !
                    </Text>
                </Card>

                <Button
                    title="Retour au tableau de bord"
                    onPress={() => navigation.navigate('Dashboard')}
                    variant="outline"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    iconBadge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
    },
    iconBadgeText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '800',
        color: COLORS.white,
    },
    title: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: '800',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    cardTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.md,
    },
    cardText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        lineHeight: 22,
    },
    comingSoon: {
        backgroundColor: COLORS.warning + '10',
        alignItems: 'center',
    },
    comingSoonBadge: {
        backgroundColor: COLORS.warning,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.md,
    },
    comingSoonBadgeText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    comingSoonTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    comingSoonText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
    },
});
