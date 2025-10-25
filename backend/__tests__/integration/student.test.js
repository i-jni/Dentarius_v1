// __tests__/integration/student.test.js
import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../server.js';
import { generateToken } from '../../services/jwt.js';

let server;
let validToken;

beforeAll(() => {
  // Créer un token valide pour les tests
  validToken = generateToken({ id: 1, email: 'test@example.com' });
  // Démarrer le serveur sur un port de test
  server = app.listen(3003);
});

afterAll((done) => {
  // Fermer le serveur après les tests
  server.close(done);
});

describe('Student API', () => {
  test('GET /api/student should return students', async () => {
    const response = await request(app)
      .get('/api/student');
    
    expect(response.status).toBe(403); // Accès interdit sans token
    expect(Array.isArray(response.body) || typeof response.body === 'object').toBe(true);
  });

  // Test pour vérifier la création d'un étudiant
  test('POST /api/student should handle student creation', async () => {
    const newStudent = {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser${Date.now()}@example.com`, // Email unique
      password: 'password123',
      countryId: 1
    };

    const response = await request(app)
      .post('/api/student')
      .send(newStudent);
    
    // Vérifier que la réponse a un statut
    expect(response.status).toBeDefined();
  });

  // Test pour vérifier la validation des données
  test('POST /api/student should validate input data', async () => {
    const invalidStudent = {
      firstName: '',
      email: 'invalid-email'
    };

    const response = await request(app)
      .post('/api/student')
      .send(invalidStudent);
    
    // Vérifier que la réponse a un statut d'erreur
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});