// ブランド型
export type Branded<T, B> = T & { _brand: B };

// 値オブジェクト
export type ItemId = Branded<string, 'ItemId'>;
export type ItemName = Branded<string, 'ItemName'>;
export type CategoryName = Branded<string, 'CategoryName'>;
export type BrandName = Branded<string, 'BrandName'>;

// エンティティ
export interface Item {
  id: ItemId;
  name: ItemName;
  category: CategoryName;
  brand: BrandName;
  unopenedCount: number;
  openedCount: number;
  threshold: number;
  purchaseUrl: string | null;
  image: string | null;
}

// 表示用のカテゴリグループ
export interface CategoryGroup {
  id: string;
  name: string;
  items: Item[];
}

// ファクトリ関数
export function createItemId(value: string): ItemId {
  return value as ItemId;
}

export function createItemName(value: string): ItemName {
  return value as ItemName;
}

export function createCategoryName(value: string): CategoryName {
  return value as CategoryName;
}

export function createBrandName(value: string): BrandName {
  return value as BrandName;
}

// ドメインサービス
export function isItemLowStock(item: Item): boolean {
  return item.unopenedCount + item.openedCount <= item.threshold;
}

export function getLowStockItems(items: Item[]): Item[] {
  return items.filter(isItemLowStock);
}
