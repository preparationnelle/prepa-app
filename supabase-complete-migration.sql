-- ===========================================================================
-- MIGRATION COMPLÈTE - Prépa Rationnelle Translations
-- Ce script met à jour le schéma et insère TOUTES les données
-- ===========================================================================

-- 1. MODIFIER LA TABLE sentences pour ajouter les nouveaux champs
ALTER TABLE sentences ADD COLUMN IF NOT EXISTS traduction_reference TEXT;
ALTER TABLE sentences ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE sentences ADD COLUMN IF NOT EXISTS theme TEXT;
ALTER TABLE sentences ADD COLUMN IF NOT EXISTS specialized BOOLEAN DEFAULT false;

-- 2. SUPPRIMER LES ANCIENNES DONNÉES pour éviter les doublons
DELETE FROM sentences;

-- 3. INSÉRER TOUTES LES PHRASES AVEC TRADUCTIONS ET POINTS DE GRAMMAIRE

-- GÉOPOLITIQUE & RELATIONS INTERNATIONALES
INSERT INTO sentences (langue_source, langue_cible, phrase_originale, traduction_reference, theme_grammatical, niveau, category, theme, specialized) VALUES
('Français', 'Anglais', 'Les tensions géopolitiques entre la Chine et les États-Unis s''intensifient dans le domaine technologique.', 'Geopolitical tensions between China and the United States are intensifying in the technological domain.', 'Present continuous, Passive voice, Complex sentence structure', 'C1', 'Géopolitique', 'Relations internationales', true),
('Français', 'Anglais', 'L''Union européenne cherche à renforcer son autonomie stratégique face aux défis mondiaux.', 'The European Union seeks to strengthen its strategic autonomy in the face of global challenges.', 'Present simple, Infinitive of purpose, Complex noun phrases', 'B2', 'Géopolitique', 'Union européenne', false),
('Français', 'Anglais', 'Le commerce international représente une part croissante de l''économie mondiale malgré les tensions protectionnistes.', 'International trade represents a growing share of the global economy despite protectionist tensions.', 'Present simple, Despite + noun, Adjectives of degree', 'B2', 'Géopolitique', 'Commerce international', false),
('Français', 'Anglais', 'Les migrations internationales constituent un défi majeur pour les politiques européennes d''intégration.', 'International migrations represent a major challenge for European integration policies.', 'Present simple, For + noun, Compound nouns', 'C1', 'Géopolitique', 'Migrations internationales', false),

-- ÉCONOMIE
('Français', 'Anglais', 'L''intelligence artificielle transforme radicalement les modèles économiques traditionnels.', 'Artificial intelligence is radically transforming traditional economic models.', 'Present continuous, Adverbs, Complex object', 'B2', 'Économie', 'Innovation technologique', false),
('Français', 'Anglais', 'Les investissements verts représentent un enjeu majeur pour la transition écologique.', 'Green investments represent a major challenge for the ecological transition.', 'Present simple, Complex noun phrases, Prepositions', 'B2', 'Économie', 'Développement durable', false),
('Français', 'Anglais', 'La croissance économique dépend largement des investissements dans l''éducation et la recherche.', 'Economic growth largely depends on investments in education and research.', 'Present simple, On + noun, Adverbs of manner', 'B2', 'Économie', 'Croissance économique', false),

-- SOCIÉTÉ & CULTURE
('Français', 'Anglais', 'L''enseignement à distance transforme les méthodes pédagogiques traditionnelles.', 'Distance learning is transforming traditional teaching methods.', 'Present continuous, Gerunds, Complex objects', 'B2', 'Société', 'Éducation numérique', false),
('Français', 'Anglais', 'La diversité culturelle enrichit le tissu social des métropoles modernes.', 'Cultural diversity enriches the social fabric of modern metropolises.', 'Present simple, Complex noun phrases, Prepositions', 'B2', 'Société', 'Diversité culturelle', false),
('Français', 'Anglais', 'La cohésion sociale nécessite des politiques publiques inclusives pour tous les citoyens.', 'Social cohesion requires inclusive public policies for all citizens.', 'Present simple, For + plural noun, Adjectives', 'B2', 'Société', 'Cohésion sociale', false),

-- TECHNOLOGIE & INNOVATION
('Français', 'Anglais', 'Les progrès de l''intelligence artificielle soulèvent des questions éthiques complexes.', 'Advances in artificial intelligence raise complex ethical questions.', 'Present simple, Passive voice, Complex adjectives', 'B2', 'Technologie', 'Intelligence artificielle', false),
('Français', 'Anglais', 'Les réseaux sociaux ont révolutionné la façon dont nous communiquons et partageons l''information.', 'Social media have revolutionized the way we communicate and share information.', 'Present perfect, Relative clauses, Have/has + past participle', 'B2', 'Technologie', 'Réseaux sociaux', false),
('Français', 'Anglais', 'Le big data offre de nouvelles opportunités pour l''analyse prédictive dans de nombreux secteurs.', 'Big data offers new opportunities for predictive analysis in many sectors.', 'Present simple, For + noun, In + plural noun', 'C1', 'Technologie', 'Big data', false),

-- ENVIRONNEMENT & ÉCOLOGIE
('Français', 'Anglais', 'Le changement climatique représente la plus grande menace pour l''humanité au 21ème siècle.', 'Climate change represents the greatest threat to humanity in the 21st century.', 'Present simple, Superlative adjectives, Ordinal numbers', 'B2', 'Environnement', 'Changement climatique', false),
('Français', 'Anglais', 'Les énergies renouvelables deviennent progressivement plus compétitives sur le marché mondial.', 'Renewable energies are gradually becoming more competitive on the global market.', 'Present continuous, Comparative adverbs, Complex noun phrases', 'C1', 'Environnement', 'Énergies renouvelables', false),
('Français', 'Anglais', 'La perte de biodiversité constitue un risque majeur pour l''équilibre des écosystèmes terrestres.', 'The loss of biodiversity represents a major risk for the balance of terrestrial ecosystems.', 'Present simple, For + noun, Of + noun', 'C1', 'Environnement', 'Biodiversité', false),

-- SANTÉ & BIEN-ÊTRE
('Français', 'Anglais', 'La télémédecine offre de nouvelles possibilités pour améliorer l''accès aux soins médicaux.', 'Telemedicine offers new possibilities for improving access to medical care.', 'Present simple, Gerunds, Infinitive of purpose', 'B2', 'Santé', 'Télémédecine', false),
('Français', 'Anglais', 'La pandémie de COVID-19 a profondément transformé nos habitudes quotidiennes et nos comportements sociaux.', 'The COVID-19 pandemic has profoundly transformed our daily habits and social behaviors.', 'Present perfect, Adverbs of manner, Compound nouns', 'B2', 'Santé', 'Pandémie mondiale', false),
('Français', 'Anglais', 'La prévention des maladies cardiovasculaires passe par une alimentation équilibrée et l''exercice physique régulier.', 'The prevention of cardiovascular diseases involves a balanced diet and regular physical exercise.', 'Present simple, Of + noun, And + noun', 'B2', 'Santé', 'Prévention santé', false),

-- POLITIQUE & INSTITUTIONS
('Français', 'Anglais', 'La démocratie représentative nécessite une participation active des citoyens pour fonctionner efficacement.', 'Representative democracy requires active citizen participation to function effectively.', 'Present simple, Infinitive of purpose, Adjectives', 'B2', 'Politique', 'Démocratie représentative', false),
('Français', 'Anglais', 'Les organisations internationales jouent un rôle crucial dans la résolution des conflits mondiaux.', 'International organizations play a crucial role in resolving global conflicts.', 'Present simple, Gerunds, Adjectives of degree', 'B2', 'Politique', 'Politique internationale', false),
('Français', 'Anglais', 'La gouvernance mondiale nécessite une coopération accrue entre les nations pour faire face aux défis globaux.', 'Global governance requires increased cooperation between nations to address global challenges.', 'Present simple, Between + plural noun, Infinitive of purpose', 'C1', 'Politique', 'Gouvernance mondiale', false),

-- ÉDUCATION & FORMATION
('Français', 'Anglais', 'La formation continue est devenue essentielle dans un monde où les compétences évoluent rapidement.', 'Continuing education has become essential in a world where skills evolve rapidly.', 'Present perfect, Relative clauses, Adverbs', 'B2', 'Éducation', 'Formation continue', false),
('Français', 'Anglais', 'L''éducation inclusive vise à garantir que tous les élèves puissent bénéficier d''une éducation de qualité.', 'Inclusive education aims to ensure that all students can benefit from quality education.', 'Present simple, Infinitive of purpose, Modal verbs', 'B2', 'Éducation', 'Éducation inclusive', false),
('Français', 'Anglais', 'L''apprentissage en ligne offre une flexibilité accrue pour les étudiants de tous âges et origines.', 'Online learning offers increased flexibility for students of all ages and backgrounds.', 'Present simple, For + noun, Of + plural noun', 'B2', 'Éducation', 'Apprentissage en ligne', false),

-- CULTURE & ARTS
('Français', 'Anglais', 'Les arts numériques combinent créativité artistique et technologies modernes pour créer de nouvelles formes d''expression.', 'Digital arts combine artistic creativity and modern technologies to create new forms of expression.', 'Present simple, Infinitive of purpose, Compound nouns', 'C1', 'Culture', 'Arts numériques', false),
('Français', 'Anglais', 'Le patrimoine culturel doit être préservé pour les générations futures malgré les défis de la mondialisation.', 'Cultural heritage must be preserved for future generations despite the challenges of globalization.', 'Modal verbs, Passive voice, Despite + noun', 'C1', 'Culture', 'Patrimoine culturel', false),
('Français', 'Anglais', 'Les industries culturelles contribuent significativement à l''économie créative et à l''emploi dans de nombreux pays.', 'Cultural industries contribute significantly to the creative economy and employment in many countries.', 'Present simple, To + noun, In + plural noun', 'C1', 'Culture', 'Industries culturelles', false),

-- TRANSPORT & MOBILITÉ
('Français', 'Anglais', 'La mobilité urbaine durable nécessite une coordination entre transport public et véhicules individuels.', 'Sustainable urban mobility requires coordination between public transport and individual vehicles.', 'Present simple, Gerunds, Between + plural nouns', 'B2', 'Transport', 'Mobilité urbaine', false),
('Français', 'Anglais', 'L''industrie du transport aérien fait face à des défis importants liés à la réduction des émissions de CO2.', 'The aviation industry faces major challenges related to reducing CO2 emissions.', 'Present simple, Past participles as adjectives, Related to + noun', 'C1', 'Transport', 'Transports aériens', false),
('Français', 'Anglais', 'Le transport ferroviaire représente une alternative écologique aux transports routiers pour les longs trajets.', 'Rail transport represents an ecological alternative to road transport for long journeys.', 'Present simple, To + noun, For + noun', 'B2', 'Transport', 'Transport ferroviaire', false),

-- SCIENCE & RECHERCHE
('Français', 'Anglais', 'La recherche scientifique fondamentale constitue la base de l''innovation technologique future.', 'Fundamental scientific research forms the basis of future technological innovation.', 'Present simple, Complex noun phrases, Future adjectives', 'C1', 'Science', 'Recherche scientifique', false),
('Français', 'Anglais', 'Les avancées en biotechnologie ouvrent de nouvelles perspectives pour la médecine personnalisée.', 'Advances in biotechnology open new perspectives for personalized medicine.', 'Present simple, Adjectives, For + noun (purpose)', 'C1', 'Science', 'Biotechnologie', false),
('Français', 'Anglais', 'L''intelligence artificielle scientifique facilite l''analyse de grandes quantités de données complexes.', 'Scientific artificial intelligence facilitates the analysis of large amounts of complex data.', 'Present simple, Of + plural noun, Compound nouns', 'C1', 'Science', 'Intelligence artificielle', false),
('Français', 'Anglais', 'La médecine régénérative offre de nouveaux espoirs pour le traitement des maladies chroniques.', 'Regenerative medicine offers new hopes for the treatment of chronic diseases.', 'Present simple, For + noun, Of + noun', 'C1', 'Science', 'Médecine régénérative', false),

-- ÉCONOMIE DIGITALE
('Français', 'Anglais', 'Le commerce électronique a transformé les habitudes de consommation des citoyens européens.', 'E-commerce has transformed European citizens'' consumption habits.', 'Present perfect, Possessive case, Compound nouns', 'B2', 'Économie digitale', 'Commerce électronique', false),
('Français', 'Anglais', 'Les cryptomonnaies représentent un défi majeur pour les régulateurs financiers mondiaux.', 'Cryptocurrencies represent a major challenge for global financial regulators.', 'Present simple, Adjectives of degree, For + noun', 'C1', 'Économie digitale', 'Cryptomonnaies', false),
('Français', 'Anglais', 'Les plateformes numériques transforment les modèles économiques traditionnels dans de nombreux secteurs.', 'Digital platforms are transforming traditional business models in many sectors.', 'Present continuous, Adjectives, In + plural noun', 'B2', 'Économie digitale', 'Plateformes numériques', false),
('Français', 'Anglais', 'L''économie circulaire vise à réduire les déchets et optimiser l''utilisation des ressources.', 'The circular economy aims to reduce waste and optimize resource utilization.', 'Present simple, To + infinitive, And + infinitive', 'C1', 'Économie digitale', 'Économie circulaire', false),

-- TRAVAIL & EMPLOI
('Français', 'Anglais', 'Le télétravail est devenu une norme dans de nombreux secteurs professionnels depuis la pandémie.', 'Remote work has become standard in many professional sectors since the pandemic.', 'Present perfect, Adjectives, Since + noun', 'B2', 'Travail', 'Télétravail', false),
('Français', 'Anglais', 'L''écart salarial entre hommes et femmes persiste malgré les efforts législatifs.', 'The gender pay gap persists despite legislative efforts.', 'Present simple, Despite + noun, Compound nouns', 'B2', 'Travail', 'Égalité salariale', false),
('Français', 'Anglais', 'La formation professionnelle continue est essentielle pour s''adapter aux changements technologiques.', 'Continuing professional training is essential to adapt to technological changes.', 'Present simple, To + infinitive, Adjectives', 'B2', 'Travail', 'Formation professionnelle', false),
('Français', 'Anglais', 'Le travail hybride combine les avantages du bureau et du télétravail pour les employés.', 'Hybrid work combines the benefits of office and remote work for employees.', 'Present simple, Of + noun, For + plural noun', 'B2', 'Travail', 'Travail hybride', false),
('Français', 'Anglais', 'La formation continue constitue un investissement essentiel pour le développement professionnel.', 'Continuing education represents an essential investment for professional development.', 'Present simple, For + noun, Compound nouns', 'B2', 'Travail', 'Formation continue', false),

-- MÉDIAS & COMMUNICATION
('Français', 'Anglais', 'La désinformation en ligne constitue une menace sérieuse pour la démocratie moderne.', 'Online disinformation represents a serious threat to modern democracy.', 'Present simple, Adjectives, To + noun', 'B2', 'Médias', 'Désinformation', false),
('Français', 'Anglais', 'Les plateformes de streaming ont révolutionné l''industrie du divertissement traditionnel.', 'Streaming platforms have revolutionized the traditional entertainment industry.', 'Present perfect, Adjectives, Compound nouns', 'B2', 'Médias', 'Streaming', false),
('Français', 'Anglais', 'Les réseaux sociaux influencent considérablement l''opinion publique et les comportements électoraux.', 'Social networks significantly influence public opinion and electoral behavior.', 'Present simple, Adverbs, And + noun', 'B2', 'Médias', 'Réseaux sociaux', false),
('Français', 'Anglais', 'Le journalisme numérique transforme les méthodes de diffusion de l''information en ligne.', 'Digital journalism transforms information dissemination methods online.', 'Present simple, Compound nouns, Adverbs', 'B2', 'Médias', 'Journalisme numérique', false),
('Français', 'Anglais', 'Les réseaux sociaux d''entreprise facilitent la communication interne et externe des organisations.', 'Corporate social networks facilitate internal and external organizational communication.', 'Present simple, And + adjective, Compound nouns', 'C1', 'Médias', 'Réseaux sociaux d''entreprise', false),

-- SÉCURITÉ & DÉFENSE
('Français', 'Anglais', 'La cybersécurité est devenue une priorité nationale pour la plupart des gouvernements européens.', 'Cybersecurity has become a national priority for most European governments.', 'Present perfect, Adjectives, For + plural noun', 'C1', 'Sécurité', 'Cybersécurité', false),
('Français', 'Anglais', 'L''intelligence artificielle militaire soulève des questions éthiques complexes sur l''autonomie des armes.', 'Military artificial intelligence raises complex ethical questions about weapon autonomy.', 'Present simple, Adjectives, About + noun', 'C1', 'Sécurité', 'Intelligence artificielle', false),
('Français', 'Anglais', 'La lutte contre le terrorisme international nécessite une coopération étroite entre les services de renseignement.', 'The fight against international terrorism requires close cooperation between intelligence services.', 'Present simple, Against + noun, Between + plural noun', 'C1', 'Sécurité', 'Terrorisme international', false),
('Français', 'Anglais', 'La cyberdéfense nationale protège les infrastructures critiques contre les cyberattaques.', 'National cybersecurity protects critical infrastructure against cyber attacks.', 'Present simple, Against + noun, Compound nouns', 'C1', 'Sécurité', 'Cyberdéfense nationale', false),
('Français', 'Anglais', 'L''intelligence artificielle défensive améliore la détection des menaces cybernétiques.', 'Defensive artificial intelligence improves the detection of cyber threats.', 'Present simple, Of + noun, Compound adjectives', 'C1', 'Sécurité', 'IA défensive', false),

-- URBANISME & VILLES
('Français', 'Anglais', 'Les villes durables intègrent des solutions innovantes pour réduire leur impact environnemental.', 'Sustainable cities integrate innovative solutions to reduce their environmental impact.', 'Present simple, Infinitive of purpose, Possessive adjectives', 'C1', 'Urbanisme', 'Villes durables', false),
('Français', 'Anglais', 'La transition vers la mobilité électrique nécessite des investissements massifs dans les infrastructures.', 'The transition to electric mobility requires massive investments in infrastructure.', 'Present simple, To + noun, In + noun', 'C1', 'Urbanisme', 'Mobilité électrique', false),
('Français', 'Anglais', 'L''architecture durable intègre des matériaux écologiques et des systèmes d''énergie renouvelable.', 'Sustainable architecture integrates ecological materials and renewable energy systems.', 'Present simple, Adjectives, And + noun', 'B2', 'Urbanisme', 'Architecture durable', false),
('Français', 'Anglais', 'Les villes intelligentes utilisent les technologies IoT pour améliorer la qualité de vie urbaine.', 'Smart cities use IoT technologies to improve urban quality of life.', 'Present simple, To + infinitive, Compound nouns', 'C1', 'Urbanisme', 'Villes intelligentes', false),
('Français', 'Anglais', 'La mobilité durable réduit l''empreinte carbone des déplacements urbains modernes.', 'Sustainable mobility reduces the carbon footprint of modern urban travel.', 'Present simple, Of + noun, Compound nouns', 'B2', 'Urbanisme', 'Mobilité durable', false),

-- AGRICULTURE & ALIMENTATION
('Français', 'Anglais', 'L''agriculture durable vise à concilier production alimentaire et préservation de l''environnement.', 'Sustainable agriculture aims to reconcile food production and environmental preservation.', 'Present simple, Infinitive of purpose, And + noun', 'C1', 'Agriculture', 'Agriculture durable', false),
('Français', 'Anglais', 'La demande d''aliments biologiques a considérablement augmenté ces dernières années.', 'The demand for organic food has increased considerably in recent years.', 'Present perfect, For + noun, In + noun', 'B2', 'Agriculture', 'Alimentation bio', false),
('Français', 'Anglais', 'L''agriculture de précision utilise les technologies numériques pour optimiser les rendements agricoles.', 'Precision agriculture uses digital technologies to optimize agricultural yields.', 'Present simple, To + infinitive, Compound nouns', 'C1', 'Agriculture', 'Agriculture de précision', false),
('Français', 'Anglais', 'L''agroalimentaire innovant combine tradition et technologies modernes pour la qualité alimentaire.', 'Innovative agribusiness combines tradition and modern technologies for food quality.', 'Present simple, And + noun, For + noun', 'C1', 'Agriculture', 'Agroalimentaire innovant', false),
('Français', 'Anglais', 'La sécurité alimentaire mondiale nécessite une coopération internationale accrue.', 'Global food security requires increased international cooperation.', 'Present simple, Compound nouns, Past participles as adjectives', 'C1', 'Agriculture', 'Sécurité alimentaire', false),

-- ÉNERGIE & CLIMAT
('Français', 'Anglais', 'La transition énergétique représente un défi majeur pour les économies développées.', 'The energy transition represents a major challenge for developed economies.', 'Present simple, Adjectives, For + plural noun', 'B2', 'Énergie', 'Transition énergétique', false),
('Français', 'Anglais', 'L''énergie éolienne offshore offre un potentiel considérable pour la production d''électricité renouvelable.', 'Offshore wind energy offers considerable potential for renewable electricity production.', 'Present simple, Adjectives, For + noun', 'C1', 'Énergie', 'Éolien offshore', false),
('Français', 'Anglais', 'Le stockage énergétique constitue un défi majeur pour l''intégration des énergies renouvelables.', 'Energy storage represents a major challenge for the integration of renewable energies.', 'Present simple, For + noun, Of + noun', 'C1', 'Énergie', 'Stockage énergétique', false),
('Français', 'Anglais', 'Le stockage énergétique innovant permet d''équilibrer l''offre et la demande d''électricité renouvelable.', 'Innovative energy storage enables the balance of renewable electricity supply and demand.', 'Present simple, Of + noun, And + noun', 'C1', 'Énergie', 'Stockage innovant', false),
('Français', 'Anglais', 'La transition énergétique juste inclut toutes les communautés dans le processus de transformation.', 'The just energy transition includes all communities in the transformation process.', 'Present simple, In + noun, Compound nouns', 'C1', 'Énergie', 'Transition juste', false),

-- SANTÉ PUBLIQUE
('Français', 'Anglais', 'La prévention des maladies chroniques constitue un enjeu majeur pour les systèmes de santé.', 'The prevention of chronic diseases represents a major challenge for health systems.', 'Present simple, Of + noun, For + noun', 'C1', 'Santé publique', 'Prévention', false),
('Français', 'Anglais', 'Les campagnes de vaccination ont permis d''éradiquer de nombreuses maladies infectieuses.', 'Vaccination campaigns have made it possible to eradicate numerous infectious diseases.', 'Present perfect, Infinitive of purpose, Adjectives', 'B2', 'Santé publique', 'Vaccination', false),
('Français', 'Anglais', 'La santé mentale constitue un défi croissant pour les systèmes de santé publique modernes.', 'Mental health represents a growing challenge for modern public health systems.', 'Present simple, Adjectives, For + plural noun', 'B2', 'Santé publique', 'Santé mentale', false),
('Français', 'Anglais', 'La médecine préventive met l''accent sur les habitudes de vie saines et la prévention des maladies.', 'Preventive medicine emphasizes healthy lifestyles and disease prevention.', 'Present simple, And + noun, Compound nouns', 'B2', 'Santé publique', 'Médecine préventive', false),
('Français', 'Anglais', 'Les systèmes de santé modernes font face à des défis démographiques et technologiques importants.', 'Modern health systems face significant demographic and technological challenges.', 'Present simple, And + adjective, Compound nouns', 'C1', 'Santé publique', 'Systèmes de santé', false),

-- ÉDUCATION SUPÉRIEURE
('Français', 'Anglais', 'Les universités numériques offrent de nouvelles opportunités d''accès à l''éducation supérieure.', 'Digital universities offer new opportunities for access to higher education.', 'Present simple, Adjectives, For + noun', 'B2', 'Éducation supérieure', 'Universités numériques', false),
('Français', 'Anglais', 'La mobilité étudiante internationale favorise les échanges culturels et linguistiques.', 'International student mobility promotes cultural and linguistic exchanges.', 'Present simple, Adjectives, And + noun', 'B2', 'Éducation supérieure', 'Mobilité étudiante', false),
('Français', 'Anglais', 'La formation doctorale prépare les chercheurs aux défis de la recherche scientifique moderne.', 'Doctoral training prepares researchers for the challenges of modern scientific research.', 'Present simple, For + noun, Of + noun', 'C1', 'Éducation supérieure', 'Formation doctorale', false),
('Français', 'Anglais', 'L''internationalisation universitaire attire des étudiants et des chercheurs du monde entier.', 'University internationalization attracts students and researchers from around the world.', 'Present simple, And + noun, From + preposition', 'B2', 'Éducation supérieure', 'Internationalisation', false),
('Français', 'Anglais', 'La recherche appliquée universitaire contribue à l''innovation technologique et au développement économique.', 'Applied university research contributes to technological innovation and economic development.', 'Present simple, To + noun, And + noun', 'C1', 'Éducation supérieure', 'Recherche appliquée', false),

-- INNOVATION & STARTUPS
('Français', 'Anglais', 'L''écosystème des startups européennes bénéficie d''investissements croissants des fonds de capital-risque.', 'The European startup ecosystem benefits from increasing venture capital investments.', 'Present simple, From + noun, Compound nouns', 'C1', 'Innovation', 'Écosystème startup', false),
('Français', 'Anglais', 'La recherche appliquée transforme les découvertes scientifiques en solutions pratiques.', 'Applied research transforms scientific discoveries into practical solutions.', 'Present simple, Into + noun, Adjectives', 'C1', 'Innovation', 'Recherche appliquée', false),
('Français', 'Anglais', 'La protection de la propriété intellectuelle encourage l''innovation et les investissements en R&D.', 'Intellectual property protection encourages innovation and R&D investments.', 'Present simple, Adjectives, And + noun', 'C1', 'Innovation', 'Propriété intellectuelle', false),
('Français', 'Anglais', 'L''entrepreneuriat social résout des problèmes sociaux par des solutions innovantes et durables.', 'Social entrepreneurship solves social problems through innovative and sustainable solutions.', 'Present simple, Through + adjective, And + adjective', 'C1', 'Innovation', 'Entrepreneuriat social', false),
('Français', 'Anglais', 'Le transfert technologique universitaire facilite la création d''entreprises innovantes et compétitives.', 'University technology transfer facilitates the creation of innovative and competitive companies.', 'Present simple, Of + adjective, And + adjective', 'C1', 'Innovation', 'Transfert technologique', false),

-- DROIT & JUSTICE
('Français', 'Anglais', 'L''État de droit constitue la base de toute démocratie moderne et stable.', 'The rule of law forms the basis of any modern and stable democracy.', 'Present simple, Of + noun, And + adjective', 'C1', 'Droit & Justice', 'État de droit', false),
('Français', 'Anglais', 'Les tribunaux internationaux jouent un rôle essentiel dans la résolution des conflits armés.', 'International courts play an essential role in resolving armed conflicts.', 'Present simple, In + gerund, Compound nouns', 'C1', 'Droit & Justice', 'Justice internationale', false),
('Français', 'Anglais', 'La protection des droits humains représente un défi permanent dans un monde globalisé.', 'The protection of human rights represents a permanent challenge in a globalized world.', 'Present simple, Of + noun, In + noun', 'C1', 'Droit & Justice', 'Droits humains', false),

-- PHILOSOPHIE & ÉTHIQUE
('Français', 'Anglais', 'L''éthique de l''intelligence artificielle soulève des questions fondamentales sur la responsabilité humaine.', 'Artificial intelligence ethics raises fundamental questions about human responsibility.', 'Present simple, About + noun, Compound nouns', 'C1', 'Philosophie & Éthique', 'IA éthique', false),
('Français', 'Anglais', 'Le développement durable nécessite une réflexion éthique sur nos responsabilités envers les générations futures.', 'Sustainable development requires ethical reflection on our responsibilities towards future generations.', 'Present simple, On + noun, Towards + noun', 'C1', 'Philosophie & Éthique', 'Développement durable', false),

-- SANTÉ MENTALE
('Français', 'Anglais', 'Le bien-être psychologique constitue un facteur essentiel pour la productivité au travail.', 'Psychological well-being represents an essential factor for workplace productivity.', 'Present simple, For + noun, Compound nouns', 'B2', 'Santé mentale', 'Bien-être psychologique', false),
('Français', 'Anglais', 'La prévention du suicide nécessite une approche multidimensionnelle impliquant société et individus.', 'Suicide prevention requires a multidimensional approach involving society and individuals.', 'Present simple, Involving + noun, And + noun', 'C1', 'Santé mentale', 'Prévention suicide', false),

-- ÉDUCATION SPÉCIALE
('Français', 'Anglais', 'L''inclusion scolaire permet aux élèves handicapés de bénéficier d''une éducation adaptée à leurs besoins.', 'School inclusion allows disabled students to benefit from education adapted to their needs.', 'Present simple, To + infinitive, Adapted to + noun', 'B2', 'Éducation spéciale', 'Inclusion scolaire', false),
('Français', 'Anglais', 'L''apprentissage personnalisé prend en compte les rythmes et styles d''apprentissage individuels.', 'Personalized learning takes into account individual learning rhythms and styles.', 'Present simple, Into account + noun, And + noun', 'C1', 'Éducation spéciale', 'Apprentissage personnalisé', false),

-- CYBERSÉCURITÉ
('Français', 'Anglais', 'La protection des données personnelles constitue un droit fondamental dans l''ère numérique.', 'The protection of personal data constitutes a fundamental right in the digital age.', 'Present simple, Of + noun, In + noun', 'C1', 'Cybersécurité', 'Protection données', false),
('Français', 'Anglais', 'Les attaques par ransomware paralysent de plus en plus les infrastructures critiques mondiales.', 'Ransomware attacks increasingly paralyze global critical infrastructures.', 'Present simple, Adverbs, Compound nouns', 'C1', 'Cybersécurité', 'Ransomware', false),

-- GÉNÉRATION Z
('Français', 'Anglais', 'La génération Z privilégie la consommation responsable et l''impact environnemental des produits.', 'Generation Z prioritizes responsible consumption and the environmental impact of products.', 'Present simple, And + noun, Of + noun', 'B2', 'Génération Z', 'Consommation responsable', false),
('Français', 'Anglais', 'Les jeunes générations revendiquent un meilleur équilibre entre vie professionnelle et vie privée.', 'Younger generations demand better balance between professional life and private life.', 'Present simple, Between + noun, And + noun', 'B2', 'Génération Z', 'Équilibre vie-travail', false),

-- BIOTECHNOLOGIES
('Français', 'Anglais', 'L''édition génomique ouvre de nouvelles perspectives thérapeutiques pour les maladies génétiques.', 'Genome editing opens new therapeutic perspectives for genetic diseases.', 'Present simple, For + noun, Compound adjectives', 'C1', 'Biotechnologies', 'Édition génomique', false),
('Français', 'Anglais', 'L''agriculture biologique préserve la biodiversité et améliore la qualité des sols.', 'Organic farming preserves biodiversity and improves soil quality.', 'Present simple, And + verb, Compound nouns', 'B2', 'Biotechnologies', 'Agriculture biologique', false),

-- ESPACE & ASTRONAUTIQUE
('Français', 'Anglais', 'L''exploration spatiale internationale favorise la coopération scientifique entre les nations.', 'International space exploration promotes scientific cooperation between nations.', 'Present simple, Between + plural noun, Compound nouns', 'B2', 'Espace', 'Exploration spatiale', false),
('Français', 'Anglais', 'Les satellites permettent de surveiller l''évolution du climat et des ressources naturelles.', 'Satellites make it possible to monitor climate change and natural resources.', 'Present simple, To + infinitive, And + noun', 'B2', 'Espace', 'Satellites', false);

-- 4. METTRE À JOUR LES LEÇONS DE GRAMMAIRE
DELETE FROM grammar_lessons;

INSERT INTO grammar_lessons (titre, contenu, niveau) VALUES
('Present Simple - Usage et Formation', 'Le Present Simple exprime des vérités générales, des habitudes et des faits permanents. Formation: Sujet + Verbe (base). À la 3ème personne, ajouter -s/-es. Exemples: "Climate change represents a threat" / "The EU seeks to strengthen its autonomy".', 'B1'),
('Present Continuous - Actions en cours', 'Le Present Continuous exprime des actions en cours ou des tendances. Formation: Sujet + am/is/are + Verbe-ing. Exemples: "Tensions are intensifying" / "AI is transforming business models".', 'B1'),
('Present Perfect - Lien passé-présent', 'Le Present Perfect relie une action passée au présent. Formation: Sujet + have/has + Past Participle. Exemples: "E-commerce has transformed habits" / "Remote work has become standard".', 'B2'),
('Modal Verbs - Obligation et Possibilité', 'Les modaux expriment obligation, possibilité, conseil. Must/Should/Can/Could + infinitif sans "to". Exemple: "Cultural heritage must be preserved".', 'B2'),
('Passive Voice - Voix passive', 'La voix passive met l''accent sur l''action plutôt que l''acteur. Formation: Sujet + be + Past Participle. Exemple: "Heritage must be preserved" / "Questions are raised".', 'B2'),
('Complex Noun Phrases - Groupes nominaux', 'Les groupes nominaux complexes combinent plusieurs éléments. Structure: Déterminant + Adjectifs + Nom + Prépositions. Exemples: "European integration policies" / "global financial regulators".', 'C1'),
('Gerunds vs Infinitives', 'Certains verbes sont suivis de gérondifs (-ing), d''autres d''infinitifs (to + verbe). Exemples: "aims to ensure" / "in resolving conflicts".', 'B2'),
('Prepositions - Usage avancé', 'Les prépositions sont cruciales pour la précision. Despite + noun, Between + noun, For + noun (purpose), In + noun (location/time). Exemples: "despite protectionist tensions" / "between nations".', 'B2'),
('Relative Clauses - Propositions relatives', 'Les relatives ajoutent des informations. Who/Which/That/Where/When. Exemple: "a world where skills evolve rapidly".', 'B2'),
('Compound Nouns - Noms composés', 'L''anglais forme facilement des noms composés. Nom + Nom ou Adjectif + Nom. Exemples: "climate change" / "health systems" / "energy transition".', 'B2');

-- 5. CONFIRMER LES RÉSULTATS
SELECT 'Sentences insérées:' as info, COUNT(*) as total FROM sentences;
SELECT 'Leçons insérées:' as info, COUNT(*) as total FROM grammar_lessons;
