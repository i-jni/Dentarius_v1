export default {
  testEnvironment: 'node',
  transform: {},
  // Supprimons cette ligne qui cause l'erreur
  // extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};