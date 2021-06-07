# Re-Stock アプリの開発原則

## 関数型プログラミング (FP) アプローチ

### 基本原則
- 純粋関数を優先する
- 不変データ構造を使用する
- 副作用を分離する
- 型安全性を確保する

### 実装パターン
- 型安全性のためのブランド型の使用
```typescript
type Branded<T, B> = T & { _brand: B };
type Money = Branded<number, "Money">;
type Email = Branded<string, "Email">;
```

- バリデーション付きの作成関数
```typescript
function createMoney(amount: number): Result<Money, Error> {
  if (amount < 0) return err(new Error("負の金額は許可されていません"));
  return ok(amount as Money);
}
```

## ドメイン駆動設計 (DDD)

### 基本原則
- 値オブジェクトとエンティティを区別する
- 集約を通じて一貫性を確保する
- リポジトリでデータアクセスを抽象化する
- 境界づけられたコンテキストを意識する

### 実装パターン
- 値オブジェクト:
  - 不変
  - 値に基づく同一性
  - 自己検証
  - ドメイン操作を含む

- エンティティ:
  - IDに基づく同一性
  - 制御された更新
  - 一貫性ルール

- Result型:
```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```
  - 明示的な成功/失敗
  - 早期リターンパターンの使用
  - エラー型の定義

- リポジトリ:
  - ドメインモデルのみを扱う
  - 永続化の詳細を隠蔽する
  - テスト用のインメモリ実装を提供する

## テスト駆動開発 (TDD)

### 基本原則
- Red-Green-Refactorサイクル
- テストを仕様として扱う
- 小さな単位で反復する
- 継続的なリファクタリングを行う

### 実装戦略
1. **Red**: まず失敗するテストを書く
2. **Green**: テストに合格するための最小限のコードを実装する
3. **Refactor**: テストが通ったままコードを改善する

### テストツール
- Jest: Next.jsのデフォルトテストフレームワーク
- React Testing Library: UIコンポーネントのテスト用
- Cypress: E2Eテスト用（必要に応じて）

### 重要な概念
- テストは仕様である
- Assert-Act-Arrangeの順序で考える:
  1. 期待される結果を定義する（アサーション）
  2. 操作を定義する（テスト対象）
  3. セットアップを定義する（テスト環境）
- テスト名は「状況→操作→結果」の形式に従う

### リファクタリングフェーズのツール
1. **静的解析と型チェック**:
   - `yarn tsc --noEmit <target>`
   - `yarn lint <target>`

2. **コードカバレッジ測定**:
   - `yarn test --coverage`

3. **Gitによるバージョン管理**:
   - 各フェーズ（テスト作成→実装→リファクタリング）後にコミットする
   - タスク完了時にユーザーに確認する

## TypeScriptのベストプラクティス

### 方針
- 最初に型とそれを処理する関数のインターフェースを考える
- コードのコメントとして、そのファイルの仕様を可能な限り明記する
- 実装が内部状態を持たない場合、classによる実装を避けて関数を優先する
- 副作用を抽象化するために、アダプタパターンで外部依存を抽象化し、テストではインメモリなアダプタで処理する

### 型の使用方針
1. 具体的な型を使用する
   - anyの使用を避ける
   - unknownを使用してから型を絞り込む
   - Utility Typesを活用する

2. 型エイリアスの命名
   - 意味のある名前をつける
   - 型の意図を明確にする
   ```typescript
   // Good
   type UserId = string;
   type UserData = {
     id: UserId;
     createdAt: Date;
   };

   // Bad
   type Data = any;
   ```

### エラー処理
1. Result型の使用
   ```typescript
   import { err, ok, Result } from "neverthrow";

   type ApiError =
     | { type: "network"; message: string }
     | { type: "notFound"; message: string }
     | { type: "unauthorized"; message: string };

   async function fetchUser(id: string): Promise<Result<User, ApiError>> {
     try {
       const response = await fetch(`/api/users/${id}`);
       if (!response.ok) {
         switch (response.status) {
           case 404:
             return err({ type: "notFound", message: "ユーザーが見つかりません" });
           case 401:
             return err({ type: "unauthorized", message: "認証されていません" });
           default:
             return err({
               type: "network",
               message: `HTTPエラー: ${response.status}`,
             });
         }
       }
       return ok(await response.json());
     } catch (error) {
       return err({
         type: "network",
         message: error instanceof Error ? error.message : "不明なエラー",
       });
     }
   }
   ```

2. エラー型の定義
   - 具体的なケースを列挙する
   - エラーメッセージを含める
   - 型の網羅性チェックを活用する

### 実装パターン
1. 関数ベース（状態を持たない場合）
   ```typescript
   // インターフェース
   interface Logger {
     log(message: string): void;
   }

   // 実装
   function createLogger(): Logger {
     return {
       log(message: string): void {
         console.log(`[${new Date().toISOString()}] ${message}`);
       },
     };
   }
   ```

2. classベース（状態を持つ場合）
   ```typescript
   interface Cache<T> {
     get(key: string): T | undefined;
     set(key: string, value: T): void;
   }

   class TimeBasedCache<T> implements Cache<T> {
     private items = new Map<string, { value: T; expireAt: number }>();

     constructor(private ttlMs: number) {}

     get(key: string): T | undefined {
       const item = this.items.get(key);
       if (!item || Date.now() > item.expireAt) {
         return undefined;
       }
       return item.value;
     }

     set(key: string, value: T): void {
       this.items.set(key, {
         value,
         expireAt: Date.now() + this.ttlMs,
       });
     }
   }
   ```

3. Adapterパターン（外部依存の抽象化）
   ```typescript
   // 抽象化
   type Fetcher = <T>(path: string) => Promise<Result<T, ApiError>>;

   // 実装
   function createFetcher(headers: Record<string, string>): Fetcher {
     return async <T>(path: string) => {
       try {
         const response = await fetch(path, { headers });
         if (!response.ok) {
           return err({
             type: "network",
             message: `HTTPエラー: ${response.status}`,
           });
         }
         return ok(await response.json());
       } catch (error) {
         return err({
           type: "network",
           message: error instanceof Error ? error.message : "不明なエラー",
         });
       }
     };
   }

   // 利用
   class ApiClient {
     constructor(
       private readonly getData: Fetcher,
       private readonly baseUrl: string,
     ) {}

     async getUser(id: string): Promise<Result<User, ApiError>> {
       return await this.getData(`${this.baseUrl}/users/${id}`);
     }
   }
   ```

### 実装の選択基準
1. 関数を選ぶ場合
   - 単純な操作のみ
   - 内部状態が不要
   - 依存が少ない
   - テストが容易

2. classを選ぶ場合
   - 内部状態の管理が必要
   - 設定やリソースの保持が必要
   - メソッド間で状態を共有
   - ライフサイクル管理が必要

3. Adapterを選ぶ場合
   - 外部依存の抽象化
   - テスト時のモック化が必要
   - 実装の詳細を隠蔽したい
   - 差し替え可能性を確保したい

### 一般的なルール
1. 依存性の注入
   - 外部依存はコンストラクタで注入
   - テスト時にモックに置き換え可能に
   - グローバルな状態を避ける

2. インターフェースの設計
   - 必要最小限のメソッドを定義
   - 実装の詳細を含めない
   - プラットフォーム固有の型を避ける

3. テスト容易性
   - モックの実装を簡潔に
   - エッジケースのテストを含める
   - テストヘルパーを適切に分離

4. コードの分割
   - 単一責任の原則に従う
   - 適切な粒度でモジュール化
   - 循環参照を避ける
