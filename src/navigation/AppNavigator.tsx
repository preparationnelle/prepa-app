import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { COLORS } from '../config/theme';
import { RootStackParamList } from '../types/navigation.types';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { TranslationScreen } from '../screens/TranslationScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { LessonsScreen } from '../screens/LessonsScreen';
import { TestScreen } from '../screens/TestScreen';
import { SentencesListScreen } from '../screens/SentencesListScreen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                    headerShadowVisible: false,
                }}
            >
                {!user ? (
                    // Public screens
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={SignUpScreen}
                            options={{ title: 'Inscription' }}
                        />
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{ title: 'Connexion' }}
                        />
                        <Stack.Screen
                            name="SentencesList"
                            component={SentencesListScreen}
                            options={{ title: 'Phrases' }}
                        />
                        <Stack.Screen
                            name="Feedback"
                            component={FeedbackScreen}
                            options={{ title: 'Feedback' }}
                        />
                    </>
                ) : (
                    // Protected screens
                    <>
                        <Stack.Screen
                            name="Dashboard"
                            component={DashboardScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Translation"
                            component={TranslationScreen}
                            options={{ title: 'Traduction' }}
                        />
                        <Stack.Screen
                            name="Feedback"
                            component={FeedbackScreen}
                            options={{ title: 'Feedback' }}
                        />
                        <Stack.Screen
                            name="History"
                            component={HistoryScreen}
                            options={{ title: 'Historique' }}
                        />
                        <Stack.Screen
                            name="Lessons"
                            component={LessonsScreen}
                            options={{ title: 'Leçons' }}
                        />
                        <Stack.Screen
                            name="Test"
                            component={TestScreen}
                            options={{ title: 'Mode Test' }}
                        />
                        <Stack.Screen
                            name="SentencesList"
                            component={SentencesListScreen}
                            options={{ title: 'Phrases' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
});
