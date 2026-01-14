# 📋 TODO - Prepa Rationnelle Translations

## 🔴 URGENT - À faire AVANT le premier lancement

- [ ] **Configurer Supabase**
  - [ ] Créer un compte sur supabase.com
  - [ ] Créer un nouveau projet
  - [ ] Exécuter `supabase-schema.sql` dans le SQL Editor
  - [ ] Récupérer l'URL du projet
  - [ ] Récupérer la clé anon
  - [ ] Mettre à jour `src/config/supabase.ts` avec les vraies valeurs

## 🟠 IMPORTANT - Fonctionnalités principales

### Intégration IA pour le Feedback
- [ ] Choisir un provider IA (OpenAI GPT-4, Claude, etc.)
- [ ] Créer un compte et obtenir une API key
- [ ] Créer `src/services/aiService.ts`
- [ ] Implémenter `generateFeedback()` avec l'API IA
- [ ] Remplacer le feedback simulé dans `FeedbackScreen.tsx`
- [ ] Ajouter la gestion des erreurs API
- [ ] Implémenter un système de cache pour économiser les appels API

### Mode Test Complet
- [ ] Créer l'interface de sélection (nombre de questions, niveau, langue)
- [ ] Implémenter le timer par question
- [ ] Créer le système de progression (question 1/10, etc.)
- [ ] Implémenter la logique de scoring
- [ ] Créer l'écran de résultats final
- [ ] Sauvegarder les résultats dans la table `tests`
- [ ] Afficher l'historique des tests

## 🟡 MOYEN - Améliorations UX/UI

### Statistiques et Progression
- [ ] Créer un écran de statistiques détaillées
- [ ] Implémenter des graphiques de progression (react-native-chart-kit)
- [ ] Afficher les points forts/faibles par thème grammatical
- [ ] Créer un système de streaks (jours consécutifs)
- [ ] Ajouter des graphiques d'évolution du score

### Gamification
- [ ] Système de niveaux (débutant → expert)
- [ ] Badges et achievements
- [ ] Système de points XP
- [ ] Classement entre utilisateurs (leaderboard)
- [ ] Défis quotidiens/hebdomadaires

### Design
- [ ] Ajouter des animations (react-native-reanimated)
- [ ] Implémenter un mode sombre
- [ ] Ajouter des micro-interactions
- [ ] Créer des illustrations personnalisées
- [ ] Améliorer les transitions entre écrans

## 🟢 BON À AVOIR - Fonctionnalités avancées

### Contenu
- [ ] Ajouter plus de phrases (minimum 100 par langue/niveau)
- [ ] Créer plus de leçons de grammaire (20+ leçons)
- [ ] Ajouter des exercices interactifs aux leçons
- [ ] Implémenter un système de révision espacée (spaced repetition)
- [ ] Ajouter des explications audio pour les leçons

### Langues
- [ ] Ajouter l'espagnol
- [ ] Ajouter l'allemand
- [ ] Ajouter l'italien
- [ ] Permettre la sélection de la langue source
- [ ] Ajouter la prononciation (text-to-speech)

### Social
- [ ] Système d'amis
- [ ] Partage de scores sur les réseaux sociaux
- [ ] Groupes d'étude
- [ ] Commentaires et discussions sur les leçons
- [ ] Système de mentorat (étudiants avancés aident débutants)

### Technique
- [ ] Mode hors ligne avec synchronisation
- [ ] Notifications push (rappels quotidiens)
- [ ] Export des données utilisateur (RGPD)
- [ ] Tests unitaires (Jest)
- [ ] Tests E2E (Detox)
- [ ] CI/CD (GitHub Actions)
- [ ] Analytics (Mixpanel, Amplitude)

### Performance
- [ ] Optimiser les images
- [ ] Implémenter le lazy loading
- [ ] Ajouter un cache pour les requêtes Supabase
- [ ] Optimiser les re-renders React
- [ ] Réduire la taille du bundle

## 🔵 FUTUR - Idées à explorer

### IA Avancée
- [ ] Génération automatique de phrases basée sur les erreurs de l'utilisateur
- [ ] Chatbot pour pratiquer la conversation
- [ ] Reconnaissance vocale pour la prononciation
- [ ] Correction automatique en temps réel

### Monétisation (si applicable)
- [ ] Version gratuite vs premium
- [ ] Abonnement mensuel/annuel
- [ ] Achats in-app (packs de leçons)
- [ ] Publicités non intrusives

### Expansion
- [ ] Version web (React)
- [ ] Version desktop (Electron)
- [ ] API publique pour intégrations tierces
- [ ] Marketplace de contenu créé par la communauté

## 📝 Notes de Développement

### Bugs Connus
- [ ] Aucun pour le moment (app nouvellement créée)

### Optimisations à Faire
- [ ] Les types Supabase pourraient être générés automatiquement
- [ ] Le feedback simulé doit être remplacé par une vraie IA
- [ ] Ajouter plus de validation côté client

### Décisions Techniques à Prendre
- [ ] Choisir le provider IA (OpenAI vs Claude vs autre)
- [ ] Décider si on utilise Redux ou on reste avec Context API
- [ ] Choisir une librairie de graphiques
- [ ] Décider de la stratégie de cache

## 🎯 Roadmap Suggérée

### Phase 1 - MVP Fonctionnel (1-2 semaines)
1. Configurer Supabase ✅
2. Intégrer l'IA pour le feedback
3. Ajouter 50 phrases minimum
4. Tester avec de vrais utilisateurs

### Phase 2 - Amélioration UX (2-3 semaines)
1. Implémenter le mode test complet
2. Ajouter les statistiques détaillées
3. Améliorer le design et les animations
4. Ajouter plus de leçons

### Phase 3 - Gamification (2 semaines)
1. Système de niveaux et badges
2. Streaks et défis quotidiens
3. Classements
4. Partage social

### Phase 4 - Expansion (1 mois)
1. Ajouter d'autres langues
2. Mode hors ligne
3. Notifications push
4. Version web

## ✅ Checklist de Lancement

Avant de publier sur les stores :

- [ ] Tests complets sur iOS
- [ ] Tests complets sur Android
- [ ] Vérification de la sécurité (RLS, Auth)
- [ ] Optimisation des performances
- [ ] Création des screenshots pour les stores
- [ ] Rédaction de la description
- [ ] Définition de la politique de confidentialité
- [ ] Définition des conditions d'utilisation
- [ ] Configuration des analytics
- [ ] Configuration du crash reporting
- [ ] Tests avec de vrais utilisateurs (beta testing)

---

**Dernière mise à jour** : 12 janvier 2026  
**Priorité actuelle** : Configurer Supabase et intégrer l'IA
