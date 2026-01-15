// Script pour peupler Supabase avec les phrases grammaticales
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variables d\'environnement Supabase manquantes!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Phrases grammaticales pour le thème - Français vers Anglais
const GRAMMAR_SENTENCES = [
    // GÉOPOLITIQUE & RELATIONS INTERNATIONALES
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les tensions géopolitiques entre la Chine et les États-Unis s'intensifient dans le domaine technologique.",
        traduction_reference: "Geopolitical tensions between China and the United States are intensifying in the technological domain.",
        theme_grammatical: "Present continuous, Passive voice, Complex sentence structure",
        niveau: "C1",
        category: "Géopolitique",
        theme: "Relations internationales"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'Union européenne cherche à renforcer son autonomie stratégique face aux défis mondiaux.",
        traduction_reference: "The European Union seeks to strengthen its strategic autonomy in the face of global challenges.",
        theme_grammatical: "Present simple, Infinitive of purpose, Complex noun phrases",
        niveau: "B2",
        category: "Géopolitique",
        theme: "Union européenne"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Le commerce international représente une part croissante de l'économie mondiale malgré les tensions protectionnistes.",
        traduction_reference: "International trade represents a growing share of the global economy despite protectionist tensions.",
        theme_grammatical: "Present simple, Despite + noun, Adjectives of degree",
        niveau: "B2",
        category: "Géopolitique",
        theme: "Commerce international"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les migrations internationales constituent un défi majeur pour les politiques européennes d'intégration.",
        traduction_reference: "International migrations represent a major challenge for European integration policies.",
        theme_grammatical: "Present simple, For + noun, Compound nouns",
        niveau: "C1",
        category: "Géopolitique",
        theme: "Migrations internationales"
    },
    // ÉCONOMIE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'intelligence artificielle transforme radicalement les modèles économiques traditionnels.",
        traduction_reference: "Artificial intelligence is radically transforming traditional economic models.",
        theme_grammatical: "Present continuous, Adverbs, Complex object",
        niveau: "B2",
        category: "Économie",
        theme: "Innovation technologique"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les investissements verts représentent un enjeu majeur pour la transition écologique.",
        traduction_reference: "Green investments represent a major challenge for the ecological transition.",
        theme_grammatical: "Present simple, Complex noun phrases, Prepositions",
        niveau: "B2",
        category: "Économie",
        theme: "Développement durable"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La croissance économique dépend largement des investissements dans l'éducation et la recherche.",
        traduction_reference: "Economic growth largely depends on investments in education and research.",
        theme_grammatical: "Present simple, On + noun, Adverbs of manner",
        niveau: "B2",
        category: "Économie",
        theme: "Croissance économique"
    },
    // SOCIÉTÉ & CULTURE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'enseignement à distance transforme les méthodes pédagogiques traditionnelles.",
        traduction_reference: "Distance learning is transforming traditional teaching methods.",
        theme_grammatical: "Present continuous, Gerunds, Complex objects",
        niveau: "B2",
        category: "Société",
        theme: "Éducation numérique"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La diversité culturelle enrichit le tissu social des métropoles modernes.",
        traduction_reference: "Cultural diversity enriches the social fabric of modern metropolises.",
        theme_grammatical: "Present simple, Complex noun phrases, Prepositions",
        niveau: "B2",
        category: "Société",
        theme: "Diversité culturelle"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La cohésion sociale nécessite des politiques publiques inclusives pour tous les citoyens.",
        traduction_reference: "Social cohesion requires inclusive public policies for all citizens.",
        theme_grammatical: "Present simple, For + plural noun, Adjectives",
        niveau: "B2",
        category: "Société",
        theme: "Cohésion sociale"
    },
    // TECHNOLOGIE & INNOVATION
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les progrès de l'intelligence artificielle soulèvent des questions éthiques complexes.",
        traduction_reference: "Advances in artificial intelligence raise complex ethical questions.",
        theme_grammatical: "Present simple, Passive voice, Complex adjectives",
        niveau: "B2",
        category: "Technologie",
        theme: "Intelligence artificielle"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les réseaux sociaux ont révolutionné la façon dont nous communiquons et partageons l'information.",
        traduction_reference: "Social media have revolutionized the way we communicate and share information.",
        theme_grammatical: "Present perfect, Relative clauses, Have/has + past participle",
        niveau: "B2",
        category: "Technologie",
        theme: "Réseaux sociaux"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Le big data offre de nouvelles opportunités pour l'analyse prédictive dans de nombreux secteurs.",
        traduction_reference: "Big data offers new opportunities for predictive analysis in many sectors.",
        theme_grammatical: "Present simple, For + noun, In + plural noun",
        niveau: "C1",
        category: "Technologie",
        theme: "Big data"
    },
    // ENVIRONNEMENT & ÉCOLOGIE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Le changement climatique représente la plus grande menace pour l'humanité au 21ème siècle.",
        traduction_reference: "Climate change represents the greatest threat to humanity in the 21st century.",
        theme_grammatical: "Present simple, Superlative adjectives, Ordinal numbers",
        niveau: "B2",
        category: "Environnement",
        theme: "Changement climatique"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les énergies renouvelables deviennent progressivement plus compétitives sur le marché mondial.",
        traduction_reference: "Renewable energies are gradually becoming more competitive on the global market.",
        theme_grammatical: "Present continuous, Comparative adverbs, Complex noun phrases",
        niveau: "C1",
        category: "Environnement",
        theme: "Énergies renouvelables"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La perte de biodiversité constitue un risque majeur pour l'équilibre des écosystèmes terrestres.",
        traduction_reference: "The loss of biodiversity represents a major risk for the balance of terrestrial ecosystems.",
        theme_grammatical: "Present simple, For + noun, Of + noun",
        niveau: "C1",
        category: "Environnement",
        theme: "Biodiversité"
    },
    // SANTÉ & BIEN-ÊTRE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La télémédecine offre de nouvelles possibilités pour améliorer l'accès aux soins médicaux.",
        traduction_reference: "Telemedicine offers new possibilities for improving access to medical care.",
        theme_grammatical: "Present simple, Gerunds, Infinitive of purpose",
        niveau: "B2",
        category: "Santé",
        theme: "Télémédecine"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La pandémie de COVID-19 a profondément transformé nos habitudes quotidiennes et nos comportements sociaux.",
        traduction_reference: "The COVID-19 pandemic has profoundly transformed our daily habits and social behaviors.",
        theme_grammatical: "Present perfect, Adverbs of manner, Compound nouns",
        niveau: "B2",
        category: "Santé",
        theme: "Pandémie mondiale"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La prévention des maladies cardiovasculaires passe par une alimentation équilibrée et l'exercice physique régulier.",
        traduction_reference: "The prevention of cardiovascular diseases involves a balanced diet and regular physical exercise.",
        theme_grammatical: "Present simple, Of + noun, And + noun",
        niveau: "B2",
        category: "Santé",
        theme: "Prévention santé"
    },
    // POLITIQUE & INSTITUTIONS
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La démocratie représentative nécessite une participation active des citoyens pour fonctionner efficacement.",
        traduction_reference: "Representative democracy requires active citizen participation to function effectively.",
        theme_grammatical: "Present simple, Infinitive of purpose, Adjectives",
        niveau: "B2",
        category: "Politique",
        theme: "Démocratie représentative"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les organisations internationales jouent un rôle crucial dans la résolution des conflits mondiaux.",
        traduction_reference: "International organizations play a crucial role in resolving global conflicts.",
        theme_grammatical: "Present simple, Gerunds, Adjectives of degree",
        niveau: "B2",
        category: "Politique",
        theme: "Politique internationale"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La gouvernance mondiale nécessite une coopération accrue entre les nations pour faire face aux défis globaux.",
        traduction_reference: "Global governance requires increased cooperation between nations to address global challenges.",
        theme_grammatical: "Present simple, Between + plural noun, Infinitive of purpose",
        niveau: "C1",
        category: "Politique",
        theme: "Gouvernance mondiale"
    },
    // ÉDUCATION & FORMATION
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La formation continue est devenue essentielle dans un monde où les compétences évoluent rapidement.",
        traduction_reference: "Continuing education has become essential in a world where skills evolve rapidly.",
        theme_grammatical: "Present perfect, Relative clauses, Adverbs",
        niveau: "B2",
        category: "Éducation",
        theme: "Formation continue"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'éducation inclusive vise à garantir que tous les élèves puissent bénéficier d'une éducation de qualité.",
        traduction_reference: "Inclusive education aims to ensure that all students can benefit from quality education.",
        theme_grammatical: "Present simple, Infinitive of purpose, Modal verbs",
        niveau: "B2",
        category: "Éducation",
        theme: "Éducation inclusive"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'apprentissage en ligne offre une flexibilité accrue pour les étudiants de tous âges et origines.",
        traduction_reference: "Online learning offers increased flexibility for students of all ages and backgrounds.",
        theme_grammatical: "Present simple, For + noun, Of + plural noun",
        niveau: "B2",
        category: "Éducation",
        theme: "Apprentissage en ligne"
    },
    // CULTURE & ARTS
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les arts numériques combinent créativité artistique et technologies modernes pour créer de nouvelles formes d'expression.",
        traduction_reference: "Digital arts combine artistic creativity and modern technologies to create new forms of expression.",
        theme_grammatical: "Present simple, Infinitive of purpose, Compound nouns",
        niveau: "C1",
        category: "Culture",
        theme: "Arts numériques"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Le patrimoine culturel doit être préservé pour les générations futures malgré les défis de la mondialisation.",
        traduction_reference: "Cultural heritage must be preserved for future generations despite the challenges of globalization.",
        theme_grammatical: "Modal verbs, Passive voice, Despite + noun",
        niveau: "C1",
        category: "Culture",
        theme: "Patrimoine culturel"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les industries culturelles contribuent significativement à l'économie créative et à l'emploi dans de nombreux pays.",
        traduction_reference: "Cultural industries contribute significantly to the creative economy and employment in many countries.",
        theme_grammatical: "Present simple, To + noun, In + plural noun",
        niveau: "C1",
        category: "Culture",
        theme: "Industries culturelles"
    },
    // TRANSPORT & MOBILITÉ
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La mobilité urbaine durable nécessite une coordination entre transport public et véhicules individuels.",
        traduction_reference: "Sustainable urban mobility requires coordination between public transport and individual vehicles.",
        theme_grammatical: "Present simple, Gerunds, Between + plural nouns",
        niveau: "B2",
        category: "Transport",
        theme: "Mobilité urbaine"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'industrie du transport aérien fait face à des défis importants liés à la réduction des émissions de CO2.",
        traduction_reference: "The aviation industry faces major challenges related to reducing CO2 emissions.",
        theme_grammatical: "Present simple, Past participles as adjectives, Related to + noun",
        niveau: "C1",
        category: "Transport",
        theme: "Transports aériens"
    },
    // SCIENCE & RECHERCHE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La recherche scientifique fondamentale constitue la base de l'innovation technologique future.",
        traduction_reference: "Fundamental scientific research forms the basis of future technological innovation.",
        theme_grammatical: "Present simple, Complex noun phrases, Ordinal numbers",
        niveau: "C1",
        category: "Science",
        theme: "Recherche scientifique"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les avancées en biotechnologie ouvrent de nouvelles perspectives pour la médecine personnalisée.",
        traduction_reference: "Advances in biotechnology open new perspectives for personalized medicine.",
        theme_grammatical: "Present simple, Adjectives, For + noun (purpose)",
        niveau: "C1",
        category: "Science",
        theme: "Biotechnologie"
    },
    // ÉCONOMIE DIGITALE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Le commerce électronique a transformé les habitudes de consommation des citoyens européens.",
        traduction_reference: "E-commerce has transformed European citizens' consumption habits.",
        theme_grammatical: "Present perfect, Possessive case, Compound nouns",
        niveau: "B2",
        category: "Économie digitale",
        theme: "Commerce électronique"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les cryptomonnaies représentent un défi majeur pour les régulateurs financiers mondiaux.",
        traduction_reference: "Cryptocurrencies represent a major challenge for global financial regulators.",
        theme_grammatical: "Present simple, Adjectives of degree, For + noun",
        niveau: "C1",
        category: "Économie digitale",
        theme: "Cryptomonnaies"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les plateformes numériques transforment les modèles économiques traditionnels dans de nombreux secteurs.",
        traduction_reference: "Digital platforms are transforming traditional business models in many sectors.",
        theme_grammatical: "Present continuous, Adjectives, In + plural noun",
        niveau: "B2",
        category: "Économie digitale",
        theme: "Plateformes numériques"
    },
    // TRAVAIL & EMPLOI
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Le télétravail est devenu une norme dans de nombreux secteurs professionnels depuis la pandémie.",
        traduction_reference: "Remote work has become standard in many professional sectors since the pandemic.",
        theme_grammatical: "Present perfect, Adjectives, Since + noun",
        niveau: "B2",
        category: "Travail",
        theme: "Télétravail"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'écart salarial entre hommes et femmes persiste malgré les efforts législatifs.",
        traduction_reference: "The gender pay gap persists despite legislative efforts.",
        theme_grammatical: "Present simple, Despite + noun, Compound nouns",
        niveau: "B2",
        category: "Travail",
        theme: "Égalité salariale"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La formation professionnelle continue est essentielle pour s'adapter aux changements technologiques.",
        traduction_reference: "Continuing professional training is essential to adapt to technological changes.",
        theme_grammatical: "Present simple, To + infinitive, Adjectives",
        niveau: "B2",
        category: "Travail",
        theme: "Formation professionnelle"
    },
    // MÉDIAS & COMMUNICATION
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La désinformation en ligne constitue une menace sérieuse pour la démocratie moderne.",
        traduction_reference: "Online disinformation represents a serious threat to modern democracy.",
        theme_grammatical: "Present simple, Adjectives, To + noun",
        niveau: "B2",
        category: "Médias",
        theme: "Désinformation"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les plateformes de streaming ont révolutionné l'industrie du divertissement traditionnel.",
        traduction_reference: "Streaming platforms have revolutionized the traditional entertainment industry.",
        theme_grammatical: "Present perfect, Adjectives, Compound nouns",
        niveau: "B2",
        category: "Médias",
        theme: "Streaming"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les réseaux sociaux influencent considérablement l'opinion publique et les comportements électoraux.",
        traduction_reference: "Social networks significantly influence public opinion and electoral behavior.",
        theme_grammatical: "Present simple, Adverbs, And + noun",
        niveau: "B2",
        category: "Médias",
        theme: "Réseaux sociaux"
    },
    // SÉCURITÉ & DÉFENSE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La cybersécurité est devenue une priorité nationale pour la plupart des gouvernements européens.",
        traduction_reference: "Cybersecurity has become a national priority for most European governments.",
        theme_grammatical: "Present perfect, Adjectives, For + plural noun",
        niveau: "C1",
        category: "Sécurité",
        theme: "Cybersécurité"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'intelligence artificielle militaire soulève des questions éthiques complexes sur l'autonomie des armes.",
        traduction_reference: "Military artificial intelligence raises complex ethical questions about weapon autonomy.",
        theme_grammatical: "Present simple, Adjectives, About + noun",
        niveau: "C1",
        category: "Sécurité",
        theme: "Intelligence artificielle"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La lutte contre le terrorisme international nécessite une coopération étroite entre les services de renseignement.",
        traduction_reference: "The fight against international terrorism requires close cooperation between intelligence services.",
        theme_grammatical: "Present simple, Against + noun, Between + plural noun",
        niveau: "C1",
        category: "Sécurité",
        theme: "Terrorisme international"
    },
    // URBANISME & VILLES
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les villes durables intègrent des solutions innovantes pour réduire leur impact environnemental.",
        traduction_reference: "Sustainable cities integrate innovative solutions to reduce their environmental impact.",
        theme_grammatical: "Present simple, Infinitive of purpose, Possessive adjectives",
        niveau: "C1",
        category: "Urbanisme",
        theme: "Villes durables"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La transition vers la mobilité électrique nécessite des investissements massifs dans les infrastructures.",
        traduction_reference: "The transition to electric mobility requires massive investments in infrastructure.",
        theme_grammatical: "Present simple, To + noun, In + noun",
        niveau: "C1",
        category: "Urbanisme",
        theme: "Mobilité électrique"
    },
    // ÉNERGIE & CLIMAT
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La transition énergétique représente un défi majeur pour les économies développées.",
        traduction_reference: "The energy transition represents a major challenge for developed economies.",
        theme_grammatical: "Present simple, Adjectives, For + plural noun",
        niveau: "B2",
        category: "Énergie",
        theme: "Transition énergétique"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'énergie éolienne offshore offre un potentiel considérable pour la production d'électricité renouvelable.",
        traduction_reference: "Offshore wind energy offers considerable potential for renewable electricity production.",
        theme_grammatical: "Present simple, Adjectives, For + noun",
        niveau: "C1",
        category: "Énergie",
        theme: "Éolien offshore"
    },
    // DROIT & JUSTICE
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "L'État de droit constitue la base de toute démocratie moderne et stable.",
        traduction_reference: "The rule of law forms the basis of any modern and stable democracy.",
        theme_grammatical: "Present simple, Of + noun, And + adjective",
        niveau: "C1",
        category: "Droit & Justice",
        theme: "État de droit"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "Les tribunaux internationaux jouent un rôle essentiel dans la résolution des conflits armés.",
        traduction_reference: "International courts play an essential role in resolving armed conflicts.",
        theme_grammatical: "Present simple, In + gerund, Compound nouns",
        niveau: "C1",
        category: "Droit & Justice",
        theme: "Justice internationale"
    },
    {
        langue_source: "Français",
        langue_cible: "Anglais",
        phrase_originale: "La protection des droits humains représente un défi permanent dans un monde globalisé.",
        traduction_reference: "The protection of human rights represents a permanent challenge in a globalized world.",
        theme_grammatical: "Present simple, Of + noun, In + noun",
        niveau: "C1",
        category: "Droit & Justice",
        theme: "Droits humains"
    }
];

async function seedDatabase() {
    console.log('\n🌱 Insertion des phrases dans Supabase...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const sentence of GRAMMAR_SENTENCES) {
        const { data, error } = await supabase
            .from('sentences')
            .insert({
                langue_source: sentence.langue_source,
                langue_cible: sentence.langue_cible,
                phrase_originale: sentence.phrase_originale,
                theme_grammatical: sentence.theme_grammatical,
                niveau: sentence.niveau
            });

        if (error) {
            console.log(`❌ Erreur: ${sentence.phrase_originale.substring(0, 50)}...`);
            console.log(`   -> ${error.message}`);
            errorCount++;
        } else {
            console.log(`✅ Ajouté: ${sentence.phrase_originale.substring(0, 50)}...`);
            successCount++;
        }
    }

    console.log('\n📊 Résumé:');
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    console.log(`   📝 Total: ${GRAMMAR_SENTENCES.length}`);

    // Vérifier le nombre total
    const { count } = await supabase
        .from('sentences')
        .select('*', { count: 'exact', head: true });

    console.log(`\n📚 Total phrases dans Supabase: ${count}\n`);
}

seedDatabase();
