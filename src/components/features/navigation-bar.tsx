import { Home, FolderOpen, Settings } from "lucide-react";

interface NavigationBarProps {
  activeTab: "home" | "categories" | "settings";
  onTabChange: (tab: "home" | "categories" | "settings") => void;
}

export default function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  return (
    <div className="nav-bg py-3 border-t">
      <div className="flex justify-around items-center">
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "home" ? "text-primary" : "text-gray-600"}`}
          onClick={() => onTabChange("home")}
        >
          <Home size={22} />
          <span className="text-xs mt-1 font-medium">ホーム</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "categories" ? "text-primary" : "text-gray-600"}`}
          onClick={() => onTabChange("categories")}
        >
          <FolderOpen size={22} />
          <span className="text-xs mt-1 font-medium">カテゴリ</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "settings" ? "text-primary" : "text-gray-600"}`}
          onClick={() => onTabChange("settings")}
        >
          <Settings size={22} />
          <span className="text-xs mt-1 font-medium">設定</span>
        </button>
      </div>
    </div>
  );
}
