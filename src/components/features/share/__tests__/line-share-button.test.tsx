import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LineShareButton } from '../line-share-button';
import type { Liff } from '@line/liff';

// window.liffをモック
const mockShareTargetPicker = jest.fn();
const mockIsInClient = jest.fn();
const mockOpenWindow = jest.fn();

global.window.liff = {
  shareTargetPicker: mockShareTargetPicker,
  isInClient: mockIsInClient,
  openWindow: mockOpenWindow,
} as unknown as Liff;

describe('LineShareButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should share message in LINE app', async () => {
    // LIFF内での実行をシミュレート
    mockIsInClient.mockReturnValue(true);
    mockShareTargetPicker.mockResolvedValue({ status: 'success' });
    
    const mockMessage = {
      type: 'text' as const,
      text: 'Test message',
    };
    
    const { getByText } = render(
      <LineShareButton message={mockMessage}>Share</LineShareButton>
    );
    
    // ボタンをクリック
    fireEvent.click(getByText('Share'));
    
    // シェア関数が呼び出されたか確認
    expect(mockShareTargetPicker).toHaveBeenCalledWith([mockMessage]);
  });

  test('should open browser for external sharing', async () => {
    // 外部ブラウザでの実行をシミュレート
    mockIsInClient.mockReturnValue(false);
    
    const mockMessage = {
      type: 'text' as const,
      text: 'Test message',
    };
    
    const { getByText } = render(
      <LineShareButton message={mockMessage}>Share</LineShareButton>
    );
    
    // ボタンをクリック
    fireEvent.click(getByText('Share'));
    
    // 外部ブラウザでのシェアが呼び出されたか確認
    expect(mockOpenWindow).toHaveBeenCalledWith({
      url: 'https://line.me/R/msg/text/?Test%20message',
      external: true,
    });
  });

  test('should handle errors', async () => {
    // エラーをシミュレート
    mockIsInClient.mockReturnValue(true);
    mockShareTargetPicker.mockRejectedValue(new Error('Share failed'));
    
    // コンソールエラーをモック
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const mockMessage = {
      type: 'text' as const,
      text: 'Test message',
    };
    
    const { getByText } = render(
      <LineShareButton message={mockMessage}>Share</LineShareButton>
    );
    
    // ボタンをクリック
    fireEvent.click(getByText('Share'));
    
    // エラーハンドリングの確認（非同期処理の完了を待つ）
    await new Promise(process.nextTick);
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to share message', expect.any(Error));
    
    // スパイをリストア
    consoleErrorSpy.mockRestore();
  });
});