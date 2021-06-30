'use client';

import { useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Item } from '@/types/inventory';
import ItemCard from '@/components/features/item-card';
import ItemOperationPanel from '@/components/features/inventory/item-operation-panel';
import { useItemStore } from '@/stores/item-store';

interface SwipeableItemCardProps {
  item: Item;
  isAlternate?: boolean;
}

export default function SwipeableItemCard({ item, isAlternate }: SwipeableItemCardProps) {
  const [showPanel, setShowPanel] = useState(false);
  const [animation, setAnimation] = useState<string | null>(null);
  
  // Close panel handler
  const handleClose = useCallback(() => {
    setShowPanel(false);
  }, []);

  // Right swipe handler - perform "consume and open" quick action
  const handleRightSwipe = useCallback(() => {
    const performAction = useItemStore.getState().consumeAndOpen;
    
    if (item.unopenedCount > 0) {
      performAction(item.id);
      
      // Show success animation
      setAnimation('success-action');
      setTimeout(() => {
        setAnimation(null);
      }, 500);
    } else {
      // Show error animation
      setAnimation('error-action');
      setTimeout(() => {
        setAnimation(null);
      }, 500);
    }
  }, [item.id, item.unopenedCount]);

  // Left swipe handler - show operation panel
  const handleLeftSwipe = useCallback(() => {
    setShowPanel(true);
  }, []);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleLeftSwipe,
    onSwipedRight: handleRightSwipe,
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 10,
    swipeDuration: 500,
  });

  return (
    <div 
      className={`relative ${animation ? animation : ''} ${showPanel ? 'z-10' : ''}`} 
      {...swipeHandlers}
    >
      <div className={`transition-transform duration-300 ease-in-out ${showPanel ? 'translate-x-[-120px]' : ''}`}>
        <ItemCard item={item} isAlternate={isAlternate} />
      </div>
      
      {showPanel && (
        <div className="absolute top-0 right-0 bottom-0 flex items-center z-20">
          <ItemOperationPanel 
            itemId={item.id} 
            unopenedCount={item.unopenedCount}
            openedCount={item.openedCount}
            onClose={handleClose} 
          />
        </div>
      )}
    </div>
  );
}