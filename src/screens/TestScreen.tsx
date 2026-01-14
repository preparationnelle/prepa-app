import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../config/theme';

interface TestScreenProps {
    navigation: any;
}

export const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.emoji}>🎯</Text>
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
                    <Text style={styles.comingSoonEmoji}>🚧</Text>
                    <Text style={styles.comingSoonTitle}>Bientôt disponible</Text>
                    <Text style={styles.comingSoonText}>
                        Le mode test est en cours de développement. Revenez bientôt pour tester vos compétences !
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
    emoji: {
        fontSize: 80,
        marginBottom: SPACING.md,
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
    comingSoonEmoji: {
        fontSize: 60,
        marginBottom: SPACING.md,
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
