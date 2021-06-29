"use client";

import { useState, useMemo } from "react";
import { useItemStore } from "@/stores/item-store";
import Header from "@/components/features/header";
import NavigationBar from "@/components/features/navigation-bar";
import CategoryCard from "@/components/features/category-card";
import { Item, CategoryGroup } from "@/types/inventory";

// ストアのセレクタ関数を外部で定義
const selectItems = (state: { items: Item[] }) => state.items;

export default function InventoryApp() {
  // アイテムを取得し、カテゴリ別に整理
  const items = useItemStore(selectItems);
  const categories = useMemo(() => {
    const categoryMap = new Map<string, CategoryGroup>();
    
    items.forEach((item: Item) => {
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
  }, [items]);
  
  const [activeTab, setActiveTab] = useState<"home" | "categories" | "settings">("home");
  
  return (
    <div className="flex flex-col h-screen bg-white shadow-lg overflow-hidden max-w-md mx-auto">
      {/* ヘッダー */}
      <Header title="在庫管理" />
      
      {/* メインコンテンツ - スクロール可能 */}
      <div className="flex-1 overflow-y-auto">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {/* ナビゲーションバー */}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
