// Script de test de connexion Supabase
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Test de connexion Supabase...\n');
console.log('URL:', supabaseUrl ? '✅ Configurée' : '❌ Manquante');
console.log('Clé:', supabaseAnonKey ? '✅ Configurée' : '❌ Manquante');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('\n❌ Variables d\'environnement manquantes!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('\n📊 Vérification des tables...\n');

    const tables = ['sentences', 'translations', 'feedbacks', 'grammar_lessons', 'grammar_exercises', 'tests', 'test_results'];

    for (const table of tables) {
        try {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                console.log(`❌ ${table}: ${error.message}`);
            } else {
                console.log(`✅ ${table}: Table existe (${count || 0} enregistrements)`);
            }
        } catch (e) {
            console.log(`❌ ${table}: Erreur - ${e.message}`);
        }
    }

    // Test de lecture des sentences
    console.log('\n📖 Lecture des phrases existantes...\n');
    const { data: sentences, error: sentencesError } = await supabase
        .from('sentences')
        .select('*')
        .limit(5);

    if (sentencesError) {
        console.log('❌ Erreur lecture sentences:', sentencesError.message);
    } else if (sentences && sentences.length > 0) {
        console.log(`✅ ${sentences.length} phrase(s) trouvée(s):`);
        sentences.forEach((s, i) => {
            console.log(`   ${i + 1}. "${s.phrase_originale}" (${s.niveau})`);
        });
    } else {
        console.log('⚠️ Aucune phrase dans la table sentences');
    }

    console.log('\n✅ Test terminé!\n');
}

testConnection();
