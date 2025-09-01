// __tests__/authMiddleware.test.js
import { expect, test, describe, jest } from '@jest/globals';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { generateToken } from '../../services/jwt.js';

describe('Auth Middleware', () => {
  test('should call next() with valid token', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = generateToken(user);
    
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    const next = jest.fn();
    
    authMiddleware(req, res, next);
    
    expect(next).toHaveBeenCalled();
    expect(req.user).toHaveProperty('id', 1);
    expect(req.user).toHaveProperty('email', 'test@example.com');
  });

  test('should return 401 with no token', () => {
    const req = {
      headers: {}
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    const next = jest.fn();
    
    authMiddleware(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
  });
});