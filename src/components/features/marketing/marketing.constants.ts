import {
  Blocks,
  Building2,
  Cpu,
  Flame,
  HardHat,
  Network,
  Palette,
  Wrench,
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
      { value: "8", label: "familles de services" },
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
      { value: "8", label: "familles de services" },
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
      { value: "8", label: "familles de services" },
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
      { value: "8", label: "familles de services" },
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
      { value: "8", label: "familles de services" },
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
      { value: "8", label: "familles de services" },
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
      { value: "8", label: "familles de services" },
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
  // 8. AUTRES
  // ─────────────────────────────────────────────────────────────
  {
    slug: "autres",
    keyStats: [
      { value: "8", label: "familles de services" },
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
