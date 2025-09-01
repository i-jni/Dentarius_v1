import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../server.js';
import { generateToken } from '../../services/jwt.js';
import jwt from 'jsonwebtoken';

let server;

beforeAll(() => {
  // Démarrer le serveur sur un port de test
  server = app.listen(3004);
});

afterAll((done) => {
  // Fermer le serveur après les tests
  server.close(done);
});

describe('Authentication Security', () => {
  // Test pour vérifier que le service JWT fonctionne correctement
  test('JWT service should generate valid tokens', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = generateToken(user);
    
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // Format JWT standard
  });
  
  // Test pour vérifier que le service JWT rejette les tokens invalides
  test('JWT service should reject invalid tokens', () => {
    const invalidToken = 'invalid.token.format';
    
    // Cette fonction devrait lever une exception pour un token invalide
    expect(() => {
      jwt.verify(invalidToken, process.env.JWT_SECRET || 'your-secret-key');
    }).toThrow();
  });
  
  // Test pour vérifier que le service JWT rejette les tokens expirés
  test('JWT service should reject expired tokens', () => {
    // Créer un token expiré
    const expiredToken = jwt.sign(
      { id: 1, email: 'test@example.com' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '0s' }
    );
    
    // Cette fonction devrait lever une exception pour un token expiré
    expect(() => {
      jwt.verify(expiredToken, process.env.JWT_SECRET || 'your-secret-key');
    }).toThrow();
  });
});