# Re-Stock アプリ システムパターン

## システムアーキテクチャ

Re-Stock アプリは、クリーンアーキテクチャとドメイン駆動設計の原則に基づいて構築されています。システムは以下の 4 つの主要レイヤーで構成されています：

### 1. プレゼンテーションレイヤー (components/, app/)

- ユーザーインターフェースを担当
- ユーザー入力の処理
- 状態の表示
- Next.js の App Router を活用したページ構成

### 2. アプリケーションレイヤー (stores/)

- ユースケースの実装
- 状態管理（Zustand）
- ドメインサービスの調整
- ユーザーアクションとドメインロジックの橋渡し

### 3. ドメインレイヤー (domain/)

- ビジネスロジック
- エンティティと値オブジェクト
- ドメインサービス
- ビジネスルールの実装

### 4. インフラストラクチャレイヤー (domain/repositories/ の実装)

- データの永続化（localStorage）
- 外部サービスとの連携
- 技術的な詳細の実装

## 依存関係の方向

依存関係は内側に向かって流れるように設計されています：

```
プレゼンテーション → アプリケーション → ドメイン ← インフラストラクチャ
```

- ドメインレイヤーは他のレイヤーに依存しない
- インフラストラクチャレイヤーはドメインレイヤーに依存する
- アプリケーションレイヤーはドメインレイヤーに依存する
- プレゼンテーションレイヤーはアプリケーションレイヤーとドメインレイヤーに依存する

この依存関係の方向により、ドメインロジックの独立性と再利用性が確保されます。

## ディレクトリ構造

```
src/
├── app/                 # Next.js App Router
├── components/          # UIコンポーネント
│   ├── ui/              # 基本UIコンポーネント（shadcn/ui）
│   └── features/        # 機能別コンポーネント
├── domain/              # ドメインモデル
│   ├── models/          # エンティティと値オブジェクト
│   ├── repositories/    # データアクセス抽象化
│   └── services/        # ドメインサービス
├── lib/                 # ユーティリティ関数
├── stores/              # 状態管理
└── types/               # 型定義
```

## 重要な技術的決定

### 1. 関数型アプローチの採用

- 純粋関数を優先
- 不変データ構造の使用
- 副作用の分離
- 型安全性の確保

### 2. ドメイン駆動設計の適用

- 値オブジェクトとエンティティの区別
- 集約による整合性の保証
- リポジトリによるデータアクセスの抽象化
- 境界付けられたコンテキストの意識

### 3. Result 型によるエラー処理

- 成功/失敗を明示的に表現
- 早期リターンパターンの使用
- エラー型の定義と型安全なエラーハンドリング

### 4. ブランド型による型安全性の確保

- プリミティブ型の拡張による型安全性の向上
- コンパイル時の型チェックによるエラー防止

## 使用中の設計パターン

### リポジトリパターン

データアクセスを抽象化し、ドメインモデルとデータソースを分離します。

```typescript
// リポジトリインターフェース
interface ItemRepository {
  findAll(): Promise<Result<Item[], Error>>;
  findById(id: ItemId): Promise<Result<Item | null, Error>>;
  save(item: Item): Promise<Result<void, Error>>;
  delete(id: ItemId): Promise<Result<void, Error>>;
}

// localStorage実装
class LocalStorageItemRepository implements ItemRepository {
  // 実装詳細
}

// インメモリ実装（テスト用）
class InMemoryItemRepository implements ItemRepository {
  // 実装詳細
}
```

### ファクトリパターン

値オブジェクトやエンティティの生成とバリデーションを担当します。

```typescript
// 値オブジェクトの作成関数
function createItemName(value: string): Result<ItemName, Error> {
  if (!value || value.trim() === "") {
    return err(new Error("アイテム名は空にできません"));
  }
  if (value.length > 100) {
    return err(new Error("アイテム名は100文字以内にしてください"));
  }
  return ok(value as ItemName);
}
```

### アダプターパターン

外部依存を抽象化し、テスト時に容易に差し替えられるようにします。

```typescript
// 抽象化されたインターフェース
interface StorageAdapter {
  getItem(key: string): Promise<Result<string | null, Error>>;
  setItem(key: string, value: string): Promise<Result<void, Error>>;
  removeItem(key: string): Promise<Result<void, Error>>;
}

// localStorage実装
class LocalStorageAdapter implements StorageAdapter {
  // 実装詳細
}

// インメモリ実装（テスト用）
class InMemoryStorageAdapter implements StorageAdapter {
  // 実装詳細
}
```

### コマンドパターン

ユーザーアクションをオブジェクトとしてカプセル化します。

```typescript
// コマンドの型定義
type AddItemCommand = {
  name: string;
  category: string;
  brand: string;
  unopenedCount: number;
  openedCount: number;
  threshold: number;
  purchaseUrl?: string;
};

// コマンドハンドラ
async function handleAddItemCommand(
  command: AddItemCommand,
  itemRepository: ItemRepository
): Promise<Result<Item, Error>> {
  // コマンドの処理
}
```

### オブザーバーパターン

状態変更を監視し、UI を更新します（Zustand により実装）。

```typescript
// Zustandストア
const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      // その他のアクション
    }),
    {
      name: "item-storage",
    }
  )
);
```

## コンポーネントの関係

### プレゼンテーションコンポーネントとコンテナコンポーネントの分離

- プレゼンテーションコンポーネント：見た目と振る舞いのみを担当
- コンテナコンポーネント：状態管理とデータフェッチングを担当

### 在庫操作UIコンポーネント
- **ItemOperationPanel**: ItemCardコンポーネントと連携し、在庫操作UIを提供
- **SwipeableItemCard**: ItemCardをラップし、スワイプ操作を可能にするコンポーネント
- **QuantityAdjustModal**: 詳細な数量調整用のモーダルコンポーネント

### コンポーネント間の通信

- Props：親から子へのデータ伝達
- コールバック：子から親へのイベント通知
- グローバルストア：コンポーネント間の共有状態

### コンポーネント階層

```
Layout
└── Page
    ├── Header
    │   └── Navigation
    ├── ItemList
    │   └── ItemCard
    │       ├── ItemDetails
    │       └── ItemActions
    └── AddItemForm
        ├── FormFields
        └── FormActions
```

## データフロー

1. ユーザーアクション → コンポーネント
2. コンポーネント → ストア（アクション）
3. ストア → リポジトリ（データ操作）
4. リポジトリ → 永続化層
5. 状態更新 → コンポーネント再レンダリング

このデータフローにより、単方向のデータの流れが確保され、アプリケーションの予測可能性と保守性が向上します。

### 在庫操作アクション
1. ユーザーがUIで在庫操作を実行
2. 操作に応じたアクションをZustandストアに発行
3. ストア内のinventoryReducerが状態を更新
4. 更新された状態をlocalStorageに永続化
5. UIが更新された状態を反映
