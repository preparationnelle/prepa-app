import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

interface DashboardScreenProps {
    navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const menuItems = [
        {
            icon: '✍️',
            title: 'Traduire une phrase',
            description: 'Pratiquez avec des exercices de traduction',
            color: '#FF6A00',
            onPress: () => navigation.navigate('Translation'),
        },
        {
            icon: '📊',
            title: 'Historique',
            description: 'Consultez vos traductions passées',
            color: '#4CAF50',
            onPress: () => navigation.navigate('History'),
        },
        {
            icon: '📖',
            title: 'Leçons de grammaire',
            description: 'Renforcez vos connaissances',
            color: '#2196F3',
            onPress: () => navigation.navigate('Lessons'),
        },
        {
            icon: '🎯',
            title: 'Mode test',
            description: 'Testez vos compétences',
            color: '#9C27B0',
            onPress: () => navigation.navigate('Test'),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Bonjour ! 👋</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                        <Text style={styles.logoutText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Traductions</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>0%</Text>
                        <Text style={styles.statLabel}>Précision</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Tests</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>Fonctionnalités</Text>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={item.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuDescription}>{item.description}</Text>
                            </View>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Quick Start */}
                <View style={styles.quickStart}>
                    <Card>
                        <Text style={styles.quickStartTitle}>Prêt à commencer ?</Text>
                        <Text style={styles.quickStartText}>
                            Commencez par traduire votre première phrase et recevez un feedback détaillé !
                        </Text>
                        <Button
                            title="Commencer maintenant"
                            onPress={() => navigation.navigate('Translation')}
                            style={styles.quickStartButton}
                        />
                    </Card>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
    },
    greeting: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.secondary,
    },
    email: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        marginTop: SPACING.xs,
    },
    logoutButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.gray.light,
    },
    logoutText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.primary,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
        gap: SPACING.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statValue: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    statLabel: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
    menuContainer: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.md,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: BORDER_RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    menuIcon: {
        fontSize: 24,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.secondary,
        marginBottom: SPACING.xs,
    },
    menuDescription: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    arrow: {
        fontSize: 24,
        color: COLORS.gray.medium,
    },
    quickStart: {
        paddingHorizontal: SPACING.lg,
    },
    quickStartTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
    },
    quickStartText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        lineHeight: 20,
        marginBottom: SPACING.md,
    },
    quickStartButton: {
        marginTop: SPACING.sm,
    },
});
