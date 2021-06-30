import { Camera, Share2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Item, isItemLowStock } from "@/types/inventory";
import { LineShareButton } from "./share/line-share-button";

interface ItemCardProps {
  item: Item;
  isAlternate?: boolean;
}

export default function ItemCard({ item, isAlternate = false }: ItemCardProps) {
  // 未開封アイテムの丸を生成
  const renderUnopenedDots = () => {
    return Array.from({ length: item.unopenedCount }).map((_, index) => (
      <div key={`unopened-${index}`} className="w-7 h-7 rounded-full unopened-dot border-2"></div>
    ));
  };

  // 開封済みアイテムの丸を生成
  const renderOpenedDots = () => {
    return Array.from({ length: item.openedCount }).map((_, index) => (
      <div key={`opened-${index}`} className="w-7 h-7 rounded-full opened-dot border-2"></div>
    ));
  };

  // 在庫が閾値以下かどうかを判定
  const lowStock = isItemLowStock(item);
  
  // 共有メッセージを作成
  const createShareMessage = () => {
    const totalCount = item.unopenedCount + item.openedCount;
    const stockStatus = lowStock ? '【残りわずか】' : '';
    
    let message = `${stockStatus}${item.name.toString()}\n`;
    message += `ブランド: ${item.brand.toString()}\n`;
    message += `残り: ${totalCount}個（未開封: ${item.unopenedCount}、開封済: ${item.openedCount}）\n`;
    
    if (item.purchaseUrl) {
      message += `購入URL: ${item.purchaseUrl}`;
    }
    
    return message;
  };

  return (
    <div className={`py-4 px-4 border-b ${isAlternate ? "item-alt-bg" : "bg-white"}`}>
      <div className="grid grid-cols-3 items-center">
        {/* 商品情報 */}
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center mb-2 shadow-sm">
            {item.image ? (
              <Image 
                src={item.image} 
                alt={item.name.toString()} 
                width={56} 
                height={56}
                className="w-14 h-14 object-cover" 
              />
            ) : (
              <Camera size={20} className="text-gray-400" />
            )}
          </div>
          <span className="text-xs text-center font-medium">{item.name.toString()}</span>
          {lowStock && <Badge variant="destructive" className="mt-1.5 text-[10px] px-1.5 py-0.5 font-medium">残り少</Badge>}
          
          {/* 共有ボタン */}
          <LineShareButton
            message={{ type: 'text', text: createShareMessage() }}
            variant="ghost"
            size="sm"
            className="mt-2 h-7 px-2 rounded-full"
          >
            <Share2 size={14} className="mr-1" />
            <span className="text-xs">共有</span>
          </LineShareButton>
        </div>

        {/* 未開封アイテム */}
        <div className="col-span-1 flex justify-center gap-2 flex-wrap">
          {renderUnopenedDots()}
          {item.unopenedCount > 0 && (
            <span className="text-xs text-gray-500 w-full text-center mt-2">{item.unopenedCount}</span>
          )}
        </div>

        {/* 開封済みアイテム */}
        <div className="col-span-1 flex justify-center gap-2 flex-wrap">
          {renderOpenedDots()}
          {item.openedCount > 0 && (
            <span className="text-xs text-gray-500 w-full text-center mt-2">{item.openedCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}