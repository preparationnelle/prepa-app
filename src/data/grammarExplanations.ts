export const GRAMMAR_EXPLANATIONS: Record<string, string> = {
    // Tenses
    "Present simple": "Vérités générales, habitudes ou états permanents. Souvent utilisé pour décrire des faits scientifiques ou des réalités géopolitiques stables (ex: 'The sun rises', 'China is a large country').",
    "Present continuous": "Action en cours ou situation temporaire/évolutive. Marque le changement (ex: 'prices are rising') ou une action qui se déroule au moment où l'on parle.",
    "Present perfect": "Lien entre passé et présent. Indique une action passée avec un résultat présent (constat), ou une action qui a commencé dans le passé et continue. Souvent avec 'since', 'for', 'just', 'already'.",
    "Past simple": "Action terminée, datée, coupée du présent. Le marqueur de temps est souvent explicite ou implicite (hier, en 1999).",

    // Voice
    "Passive voice": "Forme passive (be + participe passé). Permet de mettre l'accent sur l'objet de l'action plutôt que le sujet, ou quand l'agent est inconnu ou évident. Très fréquent en anglais académique et journalistique.",

    // Nouns & Phrases
    "Complex noun phrases": "Groupes nominaux denses. L'anglais préfère souvent empiler les adjectifs avant le nom plutôt que d'utiliser des prépositions (ex: 'a long-term economic growth strategy' vs 'une stratégie de croissance économique à long terme').",
    "Compound nouns": "Noms composés (Nom + Nom). Le premier nom agit comme un adjectif qualifiant le second (ex: 'decision-making process'). Attention : le premier nom reste invariable.",
    "Complex sentence structure": "Structure de phrase complexe. Implique souvent plusieurs propositions reliées par des connecteurs logiques (although, while, whereas) pour exprimer des nuances.",

    // Verbs & Forms
    "Infinitive of purpose": "Infinitif de but (to + base verbale). Répond à la question 'pourquoi ?'. Attention : ne pas utiliser 'for + verbe' pour un but spécifique.",
    "Gerunds": "Gérondif (verbe en -ing). Utilisé comme un nom. Obligatoire après certaines prépositions (in, on, at, by...) et certains verbes (avoid, enjoy...).",
    "Modal verbs": "Modaux (can, may, must, should...). Ils modifient le sens du verbe pour exprimer la capacité, la probabilité, l'obligation ou le conseil. Ils ne prennent jamais de 's' et sont suivis de la base verbale sans 'to'.",
    "Past participles as adjectives": "Participe passé employé comme adjectif (ex: 'a developed country'). Indique souvent l'état ou le résultat d'une action.",

    // Adjectives & Adverbs
    "Adjectives of degree": "Adjectifs de degré (significant, minor, substantial...). Essentiels pour nuancer une analyse et préciser l'importance d'un phénomène.",
    "Adverbs": "Adverbes (souvent en -ly). Ils modifient le verbe pour préciser comment, où, quand ou à quel point une action se déroule.",
    "Adverbs of manner": "Adverbes de manière. Décrivent comment une action est faite (ex: 'rapidly', 'efficiently'). Se placent souvent après le verbe ou l'objet.",
    "Comparative adverbs": "Comparatif des adverbes (more + adverbe + than). Pour comparer comment deux actions sont effectuées.",
    "Superlative adjectives": "Superlatif (the most + adj / the -est). Pour isoler un élément comme étant le 'plus' quelque chose dans un groupe.",
    "Complex adjectives": "Adjectifs complexes. Peuvent être dérivés ou formés de plusieurs mots pour une description précise.",
    "Compound adjectives": "Adjectifs composés (ex: 'state-of-the-art'). Souvent reliés par des traits d'union lorsqu'ils précèdent le nom qu'ils qualifient.",
    "Possessive adjectives": "Adjectifs possessifs (his, her, its, their...). Attention à 'its' (possession) vs 'it's' (it is). En anglais, l'adjectif s'accorde avec le possesseur, pas l'objet possédé.",

    // Prepositions & Connectors
    "Relative clauses": "Propositions relatives (who, which, that, whose). Permettent d'ajouter de l'information sur un nom sans commencer une nouvelle phrase. 'Who' pour les humains, 'Which' pour les objets.",
    "Despite + noun": "Exprime la concession ('Malgré'). Toujours suivi d'un groupe nominal ou d'un gérondif (-ing), JAMAIS d'une phrase complète (sujet + verbe). Pour une phrase complète, utiliser 'Although'.",
    "For + noun": "Indique souvent la destination, le bénéficiaire ou la durée. Dans un contexte économique, peut indiquer la raison.",
    "Of + noun": "Marque la possession (génitif), l'origine, la mesure ou le contenu. (ex: 'The rate of inflation').",
    "In + noun": "Indique l'intérieur, le lieu géographique, le domaine (in economics) ou une période de temps (in 2024).",
    "To + noun": "Indique le mouvement vers, la direction, ou le destinataire.",
    "On + noun": "Indique la position (sur), un sujet (a report on...), ou un jour précis.",
    "About + noun": "Indique le sujet ou le thème ('au sujet de').",
    "Against + noun": "Indique l'opposition, le conflit ou la protection ('contre').",
    "Between + plural noun": "Indique une relation réciproque ou une position entre deux entités ou plus.",
    "With + noun": "Indique l'accompagnement, l'instrument ou la manière.",
    "By + noun": "Indique l'agent (par qui l'action est faite) ou le moyen (comment). Souvent utilisé avec le passif.",
    "As + noun": "Indique la fonction, le rôle ou le titre ('en tant que'). Différent de 'Like' (comparaison).",
    "From + noun": "Indique l'origine, la provenance ou le point de départ.",
    "Without + noun": "Indique l'absence ('sans').",
    "Since + noun": "Indique le point de départ temporel d'une action qui continue (souvent avec le Present Perfect).",
    "Towards + noun": "Indique la direction ou une tendance ('vers').",
};

export const getGrammarExplanation = (point: string): string => {
    // Direct match
    if (GRAMMAR_EXPLANATIONS[point]) {
        return GRAMMAR_EXPLANATIONS[point];
    }

    // Pattern matching replacements for generic preposition patterns
    if (point.includes(" + ")) {
        if (point.startsWith("For +")) return "Indique le but, le bénéficiaire ou la durée. (ex: 'For the economy').";
        if (point.startsWith("Of +")) return "Marque l'appartenance, la composition ou l'origine.";
        if (point.startsWith("In +")) return "Indique le domaine, le lieu ou une période.";
        if (point.startsWith("To +")) return "Marque la direction ou le mouvement vers quelque chose.";
        if (point.startsWith("With +")) return "Indique l'accompagnement ou le moyen.";
        if (point.startsWith("By +")) return "Indique le moyen ou l'agent de l'action.";
        if (point.startsWith("From +")) return "Indique la provenance ou l'origine.";
        if (point.startsWith("About +")) return "Concerne un sujet spécifique.";
        if (point.startsWith("Between +")) return "Implique une relation entre plusieurs éléments.";
    }

    // Fallback for known variations
    if (point.includes("Present continuous")) return GRAMMAR_EXPLANATIONS["Present continuous"];
    if (point.includes("Present simple")) return GRAMMAR_EXPLANATIONS["Present simple"];
    if (point.includes("Present perfect")) return GRAMMAR_EXPLANATIONS["Present perfect"];
    if (point.includes("Passive")) return GRAMMAR_EXPLANATIONS["Passive voice"];
    if (point.includes("noun phrase")) return GRAMMAR_EXPLANATIONS["Complex noun phrases"];
    if (point.includes("Adverb")) return GRAMMAR_EXPLANATIONS["Adverbs"];

    return "Point grammatical spécifique nécessitant une attention particulière au contexte.";
};
