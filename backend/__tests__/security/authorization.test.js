import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../server.js';
import { generateToken } from '../../services/jwt.js';

let server;
let validToken;

beforeAll(() => {
  // Créer un token valide pour les tests
  validToken = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
  
  // Démarrer le serveur sur un port de test
  server = app.listen(3005);
});

afterAll((done) => {
  // Fermer le serveur après les tests
  server.close(done);
});

describe('API Security', () => {
  // Test pour vérifier que l'API est accessible
  test('API should be accessible', async () => {
    const response = await request(app)
      .get('/api/student');
    
    expect(response.status).toBe(200);
  });
  
  // Test pour vérifier la validation des entrées
  test('API should validate input data', async () => {
    const invalidData = {
      // Données incomplètes ou invalides
      firstName: '',
      email: 'invalid-email'
    };
    
    const response = await request(app)
      .post('/api/student')
      .send(invalidData);
    
    // La réponse devrait indiquer une erreur de validation
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  
  // Test pour vérifier la résistance aux injections SQL
  test('API should be resistant to SQL injection attempts', async () => {
    // Tentative d'injection SQL dans les paramètres de requête
    const response = await request(app)
      .get('/api/student?id=1%20OR%201=1');
    
    // L'API ne devrait pas planter avec une erreur 500
    expect(response.status).not.toBe(500);
  });
  
  // Test pour vérifier la résistance aux attaques XSS
  test('API should handle potentially malicious input', async () => {
    const maliciousData = {
      firstName: '<script>alert("XSS")</script>',
      lastName: 'User',
      email: `xss${Date.now()}@example.com`, // Email unique
      password: 'password123',
      countryId: 1
    };
    
    const response = await request(app)
      .post('/api/student')
      .send(maliciousData);
    
    // L'API ne devrait pas planter avec une erreur 500
    expect(response.status).not.toBe(500);
  });
});