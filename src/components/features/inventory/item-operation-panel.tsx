'use client';

import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useItemStore } from '@/stores/item-store';
import { ItemId } from '@/types/inventory';
import { 
  RefreshCw, 
  Plus, 
  Scissors, 
  Package, 
  Settings
} from 'lucide-react';

interface ItemOperationPanelProps {
  itemId: ItemId;
  unopenedCount: number;
  openedCount: number;
  onClose: () => void;
}

export default function ItemOperationPanel({ 
  itemId, 
  unopenedCount, 
  openedCount, 
  onClose 
}: ItemOperationPanelProps) {
  // Handler for showing quantity adjust modal
  const handleShowAdjustModal = useCallback(() => {
    // To be implemented in the future
    console.log('Show quantity adjust modal');
    onClose();
  }, [onClose]);

  // "Consume and open" operation (highest priority)
  const handleConsumeAndOpen = useCallback(() => {
    const store = useItemStore.getState();
    store.consumeAndOpen(itemId);
    onClose();
  }, [itemId, onClose]);

  // "Purchase" operation
  const handlePurchase = useCallback(() => {
    const store = useItemStore.getState();
    store.incrementUnopenedCount(itemId);
    onClose();
  }, [itemId, onClose]);

  // "Open" operation
  const handleOpen = useCallback(() => {
    if (unopenedCount > 0) {
      const store = useItemStore.getState();
      store.decrementUnopenedCount(itemId);
      store.incrementOpenedCount(itemId);
    }
    onClose();
  }, [itemId, unopenedCount, onClose]);

  // "Consume" operation
  const handleConsume = useCallback(() => {
    if (openedCount > 0) {
      const store = useItemStore.getState();
      store.decrementOpenedCount(itemId);
    }
    onClose();
  }, [itemId, openedCount, onClose]);

  return (
    <div className="bg-white shadow-lg rounded-l-md border-l border-t border-b flex flex-col p-2 h-full z-30">
      {/* Main operations */}
      <div className="grid grid-cols-1 gap-2">
        {/* 1. "Consume and Open" (Highest priority) */}
        <Button
          onClick={handleConsumeAndOpen}
          disabled={unopenedCount === 0}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center p-2 h-auto"
          size="sm"
        >
          <RefreshCw size={20} />
          <span className="ml-1 text-xs">使い切り+開封</span>
        </Button>

        {/* 2. "Purchase" */}
        <Button
          onClick={handlePurchase}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center p-2 h-auto"
          size="sm"
        >
          <Plus size={20} />
          <span className="ml-1 text-xs">購入</span>
        </Button>

        {/* 3. "Open" */}
        <Button
          onClick={handleOpen}
          disabled={unopenedCount === 0}
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center p-2 h-auto"
          size="sm"
        >
          <Package size={20} />
          <span className="ml-1 text-xs">開封</span>
        </Button>

        {/* 4. "Consume" */}
        <Button
          onClick={handleConsume}
          disabled={openedCount === 0}
          className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center p-2 h-auto"
          size="sm"
        >
          <Scissors size={20} />
          <span className="ml-1 text-xs">使い切り</span>
        </Button>

        {/* 5. "Detailed Adjustment" (optional) */}
        <Button
          onClick={handleShowAdjustModal}
          className="bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center p-2 h-auto"
          size="sm"
        >
          <Settings size={20} />
          <span className="ml-1 text-xs">詳細調整</span>
        </Button>
      </div>
    </div>
  );
}