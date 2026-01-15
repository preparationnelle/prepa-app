import { GrammarSentence } from '../types/grammar';

export const GRAMMAR_SENTENCES: GrammarSentence[] = [
    // GÉOPOLITIQUE & RELATIONS INTERNATIONALES
    {
        id: 'en-geo-1',
        category: "Géopolitique",
        theme: "Relations internationales",
        french: "Les tensions géopolitiques entre la Chine et les États-Unis s'intensifient dans le domaine technologique.",
        reference: "Geopolitical tensions between China and the United States are intensifying in the technological domain.",
        grammar_points: ["Present continuous", "Passive voice", "Complex sentence structure"],
        difficulty_level: "advanced",
        specialized: true
    },
    {
        id: 'en-geo-2',
        category: "Géopolitique",
        theme: "Union européenne",
        french: "L'Union européenne cherche à renforcer son autonomie stratégique face aux défis mondiaux.",
        reference: "The European Union seeks to strengthen its strategic autonomy in the face of global challenges.",
        grammar_points: ["Present simple", "Infinitive of purpose", "Complex noun phrases"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-geo-3',
        category: "Géopolitique",
        theme: "Commerce international",
        french: "Le commerce international représente une part croissante de l'économie mondiale malgré les tensions protectionnistes.",
        reference: "International trade represents a growing share of the global economy despite protectionist tensions.",
        grammar_points: ["Present simple", "Despite + noun", "Adjectives of degree"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-geo-4',
        category: "Géopolitique",
        theme: "Migrations internationales",
        french: "Les migrations internationales constituent un défi majeur pour les politiques européennes d'intégration.",
        reference: "International migrations represent a major challenge for European integration policies.",
        grammar_points: ["Present simple", "For + noun", "Compound nouns"],
        difficulty_level: "advanced"
    },
    // ÉCONOMIE
    {
        id: 'en-eco-1',
        category: "Économie",
        theme: "Innovation technologique",
        french: "L'intelligence artificielle transforme radicalement les modèles économiques traditionnels.",
        reference: "Artificial intelligence is radically transforming traditional economic models.",
        grammar_points: ["Present continuous", "Adverbs", "Complex object"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-eco-2',
        category: "Économie",
        theme: "Développement durable",
        french: "Les investissements verts représentent un enjeu majeur pour la transition écologique.",
        reference: "Green investments represent a major challenge for the ecological transition.",
        grammar_points: ["Present simple", "Complex noun phrases", "Prepositions"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-eco-3',
        category: "Économie",
        theme: "Croissance économique",
        french: "La croissance économique dépend largement des investissements dans l'éducation et la recherche.",
        reference: "Economic growth largely depends on investments in education and research.",
        grammar_points: ["Present simple", "On + noun", "Adverbs of manner"],
        difficulty_level: "intermediate"
    },
    // SOCIÉTÉ & CULTURE
    {
        id: 'en-soc-1',
        category: "Société",
        theme: "Éducation numérique",
        french: "L'enseignement à distance transforme les méthodes pédagogiques traditionnelles.",
        reference: "Distance learning is transforming traditional teaching methods.",
        grammar_points: ["Present continuous", "Gerunds", "Complex objects"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-soc-2',
        category: "Société",
        theme: "Diversité culturelle",
        french: "La diversité culturelle enrichit le tissu social des métropoles modernes.",
        reference: "Cultural diversity enriches the social fabric of modern metropolises.",
        grammar_points: ["Present simple", "Complex noun phrases", "Prepositions"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-soc-3',
        category: "Société",
        theme: "Cohésion sociale",
        french: "La cohésion sociale nécessite des politiques publiques inclusives pour tous les citoyens.",
        reference: "Social cohesion requires inclusive public policies for all citizens.",
        grammar_points: ["Present simple", "For + plural noun", "Adjectives"],
        difficulty_level: "intermediate"
    },
    // TECHNOLOGIE & INNOVATION
    {
        id: 'en-tech-1',
        category: "Technologie",
        theme: "Intelligence artificielle",
        french: "Les progrès de l'intelligence artificielle soulèvent des questions éthiques complexes.",
        reference: "Advances in artificial intelligence raise complex ethical questions.",
        grammar_points: ["Present simple", "Passive voice", "Complex adjectives"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-tech-2',
        category: "Technologie",
        theme: "Réseaux sociaux",
        french: "Les réseaux sociaux ont révolutionné la façon dont nous communiquons et partageons l'information.",
        reference: "Social media have revolutionized the way we communicate and share information.",
        grammar_points: ["Present perfect", "Relative clauses", "Have/has + past participle"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-tech-3',
        category: "Technologie",
        theme: "Big data",
        french: "Le big data offre de nouvelles opportunités pour l'analyse prédictive dans de nombreux secteurs.",
        reference: "Big data offers new opportunities for predictive analysis in many sectors.",
        grammar_points: ["Present simple", "For + noun", "In + plural noun"],
        difficulty_level: "advanced"
    },
    // ENVIRONNEMENT & ÉCOLOGIE
    {
        id: 'en-env-1',
        category: "Environnement",
        theme: "Changement climatique",
        french: "Le changement climatique représente la plus grande menace pour l'humanité au 21ème siècle.",
        reference: "Climate change represents the greatest threat to humanity in the 21st century.",
        grammar_points: ["Present simple", "Superlative adjectives", "Ordinal numbers"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-env-2',
        category: "Environnement",
        theme: "Énergies renouvelables",
        french: "Les énergies renouvelables deviennent progressivement plus compétitives sur le marché mondial.",
        reference: "Renewable energies are gradually becoming more competitive on the global market.",
        grammar_points: ["Present continuous", "Comparative adverbs", "Complex noun phrases"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-env-3',
        category: "Environnement",
        theme: "Biodiversité",
        french: "La perte de biodiversité constitue un risque majeur pour l'équilibre des écosystèmes terrestres.",
        reference: "The loss of biodiversity represents a major risk for the balance of terrestrial ecosystems.",
        grammar_points: ["Present simple", "For + noun", "Of + noun"],
        difficulty_level: "advanced"
    },
    // SANTÉ & BIEN-ÊTRE
    {
        id: 'en-health-1',
        category: "Santé",
        theme: "Télémedicine",
        french: "La télémédecine offre de nouvelles possibilités pour améliorer l'accès aux soins médicaux.",
        reference: "Telemedicine offers new possibilities for improving access to medical care.",
        grammar_points: ["Present simple", "Gerunds", "Infinitive of purpose"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-health-2',
        category: "Santé",
        theme: "Pandémie mondiale",
        french: "La pandémie de COVID-19 a profondément transformé nos habitudes quotidiennes et nos comportements sociaux.",
        reference: "The COVID-19 pandemic has profoundly transformed our daily habits and social behaviors.",
        grammar_points: ["Present perfect", "Adverbs of manner", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-health-3',
        category: "Santé",
        theme: "Prévention santé",
        french: "La prévention des maladies cardiovasculaires passe par une alimentation équilibrée et l'exercice physique régulier.",
        reference: "The prevention of cardiovascular diseases involves a balanced diet and regular physical exercise.",
        grammar_points: ["Present simple", "Of + noun", "And + noun"],
        difficulty_level: "intermediate"
    },
    // POLITIQUE & INSTITUTIONS
    {
        id: 'en-pol-1',
        category: "Politique",
        theme: "Démocratie représentative",
        french: "La démocratie représentative nécessite une participation active des citoyens pour fonctionner efficacement.",
        reference: "Representative democracy requires active citizen participation to function effectively.",
        grammar_points: ["Present simple", "Infinitive of purpose", "Adjectives"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-pol-2',
        category: "Politique",
        theme: "Politique internationale",
        french: "Les organisations internationales jouent un rôle crucial dans la résolution des conflits mondiaux.",
        reference: "International organizations play a crucial role in resolving global conflicts.",
        grammar_points: ["Present simple", "Gerunds", "Adjectives of degree"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-pol-3',
        category: "Politique",
        theme: "Gouvernance mondiale",
        french: "La gouvernance mondiale nécessite une coopération accrue entre les nations pour faire face aux défis globaux.",
        reference: "Global governance requires increased cooperation between nations to address global challenges.",
        grammar_points: ["Present simple", "Between + plural noun", "Infinitive of purpose"],
        difficulty_level: "advanced"
    },
    // ÉDUCATION & FORMATION
    {
        id: 'en-edu-1',
        category: "Éducation",
        theme: "Formation continue",
        french: "La formation continue est devenue essentielle dans un monde où les compétences évoluent rapidement.",
        reference: "Continuing education has become essential in a world where skills evolve rapidly.",
        grammar_points: ["Present perfect", "Relative clauses", "Adverbs"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-edu-2',
        category: "Éducation",
        theme: "Éducation inclusive",
        french: "L'éducation inclusive vise à garantir que tous les élèves puissent bénéficier d'une éducation de qualité.",
        reference: "Inclusive education aims to ensure that all students can benefit from quality education.",
        grammar_points: ["Present simple", "Infinitive of purpose", "Modal verbs"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-edu-3',
        category: "Éducation",
        theme: "Apprentissage en ligne",
        french: "L'apprentissage en ligne offre une flexibilité accrue pour les étudiants de tous âges et origines.",
        reference: "Online learning offers increased flexibility for students of all ages and backgrounds.",
        grammar_points: ["Present simple", "For + noun", "Of + plural noun"],
        difficulty_level: "intermediate"
    },
    // CULTURE & ARTS
    {
        id: 'en-cult-1',
        category: "Culture",
        theme: "Arts numériques",
        french: "Les arts numériques combinent créativité artistique et technologies modernes pour créer de nouvelles formes d'expression.",
        reference: "Digital arts combine artistic creativity and modern technologies to create new forms of expression.",
        grammar_points: ["Present simple", "Infinitive of purpose", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-cult-2',
        category: "Culture",
        theme: "Patrimoine culturel",
        french: "Le patrimoine culturel doit être préservé pour les générations futures malgré les défis de la mondialisation.",
        reference: "Cultural heritage must be preserved for future generations despite the challenges of globalization.",
        grammar_points: ["Modal verbs", "Passive voice", "Despite + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-cult-3',
        category: "Culture",
        theme: "Industries culturelles",
        french: "Les industries culturelles contribuent significativement à l'économie créative et à l'emploi dans de nombreux pays.",
        reference: "Cultural industries contribute significantly to the creative economy and employment in many countries.",
        grammar_points: ["Present simple", "To + noun", "In + plural noun"],
        difficulty_level: "advanced"
    },
    // TRANSPORT & MOBILITÉ
    {
        id: 'en-trans-1',
        category: "Transport",
        theme: "Mobilité urbaine",
        french: "La mobilité urbaine durable nécessite une coordination entre transport public et véhicules individuels.",
        reference: "Sustainable urban mobility requires coordination between public transport and individual vehicles.",
        grammar_points: ["Present simple", "Gerunds", "Between + plural nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-trans-2',
        category: "Transport",
        theme: "Transports aériens",
        french: "L'industrie du transport aérien fait face à des défis importants liés à la réduction des émissions de CO2.",
        reference: "The aviation industry faces major challenges related to reducing CO2 emissions.",
        grammar_points: ["Present simple", "Past participles as adjectives", "Related to + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-trans-3',
        category: "Transport",
        theme: "Transport ferroviaire",
        french: "Le transport ferroviaire représente une alternative écologique aux transports routiers pour les longs trajets.",
        reference: "Rail transport represents an ecological alternative to road transport for long journeys.",
        grammar_points: ["Present simple", "To + noun", "For + noun"],
        difficulty_level: "intermediate"
    },
    // SCIENCE & RECHERCHE
    {
        id: 'en-sci-1',
        category: "Science",
        theme: "Recherche scientifique",
        french: "La recherche scientifique fondamentale constitue la base de l'innovation technologique future.",
        reference: "Fundamental scientific research forms the basis of future technological innovation.",
        grammar_points: ["Present simple", "Complex noun phrases", "Ordinal numbers"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-sci-2',
        category: "Science",
        theme: "Biotechnologie",
        french: "Les avancées en biotechnologie ouvrent de nouvelles perspectives pour la médecine personnalisée.",
        reference: "Advances in biotechnology open new perspectives for personalized medicine.",
        grammar_points: ["Present simple", "Adjectives", "For + noun (purpose)"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-sci-3',
        category: "Science",
        theme: "Intelligence artificielle",
        french: "L'intelligence artificielle scientifique facilite l'analyse de grandes quantités de données complexes.",
        reference: "Scientific artificial intelligence facilitates the analysis of large amounts of complex data.",
        grammar_points: ["Present simple", "Of + plural noun", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-sci-4',
        category: "Science",
        theme: "Médecine régénérative",
        french: "La médecine régénérative offre de nouveaux espoirs pour le traitement des maladies chroniques.",
        reference: "Regenerative medicine offers new hopes for the treatment of chronic diseases.",
        grammar_points: ["Present simple", "For + noun", "Of + noun"],
        difficulty_level: "advanced"
    },
    // ÉCONOMIE DIGITALE
    {
        id: 'en-econ-1',
        category: "Économie digitale",
        theme: "Commerce électronique",
        french: "Le commerce électronique a transformé les habitudes de consommation des citoyens européens.",
        reference: "E-commerce has transformed European citizens' consumption habits.",
        grammar_points: ["Present perfect", "Possessive case", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-econ-2',
        category: "Économie digitale",
        theme: "Cryptomonnaies",
        french: "Les cryptomonnaies représentent un défi majeur pour les régulateurs financiers mondiaux.",
        reference: "Cryptocurrencies represent a major challenge for global financial regulators.",
        grammar_points: ["Present simple", "Adjectives of degree", "For + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-econ-3',
        category: "Économie digitale",
        theme: "Plateformes numériques",
        french: "Les plateformes numériques transforment les modèles économiques traditionnels dans de nombreux secteurs.",
        reference: "Digital platforms are transforming traditional business models in many sectors.",
        grammar_points: ["Present continuous", "Adjectives", "In + plural noun"],
        difficulty_level: "intermediate"
    },
    // TRAVAIL & EMPLOI
    {
        id: 'en-work-1',
        category: "Travail",
        theme: "Télétravail",
        french: "Le télétravail est devenu une norme dans de nombreux secteurs professionnels depuis la pandémie.",
        reference: "Remote work has become standard in many professional sectors since the pandemic.",
        grammar_points: ["Present perfect", "Adjectives", "Since + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-work-2',
        category: "Travail",
        theme: "Égalité salariale",
        french: "L'écart salarial entre hommes et femmes persiste malgré les efforts législatifs.",
        reference: "The gender pay gap persists despite legislative efforts.",
        grammar_points: ["Present simple", "Despite + noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-work-3',
        category: "Travail",
        theme: "Formation professionnelle",
        french: "La formation professionnelle continue est essentielle pour s'adapter aux changements technologiques.",
        reference: "Continuing professional training is essential to adapt to technological changes.",
        grammar_points: ["Present simple", "To + infinitive", "Adjectives"],
        difficulty_level: "intermediate"
    },
    // MÉDIAS & COMMUNICATION
    {
        id: 'en-media-1',
        category: "Médias",
        theme: "Désinformation",
        french: "La désinformation en ligne constitue une menace sérieuse pour la démocratie moderne.",
        reference: "Online disinformation represents a serious threat to modern democracy.",
        grammar_points: ["Present simple", "Adjectives", "To + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-media-2',
        category: "Médias",
        theme: "Streaming",
        french: "Les plateformes de streaming ont révolutionné l'industrie du divertissement traditionnel.",
        reference: "Streaming platforms have revolutionized the traditional entertainment industry.",
        grammar_points: ["Present perfect", "Adjectives", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-media-3',
        category: "Médias",
        theme: "Réseaux sociaux",
        french: "Les réseaux sociaux influencent considérablement l'opinion publique et les comportements électoraux.",
        reference: "Social networks significantly influence public opinion and electoral behavior.",
        grammar_points: ["Present simple", "Adverbs", "And + noun"],
        difficulty_level: "intermediate"
    },
    // SÉCURITÉ & DÉFENSE
    {
        id: 'en-sec-1',
        category: "Sécurité",
        theme: "Cybersécurité",
        french: "La cybersécurité est devenue une priorité nationale pour la plupart des gouvernements européens.",
        reference: "Cybersecurity has become a national priority for most European governments.",
        grammar_points: ["Present perfect", "Adjectives", "For + plural noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-sec-2',
        category: "Sécurité",
        theme: "Intelligence artificielle",
        french: "L'intelligence artificielle militaire soulève des questions éthiques complexes sur l'autonomie des armes.",
        reference: "Military artificial intelligence raises complex ethical questions about weapon autonomy.",
        grammar_points: ["Present simple", "Adjectives", "About + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-sec-3',
        category: "Sécurité",
        theme: "Terrorisme international",
        french: "La lutte contre le terrorisme international nécessite une coopération étroite entre les services de renseignement.",
        reference: "The fight against international terrorism requires close cooperation between intelligence services.",
        grammar_points: ["Present simple", "Against + noun", "Between + plural noun"],
        difficulty_level: "advanced"
    },
    // URBANISME & VILLES
    {
        id: 'en-urban-1',
        category: "Urbanisme",
        theme: "Villes durables",
        french: "Les villes durables intègrent des solutions innovantes pour réduire leur impact environnemental.",
        reference: "Sustainable cities integrate innovative solutions to reduce their environmental impact.",
        grammar_points: ["Present simple", "Infinitive of purpose", "Possessive adjectives"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-urban-2',
        category: "Urbanisme",
        theme: "Mobilité électrique",
        french: "La transition vers la mobilité électrique nécessite des investissements massifs dans les infrastructures.",
        reference: "The transition to electric mobility requires massive investments in infrastructure.",
        grammar_points: ["Present simple", "To + noun", "In + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-urban-3',
        category: "Urbanisme",
        theme: "Architecture durable",
        french: "L'architecture durable intègre des matériaux écologiques et des systèmes d'énergie renouvelable.",
        reference: "Sustainable architecture integrates ecological materials and renewable energy systems.",
        grammar_points: ["Present simple", "Adjectives", "And + noun"],
        difficulty_level: "intermediate"
    },
    // AGRICULTURE & ALIMENTATION
    {
        id: 'en-agri-1',
        category: "Agriculture",
        theme: "Agriculture durable",
        french: "L'agriculture durable vise à concilier production alimentaire et préservation de l'environnement.",
        reference: "Sustainable agriculture aims to reconcile food production and environmental preservation.",
        grammar_points: ["Present simple", "Infinitive of purpose", "And + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-agri-2',
        category: "Agriculture",
        theme: "Alimentation bio",
        french: "La demande d'aliments biologiques a considérablement augmenté ces dernières années.",
        reference: "The demand for organic food has increased considerably in recent years.",
        grammar_points: ["Present perfect", "For + noun", "In + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-agri-3',
        category: "Agriculture",
        theme: "Agriculture de précision",
        french: "L'agriculture de précision utilise les technologies numériques pour optimiser les rendements agricoles.",
        reference: "Precision agriculture uses digital technologies to optimize agricultural yields.",
        grammar_points: ["Present simple", "To + infinitive", "Compound nouns"],
        difficulty_level: "advanced"
    },
    // ÉNERGIE & CLIMAT
    {
        id: 'en-energy-1',
        category: "Énergie",
        theme: "Transition énergétique",
        french: "La transition énergétique représente un défi majeur pour les économies développées.",
        reference: "The energy transition represents a major challenge for developed economies.",
        grammar_points: ["Present simple", "Adjectives", "For + plural noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-energy-2',
        category: "Énergie",
        theme: "Éolien offshore",
        french: "L'énergie éolienne offshore offre un potentiel considérable pour la production d'électricité renouvelable.",
        reference: "Offshore wind energy offers considerable potential for renewable electricity production.",
        grammar_points: ["Present simple", "Adjectives", "For + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-energy-3',
        category: "Énergie",
        theme: "Stockage énergétique",
        french: "Le stockage énergétique constitue un défi majeur pour l'intégration des énergies renouvelables.",
        reference: "Energy storage represents a major challenge for the integration of renewable energies.",
        grammar_points: ["Present simple", "For + noun", "Of + noun"],
        difficulty_level: "advanced"
    },
    // SANTÉ PUBLIQUE
    {
        id: 'en-pubhealth-1',
        category: "Santé publique",
        theme: "Prévention",
        french: "La prévention des maladies chroniques constitue un enjeu majeur pour les systèmes de santé.",
        reference: "The prevention of chronic diseases represents a major challenge for health systems.",
        grammar_points: ["Present simple", "Of + noun", "For + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-pubhealth-2',
        category: "Santé publique",
        theme: "Vaccination",
        french: "Les campagnes de vaccination ont permis d'éradiquer de nombreuses maladies infectieuses.",
        reference: "Vaccination campaigns have made it possible to eradicate numerous infectious diseases.",
        grammar_points: ["Present perfect", "Infinitive of purpose", "Adjectives"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-pubhealth-3',
        category: "Santé publique",
        theme: "Santé mentale",
        french: "La santé mentale constitue un défi croissant pour les systèmes de santé publique modernes.",
        reference: "Mental health represents a growing challenge for modern public health systems.",
        grammar_points: ["Present simple", "Adjectives", "For + plural noun"],
        difficulty_level: "intermediate"
    },
    // ÉDUCATION SUPÉRIEURE
    {
        id: 'en-high-edu-1',
        category: "Éducation supérieure",
        theme: "Universités numériques",
        french: "Les universités numériques offrent de nouvelles opportunités d'accès à l'éducation supérieure.",
        reference: "Digital universities offer new opportunities for access to higher education.",
        grammar_points: ["Present simple", "Adjectives", "For + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-high-edu-2',
        category: "Éducation supérieure",
        theme: "Mobilité étudiante",
        french: "La mobilité étudiante internationale favorise les échanges culturels et linguistiques.",
        reference: "International student mobility promotes cultural and linguistic exchanges.",
        grammar_points: ["Present simple", "Adjectives", "And + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-high-edu-3',
        category: "Éducation supérieure",
        theme: "Formation doctorale",
        french: "La formation doctorale prépare les chercheurs aux défis de la recherche scientifique moderne.",
        reference: "Doctoral training prepares researchers for the challenges of modern scientific research.",
        grammar_points: ["Present simple", "For + noun", "Of + noun"],
        difficulty_level: "advanced"
    },
    // INNOVATION & STARTUPS
    {
        id: 'en-inno-1',
        category: "Innovation",
        theme: "Écosystème startup",
        french: "L'écosystème des startups européennes bénéficie d'investissements croissants des fonds de capital-risque.",
        reference: "The European startup ecosystem benefits from increasing venture capital investments.",
        grammar_points: ["Present simple", "From + noun", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-inno-2',
        category: "Innovation",
        theme: "Recherche appliquée",
        french: "La recherche appliquée transforme les découvertes scientifiques en solutions pratiques.",
        reference: "Applied research transforms scientific discoveries into practical solutions.",
        grammar_points: ["Present simple", "Into + noun", "Adjectives"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-inno-3',
        category: "Innovation",
        theme: "Propriété intellectuelle",
        french: "La protection de la propriété intellectuelle encourage l'innovation et les investissements en R&D.",
        reference: "Intellectual property protection encourages innovation and R&D investments.",
        grammar_points: ["Present simple", "Adjectives", "And + noun"],
        difficulty_level: "advanced"
    },
    // DROIT & JUSTICE
    {
        id: 'en-law-1',
        category: "Droit & Justice",
        theme: "État de droit",
        french: "L'État de droit constitue la base de toute démocratie moderne et stable.",
        reference: "The rule of law forms the basis of any modern and stable democracy.",
        grammar_points: ["Present simple", "Of + noun", "And + adjective"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-law-2',
        category: "Droit & Justice",
        theme: "Justice internationale",
        french: "Les tribunaux internationaux jouent un rôle essentiel dans la résolution des conflits armés.",
        reference: "International courts play an essential role in resolving armed conflicts.",
        grammar_points: ["Present simple", "In + gerund", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-law-3',
        category: "Droit & Justice",
        theme: "Droits humains",
        french: "La protection des droits humains représente un défi permanent dans un monde globalisé.",
        reference: "The protection of human rights represents a permanent challenge in a globalized world.",
        grammar_points: ["Present simple", "Of + noun", "In + noun"],
        difficulty_level: "advanced"
    },
    // PHILOSOPHIE & ÉTHIQUE
    {
        id: 'en-philo-1',
        category: "Philosophie & Éthique",
        theme: "Intelligence artificielle éthique",
        french: "L'éthique de l'intelligence artificielle soulève des questions fondamentales sur la responsabilité humaine.",
        reference: "Artificial intelligence ethics raises fundamental questions about human responsibility.",
        grammar_points: ["Present simple", "About + noun", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-philo-2',
        category: "Philosophie & Éthique",
        theme: "Développement durable",
        french: "Le développement durable nécessite une réflexion éthique sur nos responsabilités envers les générations futures.",
        reference: "Sustainable development requires ethical reflection on our responsibilities towards future generations.",
        grammar_points: ["Present simple", "On + noun", "Towards + noun"],
        difficulty_level: "advanced"
    },
    // SANTÉ MENTALE
    {
        id: 'en-mental-1',
        category: "Santé mentale",
        theme: "Bien-être psychologique",
        french: "Le bien-être psychologique constitue un facteur essentiel pour la productivité au travail.",
        reference: "Psychological well-being represents an essential factor for workplace productivity.",
        grammar_points: ["Present simple", "For + noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-mental-2',
        category: "Santé mentale",
        theme: "Prévention suicide",
        french: "La prévention du suicide nécessite une approche multidimensionnelle impliquant société et individus.",
        reference: "Suicide prevention requires a multidimensional approach involving society and individuals.",
        grammar_points: ["Present simple", "Involving + noun", "And + noun"],
        difficulty_level: "advanced"
    },
    // ÉDUCATION SPÉCIALE
    {
        id: 'en-spec-ed-1',
        category: "Éducation spéciale",
        theme: "Inclusion scolaire",
        french: "L'inclusion scolaire permet aux élèves handicapés de bénéficier d'une éducation adaptée à leurs besoins.",
        reference: "School inclusion allows disabled students to benefit from education adapted to their needs.",
        grammar_points: ["Present simple", "To + infinitive", "Adapted to + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-spec-ed-2',
        category: "Éducation spéciale",
        theme: "Apprentissage personnalisé",
        french: "L'apprentissage personnalisé prend en compte les rythmes et styles d'apprentissage individuels.",
        reference: "Personalized learning takes into account individual learning rhythms and styles.",
        grammar_points: ["Present simple", "Into account + noun", "And + noun"],
        difficulty_level: "advanced"
    },
    // CYBERSÉCURITÉ
    {
        id: 'en-cyber-1',
        category: "Cybersécurité",
        theme: "Protection données",
        french: "La protection des données personnelles constitue un droit fondamental dans l'ère numérique.",
        reference: "The protection of personal data constitutes a fundamental right in the digital age.",
        grammar_points: ["Present simple", "Of + noun", "In + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-cyber-2',
        category: "Cybersécurité",
        theme: "Ransomware",
        french: "Les attaques par ransomware paralysent de plus en plus les infrastructures critiques mondiales.",
        reference: "Ransomware attacks increasingly paralyze global critical infrastructures.",
        grammar_points: ["Present simple", "Adverbs", "Compound nouns"],
        difficulty_level: "advanced"
    },
    // GÉNÉRATION Z
    {
        id: 'en-genz-1',
        category: "Génération Z",
        theme: "Consommation responsable",
        french: "La génération Z privilégie la consommation responsable et l'impact environnemental des produits.",
        reference: "Generation Z prioritizes responsible consumption and the environmental impact of products.",
        grammar_points: ["Present simple", "And + noun", "Of + noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-genz-2',
        category: "Génération Z",
        theme: "Équilibre vie-travail",
        french: "Les jeunes générations revendiquent un meilleur équilibre entre vie professionnelle et vie privée.",
        reference: "Younger generations demand better balance between professional life and private life.",
        grammar_points: ["Present simple", "Between + noun", "And + noun"],
        difficulty_level: "intermediate"
    },
    // BIOTECHNOLOGIES
    {
        id: 'en-bio-1',
        category: "Biotechnologies",
        theme: "Édition génomique",
        french: "L'édition génomique ouvre de nouvelles perspectives thérapeutiques pour les maladies génétiques.",
        reference: "Genome editing opens new therapeutic perspectives for genetic diseases.",
        grammar_points: ["Present simple", "For + noun", "Compound adjectives"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-bio-2',
        category: "Biotechnologies",
        theme: "Agriculture biologique",
        french: "L'agriculture biologique préserve la biodiversité et améliore la qualité des sols.",
        reference: "Organic farming preserves biodiversity and improves soil quality.",
        grammar_points: ["Present simple", "And + verb", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    // ESPACE & ASTRONAUTIQUE
    {
        id: 'en-space-1',
        category: "Espace",
        theme: "Exploration spatiale",
        french: "L'exploration spatiale internationale favorise la coopération scientifique entre les nations.",
        reference: "International space exploration promotes scientific cooperation between nations.",
        grammar_points: ["Present simple", "Between + plural noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-space-2',
        category: "Espace",
        theme: "Satellites",
        french: "Les satellites permettent de surveiller l'évolution du climat et des ressources naturelles.",
        reference: "Satellites make it possible to monitor climate change and natural resources.",
        grammar_points: ["Present simple", "To + infinitive", "And + noun"],
        difficulty_level: "intermediate"
    },
    // ÉCONOMIE DIGITALE (SUPPLÉMENTAIRE)
    {
        id: 'en-econ-4',
        category: "Économie digitale",
        theme: "Commerce avancé",
        french: "Le commerce électronique avancé transforme les habitudes de consommation des générations numériques.",
        reference: "Advanced e-commerce transforms the consumption habits of digital generations.",
        grammar_points: ["Present simple", "Of + plural noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-econ-5',
        category: "Économie digitale",
        theme: "Économie circulaire",
        french: "L'économie circulaire vise à réduire les déchets et optimiser l'utilisation des ressources.",
        reference: "The circular economy aims to reduce waste and optimize resource utilization.",
        grammar_points: ["Present simple", "To + infinitive", "And + infinitive"],
        difficulty_level: "advanced"
    },
    // TRAVAIL & EMPLOI (SUPPLÉMENTAIRE)
    {
        id: 'en-work-4',
        category: "Travail",
        theme: "Travail hybride",
        french: "Le travail hybride combine les avantages du bureau et du télétravail pour les employés.",
        reference: "Hybrid work combines the benefits of office and remote work for employees.",
        grammar_points: ["Present simple", "Of + noun", "For + plural noun"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-work-5',
        category: "Travail",
        theme: "Formation continue",
        french: "La formation continue constitue un investissement essentiel pour le développement professionnel.",
        reference: "Continuing education represents an essential investment for professional development.",
        grammar_points: ["Present simple", "For + noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    // MÉDIAS & COMMUNICATION (SUPPLÉMENTAIRE)
    {
        id: 'en-media-4',
        category: "Médias",
        theme: "Journalisme numérique",
        french: "Le journalisme numérique transforme les méthodes de diffusion de l'information en ligne.",
        reference: "Digital journalism transforms information dissemination methods online.",
        grammar_points: ["Present simple", "Compound nouns", "Adverbs"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-media-5',
        category: "Médias",
        theme: "Réseaux sociaux d'entreprise",
        french: "Les réseaux sociaux d'entreprise facilitent la communication interne et externe des organisations.",
        reference: "Corporate social networks facilitate internal and external organizational communication.",
        grammar_points: ["Present simple", "And + adjective", "Compound nouns"],
        difficulty_level: "advanced"
    },
    // SÉCURITÉ & DÉFENSE (SUPPLÉMENTAIRE)
    {
        id: 'en-sec-4',
        category: "Sécurité",
        theme: "Cyberdéfense nationale",
        french: "La cyberdéfense nationale protège les infrastructures critiques contre les cyberattaques.",
        reference: "National cybersecurity protects critical infrastructure against cyber attacks.",
        grammar_points: ["Present simple", "Against + noun", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-sec-5',
        category: "Sécurité",
        theme: "IA défensive",
        french: "L'intelligence artificielle défensive améliore la détection des menaces cybernétiques.",
        reference: "Defensive artificial intelligence improves the detection of cyber threats.",
        grammar_points: ["Present simple", "Of + noun", "Compound adjectives"],
        difficulty_level: "advanced"
    },
    // URBANISME & VILLES (SUPPLÉMENTAIRE)
    {
        id: 'en-urban-4',
        category: "Urbanisme",
        theme: "Villes intelligentes",
        french: "Les villes intelligentes utilisent les technologies IoT pour améliorer la qualité de vie urbaine.",
        reference: "Smart cities use IoT technologies to improve urban quality of life.",
        grammar_points: ["Present simple", "To + infinitive", "Compound nouns"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-urban-5',
        category: "Urbanisme",
        theme: "Mobilité durable",
        french: "La mobilité durable réduit l'empreinte carbone des déplacements urbains modernes.",
        reference: "Sustainable mobility reduces the carbon footprint of modern urban travel.",
        grammar_points: ["Present simple", "Of + noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    // AGRICULTURE & ALIMENTATION (SUPPLÉMENTAIRE)
    {
        id: 'en-agri-4',
        category: "Agriculture",
        theme: "Agroalimentaire innovant",
        french: "L'agroalimentaire innovant combine tradition et technologies modernes pour la qualité alimentaire.",
        reference: "Innovative agribusiness combines tradition and modern technologies for food quality.",
        grammar_points: ["Present simple", "And + noun", "For + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-agri-5',
        category: "Agriculture",
        theme: "Sécurité alimentaire",
        french: "La sécurité alimentaire mondiale nécessite une coopération internationale accrue.",
        reference: "Global food security requires increased international cooperation.",
        grammar_points: ["Present simple", "Compound nouns", "Past participles as adjectives"],
        difficulty_level: "advanced"
    },
    // ÉNERGIE & CLIMAT (SUPPLÉMENTAIRE)
    {
        id: 'en-energy-4',
        category: "Énergie",
        theme: "Stockage énergétique",
        french: "Le stockage énergétique innovant permet d'équilibrer l'offre et la demande d'électricité renouvelable.",
        reference: "Innovative energy storage enables the balance of renewable electricity supply and demand.",
        grammar_points: ["Present simple", "Of + noun", "And + noun"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-energy-5',
        category: "Énergie",
        theme: "Transition énergétique juste",
        french: "La transition énergétique juste inclut toutes les communautés dans le processus de transformation.",
        reference: "The just energy transition includes all communities in the transformation process.",
        grammar_points: ["Present simple", "In + noun", "Compound nouns"],
        difficulty_level: "advanced"
    },
    // SANTÉ PUBLIQUE (SUPPLÉMENTAIRE)
    {
        id: 'en-pubhealth-4',
        category: "Santé publique",
        theme: "Médecine préventive",
        french: "La médecine préventive met l'accent sur les habitudes de vie saines et la prévention des maladies.",
        reference: "Preventive medicine emphasizes healthy lifestyles and disease prevention.",
        grammar_points: ["Present simple", "And + noun", "Compound nouns"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-pubhealth-5',
        category: "Santé publique",
        theme: "Systèmes de santé",
        french: "Les systèmes de santé modernes font face à des défis démographiques et technologiques importants.",
        reference: "Modern health systems face significant demographic and technological challenges.",
        grammar_points: ["Present simple", "And + adjective", "Compound nouns"],
        difficulty_level: "advanced"
    },
    // ÉDUCATION SUPÉRIEURE (SUPPLÉMENTAIRE)
    {
        id: 'en-high-edu-4',
        category: "Éducation supérieure",
        theme: "Internationalisation universitaire",
        french: "L'internationalisation universitaire attire des étudiants et des chercheurs du monde entier.",
        reference: "University internationalization attracts students and researchers from around the world.",
        grammar_points: ["Present simple", "And + noun", "From + preposition"],
        difficulty_level: "intermediate"
    },
    {
        id: 'en-high-edu-5',
        category: "Éducation supérieure",
        theme: "Recherche appliquée",
        french: "La recherche appliquée universitaire contribue à l'innovation technologique et au développement économique.",
        reference: "Applied university research contributes to technological innovation and economic development.",
        grammar_points: ["Present simple", "To + noun", "And + noun"],
        difficulty_level: "advanced"
    },
    // INNOVATION & STARTUPS (SUPPLÉMENTAIRE)
    {
        id: 'en-inno-4',
        category: "Innovation",
        theme: "Entrepreneuriat social",
        french: "L'entrepreneuriat social résout des problèmes sociaux par des solutions innovantes et durables.",
        reference: "Social entrepreneurship solves social problems through innovative and sustainable solutions.",
        grammar_points: ["Present simple", "Through + adjective", "And + adjective"],
        difficulty_level: "advanced"
    },
    {
        id: 'en-inno-5',
        category: "Innovation",
        theme: "Transfert technologique",
        french: "Le transfert technologique universitaire facilite la création d'entreprises innovantes et compétitives.",
        reference: "University technology transfer facilitates the creation of innovative and competitive companies.",
        grammar_points: ["Present simple", "Of + adjective", "And + adjective"],
        difficulty_level: "advanced"
    }
];
