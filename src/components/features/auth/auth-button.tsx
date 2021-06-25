"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";

/**
 * LINE認証用のボタンコンポーネント
 * - 未認証時：ログインボタンを表示
 * - 認証中：ローディング表示
 * - 認証済み：ユーザー名とログアウトボタンを表示
 */
export function AuthButton() {
  const { isAuthenticated, isAuthenticating, user, login, logout } = useAuthStore();

  // 認証中の場合
  if (isAuthenticating) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        読み込み中...
      </div>
    );
  }

  // 認証済みの場合
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{user.name}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
        >
          ログアウト
        </Button>
      </div>
    );
  }

  // 未認証の場合
  return (
    <Button 
      onClick={login}
      size="sm"
    >
      ログイン
    </Button>
  );
}