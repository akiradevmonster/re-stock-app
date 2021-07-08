// Global imports for testing
import '@testing-library/jest-dom';

// Mock implementations for testing environment
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
