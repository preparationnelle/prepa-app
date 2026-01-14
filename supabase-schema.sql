-- Prepa Rationnelle Translations - Schéma de base de données Supabase

-- Table des utilisateurs (gérée automatiquement par Supabase Auth)
-- auth.users est déjà créée par Supabase

-- Table des phrases à traduire
CREATE TABLE IF NOT EXISTS sentences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  langue_source TEXT NOT NULL,
  langue_cible TEXT NOT NULL,
  phrase_originale TEXT NOT NULL,
  theme_grammatical TEXT NOT NULL,
  niveau TEXT NOT NULL CHECK (niveau IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des traductions des utilisateurs
CREATE TABLE IF NOT EXISTS translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sentence_id UUID NOT NULL REFERENCES sentences(id) ON DELETE CASCADE,
  reponse_utilisateur TEXT NOT NULL,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des feedbacks
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  translation_id UUID NOT NULL REFERENCES translations(id) ON DELETE CASCADE,
  correction_complete TEXT NOT NULL,
  traduction_modele TEXT NOT NULL,
  explication_grammaticale TEXT NOT NULL
);

-- Table des leçons de grammaire
CREATE TABLE IF NOT EXISTS grammar_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  niveau TEXT NOT NULL CHECK (niveau IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2'))
);

-- Table des exercices de grammaire
CREATE TABLE IF NOT EXISTS grammar_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  bonne_reponse TEXT NOT NULL
);

-- Table des tests
CREATE TABLE IF NOT EXISTS tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score_final INTEGER DEFAULT 0 CHECK (score_final >= 0 AND score_final <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des résultats de tests
CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  sentence_id UUID NOT NULL REFERENCES sentences(id) ON DELETE CASCADE,
  reponse_utilisateur TEXT NOT NULL,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_translations_user_id ON translations(user_id);
CREATE INDEX IF NOT EXISTS idx_translations_sentence_id ON translations(sentence_id);
CREATE INDEX IF NOT EXISTS idx_translations_created_at ON translations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedbacks_translation_id ON feedbacks(translation_id);
CREATE INDEX IF NOT EXISTS idx_grammar_exercises_lesson_id ON grammar_exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_tests_user_id ON tests(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results(test_id);

-- Politiques de sécurité RLS (Row Level Security)

-- Activer RLS sur toutes les tables
ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Politiques pour sentences (lecture publique, écriture admin)
CREATE POLICY "Sentences are viewable by everyone" ON sentences
  FOR SELECT USING (true);

-- Politiques pour translations (les utilisateurs ne voient que leurs propres traductions)
CREATE POLICY "Users can view their own translations" ON translations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own translations" ON translations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politiques pour feedbacks (accessible via les traductions)
CREATE POLICY "Users can view feedbacks for their translations" ON feedbacks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM translations
      WHERE translations.id = feedbacks.translation_id
      AND translations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert feedbacks for their translations" ON feedbacks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM translations
      WHERE translations.id = feedbacks.translation_id
      AND translations.user_id = auth.uid()
    )
  );

-- Politiques pour grammar_lessons (lecture publique)
CREATE POLICY "Grammar lessons are viewable by everyone" ON grammar_lessons
  FOR SELECT USING (true);

-- Politiques pour grammar_exercises (lecture publique)
CREATE POLICY "Grammar exercises are viewable by everyone" ON grammar_exercises
  FOR SELECT USING (true);

-- Politiques pour tests (les utilisateurs ne voient que leurs propres tests)
CREATE POLICY "Users can view their own tests" ON tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tests" ON tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politiques pour test_results (accessible via les tests)
CREATE POLICY "Users can view results for their tests" ON test_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tests
      WHERE tests.id = test_results.test_id
      AND tests.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert results for their tests" ON test_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM tests
      WHERE tests.id = test_results.test_id
      AND tests.user_id = auth.uid()
    )
  );

-- Données d'exemple pour commencer
INSERT INTO sentences (langue_source, langue_cible, phrase_originale, theme_grammatical, niveau) VALUES
  ('Français', 'Anglais', 'Je vais à l''école tous les jours.', 'Présent simple', 'A2'),
  ('Français', 'Anglais', 'Elle a mangé une pomme hier.', 'Passé composé', 'A2'),
  ('Français', 'Anglais', 'Nous étudierons demain.', 'Futur simple', 'B1'),
  ('Français', 'Espagnol', 'Je voudrais un café, s''il vous plaît.', 'Conditionnel de politesse', 'A2'),
  ('Français', 'Allemand', 'Le livre est sur la table.', 'Prépositions de lieu', 'A1');

INSERT INTO grammar_lessons (titre, contenu, niveau) VALUES
  ('Le Présent Simple en Anglais', 'Le présent simple est utilisé pour exprimer des habitudes, des vérités générales et des faits. Formation : sujet + verbe (base verbale). Exemple : I go to school every day.', 'A1'),
  ('Le Passé Composé', 'Le passé composé est utilisé pour parler d''actions passées et terminées. Il se forme avec l''auxiliaire avoir ou être au présent + participe passé.', 'A2'),
  ('Les Prépositions de Lieu', 'Les prépositions de lieu indiquent où se trouve quelque chose. Exemples : sur (on), sous (under), dans (in), à côté de (next to).', 'A1');
