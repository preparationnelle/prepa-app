# Architecture de l'Application

## 📐 Vue d'ensemble

Prepa Rationnelle Translations est une application React Native Expo qui suit une architecture modulaire et scalable.

## 🏗️ Structure des Dossiers

```
prepa-app/
├── App.tsx                          # Point d'entrée, configure les providers
├── src/
│   ├── config/                      # Configuration globale
│   │   ├── supabase.ts             # Client Supabase
│   │   └── theme.ts                # Constantes de design
│   │
│   ├── types/                       # Types TypeScript
│   │   └── database.types.ts       # Types générés pour Supabase
│   │
│   ├── contexts/                    # React Contexts
│   │   └── AuthContext.tsx         # Gestion de l'authentification
│   │
│   ├── navigation/                  # Navigation
│   │   └── AppNavigator.tsx        # Configuration des routes
│   │
│   ├── screens/                     # Écrans principaux
│   │   ├── HomeScreen.tsx          # Page d'accueil (public)
│   │   ├── SignUpScreen.tsx        # Inscription (public)
│   │   ├── SignInScreen.tsx        # Connexion (public)
│   │   ├── DashboardScreen.tsx     # Tableau de bord (protégé)
│   │   ├── TranslationScreen.tsx   # Interface de traduction (protégé)
│   │   ├── FeedbackScreen.tsx      # Feedback détaillé (protégé)
│   │   ├── HistoryScreen.tsx       # Historique (protégé)
│   │   ├── LessonsScreen.tsx       # Leçons (protégé)
│   │   └── TestScreen.tsx          # Mode test (protégé)
│   │
│   ├── components/                  # Composants réutilisables
│   │   ├── common/                 # Composants UI de base
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── auth/                   # Composants d'authentification
│   │   ├── translation/            # Composants de traduction
│   │   ├── dashboard/              # Composants du tableau de bord
│   │   ├── lessons/                # Composants des leçons
│   │   └── tests/                  # Composants des tests
│   │
│   ├── services/                    # Services et logique métier
│   │   ├── translationService.ts   # Logique de traduction
│   │   ├── feedbackService.ts      # Génération de feedback
│   │   └── aiService.ts            # Intégration IA (à implémenter)
│   │
│   └── utils/                       # Utilitaires
│       ├── validation.ts           # Fonctions de validation
│       └── formatting.ts           # Formatage de données
│
├── assets/                          # Ressources statiques
│   ├── images/
│   └── fonts/
│
├── supabase-schema.sql             # Schéma de base de données
├── README.md                        # Documentation principale
├── SUPABASE_SETUP.md               # Guide de configuration Supabase
└── ARCHITECTURE.md                  # Ce fichier

```

## 🔄 Flux de Données

### 1. Authentification

```
User Action → AuthContext → Supabase Auth → Update State → Navigate
```

**Détails :**
- L'utilisateur entre ses credentials
- `AuthContext` appelle `supabase.auth.signIn()`
- Supabase retourne une session
- Le state est mis à jour
- La navigation change automatiquement (public → protégé)

### 2. Traduction

```
User Input → TranslationScreen → Supabase (save) → FeedbackScreen → AI Analysis → Display
```

**Détails :**
1. L'utilisateur voit une phrase à traduire (chargée depuis `sentences`)
2. L'utilisateur saisit sa traduction
3. La traduction est sauvegardée dans `translations`
4. Navigation vers `FeedbackScreen`
5. Génération du feedback (actuellement simulé, à remplacer par IA)
6. Sauvegarde du feedback dans `feedbacks`
7. Affichage du score et des explications

### 3. Historique

```
User Request → HistoryScreen → Supabase Query → Display List
```

**Détails :**
- Requête SQL avec jointure : `translations` + `sentences`
- Filtrage par `user_id` (RLS automatique)
- Affichage chronologique (tri par `created_at`)

## 🎨 Design System

### Couleurs

```typescript
COLORS = {
  primary: '#FF6A00',      // Orange principal
  secondary: '#000000',    // Noir
  white: '#FFFFFF',
  gray: {
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#666666',
  },
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
}
```

### Espacements

```typescript
SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

### Tailles de Police

```typescript
FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
}
```

## 🔐 Sécurité

### Row Level Security (RLS)

Toutes les tables utilisent RLS pour garantir que :
- Les utilisateurs ne voient que leurs propres données
- Les données publiques (phrases, leçons) sont accessibles à tous
- Les opérations d'écriture sont restreintes

### Politiques Principales

```sql
-- Les utilisateurs voient uniquement leurs traductions
CREATE POLICY "Users can view their own translations" ON translations
  FOR SELECT USING (auth.uid() = user_id);

-- Les phrases sont visibles par tous
CREATE POLICY "Sentences are viewable by everyone" ON sentences
  FOR SELECT USING (true);
```

## 📱 Navigation

### Structure

```
AppNavigator
├── Public Stack (non authentifié)
│   ├── Home
│   ├── SignUp
│   └── SignIn
│
└── Protected Stack (authentifié)
    ├── Dashboard
    ├── Translation
    ├── Feedback
    ├── History
    ├── Lessons
    └── Test
```

### Gestion de l'État d'Authentification

```typescript
// Dans AppNavigator.tsx
const { user, loading } = useAuth();

if (loading) return <LoadingScreen />;

return (
  <NavigationContainer>
    {!user ? <PublicStack /> : <ProtectedStack />}
  </NavigationContainer>
);
```

## 🔌 Intégrations

### Supabase

**Services utilisés :**
- **Auth** : Authentification email/password
- **Database** : PostgreSQL avec RLS
- **Realtime** : (à implémenter) Mises à jour en temps réel

**Configuration :**
```typescript
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(URL, KEY);
```

### IA (À implémenter)

**Options recommandées :**
1. **OpenAI GPT-4** : Excellent pour les explications grammaticales
2. **Claude (Anthropic)** : Très bon pour le feedback pédagogique
3. **Custom Model** : Fine-tuned pour les langues spécifiques

**Intégration suggérée :**
```typescript
// src/services/aiService.ts
export async function generateFeedback(
  originalSentence: string,
  userTranslation: string,
  targetLanguage: string
) {
  // Appel API IA
  // Retourne : score, correction, explication
}
```

## 🧪 Tests (À implémenter)

### Structure suggérée

```
__tests__/
├── components/
│   ├── Button.test.tsx
│   └── Input.test.tsx
├── screens/
│   ├── TranslationScreen.test.tsx
│   └── FeedbackScreen.test.tsx
└── services/
    └── translationService.test.tsx
```

### Outils recommandés
- **Jest** : Framework de test
- **React Native Testing Library** : Tests de composants
- **MSW** : Mock des API

## 🚀 Déploiement

### Options de déploiement

1. **Expo Go** (Développement)
   ```bash
   npm start
   ```

2. **Build Standalone** (Production)
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

3. **Web** (Bonus)
   ```bash
   npm run web
   ```

## 📊 Performance

### Optimisations implémentées

- **Lazy Loading** : Navigation avec lazy imports
- **Memoization** : Utilisation de `React.memo` pour les composants
- **Index DB** : Index sur les colonnes fréquemment requêtées

### Optimisations à ajouter

- **Image Optimization** : Compression et lazy loading
- **Code Splitting** : Séparation du bundle
- **Caching** : Cache des requêtes Supabase
- **Offline Mode** : Synchronisation hors ligne

## 🔄 État de l'Application

### Context API

Actuellement utilisé pour :
- **AuthContext** : État d'authentification global

### À ajouter

- **TranslationContext** : État des traductions en cours
- **ThemeContext** : Mode sombre/clair
- **LanguageContext** : Internationalisation

## 📝 Conventions de Code

### Nommage

- **Composants** : PascalCase (`TranslationScreen.tsx`)
- **Fichiers utilitaires** : camelCase (`validation.ts`)
- **Constantes** : UPPER_SNAKE_CASE (`COLORS`, `SPACING`)

### Organisation des imports

```typescript
// 1. React et bibliothèques externes
import React from 'react';
import { View, Text } from 'react-native';

// 2. Composants locaux
import { Button } from '../components/common/Button';

// 3. Utilitaires et config
import { COLORS } from '../config/theme';
import { supabase } from '../config/supabase';

// 4. Types
import type { User } from '../types/database.types';
```

## 🎯 Prochaines Étapes

1. **Intégration IA** : Implémenter la génération automatique de feedback
2. **Mode Test** : Compléter le mode test avec timer
3. **Statistiques** : Graphiques de progression
4. **Gamification** : Badges, niveaux, streaks
5. **Social** : Partage de scores, classements
6. **Offline** : Mode hors ligne avec synchronisation
7. **i18n** : Support multilingue de l'interface

---

**Dernière mise à jour** : Janvier 2026
