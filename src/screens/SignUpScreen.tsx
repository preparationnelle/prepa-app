import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SPACING, FONT_SIZES } from '../config/theme';

interface SignUpScreenProps {
    navigation: any;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

    const { signUp } = useAuth();

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!email) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email invalide';
        }

        if (!password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await signUp(email, password);
            Alert.alert(
                'Inscription réussie',
                'Vérifiez votre email pour confirmer votre compte',
                [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
            );
        } catch (error: any) {
            Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Créer un compte</Text>
                        <Text style={styles.subtitle}>
                            Rejoignez Prepa Rationnelle Translations pour commencer votre apprentissage
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Email"
                            placeholder="votre@email.com"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors({ ...errors, email: undefined });
                            }}
                            error={errors.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />

                        <Input
                            label="Mot de passe"
                            placeholder="Minimum 6 caractères"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrors({ ...errors, password: undefined });
                            }}
                            error={errors.password}
                            isPassword
                            autoCapitalize="none"
                        />

                        <Input
                            label="Confirmer le mot de passe"
                            placeholder="Retapez votre mot de passe"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setErrors({ ...errors, confirmPassword: undefined });
                            }}
                            error={errors.confirmPassword}
                            isPassword
                            autoCapitalize="none"
                        />

                        <Button
                            title="S'inscrire"
                            onPress={handleSignUp}
                            loading={loading}
                            style={styles.submitButton}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
                            <Text
                                style={styles.linkText}
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                Se connecter
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
    },
    header: {
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: '800',
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        lineHeight: 22,
    },
    form: {
        flex: 1,
    },
    submitButton: {
        marginTop: SPACING.lg,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    footerText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    linkText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
});
