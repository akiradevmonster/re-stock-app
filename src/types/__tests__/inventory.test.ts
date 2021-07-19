import {
  Item,
  createItemId,
  createItemName,
  createCategoryName,
  createBrandName,
  isItemLowStock,
  getLowStockItems
} from '../inventory';

describe('Inventory Domain Model', () => {
  describe('Value Objects', () => {
    it('should create branded ItemId', () => {
      const id = createItemId('test-id');
      expect(id).toBe('test-id');
      // The following is a type check that would fail at compile time if not a branded type
      // But we can't test types at runtime, so this is just for documentation
    });

    it('should create branded ItemName', () => {
      const name = createItemName('テスト商品');
      expect(name).toBe('テスト商品');
    });

    it('should create branded CategoryName', () => {
      const category = createCategoryName('テストカテゴリー');
      expect(category).toBe('テストカテゴリー');
    });

    it('should create branded BrandName', () => {
      const brand = createBrandName('テストブランド');
      expect(brand).toBe('テストブランド');
    });
  });

  describe('Domain Services', () => {
    describe('isItemLowStock', () => {
      it('should return true when total count equals threshold', () => {
        const item: Item = {
          id: createItemId('test-id'),
          name: createItemName('テスト商品'),
          category: createCategoryName('テストカテゴリー'),
          brand: createBrandName('テストブランド'),
          unopenedCount: 1,
          openedCount: 1,
          threshold: 2,
          purchaseUrl: null,
          image: null,
        };

        expect(isItemLowStock(item)).toBe(true);
      });

      it('should return true when total count is below threshold', () => {
        const item: Item = {
          id: createItemId('test-id'),
          name: createItemName('テスト商品'),
          category: createCategoryName('テストカテゴリー'),
          brand: createBrandName('テストブランド'),
          unopenedCount: 0,
          openedCount: 1,
          threshold: 2,
          purchaseUrl: null,
          image: null,
        };

        expect(isItemLowStock(item)).toBe(true);
      });

      it('should return false when total count is above threshold', () => {
        const item: Item = {
          id: createItemId('test-id'),
          name: createItemName('テスト商品'),
          category: createCategoryName('テストカテゴリー'),
          brand: createBrandName('テストブランド'),
          unopenedCount: 2,
          openedCount: 1,
          threshold: 2,
          purchaseUrl: null,
          image: null,
        };

        expect(isItemLowStock(item)).toBe(false);
      });
    });

    describe('getLowStockItems', () => {
      it('should return only low stock items', () => {
        const items: Item[] = [
          {
            id: createItemId('test-id-1'),
            name: createItemName('適正在庫商品'),
            category: createCategoryName('テストカテゴリー'),
            brand: createBrandName('テストブランド'),
            unopenedCount: 2,
            openedCount: 1,
            threshold: 2,
            purchaseUrl: null,
            image: null,
          },
          {
            id: createItemId('test-id-2'),
            name: createItemName('在庫不足商品1'),
            category: createCategoryName('テストカテゴリー'),
            brand: createBrandName('テストブランド'),
            unopenedCount: 1,
            openedCount: 0,
            threshold: 2,
            purchaseUrl: null,
            image: null,
          },
          {
            id: createItemId('test-id-3'),
            name: createItemName('在庫不足商品2'),
            category: createCategoryName('テストカテゴリー'),
            brand: createBrandName('テストブランド'),
            unopenedCount: 0,
            openedCount: 0,
            threshold: 1,
            purchaseUrl: null,
            image: null,
          }
        ];

        const lowStockItems = getLowStockItems(items);
        
        expect(lowStockItems).toHaveLength(2);
        expect(lowStockItems[0].id).toBe('test-id-2');
        expect(lowStockItems[1].id).toBe('test-id-3');
      });

      it('should return empty array when no items are low in stock', () => {
        const items: Item[] = [
          {
            id: createItemId('test-id-1'),
            name: createItemName('適正在庫商品1'),
            category: createCategoryName('テストカテゴリー'),
            brand: createBrandName('テストブランド'),
            unopenedCount: 2,
            openedCount: 1,
            threshold: 2,
            purchaseUrl: null,
            image: null,
          },
          {
            id: createItemId('test-id-2'),
            name: createItemName('適正在庫商品2'),
            category: createCategoryName('テストカテゴリー'),
            brand: createBrandName('テストブランド'),
            unopenedCount: 3,
            openedCount: 0,
            threshold: 2,
            purchaseUrl: null,
            image: null,
          }
        ];

        const lowStockItems = getLowStockItems(items);
        
        expect(lowStockItems).toHaveLength(0);
      });

      it('should return empty array for empty input', () => {
        const items: Item[] = [];
        const lowStockItems = getLowStockItems(items);
        expect(lowStockItems).toHaveLength(0);
      });
    });
  });
});