import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../config/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    isPassword = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, error && styles.inputError]}
                    placeholderTextColor={COLORS.gray.medium}
                    secureTextEntry={isPassword && !showPassword}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray.medium,
        borderRadius: BORDER_RADIUS.md,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        backgroundColor: COLORS.white,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.error,
        marginTop: SPACING.xs,
    },
    eyeButton: {
        position: 'absolute',
        right: SPACING.md,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    eyeText: {
        fontSize: 20,
    },
});
