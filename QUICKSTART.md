# 🚀 Démarrage Rapide - Prepa Rationnelle Translations

## ⚡ En 5 Minutes

### 1. Configuration Supabase (2 min)

```bash
# 1. Allez sur https://supabase.com
# 2. Créez un compte et un nouveau projet
# 3. Dans SQL Editor, exécutez le contenu de supabase-schema.sql
# 4. Récupérez vos clés dans Settings > API
```

### 2. Configuration de l'App (1 min)

Ouvrez `src/config/supabase.ts` et remplacez :

```typescript
const SUPABASE_URL = 'VOTRE_URL_ICI';  // Ex: https://abc123.supabase.co
const SUPABASE_ANON_KEY = 'VOTRE_CLE_ICI';  // La clé "anon public"
```

### 3. Lancement (2 min)

```bash
cd prepa-app
npm start
```

Scannez le QR code avec **Expo Go** sur votre téléphone !

---

## 📱 Tester l'Application

### Première Utilisation

1. **Créer un compte**
   - Email : test@example.com
   - Mot de passe : test123456

2. **Se connecter**
   - Utilisez les mêmes identifiants

3. **Traduire une phrase**
   - Cliquez sur "Traduire une phrase"
   - Essayez de traduire la phrase affichée
   - Cliquez sur "Valider"

4. **Voir le feedback**
   - Consultez votre score
   - Lisez l'analyse grammaticale
   - Comparez avec la traduction modèle

5. **Explorer**
   - Historique : vos traductions passées
   - Leçons : contenu pédagogique
   - Tests : mode test (à venir)

---

## 🎯 Commandes Utiles

```bash
# Démarrer l'app
npm start

# Lancer sur iOS Simulator
npm run ios

# Lancer sur Android Emulator
npm run android

# Lancer dans le navigateur
npm run web

# Nettoyer le cache
npx expo start --clear

# Vérifier les types TypeScript
npx tsc --noEmit
```

---

## 🐛 Problèmes Courants

### "Cannot connect to Supabase"
✅ Vérifiez que vous avez bien mis à jour `src/config/supabase.ts`

### "Invalid API key"
✅ Utilisez la clé "anon" (pas "service_role")

### "No sentences found"
✅ Exécutez le fichier `supabase-schema.sql` dans Supabase

### L'app ne se lance pas
✅ Essayez : `rm -rf node_modules && npm install`

---

## 📚 Documentation

- **README.md** : Documentation complète
- **SUPABASE_SETUP.md** : Guide Supabase détaillé
- **ARCHITECTURE.md** : Documentation technique
- **TODO.md** : Fonctionnalités à développer
- **PROJET_COMPLET.md** : Récapitulatif complet

---

## 🎨 Design

L'app utilise :
- **Orange** (#FF6A00) comme couleur principale
- **Noir** (#000000) comme couleur secondaire
- Design moderne et épuré
- Cards avec ombres subtiles

---

## 🔐 Sécurité

- ✅ Row Level Security (RLS) activé
- ✅ Authentification sécurisée
- ✅ Les utilisateurs ne voient que leurs données

---

## 🚧 Prochaines Étapes

1. **Intégrer une IA** pour générer de vrais feedbacks (OpenAI, Claude)
2. **Ajouter plus de phrases** (actuellement 5 exemples)
3. **Compléter le mode test** avec timer
4. **Ajouter des statistiques** détaillées

---

## 💡 Astuce

Pour tester rapidement sans créer de compte :
1. Créez un compte test
2. Les données d'exemple sont déjà dans Supabase
3. Vous pouvez immédiatement traduire des phrases !

---

## 📞 Besoin d'Aide ?

Consultez les fichiers de documentation :
- Questions générales → `README.md`
- Configuration Supabase → `SUPABASE_SETUP.md`
- Architecture technique → `ARCHITECTURE.md`

---

**Bon développement ! 🎉**
