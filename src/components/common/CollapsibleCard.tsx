import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../config/theme';

interface CollapsibleCardProps {
    title: string;
    icon?: string;
    children?: React.ReactNode;
    defaultExpanded?: boolean;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
    title,
    icon,
    children,
    defaultExpanded = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
            >
                <View style={styles.headerContent}>
                    {icon && <Text style={styles.icon}>{icon}</Text>}
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {isExpanded && children && (
                <View style={styles.content}>{children}</View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border.light,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    icon: {
        fontSize: FONT_SIZES.lg,
    },
    title: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.secondary,
    },
    chevron: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.light,
    },
    content: {
        padding: SPACING.md,
        paddingTop: 0,
    },
});
