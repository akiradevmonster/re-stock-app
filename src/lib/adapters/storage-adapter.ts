import { Result } from '../result';

/**
 * ストレージアダプタインターフェース
 * データの永続化を抽象化する
 */
export interface StorageAdapter {
  /**
   * キーに対応する値を取得
   */
  getItem(key: string): Promise<Result<string | null, Error>>;
  
  /**
   * キーと値を保存
   */
  setItem(key: string, value: string): Promise<Result<void, Error>>;
  
  /**
   * キーに対応する値を削除
   */
  removeItem(key: string): Promise<Result<void, Error>>;
}