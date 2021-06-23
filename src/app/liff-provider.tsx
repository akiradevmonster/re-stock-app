"use client";

import { ReactNode, useEffect, useState } from 'react';
import { initializeLiff } from '@/lib/liff';
import { useAuthStore } from '@/stores/auth-store';

interface LiffProviderProps {
  children: ReactNode;
}

/**
 * LIFF SDK初期化を行うためのプロバイダーコンポーネント
 */
export function LiffProvider({ children }: LiffProviderProps) {
  const [, setIsLiffInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();

  useEffect(() => {
    // 環境変数からLIFF IDを取得
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    
    if (!liffId) {
      setError('LIFF ID is not defined in environment variables');
      console.error('LIFF ID is not defined in environment variables');
      return;
    }
    
    console.log('Initializing LIFF with ID:', liffId);
    
    // LIFF SDKを初期化
    const initLiff = async () => {
      try {
        await initializeLiff(liffId);
        setIsLiffInitialized(true);
        
        // URLのパラメータをチェック
        const urlParams = new URLSearchParams(window.location.search);
        
        // redirect_uriへ認証コードが返された場合の処理
        if (urlParams.has('code') && urlParams.has('state')) {
          console.log('Authorization code detected, handling login redirect...');
        }
        
        // LIFF内で実行されている場合、または認証完了している場合
        if (window.liff?.isInClient() || window.liff?.isLoggedIn()) {
          console.log('User is in LINE app or already logged in, retrieving profile...');
          await login();
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(`LIFF initialization failed: ${message}`);
        console.error('LIFF initialization failed:', err);
      }
    };
    
    initLiff();
  }, [login]);

  // エラーがある場合は表示
  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>LINEミニアプリの初期化に失敗しました。</p>
        <p className="text-sm">{error}</p>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}