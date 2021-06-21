import React from 'react';
import { render } from '@testing-library/react';
import { LiffProvider } from '../liff-provider';
import { initializeLiff } from '@/lib/liff';

// initializeLiffをモック化
jest.mock('@/lib/liff', () => ({
  initializeLiff: jest.fn().mockResolvedValue(undefined),
}));

describe('LiffProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize LIFF and render children', () => {
    // 環境変数のモック
    process.env.NEXT_PUBLIC_LIFF_ID = 'test-liff-id';
    
    // テスト用の子コンポーネント
    const TestChild = () => <div data-testid="test-child">Test Child</div>;
    
    // コンポーネントをレンダリング
    const { getByTestId } = render(
      <LiffProvider>
        <TestChild />
      </LiffProvider>
    );
    
    // initializeLiffが正しいIDで呼び出されたか確認
    expect(initializeLiff).toHaveBeenCalledWith('test-liff-id');
    
    // 子コンポーネントがレンダリングされているか確認
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  test('should handle missing LIFF ID', () => {
    // 環境変数をクリア
    delete process.env.NEXT_PUBLIC_LIFF_ID;
    
    // コンソールエラーをモック
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // テスト用の子コンポーネント
    const TestChild = () => <div data-testid="test-child">Test Child</div>;
    
    // コンポーネントをレンダリング
    const { getByTestId } = render(
      <LiffProvider>
        <TestChild />
      </LiffProvider>
    );
    
    // コンソールエラーが呼び出されたか確認
    expect(consoleErrorSpy).toHaveBeenCalledWith('LIFF ID is not defined in environment variables');
    
    // 子コンポーネントがレンダリングされているか確認
    expect(getByTestId('test-child')).toBeInTheDocument();
    
    // スパイをリストア
    consoleErrorSpy.mockRestore();
  });
});