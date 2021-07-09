"use client";

import { StorageAdapter } from './storage-adapter';
import { Result, ok, err } from '../result';

/**
 * LINE用ストレージアダプタ
 * LINEユーザーIDに基づいてデータを保存する
 */
export class LineStorageAdapter implements StorageAdapter {
  /**
   * 現在のLINEユーザーIDを取得
   * ログインしていない場合は空文字を返す
   */
  private getUserId(): string {
    try {
      return window.liff.isLoggedIn() ? window.liff.getDecodedIDToken()?.sub || '' : '';
    } catch (error) {
      console.error('Failed to get user ID', error);
      return '';
    }
  }
  
  /**
   * ユーザーID付きのキーを生成
   */
  private getUserKey(key: string): string {
    const userId = this.getUserId();
    return userId ? `${userId}:${key}` : key;
  }
  
  /**
   * キーに対応する値を取得
   */
  async getItem(key: string): Promise<Result<string | null, Error>> {
    try {
      const userKey = this.getUserKey(key);
      const value = localStorage.getItem(userKey);
      return ok(value);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
  
  /**
   * キーと値を保存
   */
  async setItem(key: string, value: string): Promise<Result<void, Error>> {
    try {
      const userKey = this.getUserKey(key);
      localStorage.setItem(userKey, value);
      return ok(undefined);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
  
  /**
   * キーに対応する値を削除
   */
  async removeItem(key: string): Promise<Result<void, Error>> {
    try {
      const userKey = this.getUserKey(key);
      localStorage.removeItem(userKey);
      return ok(undefined);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}