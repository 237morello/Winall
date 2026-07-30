import {
  Blocks,
  BrainCircuit,
  Building2,
  Cpu,
  Flame,
  HardHat,
  Home,
  IdCard,
  Network,
  Palette,
  Sun,
  Volume2,
  Wrench,
  Zap,
} from "lucide-react";
import type {
  MarketingContact,
  MarketingProjectWithService,
  MarketingService,
  ServiceSlug,
} from "./marketing.types";

export const MARKETING_CONTACT: MarketingContact = {
  phone: "+237 694372769",
  phoneHref: "tel:+237694372769",
  whatsapp: "+237 694372769",
  whatsappHref: "https://wa.me/237694372769",
  email: "info-winall@gmail.com",
  emailHref: "mailto:info-winall@gmail.com",
  address: "MTN Doubaï, face PFI, Douala, Cameroun",
};

export const MARKETING_SERVICES: MarketingService[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. ÉLECTRONIQUE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "electronique",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "interventions documentées" },
    ],
    tools: [
      "Multimètre & oscilloscope",
      "Station de soudure",
      "Analyseur de réseau électrique",
      "Caméra thermique",
      "Outillage de précision",
      "Banc de test & mesure",
    ],
    title: "Électronique",
    shortTitle: "Électronique",
    tagline: "Intégration, diagnostic et maintenance d'équipements électroniques.",
    description:
      "Nous accompagnons les sites professionnels dans le choix, l'installation et la maintenance de solutions électroniques fiables, adaptées au terrain et faciles à exploiter.",
    image: "/images/1.JPG",
    icon: Cpu,
    highlights: [
      "Diagnostic terrain",
      "Choix d'équipements adaptés",
      "Installation propre",
      "Suivi après intervention",
    ],
    deliverables: [
      "Audit des besoins",
      "Plan d'installation",
      "Mise en service",
      "Rapport d'intervention",
    ],
    projects: [
      {
        title: "Diagnostic électronique de site",
        location: "Douala, Cameroun",
        description:
          "Contrôle d'équipements, vérification des raccordements et remise en service opérationnelle.",
        image: "/images/1.JPG",
      },
      {
        title: "Intégration d'équipements techniques",
        location: "Site professionnel",
        description:
          "Installation d'équipements électroniques pour améliorer la continuité d'exploitation.",
        image: "/images/image-choix.png",
      },
    ],

    // SEO
    metaTitle: "Électronique industrielle & professionnelle | Winall Tech Sarl",
    metaDescription:
      "Diagnostic, installation et maintenance d'équipements électroniques à Douala. Winall Tech Sarl garantit des installations fiables, conformes et opérationnelles.",
    keywords: [
      "électronique industrielle Douala",
      "diagnostic équipement électronique Cameroun",
      "installation électronique professionnelle",
      "maintenance équipements électroniques",
    ],
    ogTitle: "Transformez vos équipements électroniques en atouts fiables",
    ogDescription:
      "Fini les pannes à répétition. Nos experts diagnostiquent, installent et maintiennent vos équipements électroniques pour une continuité d'activité totale.",

    // Hero
    heroTitle: "Sécurisez votre continuité d'activité avec des équipements électroniques fiables et durablement maintenus",
    heroSubtitle:
      "Éliminez les pannes imprévues et les pertes de production grâce à un diagnostic expert, une installation irréprochable et un suivi terrain structuré.",

    // Section 1 — Problème
    problemIntro:
      "Vos équipements électroniques tombent en panne au mauvais moment. Votre activité s'arrête, vos délais s'allongent et les coûts s'envolent. Ce n'est pas une fatalité.",
    problems: [
      {
        label: "Pannes récurrentes et imprévisibles",
        description:
          "Des équipements mal installés ou jamais entretenus qui lâchent au moment le plus critique.",
      },
      {
        label: "Diagnostic inexact et réparations à l'aveugle",
        description:
          "Des techniciens qui interviennent sans méthode, allongeant les délais et multipliant les coûts.",
      },
      {
        label: "Pertes financières directes",
        description:
          "Chaque heure d'arrêt non planifié représente une perte d'exploitation directement mesurable.",
      },
      {
        label: "Manque de traçabilité",
        description:
          "Aucun historique d'intervention structuré, rendant impossible toute anticipation future.",
      },
    ],

    // Section 2 — Solution
    solutionTitle: "Un accompagnement électronique de bout en bout, du diagnostic à la maintenance",
    solutionDescription:
      "Notre service électronique couvre l'intégralité du cycle de vie de vos équipements : audit initial, choix des solutions, installation conforme et suivi préventif structuré.",
    solutionHow:
      "Nous intervenons sur site avec une approche méthodique en 4 phases : diagnostic précis, plan d'action validé avec vous, installation technique propre, puis mise en place d'un plan de suivi.",
    solutionWhy:
      "Parce qu'un équipement bien installé et maintenu dure 2 à 3 fois plus longtemps, coûte moins cher à faire tourner et ne vous surprend jamais.",

    // Section 3 — Transformation
    transformations: [
      { before: "Pannes imprévisibles qui stoppent la production", after: "Équipements surveillés et interventions anticipées" },
      { before: "Diagnostic approximatif et coûteux", after: "Audit structuré avec rapport d'intervention précis" },
      { before: "Installations hasardeuses et non documentées", after: "Câblage propre, conforme et facilement maintenable" },
      { before: "Aucune traçabilité des interventions passées", after: "Historique complet et exploitable de chaque opération" },
      { before: "Dépendance à un seul technicien improvisé", after: "Équipe structurée avec protocoles standardisés" },
      { before: "Remplacement prématuré d'équipements encore utiles", after: "Durée de vie maximisée grâce à la maintenance préventive" },
    ],

    // Section 4 — Sous-services
    solutions: [
      {
        name: "Diagnostic & Audit électronique",
        description: "Analyse complète de l'état de vos équipements sur site avec identification précise des dysfonctionnements.",
        benefits: "Vous savez exactement quoi réparer, changer ou optimiser — sans dépense inutile.",
        expectedResult: "Rapport d'audit avec plan de remise en état et estimation budgétaire.",
        items: ["Inspection sur site", "Test des équipements", "Identification des pannes", "Estimation budgétaire", "Rapport d'audit détaillé"],
      },
      {
        name: "Installation & Intégration",
        description: "Installation professionnelle d'équipements électroniques neufs ou de remplacement sur vos sites.",
        benefits: "Une mise en service rapide, propre et conforme aux normes techniques.",
        expectedResult: "Équipements opérationnels dès la première mise sous tension.",
        items: ["Pose d'équipements neufs", "Remplacement de matériel", "Câblage et raccordement", "Mise en service", "Test de conformité"],
      },
      {
        name: "Maintenance préventive",
        description: "Programme de visites et de contrôles planifiés pour maintenir vos installations au niveau optimal.",
        benefits: "Réduction de 70% des pannes non planifiées sur 12 mois.",
        expectedResult: "Plan de maintenance annuel avec fiches de contrôle et alertes anticipées.",
        items: ["Visites planifiées", "Contrôles périodiques", "Fiches de suivi", "Alertes anticipées", "Plan de maintenance annuel"],
      },
    ],

    // Section 5 — Fonctionnalités
    features: [
      {
        name: "Diagnostic terrain structuré",
        advantage: "Identification précise de chaque anomalie avec les outils adaptés",
        clientBenefit: "Vous ne payez que pour les réparations réellement nécessaires.",
      },
      {
        name: "Rapport d'intervention documenté",
        advantage: "Chaque opération est consignée avec photos, mesures et recommandations",
        clientBenefit: "Vous gardez un historique exploitable pour toute future intervention.",
      },
      {
        name: "Suivi après installation",
        advantage: "Vérification des performances après mise en service et ajustements si nécessaire",
        clientBenefit: "Zéro surprise dans les jours qui suivent l'intervention.",
      },
    ],

    // Section 6 — Bénéfices business
    businessBenefits: [
      { category: "Productivité", description: "Moins de temps d'arrêt = plus de temps productif pour vos équipes." },
      { category: "Réduction des coûts", description: "Maintenance préventive moins coûteuse que la maintenance corrective d'urgence." },
      { category: "Sécurité", description: "Installations conformes qui protègent vos équipes et vos locaux." },
      { category: "Durabilité", description: "Durée de vie des équipements significativement prolongée." },
      { category: "Sérénité", description: "Un interlocuteur unique et disponible pour tout incident technique." },
      { category: "Rentabilité", description: "Retour sur investissement constaté dès la première année de maintenance préventive." },
    ],

    // Section 7 — Cas d'utilisation
    useCases: [
      {
        target: "Industries & usines",
        description: "Maintien en conditions opérationnelles des lignes de production. Chaque minute d'arrêt évitée représente un gain direct.",
      },
      {
        target: "Entreprises commerciales",
        description: "Fiabilité des systèmes de caisse, de sécurité et de communication pour ne jamais interrompre le service client.",
      },
      {
        target: "Administrations & bureaux",
        description: "Conformité et disponibilité des équipements électroniques critiques pour la continuité du service public.",
      },
      {
        target: "Hôtels & restaurants",
        description: "Maintien opérationnel des systèmes de gestion, d'éclairage et de confort pour garantir l'expérience client.",
      },
      {
        target: "PME en croissance",
        description: "Accompagnement de l'évolution technique du parc équipement au rythme de votre expansion.",
      },
    ],

    // Section 8 — Processus
    processSteps: [
      {
        step: 1,
        title: "Prise de contact & analyse des besoins",
        objective: "Comprendre vos installations actuelles et vos contraintes spécifiques.",
        actions: ["Entretien téléphonique ou visio avec notre technicien", "Identification du périmètre d'intervention"],
        deliverable: "Confirmation de l'intervention et date de visite terrain.",
      },
      {
        step: 2,
        title: "Visite & audit terrain",
        objective: "Évaluer précisément l'état réel de vos équipements.",
        actions: ["Inspection visuelle et mesures électroniques", "Identification des anomalies et risques"],
        deliverable: "Rapport de diagnostic avec priorités d'intervention.",
      },
      {
        step: 3,
        title: "Proposition technique & validation",
        objective: "Vous présenter une solution claire avec un devis détaillé.",
        actions: ["Rédaction du plan d'intervention", "Validation du budget avec le client"],
        deliverable: "Devis technique signé.",
      },
      {
        step: 4,
        title: "Intervention & installation",
        objective: "Réaliser les travaux dans les règles de l'art.",
        actions: ["Installation ou réparation sur site", "Tests de fonctionnement complets"],
        deliverable: "Équipements opérationnels et vérifiés.",
      },
      {
        step: 5,
        title: "Rapport de fin d'intervention",
        objective: "Vous transmettre une documentation complète de ce qui a été fait.",
        actions: ["Rédaction du rapport avec photos", "Remise des recommandations pour le suivi"],
        deliverable: "Rapport d'intervention documenté.",
      },
      {
        step: 6,
        title: "Suivi & maintenance planifiée",
        objective: "Garantir la durabilité de votre installation dans le temps.",
        actions: ["Planification des visites préventives", "Réponse rapide en cas d'incident"],
        deliverable: "Plan de maintenance annuel personnalisé.",
      },
    ],

    // Section 9 — FAQ
    faqs: [
      {
        question: "Combien de temps prend un diagnostic électronique ?",
        answer: "Une visite de diagnostic standard dure entre 2 et 4 heures selon la taille du site et le nombre d'équipements à inspecter. Vous recevez le rapport sous 48h.",
      },
      {
        question: "Intervenez-vous sur tous types d'équipements électroniques ?",
        answer: "Oui, nous couvrons une très large gamme d'équipements professionnels : automates, onduleurs, tableaux électroniques, systèmes embarqués et équipements de mesure.",
      },
      {
        question: "Proposez-vous des contrats de maintenance annuelle ?",
        answer: "Absolument. Nos contrats de maintenance préventive sont personnalisés selon la criticité de vos équipements et la fréquence de visites souhaitée.",
      },
      {
        question: "Que se passe-t-il en cas de panne d'urgence ?",
        answer: "Nos clients sous contrat bénéficient d'un délai d'intervention prioritaire. Nous sommes joignables pour les urgences techniques 6j/7.",
      },
      {
        question: "Travaillez-vous uniquement à Douala ?",
        answer: "Nous intervenons principalement sur Douala et le Littoral, mais des missions ponctuelles dans d'autres régions du Cameroun sont possibles selon le projet.",
      },
      {
        question: "Les réparations sont-elles garanties ?",
        answer: "Oui, toutes nos interventions de réparation sont accompagnées d'une garantie sur la pièce et la main d'œuvre. La durée varie selon le type de prestation.",
      },
    ],

    // Section 10 — CTA final
    ctaTitle: "Prêt à sécuriser vos équipements électroniques ?",
    ctaSubtitle:
      "Décrivez-nous votre installation et votre défi. Nous revenons vers vous avec un plan d'action concret et un devis transparent.",
    ctaReassurance: "Réponse garantie sous 24h — Devis gratuit et sans engagement.",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. GÉNIE CIVIL
  // ─────────────────────────────────────────────────────────────
  {
    slug: "genie-civil",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "chantiers documentés" },
    ],
    tools: [
      "AutoCAD & DAO",
      "Niveau laser & théodolite",
      "Logiciel de métré",
      "Plans d'exécution",
      "Suivi de planning",
      "Contrôle qualité terrain",
    ],
    title: "Génie civil",
    shortTitle: "Génie civil",
    tagline: "Études, suivi et coordination technique des ouvrages.",
    description:
      "Winall Tech Sarl structure les interventions de génie civil avec une lecture terrain claire, des lots suivis et une exécution documentée.",
    image: "/images/2.JPG",
    icon: Building2,
    highlights: [
      "Visite technique",
      "Coordination des lots",
      "Suivi de conformité",
      "Compte rendu de chantier",
    ],
    deliverables: [
      "Relevé terrain",
      "Planning d'intervention",
      "Suivi d'exécution",
      "Dossier de fin de mission",
    ],
    projects: [
      {
        title: "Suivi technique bâtiment",
        location: "Douala, Cameroun",
        description:
          "Accompagnement terrain pour cadrer les interventions et sécuriser les étapes clés du chantier.",
        image: "/images/2.JPG",
      },
      {
        title: "Préparation de site",
        location: "Littoral, Cameroun",
        description:
          "Évaluation des contraintes, organisation des accès et planification des interventions.",
        image: "/images/here about.jpeg",
      },
    ],

    // SEO
    metaTitle: "Génie civil & suivi de chantier à Douala | Winall Tech Sarl",
    metaDescription:
      "Coordination, suivi technique et documentation de vos chantiers de génie civil. Winall Tech garantit l'exécution conforme et la livraison dans les délais à Douala.",
    keywords: [
      "génie civil Douala Cameroun",
      "suivi chantier technique",
      "coordination travaux génie civil",
      "maîtrise d'œuvre Cameroun",
    ],
    ogTitle: "Vos chantiers de génie civil enfin livrés dans les règles et dans les délais",
    ogDescription:
      "Fini les chantiers qui dérapent. Notre équipe cadre, coordonne et documente chaque phase pour que votre ouvrage soit livré conforme à vos attentes.",

    // Hero
    heroTitle: "Livrez vos ouvrages dans les délais, dans les règles et sans mauvaises surprises",
    heroSubtitle:
      "Coordination rigoureuse, suivi terrain documenté et comptes rendus clairs à chaque étape de votre chantier de génie civil.",

    // Section 1
    problemIntro:
      "Les chantiers de génie civil mal coordonnés coûtent cher : retards, malfaçons, litiges entre corps de métier. Votre projet mérite mieux.",
    problems: [
      {
        label: "Dépassements de délais chroniques",
        description:
          "Des intervenants non coordonnés qui se marchent dessus, bloquant l'avancement réel des travaux.",
      },
      {
        label: "Manque de visibilité sur l'avancement",
        description:
          "Aucun reporting structuré ne vous permet de savoir où en est réellement votre chantier.",
      },
      {
        label: "Malfaçons découvertes trop tard",
        description:
          "Sans contrôle de conformité régulier, les erreurs s'accumulent et deviennent coûteuses à corriger.",
      },
      {
        label: "Conflits entre corps de métier",
        description:
          "L'absence d'un coordinateur neutre génère des tensions et des pertes de temps considérables.",
      },
    ],

    // Section 2
    solutionTitle: "Un pilotage de chantier rigoureux du relevé initial à la réception finale",
    solutionDescription:
      "Nous prenons en charge la coordination technique complète de votre projet : visite terrain, organisation des lots, suivi d'exécution et documentation de fin de mission.",
    solutionHow:
      "Notre ingénieur de terrain réalise des visites régulières, anime les réunions de chantier, contrôle la conformité des réalisations et vous remet des comptes rendus exploitables.",
    solutionWhy:
      "Parce qu'un ouvrage bien coordonné se livre plus vite, avec moins d'imprévus et sans contentieux. C'est un investissement qui se rembourse sur le délai et la qualité finale.",

    // Section 3
    transformations: [
      { before: "Chantier sans coordination ni pilotage centralisé", after: "Coordination structurée avec un référent unique" },
      { before: "Délais constamment repoussés", after: "Planning tenu grâce à des points de contrôle hebdomadaires" },
      { before: "Malfaçons découvertes à la réception", after: "Contrôle de conformité à chaque phase des travaux" },
      { before: "Aucune documentation de l'avancement", after: "Comptes rendus structurés après chaque visite terrain" },
      { before: "Conflits non résolus entre corps de métier", after: "Arbitrage neutre et efficace par notre coordonnateur" },
      { before: "Réception chaotique et litiges post-livraison", after: "Dossier de fin de mission complet et opposable" },
    ],

    // Section 4
    solutions: [
      {
        name: "Suivi & coordination de chantier",
        description: "Pilotage terrain de toutes les entreprises intervenant sur votre ouvrage.",
        benefits: "Un seul interlocuteur pour tous les corps de métier.",
        expectedResult: "Chantier livré dans les délais avec 0 malfaçon non détectée.",
        items: ["Pilotage des entreprises", "Réunions de chantier", "Planning d'exécution", "Comptes rendus réguliers", "Interlocuteur unique"],
      },
      {
        name: "Contrôle de conformité technique",
        description: "Vérification systématique que les réalisations correspondent aux plans et aux normes.",
        benefits: "Détection précoce des erreurs avant qu'elles coûtent cher.",
        expectedResult: "Chaque phase validée avant de passer à la suivante.",
        items: ["Vérification des plans", "Contrôle des normes", "Validation par phase", "Levée des réserves", "PV de conformité"],
      },
      {
        name: "Documentation & dossier de fin de mission",
        description: "Constitution du dossier complet de votre ouvrage (plans, rapports, photos, PV de réception).",
        benefits: "Un dossier exploitable pour la maintenance, la revente ou les garanties.",
        expectedResult: "Dossier de fin de mission structuré et archivé.",
        items: ["Plans d'exécution", "Rapports de visite", "Photos de chantier", "PV de réception", "Dossier archivé"],
      },
    ],

    // Section 5
    features: [
      {
        name: "Visites terrain structurées",
        advantage: "Contrôle régulier de l'avancement réel par un ingénieur qualifié",
        clientBenefit: "Vous avez une visibilité réelle sur votre chantier sans vous y déplacer.",
      },
      {
        name: "Comptes rendus photographiés",
        advantage: "Documentation visuelle de chaque étape avec annotations techniques",
        clientBenefit: "Preuves irréfutables en cas de litige ou de garantie.",
      },
      {
        name: "Planning de chantier actualisé",
        advantage: "Mise à jour régulière du planning en fonction des aléas terrain",
        clientBenefit: "Vous anticipez les risques de retard avant qu'ils ne se concrétisent.",
      },
    ],

    // Section 6
    businessBenefits: [
      { category: "Maîtrise des coûts", description: "Suppression des travaux de reprise grâce à la détection précoce des défauts." },
      { category: "Respect des délais", description: "Coordination active qui maintient le rythme d'avancement prévu." },
      { category: "Qualité garantie", description: "Chaque réalisation est contrôlée avant d'être acceptée." },
      { category: "Sécurité juridique", description: "Documentation complète qui vous protège en cas de contentieux." },
      { category: "Sérénité", description: "Un expert de confiance gère les tensions entre intervenants à votre place." },
      { category: "Valeur patrimoniale", description: "Un ouvrage bien documenté a une valeur supérieure à la revente ou pour la gestion future." },
    ],

    // Section 7
    useCases: [
      { target: "Promoteurs immobiliers", description: "Suivi multi-sites avec reporting consolidé pour piloter plusieurs chantiers simultanément." },
      { target: "Entreprises & industriels", description: "Coordination de l'extension ou de la rénovation de vos locaux sans perturber l'activité courante." },
      { target: "Administrations publiques", description: "Garant de la conformité des ouvrages publics aux normes réglementaires en vigueur." },
      { target: "Particuliers & résidences", description: "Accompagnement de la construction ou rénovation de votre résidence avec un regard expert." },
      { target: "ONG & projets internationaux", description: "Supervision technique d'ouvrages financés par des bailleurs internationaux exigeant une documentation rigoureuse." },
    ],

    // Section 8
    processSteps: [
      { step: 1, title: "Analyse du projet & visite initiale", objective: "Comprendre le contexte, les plans et les enjeux spécifiques.", actions: ["Lecture des plans et documents existants", "Visite du site"], deliverable: "Note de cadrage de la mission." },
      { step: 2, title: "Relevé terrain détaillé", objective: "Établir un état des lieux précis du site avant toute intervention.", actions: ["Mesures et observations terrain", "Identification des contraintes"], deliverable: "Rapport de relevé avec photos." },
      { step: 3, title: "Planning & organisation des lots", objective: "Séquencer les interventions de façon logique et efficiente.", actions: ["Coordination avec les entreprises", "Établissement du planning détaillé"], deliverable: "Planning de chantier validé." },
      { step: 4, title: "Suivi d'exécution", objective: "Contrôler l'avancement et la qualité à chaque phase.", actions: ["Visites régulières sur site", "Réunions de chantier hebdomadaires"], deliverable: "Comptes rendus de visite hebdomadaires." },
      { step: 5, title: "Contrôle de conformité", objective: "Valider que chaque réalisation respecte les plans et les normes.", actions: ["Vérification technique des ouvrages", "Levée des réserves"], deliverable: "PV de contrôle de conformité par phase." },
      { step: 6, title: "Réception & dossier final", objective: "Clôturer la mission avec une documentation complète.", actions: ["Réception contradictoire avec les entreprises", "Constitution du dossier de fin de mission"], deliverable: "Dossier de fin de mission complet." },
    ],

    // FAQ
    faqs: [
      { question: "Quelle est la différence entre un maître d'œuvre et un coordinateur de chantier ?", answer: "Le maître d'œuvre conçoit et dirige le projet. Le coordinateur technique intervient principalement sur la phase d'exécution pour s'assurer que la réalisation est conforme aux plans. Nous pouvons jouer l'un ou l'autre rôle selon vos besoins." },
      { question: "À quelle fréquence intervenez-vous sur le chantier ?", answer: "La fréquence est adaptée à la phase du chantier : hebdomadaire en phase active, bi-mensuelle lors des phases plus longues. Nous prévoyons aussi des visites inopinées pour les phases critiques." },
      { question: "Travaillez-vous avec les entreprises que j'ai déjà choisies ?", answer: "Oui. Notre rôle est de coordonner les intervenants que vous avez sélectionnés, pas de vous les imposer. Nous apportons la méthode, vous choisissez les exécutants." },
      { question: "Comment gérez-vous les imprévus et aléas techniques ?", answer: "Nous identifions les risques en amont lors du relevé initial. En cas d'aléa, nous évaluons rapidement les options et vous soumettons une solution avant tout dérapage du planning." },
      { question: "Réalisez-vous également les études techniques ?", answer: "Nous pouvons prendre en charge la phase études pour des projets de rénovation ou d'extension. Contactez-nous pour évaluer les besoins spécifiques de votre projet." },
    ],

    ctaTitle: "Votre prochain chantier mérite un pilotage rigoureux.",
    ctaSubtitle: "Partagez-nous votre projet et vos contraintes. Nous cadrons la mission et vous proposons un suivi adapté.",
    ctaReassurance: "Premier échange gratuit — Devis détaillé sous 48h.",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. BTP
  // ─────────────────────────────────────────────────────────────
  {
    slug: "btp",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "présence chantier" },
      { value: "100%", label: "lots suivis & documentés" },
    ],
    tools: [
      "Plans & DAO",
      "Matériel de topographie",
      "Engins de chantier",
      "Contrôle qualité matériaux",
      "Planning d'exécution",
      "EPI & sécurité chantier",
    ],
    title: "BTP",
    shortTitle: "BTP",
    tagline: "Chantiers techniques, aménagements et lots spécialisés.",
    description:
      "Nous intervenons sur les projets BTP qui nécessitent une coordination rigoureuse entre installation, sécurité, réseaux et exploitation.",
    image: "/images/3.JPG",
    icon: HardHat,
    highlights: [
      "Organisation chantier",
      "Travaux multi-lots",
      "Respect des contraintes site",
      "Livraison documentée",
    ],
    deliverables: [
      "Cadrage du besoin",
      "Organisation des équipes",
      "Exécution contrôlée",
      "Réception des travaux",
    ],
    projects: [
      {
        title: "Aménagement technique multi-lots",
        location: "Douala, Cameroun",
        description:
          "Coordination d'aménagements techniques pour préparer un site à son exploitation quotidienne.",
        image: "/images/3.JPG",
      },
      {
        title: "Préparation d'espace professionnel",
        location: "Cameroun",
        description:
          "Travaux d'adaptation pour intégrer les équipements techniques et les circulations utiles.",
        image: "/images/main-choix-imgMain (1).png",
      },
    ],

    metaTitle: "Travaux BTP & aménagements techniques | Winall Tech Sarl Douala",
    metaDescription:
      "Chantiers BTP coordonnés avec expertise à Douala. Aménagements multi-lots, respect des délais et livraison documentée pour entreprises et promoteurs.",
    keywords: ["BTP Douala", "travaux aménagement Cameroun", "chantier multi-lots", "travaux techniques bâtiment"],
    ogTitle: "Des chantiers BTP livrés à temps, bien coordonnés et sans mauvaises surprises",
    ogDescription: "Coordination multi-lots, équipes terrain organisées et suivi rigoureux pour que vos aménagements BTP soient livrés conformément à vos attentes.",

    heroTitle: "Faites avancer vos chantiers BTP avec une équipe qui coordonne, exécute et livre sans dérapage",
    heroSubtitle: "Coordination multi-lots, organisation terrain et livraison documentée pour tous vos projets d'aménagement technique.",

    problemIntro: "Les chantiers BTP sans coordination rigoureuse accumulant les retards, les malfaçons et les surcoûts. Il est temps de changer d'approche.",
    problems: [
      { label: "Lots non coordonnés qui se bloquent mutuellement", description: "Les électriciens attendent les maçons, les plombiers attendent les électriciens. Résultat : tout le monde perd du temps." },
      { label: "Surcoûts liés aux malfaçons et reprises", description: "Des erreurs non détectées à temps qui nécessitent de défaire et refaire, avec un coût double." },
      { label: "Approvisionnements mal planifiés", description: "Le matériel arrive trop tôt ou trop tard, bloquant l'avancement ou générant des coûts de stockage." },
      { label: "Livraison sans documentation exploitable", description: "Une fois les équipes parties, vous vous retrouvez sans plans d'exécution ni garanties formalisées." },
    ],

    solutionTitle: "Une coordination BTP complète pour que votre chantier avance sans friction",
    solutionDescription: "Nous prenons en charge l'organisation opérationnelle de votre chantier : séquençage des lots, gestion des approvisionnements, contrôle qualité et livraison documentée.",
    solutionHow: "Notre chef de projet terrain planifie l'intervention de chaque lot, coordonne les approvisionnements, anime les réunions de chantier et contrôle la qualité à chaque étape.",
    solutionWhy: "Un chantier bien organisé coûte moins cher, se termine plus vite et vous délivre un ouvrage dont vous êtes fier. La coordination n'est pas un coût, c'est un investissement.",

    transformations: [
      { before: "Lots qui se bloquent mutuellement", after: "Séquençage optimal et coordination fluide entre intervenants" },
      { before: "Approvisionnements en retard ou en excès", after: "Planning d'approvisionnement synchronisé avec l'avancement" },
      { before: "Malfaçons détectées à la réception", after: "Contrôle qualité à chaque phase pour zéro mauvaise surprise" },
      { before: "Dépassement du budget initial", after: "Maîtrise budgétaire grâce à la prévision et au suivi actif" },
      { before: "Réception sans documentation exploitable", after: "Dossier de livraison complet avec plans et garanties" },
      { before: "Communication chaotique entre intervenants", after: "Point hebdomadaire structuré avec tous les corps de métier" },
    ],

    solutions: [
      { name: "Coordination multi-lots", description: "Organisation et séquençage de tous les corps de métier intervenant sur votre chantier.", benefits: "Élimination des attentes et des blocages entre équipes.", expectedResult: "Planning d'exécution respecté à plus de 90%.", items: ["Séquençage des corps de métier", "Planning général", "Gestion des interfaces", "Suivi quotidien", "Réunions hebdomadaires"] },
      { name: "Contrôle qualité terrain", description: "Vérification systématique de la conformité des réalisations avant validation de chaque phase.", benefits: "Zéro malfaçon non détectée à la livraison.", expectedResult: "PV de réception sans réserve majeure.", items: ["Inspection par phase", "Conformité aux plans", "Levée des réserves", "Validation avant paiement", "PV de réception"] },
      { name: "Livraison documentée", description: "Constitution du dossier complet de fin de chantier avec tous les plans d'exécution.", benefits: "Un dossier exploitable pour la maintenance et les garanties.", expectedResult: "Dossier de livraison structuré et remis sous 5 jours ouvrés.", items: ["Plans d'exécution", "Dossier de fin de chantier", "PV de réception", "Garanties de l'ouvrage", "Remise sous 5 jours"] },
    ],

    features: [
      { name: "Chef de projet terrain dédié", advantage: "Un interlocuteur unique présent sur site pour gérer toutes les situations", clientBenefit: "Vous n'avez qu'un seul contact pour suivre l'intégralité de votre chantier." },
      { name: "Réunions de chantier hebdomadaires", advantage: "Coordination active de tous les corps de métier chaque semaine", clientBenefit: "Les problèmes sont résolus avant qu'ils ne bloquent le chantier." },
      { name: "Rapports photographiés", advantage: "Documentation visuelle systématique de l'avancement", clientBenefit: "Vous voyez ce qui est réellement fait, même à distance." },
    ],

    businessBenefits: [
      { category: "Maîtrise des délais", description: "Chantiers livrés dans les temps grâce à une coordination active des intervenants." },
      { category: "Contrôle budgétaire", description: "Suppression des coûts de reprise grâce à la détection précoce des défauts." },
      { category: "Qualité de réalisation", description: "Chaque lot est contrôlé avant validation, garantissant un ouvrage conforme." },
      { category: "Sécurité du chantier", description: "Respect des protocoles de sécurité sur l'ensemble des phases de travaux." },
      { category: "Sérénité du maître d'ouvrage", description: "Vous gérez votre activité courante pendant que nous gérons votre chantier." },
      { category: "Valeur de livraison", description: "Un ouvrage documenté et garanti valorise votre patrimoine immobilier ou commercial." },
    ],

    useCases: [
      { target: "Entreprises en expansion", description: "Aménagement de nouveaux locaux ou agrandissement sans perturber l'activité en cours." },
      { target: "Commerces & restauration", description: "Rénovation et aménagement dans des délais serrés pour minimiser la fermeture au public." },
      { target: "Hôtels & structures d'hébergement", description: "Travaux en site occupé avec coordination stricte pour ne pas gêner les clients résidents." },
      { target: "Industries & entrepôts logistiques", description: "Extension ou adaptation des espaces de production et de stockage avec continuité d'exploitation." },
      { target: "Promoteurs immobiliers", description: "Suivi multi-chantiers avec reporting centralisé pour optimiser la gestion de votre portefeuille." },
    ],

    processSteps: [
      { step: 1, title: "Cadrage du besoin", objective: "Identifier précisément le périmètre des travaux et vos contraintes.", actions: ["Rencontre avec le maître d'ouvrage", "Visite du site"], deliverable: "Note de cadrage validée." },
      { step: 2, title: "Organisation des lots et planning", objective: "Séquencer les interventions de façon optimale.", actions: ["Identification des corps de métier", "Élaboration du planning général"], deliverable: "Planning de chantier détaillé." },
      { step: 3, title: "Exécution coordonnée", objective: "Gérer l'avancement quotidien des travaux.", actions: ["Présence terrain régulière", "Coordination des équipes en temps réel"], deliverable: "Comptes rendus hebdomadaires." },
      { step: 4, title: "Contrôle qualité par phase", objective: "Valider chaque réalisation avant de passer à la phase suivante.", actions: ["Inspection de conformité", "Levée des réserves avec les entreprises"], deliverable: "PV de validation par phase." },
      { step: 5, title: "Réception des travaux", objective: "Livrer le chantier en bonne et due forme.", actions: ["Réception contradictoire", "Établissement du PV de réception"], deliverable: "PV de réception signé." },
      { step: 6, title: "Remise du dossier de fin de chantier", objective: "Clôturer la mission avec une documentation complète.", actions: ["Compilation de tous les documents", "Remise du dossier au client"], deliverable: "Dossier de livraison complet." },
    ],

    faqs: [
      { question: "Pouvez-vous intervenir en site occupé sans perturber notre activité ?", answer: "Oui, c'est une contrainte que nous gérons régulièrement. Nous planifions les phases bruyantes ou poussiéreuses en dehors des heures d'activité et sécurisons systématiquement les zones de travaux." },
      { question: "Gérez-vous le choix et l'approvisionnement en matériaux ?", answer: "Selon le périmètre de la mission, nous pouvons prendre en charge la consultation des fournisseurs et le suivi des approvisionnements pour vous libérer de cette charge." },
      { question: "Quelle garantie sur la qualité des travaux réalisés ?", answer: "Chaque phase fait l'objet d'un contrôle de conformité avant validation. Les entreprises intervenantes restent responsables de la garantie décennale sur leurs ouvrages." },
      { question: "Travaillez-vous avec vos propres équipes ou avec des sous-traitants ?", answer: "Les deux modèles sont possibles selon le projet. Nous disposons de partenaires techniques qualifiés sur Douala et pouvons également coordonner vos équipes habituelles." },
      { question: "Comment suivez-vous le budget en cours de chantier ?", answer: "Nous comparons régulièrement le budget consommé avec le prévisionnel et vous alertons dès qu'une dérive est identifiée, avant qu'elle ne devienne critique." },
    ],

    ctaTitle: "Votre chantier BTP mérite une coordination experte.",
    ctaSubtitle: "Décrivez-nous votre projet, votre délai et vos contraintes. Nous construisons avec vous un plan d'exécution réaliste et efficace.",
    ctaReassurance: "Premier échange gratuit — Proposition technique sous 48h.",
  },

  // ─────────────────────────────────────────────────────────────
  // 4. MAINTENANCE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "maintenance",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "interventions documentées" },
    ],
    tools: [
      "GMAO & suivi d'interventions",
      "Outillage spécialisé",
      "Instruments de mesure",
      "Pièces & consommables",
      "Fiches de contrôle",
      "Planning préventif",
    ],
    title: "Maintenance",
    shortTitle: "Maintenance",
    tagline: "Prévenir les pannes et maintenir les installations en service.",
    description:
      "Nos interventions de maintenance gardent les équipements opérationnels grâce à des contrôles planifiés, des réparations ciblées et un suivi clair.",
    image: "/images/here about.jpeg",
    icon: Wrench,
    highlights: [
      "Maintenance préventive",
      "Dépannage ciblé",
      "Contrôles périodiques",
      "Traçabilité des interventions",
    ],
    deliverables: [
      "Plan de maintenance",
      "Fiche de contrôle",
      "Remise en service",
      "Recommandations techniques",
    ],
    projects: [
      {
        title: "Maintenance préventive d'équipements",
        location: "Douala, Cameroun",
        description:
          "Contrôle périodique d'installations techniques pour réduire les interruptions d'activité.",
        image: "/images/here about.jpeg",
      },
      {
        title: "Remise en service après incident",
        location: "Site professionnel",
        description:
          "Diagnostic, correction de panne et vérification complète avant reprise d'exploitation.",
        image: "/images/main-hero-imgAcceuil.png",
      },
    ],

    metaTitle: "Maintenance industrielle & technique à Douala | Winall Tech Sarl",
    metaDescription:
      "Maintenance préventive et corrective de vos équipements techniques à Douala. Réduisez les pannes, prolongez la durée de vie et maîtrisez vos coûts d'exploitation.",
    keywords: ["maintenance industrielle Douala", "maintenance préventive Cameroun", "dépannage équipement technique", "contrat maintenance Douala"],
    ogTitle: "Arrêtez de subir vos pannes — Passez à une maintenance structurée et préventive",
    ogDescription: "Chaque panne non anticipée vous coûte plus cher qu'un an de maintenance préventive. Nos experts maintiennent vos installations opérationnelles 365 jours par an.",

    heroTitle: "Stoppez les pannes à répétition et maîtrisez vos coûts d'exploitation avec un plan de maintenance structuré",
    heroSubtitle: "Contrôles planifiés, interventions rapides et fiches de suivi détaillées pour que vos installations ne vous lâchent jamais au mauvais moment.",

    problemIntro: "Chaque panne non anticipée vous coûte bien plus cher qu'une année de maintenance préventive. Voici la réalité que vivent vos équipes sans plan de maintenance.",
    problems: [
      { label: "Arrêts de production non planifiés", description: "Une installation qui tombe en panne sans prévention peut immobiliser votre activité pour des heures, voire des jours." },
      { label: "Coûts d'urgence disproportionnés", description: "Les dépannages en urgence coûtent 3 à 5 fois plus cher qu'une intervention préventive planifiée." },
      { label: "Vieillissement prématuré des équipements", description: "Sans entretien régulier, vos équipements se dégradent plus vite et nécessitent un remplacement coûteux." },
      { label: "Aucune traçabilité des interventions passées", description: "Sans historique, il est impossible d'identifier les équipements à risque avant qu'ils ne lâchent." },
    ],

    solutionTitle: "Un plan de maintenance sur-mesure pour zéro panne surprise",
    solutionDescription: "Nous concevons et exécutons un programme de maintenance préventive adapté à vos équipements, votre secteur d'activité et votre budget.",
    solutionHow: "Nous commençons par un audit complet de vos installations pour identifier les équipements critiques. Nous définissons ensuite un plan de visites et de contrôles réguliers, avec des fiches de suivi à chaque intervention.",
    solutionWhy: "La maintenance préventive réduit de 60 à 80% le nombre de pannes non planifiées et prolonge la durée de vie de vos équipements de 30 à 50%.",

    transformations: [
      { before: "Pannes imprévisibles et coûteuses", after: "Interventions planifiées à des coûts maîtrisés" },
      { before: "Équipements dégradés prématurément", after: "Durée de vie maximisée grâce à l'entretien régulier" },
      { before: "Aucun historique d'interventions", after: "Fiches de suivi complètes pour chaque équipement" },
      { before: "Réactivité par défaut (dépannage d'urgence)", after: "Proactivité et anticipation des risques" },
      { before: "Coûts de maintenance imprévisibles", after: "Budget maintenance annuel maîtrisé et prévisible" },
      { before: "Équipements critiques sans plan de secours", after: "Protocoles de continuité définis pour chaque criticité" },
    ],

    solutions: [
      { name: "Maintenance préventive planifiée", description: "Programme de visites et de contrôles réguliers sur l'ensemble de vos équipements critiques.", benefits: "Réduction drastique des pannes non planifiées.", expectedResult: "Plan de maintenance annuel avec fréquences définies par équipement.", items: ["Inventaire des équipements", "Fréquences définies", "Visites programmées", "Remplacement des pièces d'usure", "Plan annuel"] },
      { name: "Maintenance corrective & dépannage", description: "Intervention rapide pour remettre en service vos équipements défaillants.", benefits: "Temps de remise en service minimisé.", expectedResult: "Rapport d'intervention avec cause identifiée et recommandations.", items: ["Intervention rapide", "Diagnostic de la panne", "Remise en service", "Cause identifiée", "Rapport d'intervention"] },
      { name: "Audit & diagnostic de parc technique", description: "Évaluation complète de l'état de votre parc équipement avec priorisation des actions.", benefits: "Vous savez exactement dans quoi investir en priorité.", expectedResult: "Rapport d'audit avec matrice de criticité et plan d'action.", items: ["Inventaire complet", "Évaluation de l'état", "Matrice de criticité", "Priorisation des actions", "Plan d'action"] },
    ],

    features: [
      { name: "Plan de maintenance personnalisé", advantage: "Fréquences et contrôles adaptés à chaque type d'équipement et à ses conditions d'usage", clientBenefit: "Vous ne payez que pour ce qui est réellement nécessaire pour votre parc." },
      { name: "Fiche de contrôle traçable", advantage: "Chaque intervention est documentée avec les mesures, les observations et les recommandations", clientBenefit: "Vous avez un historique complet pour anticiper les futurs besoins." },
      { name: "Alertes et escalades définies", advantage: "Protocole clair en cas d'anomalie détectée lors d'une visite de routine", clientBenefit: "Les problèmes potentiels sont remontés immédiatement, avant de devenir des pannes." },
    ],

    businessBenefits: [
      { category: "Réduction des coûts", description: "La maintenance préventive coûte en moyenne 3x moins cher que la maintenance curative d'urgence." },
      { category: "Continuité d'activité", description: "Vos équipements critiques restent opérationnels 365 jours par an." },
      { category: "Durabilité", description: "Allongement significatif de la durée de vie utile de vos équipements." },
      { category: "Prévisibilité budgétaire", description: "Coûts de maintenance annuels connus et maîtrisés dès le début de l'année." },
      { category: "Conformité", description: "Respect des obligations légales de maintenance pour certains équipements réglementés." },
      { category: "Sérénité opérationnelle", description: "Vos équipes se concentrent sur leur métier sans gérer des pannes à répétition." },
    ],

    useCases: [
      { target: "Industries & production", description: "Maintien des lignes de production en conditions opérationnelles pour éviter tout arrêt non planifié." },
      { target: "Immeubles de bureaux", description: "Entretien des équipements techniques (climatisation, groupes électrogènes, ascenseurs) pour garantir le confort des occupants." },
      { target: "Hôtels & établissements d'hébergement", description: "Maintenance de l'ensemble des équipements pour offrir une expérience irréprochable à chaque client." },
      { target: "Commerces & grande distribution", description: "Disponibilité permanente des systèmes de réfrigération, caisse et sécurité pour ne jamais fermer." },
      { target: "Administrations & services publics", description: "Conformité des installations techniques aux normes réglementaires en vigueur." },
    ],

    processSteps: [
      { step: 1, title: "Audit de votre parc technique", objective: "Identifier tous vos équipements et évaluer leur état actuel.", actions: ["Inventaire complet des équipements", "Évaluation de l'état et de la criticité"], deliverable: "Rapport d'audit avec matrice de criticité." },
      { step: 2, title: "Définition du plan de maintenance", objective: "Concevoir un programme adapté à vos besoins et votre budget.", actions: ["Définition des fréquences de contrôle", "Rédaction du plan annuel"], deliverable: "Plan de maintenance annuel personnalisé." },
      { step: 3, title: "Signature du contrat de maintenance", objective: "Formaliser les engagements des deux parties.", actions: ["Validation du périmètre et des niveaux de service", "Signature du contrat"], deliverable: "Contrat de maintenance signé." },
      { step: 4, title: "Interventions préventives planifiées", objective: "Exécuter le plan de maintenance selon le calendrier défini.", actions: ["Visites de contrôle programmées", "Remplacement des pièces d'usure"], deliverable: "Fiche de contrôle après chaque visite." },
      { step: 5, title: "Rapport de maintenance périodique", objective: "Vous informer régulièrement de l'état de vos installations.", actions: ["Synthèse des interventions réalisées", "Recommandations pour la période suivante"], deliverable: "Rapport mensuel ou trimestriel selon contrat." },
      { step: 6, title: "Révision annuelle du plan", objective: "Adapter le plan de maintenance à l'évolution de votre parc.", actions: ["Bilan de l'année écoulée", "Mise à jour du plan pour l'année suivante"], deliverable: "Plan de maintenance actualisé." },
    ],

    faqs: [
      { question: "Quelle est la différence entre maintenance préventive et corrective ?", answer: "La maintenance préventive consiste à contrôler et entretenir régulièrement les équipements pour éviter les pannes. La maintenance corrective intervient après une panne pour remettre l'équipement en service. La préventive est de loin la plus rentable sur le long terme." },
      { question: "Pouvez-vous intervenir en urgence en dehors des horaires de bureau ?", answer: "Oui, nos clients sous contrat bénéficient d'une ligne d'urgence dédiée. Les délais d'intervention varient selon le niveau de contrat choisi." },
      { question: "Sur quels types d'équipements intervenez-vous ?", answer: "Nos équipes couvrent les équipements électroniques, électriques, mécaniques et les systèmes de sécurité. La liste exhaustive est définie lors de l'audit initial." },
      { question: "Comment se passe la première intervention de maintenance ?", answer: "Nous commençons toujours par un audit complet de votre parc pour partir d'une base fiable. Cet audit est inclus dans notre prestation de démarrage." },
      { question: "Fournissez-vous les pièces de rechange ?", answer: "Selon le contrat, nous pouvons prendre en charge l'approvisionnement des pièces de rechange courantes. Pour les pièces spécifiques ou coûteuses, nous vous consultons avant commande." },
      { question: "Comment calculez-vous le retour sur investissement de la maintenance préventive ?", answer: "Nous comparons le coût annuel du contrat de maintenance avec les pertes d'exploitation évitées (heures d'arrêt × coût horaire) et les dépenses de remplacement prématuré évitées. Le ROI est généralement positif dès la première année." },
    ],

    ctaTitle: "Stoppez les pannes, maîtrisez vos coûts.",
    ctaSubtitle: "Parlez-nous de vos équipements et de vos contraintes. Nous concevons un plan de maintenance adapté à votre réalité terrain.",
    ctaReassurance: "Audit initial gratuit — Contrat de maintenance sans engagement minimum.",
  },

  // ─────────────────────────────────────────────────────────────
  // 5. INFOGRAPHIE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "infographie",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "2", label: "rounds de révisions inclus" },
      { value: "100%", label: "fichiers livrés exploitables" },
    ],
    tools: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Figma",
      "CorelDRAW",
      "Canva Pro",
    ],
    title: "Infographie",
    shortTitle: "Infographie",
    tagline: "Supports visuels professionnels pour vos projets et services.",
    description:
      "Nous concevons des supports graphiques clairs pour valoriser les offres, orienter les usagers et renforcer l'image de marque.",
    image: "/images/63966.jpg",
    icon: Palette,
    highlights: [
      "Identité visuelle",
      "Supports imprimés",
      "Signalétique",
      "Visuels digitaux",
    ],
    deliverables: [
      "Brief créatif",
      "Maquettes validées",
      "Fichiers exploitables",
      "Déclinaisons supports",
    ],
    projects: [
      {
        title: "Supports visuels d'entreprise",
        location: "Douala, Cameroun",
        description:
          "Création de visuels professionnels pour présenter les services et améliorer la communication client.",
        image: "/images/63966.jpg",
      },
      {
        title: "Signalétique de site",
        location: "Cameroun",
        description:
          "Production de supports visuels pour guider les visiteurs et renforcer la lisibilité des espaces.",
        image: "/images/footer.png",
      },
    ],

    metaTitle: "Infographie & supports visuels professionnels | Winall Tech Sarl",
    metaDescription:
      "Création de supports graphiques professionnels à Douala : identité visuelle, affiches, signalétique et visuels digitaux. Valorisez votre image avec Winall Tech.",
    keywords: ["infographie Douala", "création graphique Cameroun", "identité visuelle entreprise", "signalétique professionnelle Douala"],
    ogTitle: "Des visuels qui font la différence et qui vendent votre image",
    ogDescription: "Votre image visuelle est votre premier commercial. Nous créons des supports graphiques professionnels qui inspirent confiance et font mémoriser votre marque.",

    heroTitle: "Donnez à votre marque l'image professionnelle qu'elle mérite pour conquérir votre marché",
    heroSubtitle: "Supports visuels impactants, identité visuelle cohérente et signalétique claire pour que vos clients vous reconnaissent et vous fassent confiance immédiatement.",

    problemIntro: "Vos supports visuels actuels ne reflètent pas la qualité de vos services. Des visuels amateurs envoient un message négatif à vos prospects, même inconsciemment.",
    problems: [
      { label: "Image de marque incohérente", description: "Vos supports (cartes de visite, flyers, réseaux sociaux) n'ont pas la même identité visuelle et donnent une impression de désorganisation." },
      { label: "Visuels qui n'attirent pas l'œil", description: "Des supports peu attrayants qui ne se démarquent pas dans un environnement concurrentiel saturé de messages." },
      { label: "Fichiers inexploitables", description: "Des visuels reçus dans de mauvais formats, impossible à utiliser chez l'imprimeur ou en digital sans perte de qualité." },
      { label: "Délais trop longs", description: "Des graphistes qui ne comprennent pas vos besoins et vous soumettent des versions à côté de la plaque, rallongeant les délais." },
    ],

    solutionTitle: "Des supports visuels professionnels livrés rapidement et prêts à l'emploi",
    solutionDescription: "Nous créons l'ensemble de vos supports graphiques avec une approche orientée message et efficacité : ce que vous devez communiquer, à qui, sur quel support.",
    solutionHow: "Nous commençons par un brief créatif structuré pour comprendre vos objectifs, votre cible et votre message. Nous produisons ensuite des maquettes pour validation avant livraison des fichiers définitifs dans tous les formats nécessaires.",
    solutionWhy: "Un visuel professionnel construit la confiance en quelques secondes. Dans un marché où l'attention est rare, votre image visuelle peut être votre premier avantage concurrentiel.",

    transformations: [
      { before: "Identité visuelle incohérente entre supports", after: "Charte graphique unifiée sur tous vos canaux de communication" },
      { before: "Visuels amateurs qui nuisent à votre crédibilité", after: "Supports professionnels qui renforcent votre image de marque" },
      { before: "Fichiers reçus dans des formats inexploitables", after: "Livraison dans tous les formats (print, digital, web)" },
      { before: "Délais longs pour des résultats décevants", after: "Process créatif structuré avec délais respectés" },
      { before: "Aucune cohérence visuelle sur vos réseaux sociaux", after: "Identité digitale forte et mémorisable" },
      { before: "Signalétique illisible ou mal positionnée", after: "Signalétique claire, bien dimensionnée et efficace" },
    ],

    solutions: [
      { name: "Identité visuelle & charte graphique", description: "Création ou refonte de votre logo, couleurs, typographies et règles d'usage.", benefits: "Une image de marque cohérente et reconnaissable sur tous vos supports.", expectedResult: "Guide de marque complet avec règles d'utilisation.", items: ["Logo et déclinaisons", "Palette de couleurs", "Typographies de marque", "Règles d'utilisation", "Guide de marque complet"] },
      { name: "Supports print & communication", description: "Conception de flyers, affiches, cartes de visite, brochures et tout support imprimé.", benefits: "Des supports professionnels prêts à l'impression chez n'importe quel prestataire.", expectedResult: "Fichiers HD livrés aux normes impression (PDF/X, CMJN).", items: ["Flyers et dépliants", "Affiches et banderoles", "Cartes de visite", "Brochures et catalogues", "Fichiers PDF/X en CMJN"] },
      { name: "Visuels digitaux & réseaux sociaux", description: "Création de visuels pour vos publications, bannières web et présentations.", benefits: "Une présence digitale visuelle cohérente et engageante.", expectedResult: "Pack de visuels adaptés aux formats de chaque plateforme.", items: ["Visuels réseaux sociaux", "Bannières web responsives", "Couvertures et avatars", "Présentations", "Formats adaptés par plateforme"] },
      { name: "Signalétique & affichage de site", description: "Conception de la signalétique directionnelle, de sécurité et d'image pour vos locaux.", benefits: "Orientation claire et image professionnelle pour vos visiteurs.", expectedResult: "Fichiers prêts à la production avec spécifications techniques.", items: ["Signalétique directionnelle", "Panneaux de sécurité", "Totems et enseignes", "Plans d'implantation", "Fichiers prêts à la production"] },
    ],

    features: [
      { name: "Brief créatif structuré", advantage: "Recueil précis de vos attentes avant tout travail de création", clientBenefit: "Moins d'allers-retours et des résultats alignés sur vos objectifs dès la première maquette." },
      { name: "Maquettes haute fidélité", advantage: "Visualisation réaliste du rendu final avant production", clientBenefit: "Vous validez le résultat avant de payer la production." },
      { name: "Livraison multi-formats", advantage: "Fichiers fournis dans tous les formats nécessaires (print, digital, web)", clientBenefit: "Vous utilisez vos visuels immédiatement, sans re-traitement." },
    ],

    businessBenefits: [
      { category: "Image de marque", description: "Une identité visuelle professionnelle qui inspire confiance à vos clients et prospects." },
      { category: "Impact commercial", description: "Des supports de vente qui valorisent vos offres et facilitent la décision d'achat." },
      { category: "Cohérence de communication", description: "Un message visuel unifié sur tous vos canaux de communication." },
      { category: "Gain de temps", description: "Un process créatif efficace qui vous libère du temps pour votre cœur de métier." },
      { category: "Crédibilité", description: "Des visuels professionnels qui vous positionnent comme un acteur sérieux sur votre marché." },
      { category: "Différenciation", description: "Une identité visuelle distinctive qui vous rend mémorisable face à vos concurrents." },
    ],

    useCases: [
      { target: "Entreprises en création", description: "Construction d'une identité visuelle complète pour un démarrage sur des bases professionnelles solides." },
      { target: "PME en rebranding", description: "Refonte de l'image de marque pour accompagner une montée en gamme ou un changement de positionnement." },
      { target: "Commerces & boutiques", description: "Supports de communication pour promouvoir offres, promotions et événements auprès de la clientèle locale." },
      { target: "Entreprises techniques (BTP, industrie)", description: "Brochures de présentation et supports de devis qui valorisent la qualité et le sérieux de vos réalisations." },
      { target: "Administrations & collectivités", description: "Signalétique, affichage et supports de communication institutionnels clairs et conformes aux exigences de lisibilité." },
    ],

    processSteps: [
      { step: 1, title: "Brief créatif", objective: "Comprendre vos objectifs, votre cible et votre message.", actions: ["Questionnaire de brief", "Recueil des références et contraintes"], deliverable: "Brief créatif validé." },
      { step: 2, title: "Proposition de direction artistique", objective: "Vous soumettre une orientation visuelle avant la création.", actions: ["Moodboard et palette de couleurs", "Proposition de typographies"], deliverable: "Direction artistique approuvée." },
      { step: 3, title: "Création des maquettes", objective: "Produire les premières versions pour validation.", actions: ["Design des supports selon le brief", "Mise en page et composition"], deliverable: "Maquettes haute fidélité à valider." },
      { step: 4, title: "Révisions et validation finale", objective: "Affiner les visuels selon vos retours.", actions: ["Intégration de vos corrections", "Validation du fichier définitif"], deliverable: "Visuels finaux approuvés." },
      { step: 5, title: "Livraison des fichiers", objective: "Vous remettre les fichiers dans tous les formats nécessaires.", actions: ["Export aux formats requis (PDF, PNG, AI, etc.)", "Organisation et nomenclature des fichiers"], deliverable: "Pack de fichiers organisé et nommé." },
    ],

    faqs: [
      { question: "Combien de révisions sont incluses dans votre prestation ?", answer: "Nous incluons 2 rounds de révisions dans notre prestation standard. Des révisions supplémentaires peuvent être ajoutées si nécessaire, selon un tarif défini en amont." },
      { question: "Conservez-vous les fichiers sources ?", answer: "Oui, nous archivons vos fichiers sources pendant 12 mois. Vous pouvez aussi recevoir vos fichiers sources éditables si vous le souhaitez, ce qui est prévu dans certains forfaits." },
      { question: "Pouvez-vous reproduire une charte graphique que j'ai déjà ?", answer: "Absolument. Si vous avez une charte graphique existante, nous la respectons scrupuleusement pour créer de nouveaux supports cohérents avec votre identité actuelle." },
      { question: "Dans quels délais livrez-vous les supports ?", answer: "Les délais varient selon la complexité et le volume. Un support simple (flyer, affiche) est livré en 3 à 5 jours ouvrés. Un projet d'identité complète nécessite 2 à 3 semaines." },
      { question: "Travaillez-vous avec des imprimeries locales ?", answer: "Oui, nous collaborons avec des prestataires de confiance à Douala et pouvons gérer la production imprimée jusqu'à la livraison si vous le souhaitez." },
    ],

    ctaTitle: "Votre image mérite d'être à la hauteur de vos ambitions.",
    ctaSubtitle: "Partagez-nous votre projet de communication et vos supports existants. Nous vous proposons une direction créative claire et un devis transparent.",
    ctaReassurance: "Premier échange gratuit — Maquette de démonstration sans engagement sur sélection.",
  },

  // ─────────────────────────────────────────────────────────────
  // 6. SÉCURITÉ INCENDIE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "securite-incendie",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "devis sous 48h" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "sites documentés & conformes" },
    ],
    tools: [
      "Extincteurs & détecteurs",
      "Plans d'évacuation",
      "Signalétique normée",
      "Matériel de test alarme",
      "Dossier de conformité",
      "Supports de formation",
    ],
    title: "Sécurité incendie",
    shortTitle: "Incendie",
    tagline: "Prévention, signalétique et dispositifs de sécurité.",
    description:
      "Winall Tech Sarl aide les sites à mieux anticiper les risques incendie avec une approche terrain, lisible et exploitable.",
    image: "/images/main-choix-imgMain (1).png",
    icon: Flame,
    highlights: [
      "Analyse des risques",
      "Signalétique claire",
      "Équipements adaptés",
      "Sensibilisation des équipes",
    ],
    deliverables: [
      "Repérage des zones sensibles",
      "Plan d'implantation",
      "Installation des dispositifs",
      "Contrôle de conformité terrain",
    ],
    projects: [
      {
        title: "Dispositif de sécurité de site",
        location: "Douala, Cameroun",
        description:
          "Mise en place d'éléments de prévention et de signalisation pour renforcer la sécurité des occupants.",
        image: "/images/main-choix-imgMain (1).png",
      },
      {
        title: "Signalétique sécurité",
        location: "Site professionnel",
        description:
          "Organisation visuelle des points sensibles et amélioration des parcours de sécurité.",
        image: "/images/image-choix.png",
      },
    ],

    metaTitle: "Sécurité incendie & prévention des risques | Winall Tech Sarl Douala",
    metaDescription:
      "Installation de dispositifs de sécurité incendie, signalétique et formation des équipes à Douala. Protégez vos locaux, vos équipes et votre activité.",
    keywords: ["sécurité incendie Douala", "dispositif anti-incendie Cameroun", "prévention incendie entreprise", "conformité incendie bâtiment"],
    ogTitle: "Protégez vos locaux, vos équipes et votre activité contre le risque incendie",
    ogDescription: "Un incendie peut détruire des années de travail en quelques minutes. Nos experts évaluent, équipent et forment votre site pour que vous ne soyez jamais pris au dépourvu.",

    heroTitle: "Protégez ce que vous avez construit avec un système de prévention incendie adapté à votre site",
    heroSubtitle: "Analyse des risques, installation des dispositifs adaptés et formation de vos équipes pour que votre site soit conforme et vos occupants en sécurité.",

    problemIntro: "Un incendie peut détruire en quelques minutes ce qu'il a fallu des années pour construire. La prévention n'est pas une option, c'est une responsabilité.",
    problems: [
      { label: "Locaux non conformes aux normes de sécurité", description: "Des équipements inadaptés ou mal positionnés qui n'assurent pas réellement la protection des occupants." },
      { label: "Équipes non formées", description: "En cas d'incident, personne ne sait comment réagir : où sont les extincteurs ? Quelle est la procédure d'évacuation ?" },
      { label: "Signalétique absente ou illisible", description: "Des sorties de secours non balisées et des voies d'évacuation non identifiées qui peuvent coûter des vies." },
      { label: "Risque de responsabilité légale", description: "Sans conformité documentée, le responsable des locaux est juridiquement exposé en cas d'incident." },
    ],

    solutionTitle: "Un site conforme, des équipes préparées, une responsabilité protégée",
    solutionDescription: "Nous évaluons les risques de votre site, équipons vos locaux avec les dispositifs adaptés, mettons en place la signalétique réglementaire et formons vos équipes aux procédures d'urgence.",
    solutionHow: "Notre expert réalise une analyse terrain des risques spécifiques à votre activité. Il définit ensuite un plan d'implantation des équipements, coordonne l'installation et valide la conformité par un contrôle final.",
    solutionWhy: "Parce que la conformité incendie protège avant tout vos collaborateurs, mais aussi votre entreprise de toute responsabilité légale en cas de sinistre.",

    transformations: [
      { before: "Locaux non conformes aux normes incendie", after: "Site équipé et certifié conforme aux exigences réglementaires" },
      { before: "Équipes qui ne savent pas comment réagir", after: "Personnel formé avec procédures d'évacuation connues" },
      { before: "Signalétique absente ou illisible", after: "Signalétique claire, réglementaire et bien positionnée" },
      { before: "Risques non identifiés et non cartographiés", after: "Cartographie complète des zones à risque avec mesures préventives" },
      { before: "Aucune documentation de conformité", after: "Dossier de conformité incendie complet et opposable" },
      { before: "Responsabilité juridique non couverte", after: "Protection légale du responsable de site documentée" },
    ],

    solutions: [
      { name: "Analyse des risques & audit incendie", description: "Évaluation terrain de tous les risques d'incendie spécifiques à votre activité et vos locaux.", benefits: "Vous connaissez précisément vos zones à risque et les mesures prioritaires.", expectedResult: "Rapport d'audit avec cartographie des risques et plan d'action.", items: ["Évaluation terrain", "Cartographie des risques", "Zones à risque identifiées", "Mesures prioritaires", "Rapport d'audit"] },
      { name: "Installation des dispositifs de sécurité", description: "Fourniture et installation des extincteurs, détecteurs, alarmes et équipements adaptés.", benefits: "Un site équipé selon les normes en vigueur.", expectedResult: "Procès-verbal de conformité des installations.", items: ["Extincteurs", "Détecteurs et alarmes", "Équipements conformes", "Mise en service", "PV de conformité"] },
      { name: "Signalétique de sécurité incendie", description: "Conception et installation de toute la signalétique (sorties de secours, zones à risque, point de rassemblement).", benefits: "Évacuation possible même par des personnes inconnues du site.", expectedResult: "Plan d'évacuation affiché et signalétique opérationnelle.", items: ["Sorties de secours", "Zones à risque", "Points de rassemblement", "Plan d'évacuation", "Signalétique normalisée"] },
      { name: "Formation & sensibilisation des équipes", description: "Formation pratique de vos équipes aux procédures d'urgence et à l'utilisation des équipements.", benefits: "Chaque collaborateur sait quoi faire en cas d'incident.", expectedResult: "Attestation de formation remise aux participants.", items: ["Procédures d'urgence", "Utilisation des extincteurs", "Exercices pratiques", "Consignes d'évacuation", "Attestation de formation"] },
    ],

    features: [
      { name: "Analyse terrain personnalisée", advantage: "Prise en compte des spécificités de votre activité (produits stockés, matières inflammables, configuration)", clientBenefit: "Des préconisations adaptées à votre réalité, pas un kit standard." },
      { name: "Plan d'implantation visuel", advantage: "Représentation claire du positionnement de chaque équipement de sécurité", clientBenefit: "Vous comprenez immédiatement votre dispositif et pouvez le expliquer à vos équipes." },
      { name: "Dossier de conformité documenté", advantage: "Ensemble des documents prouvant la conformité de votre site aux exigences réglementaires", clientBenefit: "Vous êtes protégé en cas de contrôle ou de sinistre." },
    ],

    businessBenefits: [
      { category: "Sécurité des personnes", description: "Vos collaborateurs et visiteurs sont protégés par des équipements et procédures adaptés." },
      { category: "Conformité réglementaire", description: "Votre site respecte les normes en vigueur et vous évitez les sanctions lors des contrôles." },
      { category: "Protection patrimoniale", description: "La prévention réduit le risque de sinistre et donc de destruction partielle ou totale de vos actifs." },
      { category: "Couverture d'assurance", description: "La conformité documentée est souvent exigée par votre assureur pour la couverture des dommages incendie." },
      { category: "Responsabilité protégée", description: "En cas de sinistre, votre démarche de prévention documentée vous protège juridiquement." },
      { category: "Image employeur", description: "Un site sûr et bien entretenu renforce votre attractivité auprès des collaborateurs et des partenaires." },
    ],

    useCases: [
      { target: "Industries & entrepôts", description: "Sites à haut risque incendie nécessitant des dispositifs renforcés et des procédures spécifiques aux matières stockées." },
      { target: "Bureaux & immeubles tertiaires", description: "Mise en conformité réglementaire des espaces de travail pour la protection des occupants." },
      { target: "Hôtels & établissements recevant du public", description: "Conformité aux normes ERP (Établissements Recevant du Public) avec affichages et procédures obligatoires." },
      { target: "Commerces & surfaces de vente", description: "Protection des zones de stock et mise en place des procédures d'évacuation adaptées à la fréquentation." },
      { target: "Établissements scolaires & sanitaires", description: "Exigences réglementaires spécifiques et formations adaptées aux publics vulnérables." },
    ],

    processSteps: [
      { step: 1, title: "Visite & analyse des risques", objective: "Identifier tous les risques d'incendie de votre site.", actions: ["Inspection complète des locaux", "Identification des sources de risque"], deliverable: "Rapport d'analyse des risques." },
      { step: 2, title: "Plan d'implantation", objective: "Définir le positionnement optimal de chaque équipement.", actions: ["Cartographie du site", "Plan de positionnement des équipements"], deliverable: "Plan d'implantation validé." },
      { step: 3, title: "Devis et validation", objective: "Vous proposer une solution claire avec un budget maîtrisé.", actions: ["Chiffrage des équipements et de l'installation", "Validation du budget"], deliverable: "Devis détaillé signé." },
      { step: 4, title: "Installation des équipements", objective: "Mettre en place les dispositifs selon le plan validé.", actions: ["Installation des extincteurs, détecteurs, alarmes", "Pose de la signalétique"], deliverable: "Équipements installés et testés." },
      { step: 5, title: "Formation des équipes", objective: "S'assurer que vos collaborateurs savent réagir.", actions: ["Session de formation pratique", "Exercice d'évacuation"], deliverable: "Attestations de formation remises." },
      { step: 6, title: "Contrôle de conformité & documentation", objective: "Valider et documenter la conformité de votre site.", actions: ["Vérification de l'installation complète", "Constitution du dossier de conformité"], deliverable: "Dossier de conformité incendie." },
    ],

    faqs: [
      { question: "Mon site est-il obligatoirement soumis à des normes incendie ?", answer: "En général oui, tous les lieux de travail et établissements recevant du public sont soumis à des obligations de sécurité incendie. La réglementation varie selon la catégorie de votre établissement. Notre audit initial vous éclaire sur vos obligations précises." },
      { question: "À quelle fréquence les extincteurs doivent-ils être vérifiés ?", answer: "Les extincteurs doivent être contrôlés annuellement par un professionnel qualifié et rechargés ou remplacés selon leur état. Nous proposons des contrats de vérification annuelle." },
      { question: "La formation incendie est-elle obligatoire pour mes employés ?", answer: "La réglementation impose à l'employeur de former ses équipes aux mesures à prendre en cas d'incendie. La fréquence et le contenu varient selon la taille de l'établissement et son activité." },
      { question: "Combien de temps prend une mise en conformité complète ?", answer: "Pour un site standard, comptez 2 à 4 semaines de l'audit à la livraison du dossier de conformité. Les sites plus complexes peuvent nécessiter davantage de temps." },
      { question: "Proposez-vous des contrats de maintenance des équipements incendie ?", answer: "Oui, nous proposons des contrats de vérification et de maintenance annuelle de vos équipements incendie pour vous assurer une conformité permanente." },
    ],

    ctaTitle: "Ne laissez pas le risque incendie compromettre votre activité.",
    ctaSubtitle: "Contactez-nous pour un audit de votre site. Nous évaluons vos risques et vous proposons un plan de mise en conformité adapté.",
    ctaReassurance: "Audit de site gratuit — Devis sans engagement sous 48h.",
  },

  // ─────────────────────────────────────────────────────────────
  // 7. RÉSEAUX
  // ─────────────────────────────────────────────────────────────
  {
    slug: "reseaux",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "liens testés & documentés" },
    ],
    tools: [
      "Câblage structuré",
      "Testeur & certificateur réseau",
      "Caméras IP & NVR",
      "Switches & routeurs",
      "Supervision réseau",
      "Baies & armoires techniques",
    ],
    title: "Réseaux",
    shortTitle: "Réseaux",
    tagline: "Infrastructure réseau, vidéosurveillance et connectivité fiable.",
    description:
      "Nous déployons des réseaux professionnels, du câblage à la supervision, avec une attention particulière à la sécurité et à la stabilité.",
    image: "/images/projets/akwa installation camera bank 1.jpeg",
    icon: Network,
    highlights: [
      "Câblage structuré",
      "Vidéosurveillance IP",
      "Wi-Fi professionnel",
      "Maintenance réseau",
    ],
    deliverables: [
      "Schéma de câblage",
      "Installation des équipements",
      "Tests de connectivité",
      "Documentation de site",
    ],
    projects: [
      {
        title: "Installation caméra bancaire",
        location: "Akwa, Douala",
        description:
          "Installation de caméras de surveillance et vérification de la couverture sur site professionnel.",
        image: "/images/projets/akwa installation camera bank 1.jpeg",
      },
      {
        title: "Contrôle et supervision vidéo",
        location: "Akwa, Douala",
        description:
          "Paramétrage, tests de visualisation et validation de la continuité de supervision.",
        image: "/images/projets/akwa installation camera bank 3.jpeg",
      },
      {
        title: "Infrastructure sécurisée",
        location: "Douala, Cameroun",
        description:
          "Organisation des points caméra, raccordements et contrôle final des équipements.",
        image: "/images/projets/akwa installation camera bank 5.jpeg",
      },
    ],

    metaTitle: "Réseaux informatiques & vidéosurveillance professionnelle | Winall Tech Sarl",
    metaDescription:
      "Installation de réseaux professionnels et systèmes de vidéosurveillance à Douala. Câblage structuré, Wi-Fi entreprise et supervision vidéo pour sécuriser votre site.",
    keywords: ["réseau informatique Douala", "vidéosurveillance professionnelle Cameroun", "câblage structuré entreprise", "Wi-Fi professionnel Douala"],
    ogTitle: "Une connectivité fiable et une surveillance totale pour votre site professionnel",
    ogDescription: "Réseau instable, angles morts de surveillance, câblage défaillant : ces problèmes ont une solution. Nos ingénieurs déploient des infrastructures réseau fiables et sécurisées.",

    heroTitle: "Connectez, sécurisez et supervisez votre site avec une infrastructure réseau professionnelle et fiable",
    heroSubtitle: "Câblage structuré, vidéosurveillance IP et Wi-Fi professionnel installés par des experts pour une connectivité parfaite et une sécurité sans angle mort.",

    problemIntro: "Un réseau instable paralyse votre activité. Une vidéosurveillance mal installée ne protège rien. Vos infrastructures réseau méritent une attention professionnelle.",
    problems: [
      { label: "Connexion réseau instable et lente", description: "Des coupures régulières, des débits insuffisants qui frustrent vos équipes et ralentissent vos opérations." },
      { label: "Angles morts dans la vidéosurveillance", description: "Des zones non couvertes par vos caméras qui créent des failles de sécurité exploitables." },
      { label: "Câblage anarchique et non documenté", description: "Un réseau de câbles chaotique impossible à maintenir et source de pannes récurrentes." },
      { label: "Données non sécurisées", description: "Un réseau non segmenté et non sécurisé qui expose vos données professionnelles sensibles." },
    ],

    solutionTitle: "Une infrastructure réseau conçue pour durer, performer et vous protéger",
    solutionDescription: "Nous concevons et déployons votre infrastructure réseau complète : câblage structuré, switch et routeurs professionnels, Wi-Fi haute performance et vidéosurveillance IP avec enregistrement.",
    solutionHow: "Notre ingénieur réseau analyse vos besoins, conçoit l'architecture la plus adaptée, réalise l'installation avec des équipements professionnels et vous remet une documentation complète de votre infrastructure.",
    solutionWhy: "Une infrastructure réseau bien conçue dès le départ coûte bien moins cher que la correction d'un réseau rapiécé après coup. La fiabilité est notre engagement.",

    transformations: [
      { before: "Réseau lent et instable qui freine la productivité", after: "Infrastructure haute performance avec débit garanti" },
      { before: "Angles morts de surveillance non détectés", after: "Couverture vidéo complète de tous les espaces critiques" },
      { before: "Câblage anarchique et non documenté", after: "Câblage structuré, propre et entièrement documenté" },
      { before: "Données professionnelles non sécurisées", after: "Réseau segmenté et sécurisé selon les meilleures pratiques" },
      { before: "Aucun suivi des accès et des incidents réseau", after: "Supervision active avec alertes en temps réel" },
      { before: "Wi-Fi inexistant ou avec zones mortes", after: "Couverture Wi-Fi professionnelle et homogène" },
    ],

    solutions: [
      { name: "Câblage structuré", description: "Installation de câblage réseau professionnel (catégorie 6/6A) avec brassage documenté.", benefits: "Infrastructure réseau fiable, maintenable et évolutive.", expectedResult: "Schéma de câblage complet et tests de connectivité validés.", items: ["Câblage catégorie 6/6A", "Brassage documenté", "Baies de brassage", "Tests de connectivité", "Schéma de câblage"] },
      { name: "Vidéosurveillance IP", description: "Étude de couverture, installation et paramétrage de caméras IP haute définition avec enregistrement sécurisé.", benefits: "Surveillance totale de votre site avec accès à distance.", expectedResult: "Système opérationnel avec accès sécurisé depuis smartphone.", items: ["Étude de couverture", "Caméras IP haute définition", "Enregistrement sécurisé", "Accès à distance", "Paramétrage smartphone"] },
      { name: "Wi-Fi professionnel", description: "Déploiement de bornes Wi-Fi professionnelles pour une couverture homogène et un débit optimal.", benefits: "Connectivité fiable pour tous vos collaborateurs, partout sur votre site.", expectedResult: "Couverture Wi-Fi validée par tests de mesure de signal.", items: ["Étude de couverture", "Bornes professionnelles", "Couverture homogène", "Débit optimal", "Tests de signal"] },
      { name: "Maintenance & supervision réseau", description: "Surveillance proactive de votre infrastructure et intervention rapide en cas de défaillance.", benefits: "Continuité réseau garantie avec temps de rétablissement minimal.", expectedResult: "Tableau de bord de supervision avec alertes configurées.", items: ["Surveillance proactive", "Alertes configurées", "Intervention rapide", "Tableau de bord", "Continuité garantie"] },
    ],

    features: [
      { name: "Étude de couverture préalable", advantage: "Analyse du site avant toute installation pour optimiser la position des équipements", clientBenefit: "Zéro angle mort et zéro zone sans signal après l'installation." },
      { name: "Équipements professionnels certifiés", advantage: "Utilisation exclusive d'équipements de marques professionnelles reconnues", clientBenefit: "Fiabilité maximale et garantie constructeur." },
      { name: "Documentation complète du réseau", advantage: "Schémas de câblage, configuration des équipements et plan d'adressage IP fournis", clientBenefit: "Votre réseau est maintenable par n'importe quel technicien qualifié." },
    ],

    businessBenefits: [
      { category: "Productivité", description: "Un réseau fiable évite les pertes de temps dues aux coupures et aux lenteurs." },
      { category: "Sécurité", description: "Vidéosurveillance et segmentation réseau pour protéger vos actifs et vos données." },
      { category: "Continuité d'activité", description: "Infrastructure redondante pour maintenir les opérations en cas de défaillance partielle." },
      { category: "Évolutivité", description: "Architecture conçue pour s'étendre facilement à la mesure de votre croissance." },
      { category: "Conformité", description: "Réseau conforme aux bonnes pratiques de sécurité informatique en entreprise." },
      { category: "Valeur immobilière", description: "Une infrastructure réseau moderne augmente la valeur et l'attractivité de vos locaux." },
    ],

    useCases: [
      { target: "Banques & établissements financiers", description: "Vidéosurveillance haute résolution avec enregistrement sécurisé et réseau segmenté pour la protection des données sensibles." },
      { target: "Hôtels & établissements touristiques", description: "Wi-Fi haut débit pour les clients, réseau séparé pour le management et vidéosurveillance des espaces communs." },
      { target: "Immeubles de bureaux", description: "Infrastructure réseau structurée pour accueillir plusieurs entreprises avec des réseaux indépendants et sécurisés." },
      { target: "Commerces & surfaces de vente", description: "Vidéosurveillance anti-vol et réseau pour les terminaux de paiement et les systèmes de gestion." },
      { target: "Industries & entrepôts", description: "Réseau Wi-Fi industriel pour les terminaux mobiles et vidéosurveillance des zones de stockage et de production." },
    ],

    processSteps: [
      { step: 1, title: "Analyse des besoins & audit du site", objective: "Comprendre vos besoins et évaluer les contraintes de votre site.", actions: ["Visite du site", "Identification des besoins par zone"], deliverable: "Note de cadrage de l'infrastructure." },
      { step: 2, title: "Conception de l'architecture réseau", objective: "Concevoir la solution technique optimale pour votre site.", actions: ["Élaboration du plan réseau", "Étude de couverture Wi-Fi et vidéo"], deliverable: "Schéma d'architecture réseau." },
      { step: 3, title: "Devis et validation", objective: "Vous proposer un chiffrage transparent.", actions: ["Sélection des équipements", "Établissement du devis détaillé"], deliverable: "Devis signé." },
      { step: 4, title: "Installation & câblage", objective: "Déployer l'infrastructure selon les plans validés.", actions: ["Pose des câbles et équipements actifs", "Installation des caméras et bornes Wi-Fi"], deliverable: "Infrastructure installée." },
      { step: 5, title: "Configuration & tests", objective: "Configurer et valider le fonctionnement de chaque composant.", actions: ["Paramétrage des équipements", "Tests de connectivité et de couverture"], deliverable: "Rapport de tests et de validation." },
      { step: 6, title: "Documentation & formation", objective: "Vous remettre une infrastructure documentée et vous former.", actions: ["Remise de la documentation", "Formation de votre référent technique"], deliverable: "Dossier technique complet et utilisateurs formés." },
    ],

    faqs: [
      { question: "Quelle est la durée d'une installation réseau complète ?", answer: "Pour un site standard (bureau ou commerce de 200 à 500m²), comptez 2 à 5 jours d'installation. Les sites plus grands nécessitent une planification sur plusieurs semaines." },
      { question: "Les caméras sont-elles accessibles à distance ?", answer: "Oui, tous nos systèmes de vidéosurveillance incluent un accès à distance sécurisé depuis smartphone ou PC, avec authentification à deux facteurs." },
      { question: "Combien de jours d'enregistrement conservez-vous ?", answer: "La durée d'enregistrement dépend de la capacité de stockage choisie. Nous proposons des solutions de 15 à 90 jours selon vos besoins et obligations réglementaires." },
      { question: "Pouvez-vous reprendre une installation existante ?", answer: "Oui, nous pouvons auditer une installation existante et soit la corriger, soit la compléter, soit la refondre complètement selon son état." },
      { question: "Proposez-vous des contrats de maintenance réseau ?", answer: "Absolument. Nos contrats de maintenance réseau incluent la surveillance proactive, les mises à jour de firmware et l'intervention prioritaire en cas de panne." },
    ],

    ctaTitle: "Votre infrastructure réseau mérite d'être fiable, sécurisée et performante.",
    ctaSubtitle: "Parlez-nous de votre site et de vos besoins. Nous concevons l'architecture idéale et vous proposons un devis transparent.",
    ctaReassurance: "Étude de faisabilité gratuite — Installation réalisée par des ingénieurs certifiés.",
  },

  // ─────────────────────────────────────────────────────────────
  // 8. INSTALLATION ÉLECTRIQUE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "installation-electrique",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "installations testées" },
    ],
    tools: [
      "Pince ampèremétrique",
      "Testeur de continuité & isolement",
      "Disjoncteurs & différentiels",
      "Câblage normé",
      "Tableaux de répartition modulaires",
      "Détecteur de tension sans contact",
    ],
    title: "Installation électrique bâtiment",
    shortTitle: "Installation électrique",
    tagline: "Tableaux, câblage, prises et éclairage aux normes, du neuf à la rénovation.",
    description:
      "Nous réalisons vos installations électriques basse tension avec un câblage propre, des protections dimensionnées et une mise en service testée avant remise des clés.",
    image: "/images/1.JPG",
    icon: Zap,
    highlights: [
      "Tableaux normés",
      "Câblage soigné",
      "Protections dimensionnées",
      "Mise en service testée",
    ],
    deliverables: [
      "Schéma unifilaire",
      "Tableau de répartition posé",
      "Rapport de mesures",
      "Attestation de conformité",
    ],
    projects: [
      {
        title: "Installation électrique de bureaux",
        location: "Douala, Cameroun",
        description:
          "Câblage complet, pose de tableau et mise en service d'un plateau de bureaux.",
        image: "/images/1.JPG",
      },
      {
        title: "Réhabilitation d'un tableau électrique",
        location: "Site professionnel",
        description:
          "Remplacement d'un tableau vétuste et remise aux normes du circuit de protection.",
        image: "/images/image-choix.png",
      },
    ],

    metaTitle: "Installation électrique bâtiment à Douala | Winall Tech Sarl",
    metaDescription:
      "Câblage, tableaux électriques et mise en service aux normes à Douala. Winall Tech Sarl réalise vos installations électriques basse tension, du neuf à la rénovation.",
    keywords: ["installation électrique Douala", "électricien bâtiment Cameroun", "tableau électrique Douala", "câblage basse tension"],
    ogTitle: "Une installation électrique fiable, propre et aux normes pour votre bâtiment",
    ogDescription: "Câblage anarchique, tableau sous-dimensionné, disjoncteurs qui sautent : nos électriciens reprennent ou installent votre réseau électrique dans les règles.",

    heroTitle: "Une installation électrique fiable et conforme, du tableau à la dernière prise",
    heroSubtitle: "Câblage soigné, protections correctement dimensionnées et mise en service testée pour un réseau électrique qui ne vous inquiète plus.",

    problemIntro: "Un tableau électrique surchargé ou un câblage mal posé, c'est un risque permanent d'incendie, de panne et de mise en danger de vos équipes.",
    problems: [
      { label: "Tableaux sous-dimensionnés ou vétustes", description: "Des protections mal calibrées qui déclenchent sans raison ou, pire, ne protègent plus personne." },
      { label: "Câblage non conforme ou apparent", description: "Des fils qui courent à vue, sans repérage ni protection mécanique, source de danger et de pannes." },
      { label: "Surcharge de circuits", description: "Trop d'équipements branchés sur les mêmes lignes, avec des risques de surchauffe et de coupure." },
      { label: "Absence de mise à la terre efficace", description: "Une installation sans terre correcte expose vos équipes à un risque d'électrocution direct." },
    ],

    solutionTitle: "Une installation électrique dimensionnée pour votre usage réel, posée dans les règles",
    solutionDescription: "Nous étudions votre besoin en puissance, dimensionnons les protections en conséquence et réalisons un câblage propre, repéré et testé avant mise en service.",
    solutionHow: "Notre électricien réalise un bilan de puissance, propose un schéma unifilaire adapté, pose le tableau et le câblage, puis teste chaque circuit avant de vous remettre les clés.",
    solutionWhy: "Une installation bien dimensionnée dès le départ évite les pannes, les risques d'incendie et les reprises coûteuses. C'est la base de toute activité qui dépend de l'électricité.",

    transformations: [
      { before: "Tableau surchargé et mal identifié", after: "Tableau normé, repéré et dimensionné pour votre usage" },
      { before: "Câblage apparent et non protégé", after: "Câblage encastré ou goulotté, propre et durable" },
      { before: "Disjoncteurs qui sautent sans raison claire", after: "Protections calibrées selon un bilan de puissance réel" },
      { before: "Mise à la terre absente ou défaillante", after: "Terre mesurée et conforme aux normes de sécurité" },
      { before: "Aucun schéma de l'installation existante", after: "Schéma unifilaire remis et exploitable" },
      { before: "Mise en service sans test préalable", after: "Chaque circuit testé avant la remise des clés" },
    ],

    solutions: [
      { name: "Installation électrique neuve", description: "Câblage complet d'un bâtiment neuf ou d'un plateau à aménager, du tableau à la dernière prise.", benefits: "Une installation fiable et conforme dès la mise en service.", expectedResult: "Bâtiment câblé, testé et prêt à l'usage.", items: ["Bilan de puissance", "Pose du tableau", "Câblage des circuits", "Pose des prises & éclairage", "Tests de mise en service"] },
      { name: "Réhabilitation & mise aux normes", description: "Reprise d'une installation existante vétuste ou non conforme.", benefits: "Suppression des risques et remise en conformité durable.", expectedResult: "Installation existante sécurisée et documentée.", items: ["Audit de l'existant", "Remplacement du tableau", "Reprise du câblage à risque", "Mise à la terre", "Attestation de conformité"] },
      { name: "Dépannage & extension de circuit", description: "Ajout de circuits ou intervention rapide sur une panne électrique.", benefits: "Extension propre sans fragiliser l'installation existante.", expectedResult: "Circuit supplémentaire intégré ou panne résolue.", items: ["Diagnostic de panne", "Ajout de circuits", "Renforcement de protection", "Tests de continuité", "Rapport d'intervention"] },
    ],

    features: [
      { name: "Bilan de puissance avant chiffrage", advantage: "Dimensionnement des protections basé sur votre usage réel, pas sur des standards approximatifs", clientBenefit: "Aucune surprise de disjoncteur qui saute ou de tableau sous-dimensionné." },
      { name: "Câblage repéré et documenté", advantage: "Chaque circuit est identifié au tableau avec un schéma remis en fin de chantier", clientBenefit: "N'importe quel électricien peut intervenir facilement par la suite." },
      { name: "Tests systématiques avant mise en service", advantage: "Continuité, isolement et terre vérifiés sur chaque circuit avant la remise des clés", clientBenefit: "Une installation dont la sécurité est vérifiée, pas supposée." },
    ],

    businessBenefits: [
      { category: "Sécurité", description: "Une installation conforme protège vos équipes et vos locaux du risque électrique." },
      { category: "Continuité d'activité", description: "Moins de coupures et de pannes liées à un réseau électrique mal dimensionné." },
      { category: "Conformité", description: "Installation documentée, utile pour les assurances et les contrôles réglementaires." },
      { category: "Évolutivité", description: "Un tableau bien dimensionné accueille facilement de futurs équipements." },
      { category: "Maîtrise des coûts", description: "Une installation bien faite dès le départ évite les reprises coûteuses." },
      { category: "Sérénité", description: "Un réseau électrique documenté et testé, sur lequel vous pouvez compter." },
    ],

    useCases: [
      { target: "Bureaux & sièges d'entreprise", description: "Câblage de plateaux avec circuits dédiés informatique, éclairage et climatisation." },
      { target: "Commerces & boutiques", description: "Installation adaptée aux vitrines, à l'éclairage commercial et aux équipements de caisse." },
      { target: "Industries & ateliers", description: "Circuits de force motrice dimensionnés pour machines et équipements de production." },
      { target: "Résidences & immeubles", description: "Installation ou rénovation électrique complète de logements et parties communes." },
      { target: "Hôtels & restaurants", description: "Réseau électrique fiable pour cuisines, chambres et espaces recevant du public." },
    ],

    processSteps: [
      { step: 1, title: "Visite technique & bilan de puissance", objective: "Comprendre vos besoins réels et l'existant.", actions: ["Visite du site", "Recensement des équipements à alimenter"], deliverable: "Bilan de puissance et note de cadrage." },
      { step: 2, title: "Schéma unifilaire & devis", objective: "Vous proposer une solution claire et chiffrée.", actions: ["Élaboration du schéma", "Chiffrage détaillé des travaux"], deliverable: "Devis technique signé." },
      { step: 3, title: "Pose du tableau & câblage", objective: "Réaliser l'installation dans les règles de l'art.", actions: ["Pose du tableau de répartition", "Tirage et raccordement des circuits"], deliverable: "Installation posée." },
      { step: 4, title: "Pose des équipements terminaux", objective: "Finaliser les points d'usage.", actions: ["Pose des prises et interrupteurs", "Installation de l'éclairage"], deliverable: "Circuits terminaux posés." },
      { step: 5, title: "Tests & mise en service", objective: "Vérifier la sécurité de chaque circuit.", actions: ["Tests de continuité et d'isolement", "Mesure de la terre"], deliverable: "Rapport de tests." },
      { step: 6, title: "Remise du dossier de conformité", objective: "Vous transmettre une documentation complète.", actions: ["Rédaction du schéma unifilaire final", "Remise de l'attestation de conformité"], deliverable: "Dossier de conformité électrique." },
    ],

    faqs: [
      { question: "Intervenez-vous aussi bien sur le neuf que sur la rénovation ?", answer: "Oui, nous réalisons des installations complètes sur bâtiment neuf ainsi que des reprises ou mises aux normes d'installations existantes." },
      { question: "Vos installations sont-elles conformes aux normes en vigueur ?", answer: "Oui, chaque installation est dimensionnée et testée selon les normes électriques applicables, avec une attestation de conformité remise en fin de chantier." },
      { question: "Pouvez-vous intervenir en urgence sur une panne électrique ?", answer: "Oui, nous proposons des interventions de dépannage rapide pour les pannes électriques bloquantes, avec diagnostic et remise en service le jour même selon disponibilité." },
      { question: "Fournissez-vous le matériel électrique ou dois-je l'acheter ?", answer: "Nous pouvons fournir l'ensemble du matériel (tableaux, câbles, appareillage) ou travailler avec du matériel que vous avez déjà sélectionné, selon votre préférence." },
      { question: "Combien de temps dure une installation électrique complète ?", answer: "Pour un plateau de bureaux ou un logement standard, comptez 3 à 10 jours selon la surface et la complexité des circuits à installer." },
    ],

    ctaTitle: "Votre installation électrique mérite d'être fiable et conforme.",
    ctaSubtitle: "Décrivez-nous votre projet et vos équipements à alimenter. Nous revenons avec un schéma clair et un devis transparent.",
    ctaReassurance: "Devis gratuit sous 48h — Installation testée avant remise des clés.",
  },

  // ─────────────────────────────────────────────────────────────
  // 9. SOLAIRE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "solaire",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "25 ans", label: "durée de vie des panneaux" },
      { value: "100%", label: "installations testées" },
    ],
    tools: [
      "Panneaux photovoltaïques",
      "Onduleurs solaires (string/hybrides)",
      "Batteries de stockage",
      "Structures de fixation",
      "Régulateurs de charge",
      "Testeur d'irradiance",
    ],
    title: "Plaque solaire",
    shortTitle: "Solaire",
    tagline: "Panneaux solaires et solutions hybrides pour réduire votre facture d'énergie.",
    description:
      "Nous installons des systèmes solaires photovoltaïques dimensionnés pour votre consommation réelle, seuls ou couplés à votre réseau existant et à un groupe électrogène.",
    image: "/images/3.JPG",
    icon: Sun,
    highlights: [
      "Étude de consommation",
      "Dimensionnement précis",
      "Installation hybride possible",
      "Suivi de production",
    ],
    deliverables: [
      "Étude de faisabilité",
      "Plan d'implantation",
      "Installation testée",
      "Rapport de mise en service",
    ],
    projects: [
      {
        title: "Installation solaire résidentielle",
        location: "Douala, Cameroun",
        description:
          "Pose de panneaux et onduleur hybride pour réduire la dépendance au réseau et au groupe électrogène.",
        image: "/images/3.JPG",
      },
      {
        title: "Solaire pour site professionnel",
        location: "Cameroun",
        description:
          "Dimensionnement et installation d'une solution solaire couplée à l'alimentation existante.",
        image: "/images/image-choix.png",
      },
    ],

    metaTitle: "Installation solaire photovoltaïque à Douala | Winall Tech Sarl",
    metaDescription:
      "Panneaux solaires, onduleurs et batteries dimensionnés pour votre consommation à Douala. Winall Tech Sarl réduit votre dépendance au réseau et vos coûts d'énergie.",
    keywords: ["installation solaire Douala", "panneaux solaires Cameroun", "énergie solaire entreprise", "onduleur hybride solaire"],
    ogTitle: "Réduisez votre facture d'énergie avec une installation solaire dimensionnée pour vos besoins",
    ogDescription: "Coupures de réseau, groupe électrogène coûteux à faire tourner : le solaire réduit votre dépendance énergétique. Nos ingénieurs dimensionnent et installent votre système photovoltaïque.",

    heroTitle: "Produisez votre propre énergie et réduisez durablement votre facture d'électricité",
    heroSubtitle: "Étude de consommation, dimensionnement précis et installation testée pour une solution solaire qui tient ses promesses sur la durée.",

    problemIntro: "Entre coupures de réseau, groupe électrogène coûteux et factures d'électricité qui augmentent, votre énergie vous coûte cher et reste incertaine. Le solaire change cette équation.",
    problems: [
      { label: "Factures d'électricité en hausse constante", description: "Une dépendance totale au réseau qui pèse de plus en plus lourd sur votre budget de fonctionnement." },
      { label: "Coupures de réseau fréquentes", description: "Une activité interrompue à chaque délestage, sans solution de production autonome." },
      { label: "Groupe électrogène coûteux à faire tourner", description: "Carburant, entretien et usure prématurée pour une solution de secours qui devient le mode normal." },
      { label: "Installations solaires mal dimensionnées", description: "Des systèmes sous-dimensionnés qui déçoivent ou surdimensionnés qui coûtent inutilement cher." },
    ],

    solutionTitle: "Une installation solaire dimensionnée sur votre consommation réelle, pas sur des estimations",
    solutionDescription: "Nous étudions votre profil de consommation, dimensionnons panneaux, onduleur et batteries en conséquence, et installons un système testé et documenté.",
    solutionHow: "Notre équipe analyse vos factures et vos usages, propose un dimensionnement précis (autonome, hybride ou couplé au réseau), installe le système et valide sa production réelle avant remise.",
    solutionWhy: "Un système solaire bien dimensionné s'amortit sur quelques années et continue à produire pendant 20 à 25 ans. Mal dimensionné, il déçoit et coûte plus cher que prévu.",

    transformations: [
      { before: "Facture d'électricité imprévisible et croissante", after: "Part de consommation couverte par une production solaire maîtrisée" },
      { before: "Activité interrompue à chaque coupure réseau", after: "Continuité assurée grâce au stockage ou au couplage hybride" },
      { before: "Groupe électrogène utilisé en continu", after: "Groupe électrogène relégué au simple secours ponctuel" },
      { before: "Dimensionnement solaire approximatif", after: "Système calibré sur une étude de consommation réelle" },
      { before: "Aucun suivi de la production réelle", after: "Suivi de production documenté après mise en service" },
      { before: "Installation solaire non testée à la livraison", after: "Système testé et validé avant remise des clés" },
    ],

    solutions: [
      { name: "Étude & dimensionnement solaire", description: "Analyse de votre consommation et de votre site pour définir la solution solaire optimale.", benefits: "Un système ni sous-dimensionné ni surdimensionné, adapté à votre budget.", expectedResult: "Étude de faisabilité avec dimensionnement et retour sur investissement estimé.", items: ["Analyse des factures", "Étude d'ensoleillement du site", "Dimensionnement panneaux & batteries", "Simulation de production", "Estimation du retour sur investissement"] },
      { name: "Installation photovoltaïque", description: "Pose de panneaux, onduleurs et structures de fixation adaptés à votre toiture ou votre terrain.", benefits: "Une installation solide, sécurisée et esthétiquement intégrée.", expectedResult: "Système installé, raccordé et mis sous tension.", items: ["Pose des structures de fixation", "Installation des panneaux", "Raccordement de l'onduleur", "Câblage sécurisé", "Mise sous tension"] },
      { name: "Solution hybride & stockage", description: "Couplage du solaire avec le réseau existant et un groupe électrogène, avec batteries de stockage.", benefits: "Continuité d'alimentation maximisée quelle que soit la source disponible.", expectedResult: "Système hybride basculant automatiquement entre les sources.", items: ["Batteries de stockage", "Onduleur hybride", "Bascule automatique des sources", "Paramétrage des priorités", "Tests de continuité"] },
    ],

    features: [
      { name: "Étude de consommation avant chiffrage", advantage: "Dimensionnement basé sur vos factures réelles et non sur une estimation générique", clientBenefit: "Vous payez pour un système qui correspond exactement à votre besoin." },
      { name: "Suivi de production après installation", advantage: "Vérification de la production réelle dans les semaines suivant la mise en service", clientBenefit: "Vous avez la preuve que votre installation tient ses promesses." },
      { name: "Solutions hybrides sur-mesure", advantage: "Couplage intelligent entre solaire, réseau et groupe électrogène selon vos priorités", clientBenefit: "Une continuité d'alimentation optimisée sans surinvestissement." },
    ],

    businessBenefits: [
      { category: "Réduction des coûts", description: "Diminution significative de la facture d'électricité et du recours au groupe électrogène." },
      { category: "Continuité d'activité", description: "Moins de dépendance aux coupures de réseau grâce à la production ou au stockage local." },
      { category: "Image de marque", description: "Une entreprise engagée dans une démarche énergétique responsable et visible." },
      { category: "Prévisibilité budgétaire", description: "Une part de votre consommation énergétique devient indépendante des hausses de tarif réseau." },
      { category: "Durabilité", description: "Des équipements dimensionnés pour produire de manière fiable pendant 20 à 25 ans." },
      { category: "Retour sur investissement", description: "Un système bien dimensionné s'amortit en quelques années d'exploitation." },
    ],

    useCases: [
      { target: "Résidences & villas", description: "Réduction de la facture d'électricité et autonomie renforcée face aux délestages." },
      { target: "PME & bureaux", description: "Solution hybride pour sécuriser l'activité tout en réduisant les coûts d'exploitation." },
      { target: "Industries & entrepôts", description: "Production solaire couplée au réseau pour absorber une partie de la consommation industrielle." },
      { target: "Hôtels & résidences touristiques", description: "Continuité d'alimentation pour le confort client, même en cas de coupure réseau." },
      { target: "Sites isolés & ruraux", description: "Solution autonome pour des sites peu ou mal desservis par le réseau électrique." },
    ],

    processSteps: [
      { step: 1, title: "Analyse de la consommation", objective: "Comprendre votre profil de consommation énergétique.", actions: ["Analyse des factures d'électricité", "Recensement des équipements prioritaires"], deliverable: "Profil de consommation établi." },
      { step: 2, title: "Étude du site & dimensionnement", objective: "Définir la solution technique optimale.", actions: ["Étude d'ensoleillement et de toiture", "Dimensionnement panneaux, onduleur et batteries"], deliverable: "Étude de faisabilité avec dimensionnement." },
      { step: 3, title: "Devis & validation", objective: "Vous proposer un chiffrage clair avec retour sur investissement.", actions: ["Chiffrage détaillé", "Simulation du retour sur investissement"], deliverable: "Devis signé." },
      { step: 4, title: "Installation des équipements", objective: "Poser panneaux, onduleur et batteries selon l'étude validée.", actions: ["Pose des structures et panneaux", "Installation de l'onduleur et des batteries"], deliverable: "Système installé." },
      { step: 5, title: "Mise en service & tests", objective: "Valider le fonctionnement réel du système.", actions: ["Tests de production", "Paramétrage des priorités de source"], deliverable: "Rapport de mise en service." },
      { step: 6, title: "Suivi de production", objective: "Confirmer que le système tient ses promesses.", actions: ["Relevé de production sur les premières semaines", "Recommandations d'optimisation"], deliverable: "Rapport de suivi de production." },
    ],

    faqs: [
      { question: "En combien de temps un système solaire est-il rentabilisé ?", answer: "Cela dépend de votre consommation et du dimensionnement, mais la plupart de nos installations s'amortissent entre 3 et 6 ans, pour une durée de vie de 20 à 25 ans." },
      { question: "Puis-je coupler le solaire avec mon groupe électrogène existant ?", answer: "Oui, nous installons des solutions hybrides qui basculent automatiquement entre solaire, réseau et groupe électrogène selon la disponibilité et vos priorités." },
      { question: "Ai-je besoin de batteries de stockage ?", answer: "Cela dépend de votre objectif : réduire la facture (souvent sans batterie) ou assurer une continuité en cas de coupure (avec batteries). Nous vous conseillons selon votre cas." },
      { question: "Quelle surface de toiture faut-il pour une installation solaire ?", answer: "Cela dépend de votre consommation cible. Nous réalisons une étude précise pour déterminer le nombre de panneaux nécessaires et vérifier la faisabilité sur votre toiture." },
      { question: "Proposez-vous un suivi après l'installation ?", answer: "Oui, nous assurons un suivi de production dans les semaines suivant la mise en service, et proposons des contrats de maintenance préventive pour les installations solaires." },
    ],

    ctaTitle: "Votre facture d'énergie mérite une solution solaire bien dimensionnée.",
    ctaSubtitle: "Partagez-nous vos factures et vos besoins. Nous revenons avec une étude claire et un dimensionnement adapté.",
    ctaReassurance: "Étude de faisabilité gratuite — Devis transparent avec retour sur investissement estimé.",
  },

  // ─────────────────────────────────────────────────────────────
  // 10. CONTRÔLE D'ACCÈS
  // ─────────────────────────────────────────────────────────────
  {
    slug: "controle-acces",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "accès tracés & documentés" },
    ],
    tools: [
      "Lecteurs de badges RFID",
      "Biométrie (empreinte/visage)",
      "Contrôleurs d'accès",
      "Gâches électriques & ventouses",
      "Logiciel de gestion des accès",
      "Badgeuse horaires",
    ],
    title: "Contrôle d'accès & badgeuse",
    shortTitle: "Contrôle d'accès",
    tagline: "Sécurisez vos accès et suivez les horaires de vos équipes.",
    description:
      "Nous installons des systèmes de contrôle d'accès et de badgeage adaptés à votre site, pour sécuriser les entrées sensibles et fiabiliser le suivi des présences.",
    image: "/images/image-choix.png",
    icon: IdCard,
    highlights: [
      "Accès par badge ou biométrie",
      "Gestion des droits par zone",
      "Suivi des horaires",
      "Historique des accès",
    ],
    deliverables: [
      "Plan des points d'accès",
      "Installation des lecteurs",
      "Paramétrage des droits",
      "Formation des utilisateurs",
    ],
    projects: [
      {
        title: "Contrôle d'accès de site professionnel",
        location: "Douala, Cameroun",
        description:
          "Installation de lecteurs de badges sur les accès sensibles et paramétrage des droits par zone.",
        image: "/images/image-choix.png",
      },
      {
        title: "Badgeuse horaires d'entreprise",
        location: "Cameroun",
        description:
          "Déploiement d'un système de badgeage pour fiabiliser le suivi des présences du personnel.",
        image: "/images/1.JPG",
      },
    ],

    metaTitle: "Contrôle d'accès & badgeuse professionnelle à Douala | Winall Tech Sarl",
    metaDescription:
      "Installation de systèmes de contrôle d'accès par badge ou biométrie à Douala. Winall Tech Sarl sécurise vos entrées et fiabilise le suivi des horaires de vos équipes.",
    keywords: ["contrôle d'accès Douala", "badgeuse entreprise Cameroun", "système de badge professionnel", "biométrie accès sécurisé"],
    ogTitle: "Sécurisez vos accès et fiabilisez le suivi des présences de vos équipes",
    ogDescription: "Accès non maîtrisés, pointage manuel peu fiable : un système de contrôle d'accès et de badgeuse résout ces deux problèmes en une seule installation.",

    heroTitle: "Maîtrisez qui entre, où et quand, avec un système de contrôle d'accès fiable",
    heroSubtitle: "Badges, biométrie et gestion des droits par zone pour sécuriser vos locaux et fiabiliser le suivi des horaires de vos équipes.",

    problemIntro: "Sans contrôle d'accès, n'importe qui peut circuler librement dans vos locaux sensibles, et le suivi manuel des horaires reste approximatif et contestable.",
    problems: [
      { label: "Accès non maîtrisés aux zones sensibles", description: "Aucune limitation réelle de qui peut entrer dans les zones critiques de votre site." },
      { label: "Pointage manuel peu fiable", description: "Des feuilles de présence facilement contournables qui faussent le suivi des horaires." },
      { label: "Aucun historique en cas d'incident", description: "Impossible de savoir qui est entré ou sorti à un moment précis en l'absence de traçabilité." },
      { label: "Gestion des clés physiques complexe", description: "Clés perdues, dupliquées ou non restituées qui fragilisent la sécurité de votre site." },
    ],

    solutionTitle: "Un système de contrôle d'accès qui sécurise vos zones et fiabilise vos horaires",
    solutionDescription: "Nous installons des lecteurs de badges ou biométriques sur vos points d'accès sensibles, avec une gestion des droits par zone et un suivi horaire centralisé.",
    solutionHow: "Nous identifions vos zones sensibles, installons les lecteurs et gâches adaptés, paramétrons les droits d'accès par utilisateur ou par groupe, puis formons vos équipes à l'usage du logiciel de gestion.",
    solutionWhy: "Un accès maîtrisé réduit les risques d'intrusion et de vol, tandis qu'un badgeage fiable met fin aux contestations sur les horaires et simplifie la gestion RH.",

    transformations: [
      { before: "Accès libre aux zones sensibles", after: "Accès restreint par badge ou biométrie selon les droits définis" },
      { before: "Pointage manuel contestable", after: "Badgeage horodaté et centralisé dans un logiciel de gestion" },
      { before: "Aucune traçabilité des passages", after: "Historique complet des accès consultable à tout moment" },
      { before: "Gestion complexe des clés physiques", after: "Droits d'accès modifiables instantanément sans changer de serrure" },
      { before: "Aucune alerte en cas de tentative suspecte", after: "Alertes configurées sur les accès anormaux ou refusés" },
      { before: "Suivi des horaires fait à la main", after: "Rapports de présence générés automatiquement" },
    ],

    solutions: [
      { name: "Contrôle d'accès par badge ou biométrie", description: "Installation de lecteurs sur vos accès sensibles avec gâches ou ventouses électriques.", benefits: "Seules les personnes autorisées accèdent aux zones concernées.", expectedResult: "Points d'accès sécurisés et opérationnels.", items: ["Étude des points d'accès", "Pose des lecteurs", "Installation des gâches/ventouses", "Câblage sécurisé", "Tests d'ouverture"] },
      { name: "Gestion des droits & historique", description: "Paramétrage des droits d'accès par utilisateur, groupe ou plage horaire, avec historique consultable.", benefits: "Une maîtrise fine de qui accède à quoi et quand.", expectedResult: "Logiciel de gestion opérationnel avec droits configurés.", items: ["Paramétrage des profils", "Droits par zone et horaire", "Historique des accès", "Alertes configurées", "Export des rapports"] },
      { name: "Badgeuse & suivi des horaires", description: "Déploiement d'un système de badgeage pour le suivi fiable des présences du personnel.", benefits: "Un suivi horaire fiable qui simplifie la gestion RH.", expectedResult: "Rapports de présence générés automatiquement.", items: ["Installation de la badgeuse", "Import des employés", "Règles d'horaires", "Rapports automatiques", "Formation RH"] },
    ],

    features: [
      { name: "Gestion des droits par zone", advantage: "Chaque utilisateur n'accède qu'aux zones qui le concernent réellement", clientBenefit: "Une sécurité fine sans complexité de gestion au quotidien." },
      { name: "Historique complet des accès", advantage: "Chaque passage est horodaté et consultable à tout moment", clientBenefit: "Vous retrouvez rapidement l'information en cas d'incident ou de litige." },
      { name: "Rapports de présence automatisés", advantage: "Génération automatique des rapports d'horaires pour la gestion RH", clientBenefit: "Fini les feuilles de présence à vérifier et contester manuellement." },
    ],

    businessBenefits: [
      { category: "Sécurité", description: "Accès restreint aux zones sensibles, réduisant les risques d'intrusion et de vol." },
      { category: "Fiabilité RH", description: "Suivi des horaires objectif qui met fin aux contestations et erreurs de pointage." },
      { category: "Traçabilité", description: "Historique exploitable en cas d'incident ou de contrôle interne." },
      { category: "Gain de temps", description: "Rapports de présence générés automatiquement, sans saisie manuelle." },
      { category: "Flexibilité", description: "Droits d'accès modifiables instantanément, sans intervention physique sur les serrures." },
      { category: "Image professionnelle", description: "Un site sécurisé et organisé qui rassure clients, partenaires et employés." },
    ],

    useCases: [
      { target: "Entreprises & bureaux", description: "Contrôle des accès aux étages sensibles et badgeuse pour le suivi des horaires du personnel." },
      { target: "Industries & entrepôts", description: "Restriction des zones de production ou de stockage aux seules personnes autorisées." },
      { target: "Banques & institutions financières", description: "Contrôle strict des accès aux zones à haute sécurité avec historique complet." },
      { target: "Résidences & immeubles", description: "Sécurisation des accès communs avec gestion simplifiée des droits des résidents." },
      { target: "Écoles & centres de formation", description: "Suivi des entrées et sorties des élèves et du personnel pour plus de sécurité." },
    ],

    processSteps: [
      { step: 1, title: "Analyse des besoins & visite de site", objective: "Identifier les zones à sécuriser et vos contraintes.", actions: ["Visite du site", "Identification des points d'accès sensibles"], deliverable: "Note de cadrage du projet." },
      { step: 2, title: "Plan d'implantation", objective: "Définir l'emplacement de chaque équipement.", actions: ["Cartographie des points d'accès", "Choix des technologies (badge/biométrie)"], deliverable: "Plan d'implantation validé." },
      { step: 3, title: "Devis & validation", objective: "Vous proposer un chiffrage transparent.", actions: ["Sélection des équipements", "Établissement du devis"], deliverable: "Devis signé." },
      { step: 4, title: "Installation des équipements", objective: "Poser lecteurs, gâches et câblage.", actions: ["Installation des lecteurs et gâches", "Câblage et raccordement"], deliverable: "Équipements installés." },
      { step: 5, title: "Paramétrage & tests", objective: "Configurer les droits d'accès et valider le fonctionnement.", actions: ["Paramétrage des profils et droits", "Tests d'ouverture et de badgeage"], deliverable: "Système configuré et testé." },
      { step: 6, title: "Formation & documentation", objective: "Vous rendre autonome sur la gestion du système.", actions: ["Formation des administrateurs", "Remise de la documentation"], deliverable: "Dossier technique et utilisateurs formés." },
    ],

    faqs: [
      { question: "Quelle est la différence entre badge et biométrie ?", answer: "Le badge est rapide à déployer et à remplacer en cas de perte. La biométrie (empreinte, visage) supprime le risque de badge prêté ou volé, pour une sécurité renforcée." },
      { question: "Puis-je gérer les droits d'accès moi-même après l'installation ?", answer: "Oui, nous vous formons à l'utilisation du logiciel de gestion pour que vous puissiez ajouter, modifier ou retirer des droits d'accès en toute autonomie." },
      { question: "Le système fonctionne-t-il en cas de coupure d'électricité ?", answer: "Nous dimensionnons systématiquement une solution de secours (batterie ou onduleur) pour que les accès restent fonctionnels ou sécurisés en cas de coupure." },
      { question: "Peut-on coupler le contrôle d'accès avec la vidéosurveillance ?", answer: "Oui, nous pouvons intégrer votre système de contrôle d'accès avec votre installation de vidéosurveillance existante pour une sécurité globale cohérente." },
      { question: "La badgeuse s'intègre-t-elle avec notre logiciel de paie ?", answer: "Selon votre logiciel de paie, nous pouvons configurer un export compatible des données de présence pour simplifier votre gestion RH." },
    ],

    ctaTitle: "Vos accès et vos horaires méritent d'être maîtrisés, pas approximatifs.",
    ctaSubtitle: "Décrivez-nous votre site et vos zones sensibles. Nous revenons avec un plan d'implantation clair et un devis transparent.",
    ctaReassurance: "Visite technique gratuite — Devis sous 48h.",
  },

  // ─────────────────────────────────────────────────────────────
  // 11. SONORISATION
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sonorisation",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "installations testées sur site" },
    ],
    tools: [
      "Enceintes & haut-parleurs plafond",
      "Amplificateurs multi-zones",
      "Micros & pupitres d'annonce",
      "Câblage audio blindé",
      "Diffuseurs de musique d'ambiance",
      "Testeur de niveau sonore",
    ],
    title: "Sonorisation",
    shortTitle: "Sonorisation",
    tagline: "Diffusion sonore et annonces professionnelles pour vos espaces.",
    description:
      "Nous installons des systèmes de sonorisation pour la musique d'ambiance, les annonces publiques et les alertes, avec une couverture homogène de chaque espace.",
    image: "/images/63966.jpg",
    icon: Volume2,
    highlights: [
      "Couverture sonore homogène",
      "Annonces multi-zones",
      "Musique d'ambiance",
      "Intégration alerte incendie",
    ],
    deliverables: [
      "Étude acoustique",
      "Plan d'implantation des enceintes",
      "Installation testée",
      "Formation à l'usage",
    ],
    projects: [
      {
        title: "Sonorisation d'espace commercial",
        location: "Douala, Cameroun",
        description:
          "Installation d'enceintes plafond pour une diffusion homogène de musique d'ambiance et d'annonces.",
        image: "/images/63966.jpg",
      },
      {
        title: "Système d'annonce multi-zones",
        location: "Cameroun",
        description:
          "Déploiement d'un système d'annonce permettant de cibler des zones spécifiques d'un site.",
        image: "/images/2.JPG",
      },
    ],

    metaTitle: "Sonorisation professionnelle & diffusion sonore à Douala | Winall Tech Sarl",
    metaDescription:
      "Installation de systèmes de sonorisation pour annonces, musique d'ambiance et alertes à Douala. Winall Tech Sarl assure une couverture sonore homogène de vos espaces.",
    keywords: ["sonorisation professionnelle Douala", "diffusion sonore entreprise Cameroun", "système d'annonce public", "musique d'ambiance commerce"],
    ogTitle: "Une diffusion sonore homogène et professionnelle pour tous vos espaces",
    ogDescription: "Zones mal couvertes, annonces inaudibles : notre équipe conçoit et installe un système de sonorisation adapté à l'acoustique réelle de votre site.",

    heroTitle: "Une diffusion sonore claire et homogène, de la musique d'ambiance aux annonces critiques",
    heroSubtitle: "Étude acoustique, enceintes bien positionnées et système multi-zones pour que chaque message soit entendu clairement, partout où il le faut.",

    problemIntro: "Une sonorisation mal étudiée laisse des zones mortes, rend les annonces inaudibles et dégrade l'expérience de vos clients ou usagers.",
    problems: [
      { label: "Zones sans couverture sonore", description: "Des espaces où la musique ou les annonces ne portent pas, créant une expérience incohérente." },
      { label: "Annonces inaudibles ou déformées", description: "Un matériel mal dimensionné ou mal positionné qui rend les messages difficiles à comprendre." },
      { label: "Absence de zonage", description: "Impossible de diffuser un message ciblé sans déranger l'ensemble du site." },
      { label: "Non-intégration avec l'alerte incendie", description: "Un système de sonorisation qui ne peut pas relayer une alerte de sécurité en cas d'urgence." },
    ],

    solutionTitle: "Un système de sonorisation étudié pour l'acoustique réelle de votre site",
    solutionDescription: "Nous réalisons une étude acoustique de votre espace, dimensionnons le nombre et la puissance des enceintes nécessaires, et installons un système multi-zones piloté simplement.",
    solutionHow: "Notre technicien étudie l'acoustique de chaque zone, positionne les enceintes pour une couverture homogène, installe l'amplification et configure le zonage selon vos besoins d'usage.",
    solutionWhy: "Une sonorisation bien étudiée améliore l'expérience client, garantit que vos annonces sont comprises, et peut relayer clairement une alerte de sécurité en cas de besoin.",

    transformations: [
      { before: "Zones mortes sans diffusion sonore", after: "Couverture sonore homogène sur l'ensemble du site" },
      { before: "Annonces inaudibles ou déformées", after: "Diffusion claire grâce à un dimensionnement acoustique précis" },
      { before: "Un seul canal de diffusion pour tout le site", after: "Zonage permettant des annonces ciblées par espace" },
      { before: "Sonorisation déconnectée de la sécurité", after: "Intégration possible avec l'alerte incendie et les annonces d'urgence" },
      { before: "Câblage audio non documenté", after: "Schéma de câblage et configuration remis en fin de chantier" },
      { before: "Aucun test en conditions réelles", after: "Système testé sur site avant validation finale" },
    ],

    solutions: [
      { name: "Étude acoustique & dimensionnement", description: "Analyse de l'espace pour déterminer le nombre, la puissance et le positionnement des enceintes.", benefits: "Une couverture sonore homogène sans zone morte.", expectedResult: "Plan d'implantation acoustique validé.", items: ["Relevé acoustique du site", "Calcul de couverture", "Choix des enceintes", "Plan d'implantation", "Simulation de diffusion"] },
      { name: "Installation de sonorisation", description: "Pose des enceintes, amplificateurs et câblage audio selon le plan validé.", benefits: "Une diffusion sonore claire et fiable au quotidien.", expectedResult: "Système installé et opérationnel.", items: ["Pose des enceintes", "Installation des amplificateurs", "Câblage audio blindé", "Raccordement des sources", "Tests de diffusion"] },
      { name: "Zonage & intégration sécurité", description: "Configuration de zones de diffusion indépendantes et intégration avec l'alerte incendie si nécessaire.", benefits: "Des annonces ciblées et une sécurité renforcée en cas d'urgence.", expectedResult: "Zonage fonctionnel avec priorité d'alerte configurée.", items: ["Configuration des zones", "Priorité aux annonces d'urgence", "Intégration alerte incendie", "Tests de bascule", "Formation à l'usage"] },
    ],

    features: [
      { name: "Étude acoustique préalable", advantage: "Dimensionnement basé sur la géométrie réelle et les matériaux de votre espace", clientBenefit: "Zéro zone morte et une diffusion homogène dès la mise en service." },
      { name: "Zonage indépendant", advantage: "Chaque zone peut recevoir un contenu sonore différent ou une annonce ciblée", clientBenefit: "Vous communiquez le bon message, au bon endroit, sans déranger le reste du site." },
      { name: "Intégration avec l'alerte incendie", advantage: "Priorité automatique donnée aux annonces d'urgence sur toute autre diffusion", clientBenefit: "Une sonorisation qui protège vos occupants en cas de besoin critique." },
    ],

    businessBenefits: [
      { category: "Expérience client", description: "Une ambiance sonore homogène qui valorise votre espace commercial ou d'accueil." },
      { category: "Communication interne", description: "Des annonces professionnelles claires pour informer vos équipes ou vos visiteurs." },
      { category: "Sécurité", description: "Une diffusion d'alerte fiable et prioritaire en cas de situation d'urgence." },
      { category: "Flexibilité", description: "Un zonage qui permet d'adapter la diffusion à chaque usage du site." },
      { category: "Image professionnelle", description: "Une sonorisation soignée qui reflète le sérieux de votre organisation." },
      { category: "Durabilité", description: "Des équipements professionnels dimensionnés pour un usage intensif et durable." },
    ],

    useCases: [
      { target: "Commerces & centres commerciaux", description: "Musique d'ambiance et annonces promotionnelles diffusées de façon homogène sur l'ensemble du site." },
      { target: "Hôtels & restaurants", description: "Ambiance sonore soignée dans les espaces communs et annonces discrètes pour le personnel." },
      { target: "Bureaux & sièges d'entreprise", description: "Système d'annonce pour les communications internes et l'accueil des visiteurs." },
      { target: "Établissements scolaires", description: "Diffusion des annonces et sonneries avec zonage par bâtiment ou par niveau." },
      { target: "Sites industriels", description: "Système d'annonce robuste intégré aux procédures de sécurité et d'évacuation." },
    ],

    processSteps: [
      { step: 1, title: "Visite & étude acoustique", objective: "Comprendre l'espace et vos besoins de diffusion.", actions: ["Relevé acoustique du site", "Identification des zones et usages"], deliverable: "Étude acoustique préliminaire." },
      { step: 2, title: "Plan d'implantation & devis", objective: "Vous proposer une solution chiffrée et dimensionnée.", actions: ["Élaboration du plan d'implantation", "Chiffrage détaillé des équipements"], deliverable: "Devis technique signé." },
      { step: 3, title: "Installation des équipements", objective: "Poser enceintes, amplificateurs et câblage.", actions: ["Pose des enceintes", "Installation de l'amplification et du câblage"], deliverable: "Système installé." },
      { step: 4, title: "Configuration du zonage", objective: "Paramétrer les zones et les priorités de diffusion.", actions: ["Configuration des zones sonores", "Intégration éventuelle de l'alerte incendie"], deliverable: "Zonage fonctionnel." },
      { step: 5, title: "Tests en conditions réelles", objective: "Valider la couverture et la clarté de la diffusion.", actions: ["Tests de niveau sonore par zone", "Ajustements de calibrage"], deliverable: "Rapport de tests de diffusion." },
      { step: 6, title: "Formation & documentation", objective: "Vous rendre autonome sur l'usage quotidien.", actions: ["Formation à l'utilisation du système", "Remise de la documentation technique"], deliverable: "Dossier technique complet." },
    ],

    faqs: [
      { question: "Pouvez-vous sonoriser un espace déjà aménagé sans gros travaux ?", answer: "Oui, nous adaptons l'installation aux contraintes existantes, avec des solutions de câblage apparent ou sans fil selon la configuration de votre site." },
      { question: "Le système permet-il de diffuser des annonces ciblées par zone ?", answer: "Oui, notre installation intègre un zonage qui permet de diffuser un message spécifique dans une zone sans déranger le reste du site." },
      { question: "Peut-on intégrer la sonorisation avec notre système d'alerte incendie ?", answer: "Oui, nous pouvons configurer une priorité automatique donnant la main aux annonces d'urgence sur toute autre diffusion en cours." },
      { question: "Quelle est la durée de vie d'un système de sonorisation professionnel ?", answer: "Avec un entretien adapté, les équipements professionnels que nous installons ont une durée de vie de 10 à 15 ans en usage normal." },
      { question: "Proposez-vous un contrat de maintenance pour la sonorisation ?", answer: "Oui, nous proposons des contrats de maintenance préventive incluant le contrôle des enceintes, amplificateurs et câblages." },
    ],

    ctaTitle: "Votre espace mérite une diffusion sonore claire, pas approximative.",
    ctaSubtitle: "Décrivez-nous votre site et vos besoins de diffusion. Nous revenons avec un plan d'implantation et un devis transparent.",
    ctaReassurance: "Visite technique gratuite — Devis sous 48h.",
  },

  // ─────────────────────────────────────────────────────────────
  // 12. DOMOTIQUE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "domotique",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "installations testées à la remise" },
    ],
    tools: [
      "Modules domotiques connectés",
      "Capteurs de présence & luminosité",
      "Interrupteurs et prises connectés",
      "Passerelle domotique centralisée",
      "Volets & stores motorisés",
      "Application de pilotage mobile",
    ],
    title: "Domotique",
    shortTitle: "Domotique",
    tagline: "Automatisez l'éclairage, les volets et le confort de vos espaces.",
    description:
      "Nous installons des solutions domotiques pour automatiser l'éclairage, le chauffage, les volets et la sécurité de votre logement ou de votre site professionnel.",
    image: "/images/2.JPG",
    icon: Home,
    highlights: [
      "Pilotage centralisé",
      "Automatisation de l'éclairage",
      "Scénarios personnalisés",
      "Contrôle à distance",
    ],
    deliverables: [
      "Étude des besoins",
      "Plan d'installation",
      "Configuration des scénarios",
      "Formation à l'usage",
    ],
    projects: [
      {
        title: "Domotique résidentielle",
        location: "Douala, Cameroun",
        description:
          "Automatisation de l'éclairage et des volets avec pilotage centralisé depuis smartphone.",
        image: "/images/2.JPG",
      },
      {
        title: "Automatisation de bureaux",
        location: "Cameroun",
        description:
          "Mise en place de scénarios d'éclairage et de gestion énergétique pour un plateau de bureaux.",
        image: "/images/image-choix.png",
      },
    ],

    metaTitle: "Installation domotique résidentielle & professionnelle à Douala | Winall Tech Sarl",
    metaDescription:
      "Automatisation de l'éclairage, des volets et du confort à Douala. Winall Tech Sarl installe des solutions domotiques pilotables à distance pour logements et bureaux.",
    keywords: ["domotique Douala", "maison connectée Cameroun", "automatisation éclairage entreprise", "pilotage à distance domotique"],
    ogTitle: "Automatisez le confort et l'énergie de votre espace avec une solution domotique sur-mesure",
    ogDescription: "Éclairage oublié allumé, volets à gérer manuellement, confort non optimisé : la domotique automatise ces tâches et réduit votre consommation énergétique.",

    heroTitle: "Pilotez l'éclairage, les volets et le confort de votre espace depuis votre téléphone",
    heroSubtitle: "Scénarios personnalisés, automatisation intelligente et contrôle à distance pour un espace plus confortable et plus économe en énergie.",

    problemIntro: "Éclairage oublié allumé, volets gérés manuellement, confort non optimisé : sans domotique, vous perdez en confort et en énergie au quotidien.",
    problems: [
      { label: "Éclairage et équipements oubliés allumés", description: "Une consommation énergétique inutile faute d'automatisation ou de contrôle centralisé." },
      { label: "Confort non adapté aux usages réels", description: "Chauffage, éclairage et volets gérés manuellement sans tenir compte de l'occupation réelle des pièces." },
      { label: "Absence de pilotage à distance", description: "Impossible de vérifier ou d'ajuster l'état de votre espace en votre absence." },
      { label: "Systèmes non centralisés", description: "Chaque équipement piloté séparément, sans scénario ni automatisation cohérente." },
    ],

    solutionTitle: "Une domotique centralisée qui automatise le confort et réduit la consommation énergétique",
    solutionDescription: "Nous installons des modules connectés pour l'éclairage, les volets et le chauffage, centralisés dans une application unique avec des scénarios adaptés à votre usage.",
    solutionHow: "Nous identifions vos besoins de confort et d'automatisation, installons les modules et capteurs nécessaires, configurons des scénarios personnalisés, puis vous formons au pilotage via l'application mobile.",
    solutionWhy: "Une domotique bien configurée réduit la consommation énergétique inutile, améliore le confort au quotidien et vous donne un contrôle total sur votre espace, même à distance.",

    transformations: [
      { before: "Éclairage géré manuellement pièce par pièce", after: "Automatisation selon présence et luminosité réelle" },
      { before: "Volets à ouvrir et fermer manuellement", after: "Volets programmés ou pilotés à distance" },
      { before: "Aucune visibilité sur l'état de l'espace à distance", after: "Contrôle et supervision depuis une application mobile" },
      { before: "Équipements pilotés séparément et sans cohérence", after: "Scénarios centralisés combinant plusieurs équipements" },
      { before: "Consommation énergétique non maîtrisée", after: "Automatisation réduisant les gaspillages énergétiques" },
      { before: "Installation domotique non testée à la livraison", after: "Scénarios testés et validés avant remise" },
    ],

    solutions: [
      { name: "Automatisation de l'éclairage", description: "Installation de modules et capteurs pour un éclairage qui s'adapte à la présence et à la luminosité.", benefits: "Un confort optimisé et une réduction de la consommation électrique.", expectedResult: "Éclairage automatisé pièce par pièce.", items: ["Capteurs de présence", "Capteurs de luminosité", "Modules d'éclairage connectés", "Scénarios lumineux", "Pilotage mobile"] },
      { name: "Volets & confort connecté", description: "Motorisation et pilotage des volets, stores et équipements de confort.", benefits: "Un confort géré automatiquement selon l'heure ou la météo.", expectedResult: "Volets et équipements pilotables à distance.", items: ["Motorisation des volets", "Programmation horaire", "Scénarios météo", "Intégration au pilotage central", "Tests de fonctionnement"] },
      { name: "Pilotage centralisé & scénarios", description: "Configuration d'une application unique pour piloter l'ensemble des équipements connectés.", benefits: "Une gestion simple et centralisée de tout votre espace.", expectedResult: "Application configurée avec scénarios personnalisés.", items: ["Passerelle domotique", "Scénarios personnalisés", "Application mobile", "Accès multi-utilisateurs", "Formation à l'usage"] },
    ],

    features: [
      { name: "Scénarios personnalisés", advantage: "Combinaison de plusieurs équipements en une seule action ou automatisation programmée", clientBenefit: "Un espace qui s'adapte à votre rythme de vie sans intervention manuelle." },
      { name: "Pilotage à distance sécurisé", advantage: "Contrôle et supervision de votre espace depuis une application mobile où que vous soyez", clientBenefit: "Vous gardez la main sur votre espace, même en votre absence." },
      { name: "Automatisation énergétique", advantage: "Extinction et ajustement automatique selon la présence réelle et les conditions ambiantes", clientBenefit: "Une réduction mesurable de votre consommation énergétique inutile." },
    ],

    businessBenefits: [
      { category: "Confort", description: "Un espace qui s'adapte automatiquement à vos usages et à vos habitudes." },
      { category: "Réduction des coûts", description: "Moins de gaspillage énergétique grâce à l'automatisation de l'éclairage et du chauffage." },
      { category: "Contrôle à distance", description: "Supervision et pilotage de votre espace depuis n'importe où." },
      { category: "Valeur immobilière", description: "Un logement ou bureau connecté valorisé à la revente ou à la location." },
      { category: "Sécurité perçue", description: "Simulation de présence et pilotage à distance qui dissuadent les intrusions." },
      { category: "Évolutivité", description: "Un système domotique qui s'étend facilement à de nouveaux équipements." },
    ],

    useCases: [
      { target: "Villas & résidences", description: "Automatisation complète de l'éclairage, des volets et du confort avec pilotage mobile." },
      { target: "Bureaux & sièges d'entreprise", description: "Gestion énergétique automatisée de l'éclairage selon l'occupation réelle des espaces." },
      { target: "Hôtels & résidences meublées", description: "Scénarios de confort activés automatiquement à l'arrivée des clients." },
      { target: "Commerces & vitrines", description: "Automatisation de l'éclairage de vitrine selon les horaires d'ouverture." },
      { target: "Propriétaires bailleurs", description: "Supervision à distance de biens loués pour un meilleur contrôle et une meilleure réactivité." },
    ],

    processSteps: [
      { step: 1, title: "Analyse des besoins & visite", objective: "Comprendre vos habitudes et vos priorités de confort.", actions: ["Visite du site", "Identification des équipements à automatiser"], deliverable: "Note de cadrage du projet." },
      { step: 2, title: "Conception des scénarios", objective: "Définir les automatisations les plus pertinentes pour vous.", actions: ["Élaboration des scénarios types", "Choix des équipements connectés"], deliverable: "Plan d'installation et devis." },
      { step: 3, title: "Installation des modules", objective: "Poser capteurs, modules et passerelle domotique.", actions: ["Installation des modules et capteurs", "Mise en place de la passerelle centrale"], deliverable: "Équipements installés." },
      { step: 4, title: "Configuration des scénarios", objective: "Paramétrer les automatisations validées avec vous.", actions: ["Configuration de l'application mobile", "Paramétrage des scénarios"], deliverable: "Scénarios opérationnels." },
      { step: 5, title: "Tests & ajustements", objective: "Valider le bon fonctionnement dans les conditions réelles.", actions: ["Tests des automatisations", "Ajustements selon vos retours"], deliverable: "Rapport de validation." },
      { step: 6, title: "Formation & documentation", objective: "Vous rendre autonome sur le pilotage au quotidien.", actions: ["Formation à l'application mobile", "Remise de la documentation"], deliverable: "Dossier technique et utilisateurs formés." },
    ],

    faqs: [
      { question: "Puis-je automatiser seulement une partie de mon espace pour commencer ?", answer: "Oui, nous concevons des installations évolutives : vous pouvez démarrer avec l'éclairage ou les volets et étendre le système progressivement." },
      { question: "La domotique fonctionne-t-elle en cas de coupure internet ?", answer: "Les automatisations locales (présence, horaires) continuent de fonctionner sans internet. Seul le pilotage à distance nécessite une connexion active." },
      { question: "Puis-je piloter plusieurs sites depuis une seule application ?", answer: "Oui, notre configuration permet de gérer plusieurs sites ou biens depuis une application unique avec des profils d'accès séparés." },
      { question: "Est-il possible d'intégrer la domotique avec l'alarme ou la vidéosurveillance ?", answer: "Oui, nous pouvons intégrer votre installation domotique avec vos systèmes de sécurité existants pour des scénarios combinés (simulation de présence, alertes)." },
      { question: "Combien de temps prend une installation domotique standard ?", answer: "Pour un logement ou un plateau de bureaux standard, comptez 2 à 5 jours d'installation selon le nombre d'équipements à automatiser." },
    ],

    ctaTitle: "Votre espace mérite plus de confort et moins de gaspillage énergétique.",
    ctaSubtitle: "Décrivez-nous vos habitudes et vos priorités. Nous revenons avec des scénarios adaptés et un devis transparent.",
    ctaReassurance: "Visite technique gratuite — Devis sous 48h.",
  },

  // ─────────────────────────────────────────────────────────────
  // 13. SYSTÈME INTELLIGENT
  // ─────────────────────────────────────────────────────────────
  {
    slug: "systeme-intelligent",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "systèmes supervisés à distance" },
    ],
    tools: [
      "Capteurs IoT connectés",
      "Passerelles & supervision cloud",
      "Automates programmables",
      "Tableaux de bord temps réel",
      "Alertes intelligentes",
      "Intégration multi-systèmes",
    ],
    title: "Système intelligent",
    shortTitle: "Système intelligent",
    tagline: "Automatisation et supervision intelligente de vos équipements techniques.",
    description:
      "Nous concevons des systèmes intelligents qui connectent, supervisent et automatisent vos équipements techniques pour une exploitation plus fluide et plus anticipée.",
    image: "/images/about-available.jpg",
    icon: BrainCircuit,
    highlights: [
      "Supervision centralisée",
      "Alertes anticipées",
      "Automatisation multi-systèmes",
      "Tableaux de bord temps réel",
    ],
    deliverables: [
      "Étude d'intégration",
      "Architecture du système",
      "Mise en service supervisée",
      "Tableau de bord opérationnel",
    ],
    projects: [
      {
        title: "Supervision technique centralisée",
        location: "Douala, Cameroun",
        description:
          "Mise en place d'un tableau de bord unique regroupant plusieurs systèmes techniques d'un site.",
        image: "/images/about-available.jpg",
      },
      {
        title: "Automatisation multi-équipements",
        location: "Cameroun",
        description:
          "Intégration de capteurs et automates pour anticiper les anomalies avant qu'elles ne deviennent critiques.",
        image: "/images/63966.jpg",
      },
    ],

    metaTitle: "Systèmes intelligents & supervision technique à Douala | Winall Tech Sarl",
    metaDescription:
      "Automatisation et supervision intelligente de vos équipements techniques à Douala. Winall Tech Sarl connecte vos systèmes pour une exploitation anticipée et centralisée.",
    keywords: ["système intelligent Douala", "supervision technique Cameroun", "automatisation IoT entreprise", "tableau de bord technique"],
    ogTitle: "Connectez et supervisez vos systèmes techniques depuis un tableau de bord unique",
    ogDescription: "Systèmes techniques cloisonnés, anomalies détectées trop tard : nos ingénieurs connectent vos équipements pour une supervision intelligente et anticipée.",

    heroTitle: "Connectez vos équipements techniques dans un système intelligent et anticipez chaque anomalie",
    heroSubtitle: "Supervision centralisée, alertes intelligentes et automatisation multi-systèmes pour une exploitation plus fluide et plus fiable de vos installations.",

    problemIntro: "Des systèmes techniques cloisonnés qui ne communiquent pas entre eux rendent la supervision impossible et les anomalies ne sont détectées qu'une fois le problème installé.",
    problems: [
      { label: "Systèmes techniques cloisonnés", description: "Chaque équipement fonctionne isolément, sans vue d'ensemble ni communication entre systèmes." },
      { label: "Anomalies détectées trop tard", description: "Sans supervision centralisée, les signaux faibles d'un dysfonctionnement passent inaperçus." },
      { label: "Absence de tableau de bord unique", description: "Impossible d'avoir une vision globale et instantanée de l'état de vos installations." },
      { label: "Automatisation limitée ou inexistante", description: "Des tâches répétitives gérées manuellement alors qu'elles pourraient être automatisées entre systèmes." },
    ],

    solutionTitle: "Une architecture intelligente qui connecte vos systèmes et anticipe les anomalies",
    solutionDescription: "Nous connectons vos équipements techniques via des capteurs et passerelles IoT, centralisons leur supervision dans un tableau de bord unique, et configurons des alertes anticipées.",
    solutionHow: "Notre équipe cartographie vos systèmes existants, définit l'architecture d'intégration la plus adaptée, déploie les capteurs et passerelles nécessaires, puis configure le tableau de bord et les alertes avec vous.",
    solutionWhy: "Un système intelligent transforme des données techniques dispersées en informations exploitables, permettant d'anticiper les pannes plutôt que de les subir.",

    transformations: [
      { before: "Systèmes techniques cloisonnés et déconnectés", after: "Architecture intégrée avec communication entre systèmes" },
      { before: "Anomalies découvertes après incident", after: "Alertes anticipées dès l'apparition des premiers signaux" },
      { before: "Aucune vue d'ensemble de l'exploitation", after: "Tableau de bord unique et centralisé" },
      { before: "Tâches répétitives gérées manuellement", after: "Automatisation des actions récurrentes entre systèmes" },
      { before: "Décisions basées sur des impressions terrain", after: "Décisions appuyées sur des données réelles et historisées" },
      { before: "Supervision limitée aux heures de présence", after: "Supervision continue, 24h/24, avec alertes à distance" },
    ],

    solutions: [
      { name: "Cartographie & architecture d'intégration", description: "Analyse de vos systèmes existants pour définir l'architecture d'intégration optimale.", benefits: "Une solution pensée pour vos systèmes réels, sans complexité inutile.", expectedResult: "Architecture d'intégration validée et documentée.", items: ["Cartographie des systèmes existants", "Étude de compatibilité", "Architecture d'intégration", "Choix des protocoles", "Plan de déploiement"] },
      { name: "Déploiement de capteurs & supervision", description: "Installation de capteurs IoT et passerelles pour centraliser la remontée d'information.", benefits: "Une visibilité totale sur l'état de vos installations en temps réel.", expectedResult: "Tableau de bord opérationnel avec données en temps réel.", items: ["Pose des capteurs IoT", "Installation des passerelles", "Configuration du tableau de bord", "Historisation des données", "Tests de remontée"] },
      { name: "Automatisation & alertes intelligentes", description: "Configuration de règles d'automatisation et d'alertes anticipées entre vos systèmes.", benefits: "Des anomalies détectées avant qu'elles ne deviennent critiques.", expectedResult: "Alertes et automatisations opérationnelles.", items: ["Règles d'automatisation", "Seuils d'alerte personnalisés", "Notifications à distance", "Scénarios inter-systèmes", "Formation à l'usage"] },
    ],

    features: [
      { name: "Tableau de bord unique", advantage: "Regroupement de tous vos systèmes techniques dans une interface centralisée et lisible", clientBenefit: "Une vision d'ensemble instantanée, sans avoir à consulter chaque système séparément." },
      { name: "Alertes anticipées configurables", advantage: "Détection des signaux faibles avant qu'un dysfonctionnement ne devienne critique", clientBenefit: "Vous intervenez avant la panne, pas après." },
      { name: "Automatisation inter-systèmes", advantage: "Des équipements différents qui communiquent et déclenchent des actions coordonnées", clientBenefit: "Moins de tâches manuelles répétitives pour vos équipes techniques." },
    ],

    businessBenefits: [
      { category: "Anticipation", description: "Détection des anomalies avant qu'elles n'affectent réellement votre exploitation." },
      { category: "Visibilité", description: "Une vue d'ensemble centralisée de l'état de vos installations techniques." },
      { category: "Productivité", description: "Automatisation des tâches répétitives entre systèmes, libérant du temps pour vos équipes." },
      { category: "Continuité d'activité", description: "Supervision continue qui réduit le risque de panne non détectée." },
      { category: "Aide à la décision", description: "Des données historisées qui appuient vos décisions techniques et budgétaires." },
      { category: "Évolutivité", description: "Une architecture capable d'intégrer de nouveaux systèmes au fil de votre croissance." },
    ],

    useCases: [
      { target: "Industries & usines", description: "Supervision centralisée des lignes de production et des équipements critiques." },
      { target: "Immeubles tertiaires", description: "Intégration de la gestion technique du bâtiment dans un tableau de bord unique." },
      { target: "Sites multi-équipements", description: "Connexion de systèmes hétérogènes (électrique, réseau, sécurité) dans une supervision commune." },
      { target: "Groupes multi-sites", description: "Supervision centralisée de plusieurs sites depuis un tableau de bord unique." },
      { target: "Gestionnaires techniques", description: "Aide à la décision basée sur des données réelles plutôt que sur des remontées terrain approximatives." },
    ],

    processSteps: [
      { step: 1, title: "Cartographie des systèmes existants", objective: "Comprendre vos équipements techniques actuels et leurs contraintes.", actions: ["Recensement des systèmes en place", "Identification des besoins de supervision"], deliverable: "Cartographie technique du site." },
      { step: 2, title: "Conception de l'architecture", objective: "Définir la solution d'intégration la plus adaptée.", actions: ["Étude de compatibilité des systèmes", "Élaboration de l'architecture d'intégration"], deliverable: "Architecture d'intégration validée." },
      { step: 3, title: "Devis & validation", objective: "Vous proposer une solution chiffrée et claire.", actions: ["Sélection des capteurs et passerelles", "Établissement du devis détaillé"], deliverable: "Devis signé." },
      { step: 4, title: "Déploiement des capteurs", objective: "Installer les équipements de collecte et de communication.", actions: ["Pose des capteurs IoT", "Installation des passerelles"], deliverable: "Infrastructure de supervision déployée." },
      { step: 5, title: "Configuration du tableau de bord", objective: "Mettre en place la supervision et les alertes.", actions: ["Paramétrage du tableau de bord", "Configuration des alertes et automatisations"], deliverable: "Système opérationnel." },
      { step: 6, title: "Formation & documentation", objective: "Vous rendre autonome sur la supervision quotidienne.", actions: ["Formation des équipes techniques", "Remise de la documentation complète"], deliverable: "Dossier technique et utilisateurs formés." },
    ],

    faqs: [
      { question: "Le système peut-il intégrer des équipements de marques différentes ?", answer: "Oui, notre architecture est conçue pour intégrer des équipements hétérogènes via des protocoles standards ou des passerelles dédiées." },
      { question: "Puis-je accéder à la supervision depuis mon téléphone ?", answer: "Oui, le tableau de bord est accessible depuis une application mobile ou un navigateur, avec des alertes envoyées directement sur votre téléphone." },
      { question: "Le système fonctionne-t-il sans connexion internet permanente ?", answer: "Les automatisations locales continuent de fonctionner sans internet. La supervision à distance et les alertes nécessitent cependant une connexion active." },
      { question: "Est-il possible d'ajouter de nouveaux systèmes après l'installation initiale ?", answer: "Oui, l'architecture est pensée pour être évolutive : de nouveaux capteurs ou systèmes peuvent être intégrés progressivement selon vos besoins." },
      { question: "Quel type d'entreprise a réellement besoin d'un système intelligent ?", answer: "Toute organisation avec plusieurs systèmes techniques à superviser (électrique, réseau, sécurité, production) gagne en visibilité et en réactivité grâce à cette solution." },
    ],

    ctaTitle: "Vos systèmes techniques méritent d'être connectés, pas cloisonnés.",
    ctaSubtitle: "Décrivez-nous vos équipements existants et vos objectifs de supervision. Nous revenons avec une architecture claire et un devis transparent.",
    ctaReassurance: "Étude de faisabilité gratuite — Architecture pensée pour évoluer avec vous.",
  },

  // ─────────────────────────────────────────────────────────────
  // 14. AUTRES
  // ─────────────────────────────────────────────────────────────
  {
    slug: "autres",
    keyStats: [
      { value: "14", label: "familles de services" },
      { value: "48h", label: "délai de réponse" },
      { value: "6j/7", label: "disponibilité technique" },
      { value: "100%", label: "projets cadrés sur mesure" },
    ],
    tools: [
      "Étude de besoin",
      "Cahier des charges",
      "Gestion de projet",
      "Coordination partenaires",
      "Suivi qualité",
      "Reporting & documentation",
    ],
    title: "Autres services",
    shortTitle: "Autres",
    tagline: "Un accompagnement technique sur mesure selon votre besoin.",
    description:
      "Pour les besoins spécifiques, nous cadrons le projet, identifions les compétences nécessaires et proposons une solution claire.",
    image: "/images/main-hero-imgAcceuil.png",
    icon: Blocks,
    highlights: [
      "Analyse du besoin",
      "Solution personnalisée",
      "Équipe adaptée",
      "Suivi de bout en bout",
    ],
    deliverables: [
      "Cadrage technique",
      "Proposition d'intervention",
      "Planning de réalisation",
      "Suivi après livraison",
    ],
    projects: [
      {
        title: "Accompagnement technique personnalisé",
        location: "Cameroun",
        description:
          "Cadrage et réalisation d'un besoin technique spécifique avec une équipe adaptée au terrain.",
        image: "/images/main-hero-imgAcceuil.png",
      },
      {
        title: "Mission ponctuelle spécialisée",
        location: "Douala, Cameroun",
        description:
          "Intervention courte pour résoudre un besoin opérationnel non couvert par une prestation standard.",
        image: "/images/image-choix.png",
      },
    ],

    metaTitle: "Services techniques sur mesure à Douala | Winall Tech Sarl",
    metaDescription:
      "Besoin technique spécifique non couvert par nos services standards ? Winall Tech Sarl analyse votre projet et mobilise les compétences nécessaires pour votre mission.",
    keywords: ["services techniques sur mesure Douala", "accompagnement technique Cameroun", "mission technique ponctuelle", "ingénierie sur mesure Cameroun"],
    ogTitle: "Un besoin technique spécifique ? Nous trouvons la solution adaptée à votre situation.",
    ogDescription: "Votre projet ne rentre dans aucune case standard. Notre approche sur mesure cadre votre besoin, mobilise les bonnes compétences et vous livre une solution qui fonctionne.",

    heroTitle: "Votre défi technique a une solution — même s'il sort des sentiers battus",
    heroSubtitle: "Pour tous les besoins techniques qui ne rentrent pas dans une case standard, notre équipe cadre le projet, mobilise les expertises et délivre une solution sur mesure.",

    problemIntro: "Certains besoins techniques ne correspondent à aucune offre standard. Vous perdez du temps à chercher le bon prestataire. Nous pouvons vous aider.",
    problems: [
      { label: "Besoin mal défini, difficile à chiffrer", description: "Vous savez ce que vous voulez atteindre, mais pas comment le formuler techniquement pour obtenir des devis cohérents." },
      { label: "Aucun prestataire spécialisé pour votre besoin", description: "Votre projet combine plusieurs disciplines et aucun intervenant ne prend en charge l'ensemble." },
      { label: "Risque de se tromper de solution", description: "Sans expertise technique préalable, vous risquez d'investir dans une solution inadaptée à votre problème réel." },
      { label: "Manque de suivi et d'accompagnement", description: "Les prestataires ponctuels réalisent leur mission et partent, sans se soucier du résultat final pour votre activité." },
    ],

    solutionTitle: "Un partenaire technique qui comprend votre besoin avant de vous proposer une solution",
    solutionDescription: "Quelle que soit la nature de votre besoin technique, nous commençons par comprendre votre objectif final. Nous cadrons ensuite la mission, mobilisons les compétences adaptées et assurons le suivi jusqu'au résultat.",
    solutionHow: "Un entretien structuré avec notre expert technique suffit pour clarifier votre besoin. Nous vous soumettons ensuite une proposition d'intervention claire avec les livrables, les délais et le budget.",
    solutionWhy: "Parce qu'un mauvais cadrage initial coûte souvent plus cher que la mission elle-même. Nous investissons du temps pour comprendre avant d'agir.",

    transformations: [
      { before: "Besoin flou impossible à chiffrer correctement", after: "Mission cadrée avec périmètre, délais et budget définis" },
      { before: "Difficulté à trouver le bon prestataire", after: "Un interlocuteur unique qui coordonne toutes les compétences" },
      { before: "Risque de solution inadaptée au problème réel", after: "Solution testée et validée avant déploiement complet" },
      { before: "Aucun suivi après la prestation", after: "Accompagnement jusqu'à l'atteinte de l'objectif" },
      { before: "Plusieurs prestataires sans coordination", after: "Chef de projet unique responsable du résultat final" },
      { before: "Budget imprévisible et dérapages fréquents", after: "Devis ferme avec engagements de résultat clairs" },
    ],

    solutions: [
      { name: "Cadrage technique de projet", description: "Analyse de votre besoin et définition du périmètre optimal d'intervention.", benefits: "Vous savez exactement ce qui va être fait, par qui et pour quel résultat.", expectedResult: "Note de cadrage avec périmètre, planning et budget.", items: ["Analyse du besoin", "Définition du périmètre", "Planning", "Budget", "Note de cadrage"] },
      { name: "Coordination multi-compétences", description: "Mobilisation et coordination des expertises nécessaires pour votre mission.", benefits: "Un seul interlocuteur pour une mission qui demande plusieurs compétences.", expectedResult: "Mission exécutée avec un chef de projet unique.", items: ["Mobilisation des expertises", "Chef de projet unique", "Coordination des intervenants", "Suivi d'avancement", "Interlocuteur dédié"] },
      { name: "Accompagnement et suivi post-mission", description: "Vérification que la solution déployée fonctionne et atteint les objectifs attendus.", benefits: "Vous n'êtes pas livré à vous-même après la livraison.", expectedResult: "Bilan de mission et recommandations pour la suite.", items: ["Vérification de la solution", "Contrôle des objectifs", "Bilan de mission", "Recommandations", "Support continu"] },
    ],

    features: [
      { name: "Écoute active et diagnostic avant devis", advantage: "Nous comprenons votre besoin réel avant de proposer une solution", clientBenefit: "Vous recevez une proposition adaptée à votre problème, pas une prestation catalogue." },
      { name: "Proposition technique claire et motivée", advantage: "Chaque élément du devis est expliqué et justifié", clientBenefit: "Vous comprenez ce que vous achetez et pourquoi." },
      { name: "Suivi de résultat post-livraison", advantage: "Point de contrôle après la mission pour valider que les objectifs sont atteints", clientBenefit: "Vous avez la certitude que la solution fonctionne dans votre contexte réel." },
    ],

    businessBenefits: [
      { category: "Gain de temps", description: "Plus de recherche du bon prestataire. Nous gérons la coordination pour vous." },
      { category: "Maîtrise du risque", description: "Un cadrage rigoureux en amont évite les mauvaises surprises et les surcoûts." },
      { category: "Expertise mobilisée", description: "Accès à un réseau de compétences techniques diversifiées sur une seule mission." },
      { category: "Résultat garanti", description: "Nous nous engageons sur les livrables, pas seulement sur les actions réalisées." },
      { category: "Flexibilité", description: "Missions ponctuelles ou accompagnement long terme selon votre besoin du moment." },
      { category: "Sérénité", description: "Un interlocuteur de confiance qui gère la complexité technique à votre place." },
    ],

    useCases: [
      { target: "Entreprises face à un projet atypique", description: "Tout projet qui combine plusieurs disciplines techniques et nécessite une coordination experte." },
      { target: "Startups & entreprises innovantes", description: "Accompagnement technique dans des domaines où votre équipe interne n'a pas encore l'expertise." },
      { target: "ONG & organisations internationales", description: "Missions terrain spécifiques dans un contexte local que nous connaissons parfaitement." },
      { target: "Administrations avec besoins ponctuels", description: "Expertise technique mobilisable rapidement pour des besoins non récurrents." },
      { target: "PME en transformation", description: "Accompagnement de projets de modernisation technique qui touchent à plusieurs domaines simultanément." },
    ],

    processSteps: [
      { step: 1, title: "Premier échange & écoute", objective: "Comprendre votre besoin réel et votre contexte.", actions: ["Entretien téléphonique ou en présentiel", "Identification de l'objectif final"], deliverable: "Synthèse du besoin exprimé." },
      { step: 2, title: "Analyse & cadrage technique", objective: "Définir la solution optimale pour votre besoin.", actions: ["Analyse de faisabilité", "Identification des compétences nécessaires"], deliverable: "Note de cadrage technique." },
      { step: 3, title: "Proposition & devis", objective: "Vous présenter une proposition claire et un budget maîtrisé.", actions: ["Rédaction de la proposition d'intervention", "Chiffrage détaillé"], deliverable: "Proposition technique et devis signé." },
      { step: 4, title: "Exécution de la mission", objective: "Réaliser la prestation selon le cadrage validé.", actions: ["Coordination des intervenants", "Suivi de l'avancement"], deliverable: "Livrables définis dans la proposition." },
      { step: 5, title: "Validation des résultats", objective: "S'assurer que l'objectif initial est atteint.", actions: ["Vérification des livrables", "Point de validation avec le client"], deliverable: "Procès-verbal de réception." },
      { step: 6, title: "Bilan & recommandations", objective: "Clôturer la mission avec des recommandations pour la suite.", actions: ["Bilan de mission", "Identification des prochaines étapes éventuelles"], deliverable: "Note de bilan et recommandations." },
    ],

    faqs: [
      { question: "Comment se déroule le premier échange si mon besoin est difficile à exprimer ?", answer: "Pas de panique. Notre expert pose les bonnes questions pour comprendre votre situation, votre objectif et vos contraintes. Ensemble, nous clarifions le besoin pour le transformer en mission actionnnable." },
      { question: "Travaillez-vous avec des partenaires externes pour les compétences que vous n'avez pas en interne ?", answer: "Oui, nous faisons appel à un réseau de partenaires techniques qualifiés selon les besoins spécifiques de chaque mission. Vous restez toujours notre seul interlocuteur." },
      { question: "Pouvez-vous intervenir sur des missions d'urgence ?", answer: "Oui, selon la nature de la mission et la disponibilité de nos équipes. Contactez-nous directement par téléphone ou WhatsApp pour les urgences." },
      { question: "Comment est fixé le prix d'une mission atypique ?", answer: "Le devis est établi après le cadrage technique. Il est basé sur la complexité de la mission, les compétences mobilisées et la durée estimée. Nous vous soumettons toujours un devis ferme avant tout commencement." },
      { question: "Avez-vous des références sur des missions similaires ?", answer: "Nous pouvons vous partager des exemples anonymisés de missions similaires selon votre domaine. Contactez-nous pour en discuter lors de notre premier échange." },
    ],

    ctaTitle: "Votre projet ne rentre dans aucune case ? C'est exactement pour ça que nous sommes là.",
    ctaSubtitle: "Décrivez-nous votre besoin tel que vous le vivez. Nous le cadrons techniquement et vous proposons une solution concrète.",
    ctaReassurance: "Premier échange gratuit et sans engagement — Réponse sous 24h.",
  },
];

export const MARKETING_STATS = [
  {
    value: "8",
    label: "familles de services",
  },
  {
    value: "4",
    label: "étapes de suivi projet",
  },
  {
    value: "1",
    label: "équipe terrain coordonnée",
  },
];

export const MARKETING_PROCESS = [
  "Visite technique et clarification du besoin",
  "Dimensionnement de la solution et planning",
  "Exécution terrain avec points de contrôle",
  "Réception, documentation et maintenance",
];

export function getServiceBySlug(serviceSlug: string): MarketingService | undefined {
  return MARKETING_SERVICES.find((service) => service.slug === serviceSlug);
}

export function getFeaturedProjects(limit: number): MarketingProjectWithService[] {
  return MARKETING_SERVICES.flatMap((service) =>
    service.projects.map((project) => ({
      ...project,
      serviceTitle: service.title,
      serviceSlug: service.slug,
    }))
  ).slice(0, limit);
}

export function getServiceSlugs(): ServiceSlug[] {
  return MARKETING_SERVICES.map((service) => service.slug);
}
