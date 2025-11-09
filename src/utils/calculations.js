/**
 * Convertit une allure (min/km) en vitesse (km/h)
 * @param {number} allureMin - Minutes
 * @param {number} allureSec - Secondes
 * @returns {number} Vitesse en km/h
 */
export function allureToVitesse(allureMin, allureSec) {
  const totalSeconds = allureMin * 60 + allureSec;
  if (totalSeconds === 0) return 0;
  return 3600 / totalSeconds;
}

/**
 * Convertit une vitesse (km/h) en allure (min/km)
 * @param {number} vitesse - Vitesse en km/h
 * @returns {{minutes: number, secondes: number}} Allure en min:sec
 */
export function vitesseToAllure(vitesse) {
  if (vitesse === 0) return { minutes: 0, secondes: 0 };
  const totalSeconds = 3600 / vitesse;
  const minutes = Math.floor(totalSeconds / 60);
  const secondes = Math.round(totalSeconds % 60);
  return { minutes, secondes };
}

/**
 * Formate une allure en string (ex: "4:30")
 * @param {number} minutes
 * @param {number} secondes
 * @returns {string}
 */
export function formatAllure(minutes, secondes) {
  // Protection contre les valeurs invalides
  if (isNaN(minutes) || isNaN(secondes)) {
    return '0:00';
  }
  return `${minutes}:${secondes.toString().padStart(2, '0')}`;
}

/**
 * Calcule le temps de passage pour une distance donnée
 * @param {number} distance - Distance en km
 * @param {number} allureMin - Minutes d'allure
 * @param {number} allureSec - Secondes d'allure
 * @returns {{heures: number, minutes: number, secondes: number}} Temps total
 */
export function calculerTempsPassage(distance, allureMin, allureSec) {
  const allureTotalSec = allureMin * 60 + allureSec;
  const totalSeconds = (distance * allureTotalSec);
  
  const heures = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secondes = Math.round(totalSeconds % 60);
  
  return { heures, minutes, secondes };
}

/**
 * Génère un tableau de temps de passage pour des intervalles donnés
 * @param {number} distanceTotale - Distance totale en km
 * @param {number} intervalle - Intervalle en km (ex: 5 pour tous les 5km)
 * @param {number} allureMin - Minutes d'allure
 * @param {number} allureSec - Secondes d'allure
 * @returns {Array<{distance: number, temps: {heures: number, minutes: number, secondes: number}}>} Tableau des temps de passage
 */
export function genererTableauTempsPassage(distanceTotale, intervalle, allureMin, allureSec) {
  const resultats = [];
  const allureTotalSec = allureMin * 60 + allureSec;
  
  // Ajouter le départ (0km)
  resultats.push({
    distance: 0,
    temps: { heures: 0, minutes: 0, secondes: 0 }
  });
  
  // Générer les temps de passage pour chaque intervalle
  for (let distance = intervalle; distance <= distanceTotale; distance += intervalle) {
    const temps = calculerTempsPassage(distance, allureMin, allureSec);
    resultats.push({
      distance: Math.round(distance * 10) / 10, // Arrondir à 1 décimale
      temps
    });
  }
  
  // Ajouter la distance totale si elle n'est pas déjà incluse
  const derniereDistance = resultats[resultats.length - 1].distance;
  if (derniereDistance < distanceTotale) {
    const tempsFinal = calculerTempsPassage(distanceTotale, allureMin, allureSec);
    resultats.push({
      distance: Math.round(distanceTotale * 10) / 10,
      temps: tempsFinal
    });
  }
  
  return resultats;
}

/**
 * Formate un temps en string (ex: "1h 23min 45s")
 * @param {number} heures
 * @param {number} minutes
 * @param {number} secondes
 * @returns {string}
 */
export function formatTemps(heures, minutes, secondes) {
  // Protection contre les valeurs invalides
  if (isNaN(heures) || isNaN(minutes) || isNaN(secondes)) {
    return '0s';
  }
  
  const parts = [];
  if (heures > 0) parts.push(`${heures}h`);
  if (minutes > 0 || heures > 0) parts.push(`${minutes}min`);
  if (secondes > 0 || parts.length === 0) parts.push(`${secondes}s`);
  return parts.join(' ');
}

