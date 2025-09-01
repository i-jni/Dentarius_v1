// __tests__/formatters.test.js
import { expect, test, describe } from '@jest/globals';
import { formatDate, capitalize } from '../../utils/formatters.js';

describe('Formatters', () => {
  test('formatDate should format date correctly', () => {
    const date = new Date('2023-01-15');
    expect(formatDate(date)).toBe('2023-01-15');
  });

  test('capitalize should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('WORLD')).toBe('World');
    expect(capitalize('')).toBe('');
    expect(capitalize(null)).toBe('');
  });
});