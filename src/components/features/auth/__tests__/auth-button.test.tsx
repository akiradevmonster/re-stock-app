import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthButton } from '../auth-button';
import { useAuthStore } from '@/stores/auth-store';

// モックの設定
jest.mock('@/stores/auth-store', () => ({
  useAuthStore: jest.fn(),
}));

describe('AuthButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render login button when not authenticated', () => {
    // 未認証状態のモック
    const loginMock = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
    });
    
    // コンポーネントをレンダリング
    const { getByText } = render(<AuthButton />);
    
    // ログインボタンがレンダリングされているか確認
    const loginButton = getByText('ログイン');
    expect(loginButton).toBeInTheDocument();
    
    // ボタンをクリック
    fireEvent.click(loginButton);
    
    // ログイン関数が呼び出されたか確認
    expect(loginMock).toHaveBeenCalled();
  });

  test('should render logout button when authenticated', () => {
    // 認証済み状態のモック
    const logoutMock = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: logoutMock,
    });
    
    // コンポーネントをレンダリング
    const { getByText } = render(<AuthButton />);
    
    // ユーザー名とログアウトボタンがレンダリングされているか確認
    expect(getByText('Test User')).toBeInTheDocument();
    const logoutButton = getByText('ログアウト');
    expect(logoutButton).toBeInTheDocument();
    
    // ボタンをクリック
    fireEvent.click(logoutButton);
    
    // ログアウト関数が呼び出されたか確認
    expect(logoutMock).toHaveBeenCalled();
  });

  test('should render loading state', () => {
    // ローディング状態のモック
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticating: true,
    });
    
    // コンポーネントをレンダリング
    const { getByText } = render(<AuthButton />);
    
    // ローディングテキストがレンダリングされているか確認
    expect(getByText('読み込み中...')).toBeInTheDocument();
  });
});