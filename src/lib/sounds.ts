/**
 * Gestionnaire de sons Winall Tech
 */

const SOUND_URLS = {
  notification: "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3", // Ding discret
  message: "https://assets.mixkit.co/active_storage/sfx/1359/1359-preview.mp3",      // Pop léger
  success: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",      // Validation
};

export function playSound(type: keyof typeof SOUND_URLS) {
  if (typeof window === "undefined") return;

  const audio = new Audio(SOUND_URLS[type]);
  audio.volume = 0.5;
  audio.play().catch((err) => {
    // Les navigateurs bloquent souvent l'audio sans interaction préalable
    console.warn("L'audio n'a pas pu être joué (interaction requise) :", err);
  });
}
