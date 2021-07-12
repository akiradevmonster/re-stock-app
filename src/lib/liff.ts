import type { Liff } from '@line/liff';

declare global {
  interface Window {
    liff: Liff;
  }
}

/**
 * Initialize the LIFF SDK with the provided LIFF ID
 * 
 * @param liffId - The LIFF ID obtained from LINE Developer Console
 * @returns Promise that resolves when initialization is complete
 */
export const initializeLiff = async (liffId: string): Promise<void> => {
  try {
    const liff = (await import('@line/liff')).default;
    
    // LIFFの初期化オプション（リダイレクトを処理するように設定）
    await liff.init({ 
      liffId,
      withLoginOnExternalBrowser: true, // 外部ブラウザでも認証を試みる
    });
    
    window.liff = liff;
    
    // デバッグ情報の出力
    console.log('LIFF initialized successfully');
    console.log('LIFF isLoggedIn:', liff.isLoggedIn());
    console.log('LIFF isInClient:', liff.isInClient());
    
    // 認証コードによるリダイレクト後の処理
    if (new URLSearchParams(window.location.search).has('code')) {
      console.log('Detected authorization code in URL');
    }
    
  } catch (error) {
    console.error('LIFF initialization failed', error);
  }
};