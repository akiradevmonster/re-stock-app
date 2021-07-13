"use client";

import { Item } from "@/types/inventory";
import { Result, ok, err } from "../result";

type NotificationResult = Result<void, Error>;

/**
 * LINE通知サービス
 * 
 * 注意: 実際のLINE通知送信には、サーバーサイドのAPIが必要です。
 * このモジュールはクライアントサイドでの実装のためのプロトタイプです。
 * 実際の環境では、サーバーサイドAPIを呼び出して通知を送信する必要があります。
 */
export class LineNotificationService {
  /**
   * ユーザーIDを取得
   */
  private static getUserId(): string | null {
    try {
      return window.liff.isLoggedIn() ? window.liff.getDecodedIDToken()?.sub || null : null;
    } catch (error) {
      console.error('Failed to get LINE user ID', error);
      return null;
    }
  }

  /**
   * 低在庫アイテムの通知
   */
  static async sendLowStockNotification(items: Item[]): Promise<NotificationResult> {
    try {
      const userId = this.getUserId();
      
      if (!userId) {
        return err(new Error('User not authenticated or LINE user ID not available'));
      }
      
      if (items.length === 0) {
        return ok(undefined);
      }
      
      // 通知メッセージを作成
      const itemNames = items.map(item => item.name.toString()).join('、');
      const message = `【在庫不足アラート】\n${itemNames} の在庫が不足しています。早めの購入をご検討ください。`;
      
      console.log(`[LINE Notification] Sending to user ${userId}: ${message}`);
      
      // 実際の実装では、ここでサーバーサイドAPIを呼び出し
      // await fetch('/api/notifications/line', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, message }),
      // });
      
      // プロトタイプのためのモック動作
      return new Promise((resolve) => {
        setTimeout(() => {
          // 成功
          resolve(ok(undefined));
        }, 500);
      });
    } catch (error) {
      console.error('Failed to send LINE notification', error);
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}