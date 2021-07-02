"use client";

import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

// LINEメッセージの型定義
type TextMessage = {
  type: 'text';
  text: string;
  [key: string]: unknown;
};

// LIFFで使用するメッセージ型
// LIFF APIのドキュメントに基づく
type LineMessage = TextMessage;

interface LineShareButtonProps extends Omit<ButtonProps, "onClick"> {
  message: LineMessage;
  children: ReactNode;
}

/**
 * LINE共有ボタン
 * LIFFブラウザ内では、LINEの共有ピッカーを使用
 * 外部ブラウザでは、LINE共有URLを使用
 */
export function LineShareButton({ 
  message, 
  children,
  ...buttonProps 
}: LineShareButtonProps) {
  const handleShare = async () => {
    try {
      // LIFF内で実行されている場合
      if (window.liff.isInClient()) {
        // LINEの共有ピッカーを使用
        await window.liff.shareTargetPicker([message]);
      } else {
        // 外部ブラウザの場合、LINE共有URLを使用
        // テキストメッセージの場合のみ対応
        if (message.type === 'text' && message.text) {
          const encodedText = encodeURIComponent(message.text);
          window.liff.openWindow({
            url: `https://line.me/R/msg/text/?${encodedText}`,
            external: true,
          });
        }
      }
    } catch (error) {
      console.error('Failed to share message', error);
    }
  };

  return (
    <Button onClick={handleShare} {...buttonProps}>
      {children}
    </Button>
  );
}