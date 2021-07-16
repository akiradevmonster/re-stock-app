import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Item, 
  CategoryGroup, 
  ItemId, 
  createItemId, 
  createItemName, 
  createCategoryName, 
  createBrandName 
} from '@/types/inventory';

interface ItemStore {
  items: Item[];
  
  // アクション
  addItem: (item: Item) => void;
  updateItem: (id: ItemId, updates: Partial<Omit<Item, 'id'>>) => void;
  removeItem: (id: ItemId) => void;
  incrementUnopenedCount: (id: ItemId) => void;
  decrementUnopenedCount: (id: ItemId) => void;
  incrementOpenedCount: (id: ItemId) => void;
  decrementOpenedCount: (id: ItemId) => void;
  consumeAndOpen: (id: ItemId) => void; // 複合操作：使い切り+開封
  
  // 派生データ
  getLowStockItems: () => Item[];
  getCategorizedItems: () => CategoryGroup[];
}

// ヘルパー関数
function getCategorizedItems(items: Item[]): CategoryGroup[] {
  const categoryMap = new Map<string, CategoryGroup>();
  
  items.forEach(item => {
    const categoryName = item.category;
    const categoryId = categoryName.toString();
    
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, {
        id: categoryId,
        name: categoryName.toString(),
        items: []
      });
    }
    
    categoryMap.get(categoryId)!.items.push(item);
  });
  
  return Array.from(categoryMap.values());
}

// サンプルデータ
const initialItems: Item[] = [
  {
    id: createItemId('1'),
    name: createItemName('シャンプー'),
    category: createCategoryName('バス・トイレタリー'),
    brand: createBrandName('パンテーン'),
    unopenedCount: 2,
    openedCount: 1,
    threshold: 1,
    purchaseUrl: 'https://example.com/shampoo',
    image: null,
  },
  {
    id: createItemId('2'),
    name: createItemName('ボディーソープ'),
    category: createCategoryName('バス・トイレタリー'),
    brand: createBrandName('ダヴ'),
    unopenedCount: 3,
    openedCount: 1,
    threshold: 2,
    purchaseUrl: 'https://example.com/body-soap',
    image: null,
  },
  {
    id: createItemId('3'),
    name: createItemName('食器用洗剤'),
    category: createCategoryName('キッチン用品'),
    brand: createBrandName('ジョイ'),
    unopenedCount: 1,
    openedCount: 1,
    threshold: 1,
    purchaseUrl: 'https://example.com/dish-soap',
    image: null,
  },
  {
    id: createItemId('4'),
    name: createItemName('キッチンスポンジ'),
    category: createCategoryName('キッチン用品'),
    brand: createBrandName('スコッチブライト'),
    unopenedCount: 2,
    openedCount: 1,
    threshold: 2,
    purchaseUrl: 'https://example.com/kitchen-sponge',
    image: null,
  },
];

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: initialItems,
      
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item]
      })),
      
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        )
      })),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      
      incrementUnopenedCount: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, unopenedCount: item.unopenedCount + 1 } : item
        )
      })),
      
      decrementUnopenedCount: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.unopenedCount > 0
            ? { ...item, unopenedCount: item.unopenedCount - 1 }
            : item
        )
      })),
      
      incrementOpenedCount: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, openedCount: item.openedCount + 1 } : item
        )
      })),
      
      decrementOpenedCount: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.openedCount > 0
            ? { ...item, openedCount: item.openedCount - 1 }
            : item
        )
      })),
      
      // 複合操作：使い切り+開封（最優先パターン）
      // 開封済みを使い切って未開封を開封する操作
      // データ上は未開封品だけを減らす（未開封-1のみ）
      consumeAndOpen: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.unopenedCount > 0
            ? { ...item, unopenedCount: item.unopenedCount - 1 }
            : item
        )
      })),
      
      getLowStockItems: () => {
        const { items } = get();
        return items.filter(item => item.unopenedCount + item.openedCount <= item.threshold);
      },
      
      getCategorizedItems: () => {
        return getCategorizedItems(get().items);
      }
    }),
    {
      name: 'item-storage',
    }
  )
);
