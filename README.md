# Prepa Rationnelle Translations 📚

Application mobile React Native Expo pour l'apprentissage des langues étrangères via des exercices de traduction avec feedback grammatical détaillé.

## 🎯 Fonctionnalités

- ✍️ **Traduction Interactive** : Traduisez des phrases et recevez un feedback immédiat
- 📊 **Suivi de Progression** : Visualisez vos statistiques et votre évolution
- 📖 **Leçons de Grammaire** : Accédez à des leçons complètes par niveau
- 🎯 **Mode Test** : Testez vos compétences avec des exercices chronométrés
- 📱 **Interface Moderne** : Design épuré et responsive

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Expo CLI
- Un compte Supabase

### Étapes d'installation

1. **Cloner le projet** (déjà fait)

2. **Installer les dépendances**
```bash
cd prepa-app
npm install
```

3. **Configurer Supabase**

   a. Créez un projet sur [Supabase](https://supabase.com)
   
   b. Dans le SQL Editor de Supabase, exécutez le contenu du fichier `supabase-schema.sql`
   
   c. Récupérez vos clés API :
      - URL du projet : `Settings > API > Project URL`
      - Clé anon : `Settings > API > Project API keys > anon public`
   
   d. Mettez à jour le fichier `src/config/supabase.ts` avec vos clés :
   ```typescript
   const SUPABASE_URL = 'https://votre-projet.supabase.co';
   const SUPABASE_ANON_KEY = 'votre-cle-anon';
   ```

4. **Lancer l'application**
```bash
npm start
```

Ensuite, scannez le QR code avec l'application Expo Go sur votre téléphone, ou appuyez sur :
- `i` pour iOS Simulator
- `a` pour Android Emulator
- `w` pour Web

## 📁 Structure du Projet

```
prepa-app/
├── App.tsx                 # Point d'entrée principal
├── src/
│   ├── config/            # Configuration (Supabase, thème)
│   ├── types/             # Types TypeScript
│   ├── contexts/          # Contexts React (Auth)
│   ├── navigation/        # Navigation de l'app
│   ├── screens/           # Écrans principaux
│   ├── components/        # Composants réutilisables
│   │   ├── common/       # Composants UI de base
│   │   ├── auth/         # Composants d'authentification
│   │   ├── translation/  # Composants de traduction
│   │   └── ...
│   └── utils/            # Utilitaires
├── assets/               # Images et ressources
└── supabase-schema.sql   # Schéma de base de données
```

## 🎨 Design

- **Couleur principale** : #FF6A00 (Orange)
- **Couleur secondaire** : #000000 (Noir)
- **Style** : Moderne, épuré, orienté apprentissage

## 🔐 Authentification

L'application utilise Supabase Auth pour gérer :
- Inscription par email/mot de passe
- Connexion
- Gestion de session
- Déconnexion

## 💾 Base de Données

### Tables principales

- `sentences` : Phrases à traduire
- `translations` : Traductions des utilisateurs
- `feedbacks` : Feedbacks détaillés
- `grammar_lessons` : Leçons de grammaire
- `grammar_exercises` : Exercices de grammaire
- `tests` : Tests des utilisateurs
- `test_results` : Résultats des tests

## 🔄 Workflow Utilisateur

1. **Inscription/Connexion** → Authentification
2. **Tableau de bord** → Vue d'ensemble
3. **Traduction** → Exercice de traduction
4. **Feedback** → Analyse détaillée
5. **Historique** → Consultation des traductions passées
6. **Leçons** → Apprentissage théorique
7. **Tests** → Évaluation des compétences

## 🚧 Fonctionnalités à Développer

- [ ] Intégration d'une IA pour générer les feedbacks (OpenAI, Claude, etc.)
- [ ] Mode test complet avec timer
- [ ] Statistiques avancées
- [ ] Système de niveaux et badges
- [ ] Mode hors ligne
- [ ] Notifications push
- [ ] Partage de progression

## 🛠️ Technologies Utilisées

- **React Native** : Framework mobile
- **Expo** : Plateforme de développement
- **TypeScript** : Typage statique
- **Supabase** : Backend (Auth + Database)
- **React Navigation** : Navigation
- **React Context** : Gestion d'état

## 📝 Scripts Disponibles

```bash
npm start          # Démarre le serveur Expo
npm run android    # Lance sur Android
npm run ios        # Lance sur iOS
npm run web        # Lance dans le navigateur
```

## 🐛 Dépannage

### Problème : "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Problème : Erreurs Supabase
- Vérifiez que vos clés API sont correctes
- Vérifiez que le schéma SQL a été exécuté
- Vérifiez les politiques RLS dans Supabase

### Problème : Expo ne se lance pas
```bash
npx expo start --clear
```

## 📧 Support

Pour toute question ou problème, consultez la documentation :
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [Supabase](https://supabase.com/docs)

## 📄 Licence

Ce projet est développé pour un usage éducatif.

---

**Développé avec ❤️ pour les étudiants en prépa**
