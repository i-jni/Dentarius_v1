// __tests__/jwt.test.js
import { expect, test, describe } from '@jest/globals';
import { generateToken, verifyToken } from '../services/jwt.js';

describe('JWT Service', () => {
  test('generateToken should create a token', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = generateToken(user);
    
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(10);
  });
    
  test('verifyToken should validate a valid token', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = generateToken(user);
    
    const decoded = verifyToken(token);
    expect(decoded).toHaveProperty('id', 1);
    expect(decoded).toHaveProperty('email', 'test@example.com');
  });
});