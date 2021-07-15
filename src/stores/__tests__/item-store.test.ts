import { act, renderHook } from '@testing-library/react';
import { ItemId, createItemId, createItemName, createCategoryName, createBrandName } from '@/types/inventory';
import { useItemStore } from '../item-store';

// Reset the store state before each test
beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Reset Zustand store to initial state
  const { result } = renderHook(() => useItemStore());
  act(() => {
    // Extract the initial items from the store
    const initialItems = result.current.items;
    
    // Remove all items that might be in the store
    initialItems.forEach(item => {
      result.current.removeItem(item.id);
    });
  });
});

describe('Item Store', () => {
  describe('Item Management', () => {
    it('should add an item to the store', () => {
      const { result } = renderHook(() => useItemStore());
      
      const newItem = {
        id: createItemId('test-id-1'),
        name: createItemName('テスト商品'),
        category: createCategoryName('テストカテゴリー'),
        brand: createBrandName('テストブランド'),
        unopenedCount: 2,
        openedCount: 1,
        threshold: 1,
        purchaseUrl: 'https://example.com/test',
        image: null,
      };
      
      act(() => {
        result.current.addItem(newItem);
      });
      
      // Check that the item was added
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual(newItem);
    });
    
    it('should update an item in the store', () => {
      const { result } = renderHook(() => useItemStore());
      
      const item = {
        id: createItemId('test-id-1'),
        name: createItemName('テスト商品'),
        category: createCategoryName('テストカテゴリー'),
        brand: createBrandName('テストブランド'),
        unopenedCount: 2,
        openedCount: 1,
        threshold: 1,
        purchaseUrl: 'https://example.com/test',
        image: null,
      };
      
      act(() => {
        result.current.addItem(item);
      });
      
      const updates = {
        name: createItemName('更新後の商品'),
        threshold: 3,
      };
      
      act(() => {
        result.current.updateItem(item.id, updates);
      });
      
      // Check that the item was updated
      expect(result.current.items[0].name).toEqual(updates.name);
      expect(result.current.items[0].threshold).toEqual(updates.threshold);
      // Check that other properties were not changed
      expect(result.current.items[0].unopenedCount).toEqual(item.unopenedCount);
    });
    
    it('should remove an item from the store', () => {
      const { result } = renderHook(() => useItemStore());
      
      const item = {
        id: createItemId('test-id-1'),
        name: createItemName('テスト商品'),
        category: createCategoryName('テストカテゴリー'),
        brand: createBrandName('テストブランド'),
        unopenedCount: 2,
        openedCount: 1,
        threshold: 1,
        purchaseUrl: 'https://example.com/test',
        image: null,
      };
      
      act(() => {
        result.current.addItem(item);
      });
      
      // Verify item was added
      expect(result.current.items).toHaveLength(1);
      
      act(() => {
        result.current.removeItem(item.id);
      });
      
      // Check that the item was removed
      expect(result.current.items).toHaveLength(0);
    });
  });
  
  describe('Stock Operations', () => {
    let itemId: ItemId;
    
    beforeEach(() => {
      const { result } = renderHook(() => useItemStore());
      
      itemId = createItemId('test-id-1');
      const item = {
        id: itemId,
        name: createItemName('テスト商品'),
        category: createCategoryName('テストカテゴリー'),
        brand: createBrandName('テストブランド'),
        unopenedCount: 2,
        openedCount: 1,
        threshold: 1,
        purchaseUrl: 'https://example.com/test',
        image: null,
      };
      
      act(() => {
        result.current.addItem(item);
      });
    });
    
    it('should increment unopened count', () => {
      const { result } = renderHook(() => useItemStore());
      
      const initialUnopenedCount = result.current.items[0].unopenedCount;
      
      act(() => {
        result.current.incrementUnopenedCount(itemId);
      });
      
      expect(result.current.items[0].unopenedCount).toBe(initialUnopenedCount + 1);
    });
    
    it('should decrement unopened count when greater than 0', () => {
      const { result } = renderHook(() => useItemStore());
      
      const initialUnopenedCount = result.current.items[0].unopenedCount;
      
      act(() => {
        result.current.decrementUnopenedCount(itemId);
      });
      
      expect(result.current.items[0].unopenedCount).toBe(initialUnopenedCount - 1);
    });
    
    it('should not decrement unopened count when it is 0', () => {
      const { result } = renderHook(() => useItemStore());
      
      // First set unopened count to 0
      act(() => {
        result.current.updateItem(itemId, { unopenedCount: 0 });
      });
      
      act(() => {
        result.current.decrementUnopenedCount(itemId);
      });
      
      // Should still be 0
      expect(result.current.items[0].unopenedCount).toBe(0);
    });
    
    it('should increment opened count', () => {
      const { result } = renderHook(() => useItemStore());
      
      const initialOpenedCount = result.current.items[0].openedCount;
      
      act(() => {
        result.current.incrementOpenedCount(itemId);
      });
      
      expect(result.current.items[0].openedCount).toBe(initialOpenedCount + 1);
    });
    
    it('should decrement opened count when greater than 0', () => {
      const { result } = renderHook(() => useItemStore());
      
      const initialOpenedCount = result.current.items[0].openedCount;
      
      act(() => {
        result.current.decrementOpenedCount(itemId);
      });
      
      expect(result.current.items[0].openedCount).toBe(initialOpenedCount - 1);
    });
    
    it('should not decrement opened count when it is 0', () => {
      const { result } = renderHook(() => useItemStore());
      
      // First set opened count to 0
      act(() => {
        result.current.updateItem(itemId, { openedCount: 0 });
      });
      
      act(() => {
        result.current.decrementOpenedCount(itemId);
      });
      
      // Should still be 0
      expect(result.current.items[0].openedCount).toBe(0);
    });
    
    it('should handle the consume and open operation correctly', () => {
      const { result } = renderHook(() => useItemStore());
      
      const initialUnopenedCount = result.current.items[0].unopenedCount;
      
      act(() => {
        result.current.consumeAndOpen(itemId);
      });
      
      // Unopened count should decrease by 1
      expect(result.current.items[0].unopenedCount).toBe(initialUnopenedCount - 1);
      // Opened count remains the same since it's a compound operation
      // that represents consuming an opened item and opening a new one
    });
    
    it('should not change unopened count in consumeAndOpen when unopened count is 0', () => {
      const { result } = renderHook(() => useItemStore());
      
      // First set unopened count to 0
      act(() => {
        result.current.updateItem(itemId, { unopenedCount: 0 });
      });
      
      act(() => {
        result.current.consumeAndOpen(itemId);
      });
      
      // Should still be 0
      expect(result.current.items[0].unopenedCount).toBe(0);
    });
  });
  
  describe('Derived Data', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useItemStore());
      
      const items = [
        {
          id: createItemId('test-id-1'),
          name: createItemName('シャンプー'),
          category: createCategoryName('バス・トイレタリー'),
          brand: createBrandName('ブランドA'),
          unopenedCount: 2,
          openedCount: 1,
          threshold: 1,
          purchaseUrl: 'https://example.com/test1',
          image: null,
        },
        {
          id: createItemId('test-id-2'),
          name: createItemName('ボディーソープ'),
          category: createCategoryName('バス・トイレタリー'),
          brand: createBrandName('ブランドB'),
          unopenedCount: 0,
          openedCount: 1,
          threshold: 2,
          purchaseUrl: 'https://example.com/test2',
          image: null,
        },
        {
          id: createItemId('test-id-3'),
          name: createItemName('食器用洗剤'),
          category: createCategoryName('キッチン用品'),
          brand: createBrandName('ブランドC'),
          unopenedCount: 1,
          openedCount: 1,
          threshold: 3,
          purchaseUrl: 'https://example.com/test3',
          image: null,
        },
      ];
      
      act(() => {
        items.forEach(item => {
          result.current.addItem(item);
        });
      });
    });
    
    it('should correctly identify low stock items', () => {
      const { result } = renderHook(() => useItemStore());
      
      const lowStockItems = result.current.getLowStockItems();
      
      // Only the second and third items should be low in stock
      expect(lowStockItems).toHaveLength(2);
      expect(lowStockItems[0].id).toEqual(createItemId('test-id-2'));
      expect(lowStockItems[1].id).toEqual(createItemId('test-id-3'));
    });
    
    it('should correctly categorize items', () => {
      const { result } = renderHook(() => useItemStore());
      
      const categorizedItems = result.current.getCategorizedItems();
      
      // Should have 2 categories
      expect(categorizedItems).toHaveLength(2);
      
      // Find the "バス・トイレタリー" category
      const bathCategory = categorizedItems.find(
        category => category.name === 'バス・トイレタリー'
      );
      expect(bathCategory).toBeDefined();
      expect(bathCategory?.items).toHaveLength(2);
      
      // Find the "キッチン用品" category
      const kitchenCategory = categorizedItems.find(
        category => category.name === 'キッチン用品'
      );
      expect(kitchenCategory).toBeDefined();
      expect(kitchenCategory?.items).toHaveLength(1);
    });
  });
});