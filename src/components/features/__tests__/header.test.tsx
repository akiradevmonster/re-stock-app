import React from 'react';
import { render } from '@testing-library/react';
import Header from '../header';

// AuthButtonコンポーネントをモック
jest.mock('../auth/auth-button', () => ({
  AuthButton: () => <div data-testid="auth-button-mock">Auth Button Mock</div>,
}));

describe('Header', () => {
  test('should render title and auth button', () => {
    const { getByText, getByTestId } = render(<Header title="Test Title" />);
    
    // タイトルが表示されているか確認
    expect(getByText('Test Title')).toBeInTheDocument();
    
    // 認証ボタンが表示されているか確認
    expect(getByTestId('auth-button-mock')).toBeInTheDocument();
  });
});