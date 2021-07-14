import { create } from 'zustand';
import { createAuthStore } from '../auth-store';

// LIFFモック
const mockLiff = {
  isLoggedIn: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  getProfile: jest.fn(),
};

// windowオブジェクトモック
Object.defineProperty(global, 'window', {
  value: {
    liff: mockLiff,
  },
  writable: true,
});

describe('Auth Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should start with not authenticated state', () => {
    const store = create(createAuthStore);
    const state = store.getState();
    
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  test('should login user when LIFF is available', async () => {
    mockLiff.isLoggedIn.mockReturnValue(true);
    mockLiff.getProfile.mockResolvedValue({
      userId: 'user123',
      displayName: 'Test User',
      pictureUrl: 'https://example.com/pic.jpg',
    });

    const store = create(createAuthStore);
    await store.getState().login();
    const state = store.getState();
    
    expect(mockLiff.getProfile).toHaveBeenCalled();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({
      id: 'user123',
      name: 'Test User',
      picture: 'https://example.com/pic.jpg',
    });
  });

  test('should call LIFF login when user is not logged in', async () => {
    mockLiff.isLoggedIn.mockReturnValue(false);
    
    const store = create(createAuthStore);
    await store.getState().login();
    
    expect(mockLiff.login).toHaveBeenCalled();
    expect(store.getState().isAuthenticated).toBe(false);
  });

  test('should logout user', () => {
    mockLiff.isLoggedIn.mockReturnValue(true);
    
    const store = create(createAuthStore);
    // 初期状態でログイン状態にする
    store.setState({
      user: { id: 'user123', name: 'Test User', picture: 'https://example.com/pic.jpg' },
      isAuthenticated: true,
    });
    
    store.getState().logout();
    
    expect(mockLiff.logout).toHaveBeenCalled();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isAuthenticated).toBe(false);
  });
});