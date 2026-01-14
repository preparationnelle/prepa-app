import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../config/theme';

interface LanguageTabsProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
    { id: 'allemand', label: 'Allemand' },
    { id: 'anglais', label: 'Anglais' },
    { id: 'espagnol', label: 'Espagnol' },
];

export const LanguageTabs: React.FC<LanguageTabsProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <View style={styles.container}>
            {LANGUAGES.map((lang) => (
                <TouchableOpacity
                    key={lang.id}
                    style={[
                        styles.tab,
                        selectedLanguage === lang.id && styles.tabActive,
                    ]}
                    onPress={() => onLanguageChange(lang.id)}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedLanguage === lang.id && styles.tabTextActive,
                        ]}
                    >
                        {lang.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    tab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: 'transparent',
    },
    tabActive: {
        backgroundColor: COLORS.white,
    },
    tabText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '500',
        color: COLORS.text.secondary,
    },
    tabTextActive: {
        color: COLORS.secondary,
        fontWeight: '600',
    },
});
