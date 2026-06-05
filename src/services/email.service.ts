import { resend } from "@/lib/resend";

export class EmailService {
  static async envoyerNotificationProjet(emailClient: string, nomClient: string, titreProjet: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      await resend.emails.send({
        from: "Winall Tech <notifications@winall.tech>",
        to: emailClient,
        subject: `🚀 Nouveau projet lancé : ${titreProjet}`,
        html: `
          <h1>Bonjour ${nomClient},</h1>
          <p>Un nouveau projet a été créé pour vous sur votre espace Winall Tech : <strong>${titreProjet}</strong>.</p>
          <p>Vous pouvez suivre l'avancement en temps réel sur votre dashboard.</p>
          <a href="https://winall.tech/dashboard">Accéder à mon espace</a>
        `,
      });
    } catch (error) {
      console.error("Erreur envoi email projet:", error);
    }
  }

  static async envoyerNotificationMessage(emailDestinataire: string, expediteur: string, apercu: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      await resend.emails.send({
        from: "Winall Tech <messages@winall.tech>",
        to: emailDestinataire,
        subject: `💬 Nouveau message de ${expediteur}`,
        html: `
          <h3>Vous avez reçu un nouveau message</h3>
          <p><strong>${expediteur}</strong> : "${apercu}"</p>
          <a href="https://winall.tech/dashboard/chat">Répondre sur le chat</a>
        `,
      });
    } catch (error) {
      console.error("Erreur envoi email message:", error);
    }
  }
}
