/**
 * Result型: 成功または失敗を表現する型
 */
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

/**
 * 成功を表すResultを作成
 */
export function ok<T, E>(value: T): Result<T, E> {
  return { ok: true, value };
}

/**
 * 失敗を表すResultを作成
 */
export function err<T, E>(error: E): Result<T, E> {
  return { ok: false, error };
}