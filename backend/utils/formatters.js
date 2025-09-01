// utils/formatters.js (créer ce fichier)
export function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}