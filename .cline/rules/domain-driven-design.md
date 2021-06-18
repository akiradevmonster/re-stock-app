# Re-Stock アプリのドメイン駆動設計 (DDD)

## 基本原則

Re-Stock アプリでは、以下の基本原則に従ってドメイン駆動設計を適用します：

- 値オブジェクトとエンティティを区別する
- 集約を通じて一貫性を確保する
- リポジトリでデータアクセスを抽象化する
- 境界づけられたコンテキストを意識する

## ドメインモデル

### 値オブジェクト

値オブジェクトは以下の特性を持ちます：

- 不変
- 値に基づく同一性
- 自己検証
- ドメイン操作を含む

```typescript
// 値オブジェクトの例
type ItemId = Branded<string, 'ItemId'>;

function createItemId(value: string): Result<ItemId, Error> {
  if (!value || value.trim() === '') {
    return err(new Error('ItemIdは空にできません'));
  }
  return ok(value as ItemId);
}

type ItemName = Branded<string, 'ItemName'>;

function createItemName(value: string): Result<ItemName, Error> {
  if (!value || value.trim() === '') {
    return err(new Error('アイテム名は空にできません'));
  }
  if (value.length > 100) {
    return err(new Error('アイテム名は100文字以内にしてください'));
  }
  return ok(value as ItemName);
}
```

### エンティティ

エンティティは以下の特性を持ちます：

- IDに基づく同一性
- 制御された更新
- 一貫性ルール

```typescript
// エンティティの例
type Item = {
  id: ItemId;
  name: ItemName;
  category: Category;
  brand: BrandName;
  unopenedCount: number;
  openedCount: number;
  threshold: number;
  purchaseUrl: URL | null;
};

function createItem(params: {
  id: ItemId;
  name: ItemName;
  category: Category;
  brand: BrandName;
  unopenedCount: number;
  openedCount: number;
  threshold: number;
  purchaseUrl?: string;
}): Result<Item, Error> {
  // バリデーション
  if (params.unopenedCount < 0) {
    return err(new Error('未開封数は0以上である必要があります'));
  }
  if (params.openedCount < 0) {
    return err(new Error('開封済み数は0以上である必要があります'));
  }
  if (params.threshold < 0) {
    return err(new Error('閾値は0以上である必要があります'));
  }

  // URLの検証
  let purchaseUrl: URL | null = null;
  if (params.purchaseUrl) {
    try {
      purchaseUrl = new URL(params.purchaseUrl);
    } catch {
      return err(new Error('購入URLの形式が正しくありません'));
    }
  }

  return ok({
    id: params.id,
    name: params.name,
    category: params.category,
    brand: params.brand,
    unopenedCount: params.unopenedCount,
    openedCount: params.openedCount,
    threshold: params.threshold,
    purchaseUrl,
  });
}
```

### ドメインサービス

ドメインサービスは、単一のエンティティや値オブジェクトに属さない操作を提供します：

```typescript
// ドメインサービスの例
function isItemLowStock(item: Item): boolean {
  const totalCount = item.unopenedCount + item.openedCount;
  return totalCount <= item.threshold;
}

function getLowStockItems(items: Item[]): Item[] {
  return items.filter(isItemLowStock);
}
```

## リポジトリ

リポジトリはデータアクセスを抽象化します：

```typescript
// リポジトリインターフェース
interface ItemRepository {
  findAll(): Promise<Result<Item[], Error>>;
  findById(id: ItemId): Promise<Result<Item | null, Error>>;
  save(item: Item): Promise<Result<void, Error>>;
  delete(id: ItemId): Promise<Result<void, Error>>;
}

// インメモリ実装（テスト用）
class InMemoryItemRepository implements ItemRepository {
  private items: Map<string, Item> = new Map();

  async findAll(): Promise<Result<Item[], Error>> {
    return ok(Array.from(this.items.values()));
  }

  async findById(id: ItemId): Promise<Result<Item | null, Error>> {
    const item = this.items.get(id);
    return ok(item || null);
  }

  async save(item: Item): Promise<Result<void, Error>> {
    this.items.set(item.id, { ...item });
    return ok(undefined);
  }

  async delete(id: ItemId): Promise<Result<void, Error>> {
    this.items.delete(id);
    return ok(undefined);
  }
}

// localStorage実装
class LocalStorageItemRepository implements ItemRepository {
  private readonly storageKey = 'items';

  async findAll(): Promise<Result<Item[], Error>> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) {
        return ok([]);
      }
      return ok(JSON.parse(data));
    } catch (error) {
      return err(new Error('アイテムの取得に失敗しました'));
    }
  }

  // 他のメソッドも同様に実装
}
```

## アプリケーションサービス

アプリケーションサービスはユースケースを実装します：

```typescript
// アプリケーションサービスの例
class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async addItem(params: {
    name: string;
    category: string;
    brand: string;
    unopenedCount: number;
    openedCount: number;
    threshold: number;
    purchaseUrl?: string;
  }): Promise<Result<Item, Error>> {
    // IDの生成
    const idResult = createItemId(crypto.randomUUID());
    if (!idResult.ok) return idResult;

    // 名前の検証
    const nameResult = createItemName(params.name);
    if (!nameResult.ok) return nameResult;

    // カテゴリの検証
    const categoryResult = createCategory(params.category);
    if (!categoryResult.ok) return categoryResult;

    // ブランド名の検証
    const brandResult = createBrandName(params.brand);
    if (!brandResult.ok) return brandResult;

    // アイテムの作成
    const itemResult = createItem({
      id: idResult.value,
      name: nameResult.value,
      category: categoryResult.value,
      brand: brandResult.value,
      unopenedCount: params.unopenedCount,
      openedCount: params.openedCount,
      threshold: params.threshold,
      purchaseUrl: params.purchaseUrl,
    });
    if (!itemResult.ok) return itemResult;

    // 保存
    const saveResult = await this.itemRepository.save(itemResult.value);
    if (!saveResult.ok) return saveResult;

    return ok(itemResult.value);
  }

  // 他のユースケースも同様に実装
}
```

## 型安全性

### ブランド型

型安全性を確保するためにブランド型を使用します：

```typescript
type Branded<T, B> = T & { _brand: B };

type ItemId = Branded<string, 'ItemId'>;
type ItemName = Branded<string, 'ItemName'>;
type BrandName = Branded<string, 'BrandName'>;
```

### Result型

操作の成功/失敗を明示的に表現するためにResult型を使用します：

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function ok<T, E>(value: T): Result<T, E> {
  return { ok: true, value };
}

function err<T, E>(error: E): Result<T, E> {
  return { ok: false, error };
}
```

## 実装アプローチ

1. まず型と、それを処理する関数のインターフェースを考える
2. ドメインの言語を型で表現する
3. 外部依存のない純粋関数から実装する
4. テストを先に書く
5. IO操作は関数の境界に押し出す
6. 外部サービスやDBへのアクセスを抽象化する
