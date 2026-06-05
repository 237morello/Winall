import prisma from "@/lib/prisma";
import type { FormStatut, ProjectStatut } from "@/lib/generated/prisma";

/**
 * MISSION : AdminService — Centralise la logique de récupération des données pour le Dashboard Admin.
 * Toutes les fonctions ici retournent des données prêtes à être consommées par les Server Components.
 */
export class AdminService {
  /**
   * Récupère les statistiques globales pour les cartes du dashboard.
   */
  static async getDashboardStats() {
    const [userCount, activeProjectCount, unreadFormCount, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.project.count({
        where: { statut: "EN_COURS" as ProjectStatut },
      }),
      prisma.formRequest.count({
        where: { statut: "NON_LU" as FormStatut },
      }),
      // Pour le revenu, on pourrait sommer les devis clos ou un champ spécifique. 
      // Ici, on simule une valeur ou on agrège si un champ montant existait.
      // Comme le schéma actuel n'a pas de champ 'montant' sur Project ou FormRequest, 
      // on retourne une valeur indicative ou on pourrait chercher dans le JSON 'donnees' des devis.
      Promise.resolve(0), 
    ]);

    return {
      userCount,
      activeProjectCount,
      unreadFormCount,
      totalRevenue,
    };
  }

  /**
   * Récupère la répartition des projets par domaine pour le graphique (Pie Chart).
   */
  static async getProjectsDistribution() {
    const distribution = await prisma.project.groupBy({
      by: ["domaine"],
      _count: {
        id: true,
      },
    });

    return distribution.map((item) => ({
      name: item.domaine,
      value: item._count.id,
    }));
  }

  /**
   * Récupère les 5 dernières demandes de formulaire.
   */
  static async getRecentFormRequests(limit = 5) {
    return prisma.formRequest.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Récupère le volume de demandes par mois sur les 6 derniers mois.
   */
  static async getMonthlyFormSubmissions() {
    // Note : Prisma ne gère pas nativement le groupement par mois sur PostgreSQL via groupBy.
    // On récupère les données brutes et on les formate en JS pour la simplicité ici.
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const requests = await prisma.formRequest.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const stats: Record<string, number> = {};

    // Initialiser les 6 derniers mois
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthLabel = months[d.getMonth()];
      stats[monthLabel] = 0;
    }

    requests.forEach((req) => {
      const monthLabel = months[req.createdAt.getMonth()];
      if (stats[monthLabel] !== undefined) {
        stats[monthLabel]++;
      }
    });

    return Object.entries(stats).map(([name, total]) => ({
      name,
      total,
    }));
  }

  /**
   * Récupère tous les projets pour le tableau de gestion.
   */
  static async getAllProjects() {
    return prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  /**
   * Récupère toutes les demandes pour le centre de traitement.
   */
  static async getAllRequests() {
    return prisma.formRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        project: {
          select: {
            id: true,
            titre: true,
          },
        },
      },
    });
  }

  /**
   * Récupère tous les utilisateurs pour la gestion admin.
   */
  static async getAllUsers() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  }
}
