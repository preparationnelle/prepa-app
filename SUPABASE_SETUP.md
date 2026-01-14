# Instructions de configuration Supabase

## 1. Créer un projet Supabase

1. Allez sur https://supabase.com
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - Name: prepa-rationnelle-translations
   - Database Password: (choisissez un mot de passe fort)
   - Region: (choisissez la région la plus proche)
5. Cliquez sur "Create new project"

## 2. Exécuter le schéma SQL

1. Dans votre projet Supabase, allez dans "SQL Editor"
2. Cliquez sur "New query"
3. Copiez tout le contenu du fichier `supabase-schema.sql`
4. Collez-le dans l'éditeur SQL
5. Cliquez sur "Run" pour exécuter le script
6. Vérifiez qu'il n'y a pas d'erreurs

## 3. Récupérer vos clés API

1. Allez dans "Settings" (icône d'engrenage en bas à gauche)
2. Cliquez sur "API"
3. Vous verrez :
   - **Project URL** : Copiez cette URL
   - **Project API keys** : Copiez la clé "anon" (public)

## 4. Configurer l'application

1. Ouvrez le fichier `src/config/supabase.ts`
2. Remplacez les valeurs :

```typescript
const SUPABASE_URL = 'https://votre-projet-id.supabase.co';
const SUPABASE_ANON_KEY = 'votre-cle-anon-publique-ici';
```

## 5. Vérifier la configuration

1. Lancez l'application : `npm start`
2. Essayez de créer un compte
3. Si tout fonctionne, vous devriez pouvoir :
   - Créer un compte
   - Se connecter
   - Voir le tableau de bord

## 6. Vérifier les données dans Supabase

1. Allez dans "Table Editor" dans Supabase
2. Vous devriez voir toutes les tables :
   - sentences
   - translations
   - feedbacks
   - grammar_lessons
   - grammar_exercises
   - tests
   - test_results

3. La table `sentences` devrait contenir 5 phrases d'exemple
4. La table `grammar_lessons` devrait contenir 3 leçons d'exemple

## 7. Tester l'authentification

1. Dans Supabase, allez dans "Authentication" > "Users"
2. Après avoir créé un compte dans l'app, vous devriez voir l'utilisateur ici
3. Vous pouvez gérer les utilisateurs depuis cette interface

## 8. Politiques de sécurité (RLS)

Les politiques Row Level Security sont déjà configurées dans le schéma SQL :
- Les utilisateurs ne peuvent voir que leurs propres traductions
- Les phrases et leçons sont visibles par tous
- Les feedbacks sont accessibles uniquement via les traductions de l'utilisateur

## 9. Ajouter plus de phrases

Pour ajouter des phrases d'exemple, allez dans "Table Editor" > "sentences" et cliquez sur "Insert row", ou exécutez du SQL :

```sql
INSERT INTO sentences (langue_source, langue_cible, phrase_originale, theme_grammatical, niveau) VALUES
  ('Français', 'Anglais', 'Votre phrase ici', 'Thème grammatical', 'A2');
```

## 10. Prochaines étapes

- Intégrer une API d'IA (OpenAI, Claude) pour générer les feedbacks automatiquement
- Ajouter plus de phrases dans différentes langues
- Créer plus de leçons de grammaire
- Implémenter le mode test complet

## Problèmes courants

### Erreur : "Invalid API key"
- Vérifiez que vous avez bien copié la clé "anon" (pas la clé "service_role")
- Vérifiez qu'il n'y a pas d'espaces avant/après la clé

### Erreur : "Failed to fetch"
- Vérifiez que l'URL du projet est correcte
- Vérifiez votre connexion internet

### Les utilisateurs ne peuvent pas s'inscrire
- Vérifiez que l'authentification par email est activée dans Supabase
- Allez dans "Authentication" > "Providers" et vérifiez que "Email" est activé
