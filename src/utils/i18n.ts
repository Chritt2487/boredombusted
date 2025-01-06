export type Language = 'en' | 'es' | 'fr';

export const translations = {
  en: {
    learnMore: "Learn More",
    shopOnAmazon: "Shop on Amazon",
    activityDetails: "Activity Details:",
    difficulty: "Difficulty",
    time: "Time",
    cost: "Cost",
  },
  es: {
    learnMore: "Más Información",
    shopOnAmazon: "Comprar en Amazon",
    activityDetails: "Detalles de la Actividad:",
    difficulty: "Dificultad",
    time: "Tiempo",
    cost: "Costo",
  },
  fr: {
    learnMore: "En Savoir Plus",
    shopOnAmazon: "Acheter sur Amazon",
    activityDetails: "Détails de l'Activité:",
    difficulty: "Difficulté",
    time: "Temps",
    cost: "Coût",
  }
};

export const getTranslation = (key: keyof typeof translations['en'], lang: Language = 'en') => {
  return translations[lang][key];
};