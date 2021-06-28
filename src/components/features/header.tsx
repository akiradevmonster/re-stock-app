"use client";

import { AuthButton } from "./auth/auth-button";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <>
      {/* ステータスバー */}
      <div className="h-7 status-bar"></div>
      
      {/* ヘッダー */}
      <div className="header-bg py-4 px-4 flex justify-between items-center shadow-sm">
        <div className="font-bold text-xl">{title}</div>
        <AuthButton />
      </div>
    </>
  );
}