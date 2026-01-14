import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../config/theme';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    onPress?: () => void;
    style?: any;
}

export const Card: React.FC<CardProps> = ({ title, children, onPress, style }) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            style={[styles.card, style]}
            onPress={onPress}
            activeOpacity={onPress ? 0.8 : 1}
        >
            {title && <Text style={styles.title}>{title}</Text>}
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
});
