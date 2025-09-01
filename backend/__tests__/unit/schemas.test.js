// __tests__/schemas.test.js
import { expect, test, describe } from '@jest/globals';
import { 
  createStudentSchema as studentSchema, 
  loginSchema, 
  registerSchema 
} from '../../validators/schemas.js';


describe('Validation Schemas', () => {
  test('studentSchema should validate valid student data', () => {
    const validStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      countryId: 1
    };
    
    const result = studentSchema.safeParse(validStudent);
    expect(result.success).toBe(true);
  });

  test('studentSchema should reject invalid student data', () => {
    const invalidStudent = {
      firstName: '',
      lastName: 'Doe',
      email: 'invalid-email',
      password: '123', // trop court
      countryId: 'abc' // devrait être un nombre
    };
    
    const result = studentSchema.safeParse(invalidStudent);
    expect(result.success).toBe(false);
  });

  test('loginSchema should validate valid login data', () => {
    const validLogin = {
      email: 'user@example.com',
      password: 'password123'
    };
    
    const result = loginSchema.safeParse(validLogin);
    expect(result.success).toBe(true);
  });

  test('registerSchema should validate valid registration data', () => {
    const validRegister = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      countryId: 1
    };
    
    const result = registerSchema.safeParse(validRegister);
    expect(result.success).toBe(true);
  });
});