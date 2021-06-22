# Re-Stock アプリの状態管理とエラー処理

## 状態管理の基本方針

Re-Stock アプリでは、以下の基本方針に従って状態管理を行います：

- Zustandを使用した軽量な状態管理
- 状態の種類に応じた適切な管理方法の選択
- 永続化はlocalStorageを使用（初期実装）
- ドメインモデルとの明確な境界を維持

## 状態の種類と管理方法

### グローバル状態

- Zustandを使用
- ストアは機能ごとに分割
- 状態と更新ロジックを明確に分離
- 複雑な更新ロジックは関数として抽出
- 永続化が必要な場合はmiddlewareを使用

```typescript
// アイテムストアの例
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ItemStore = {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  removeItem: (id: string) => void;
};

export const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'item-storage',
    }
  )
);
```

### ローカル状態

- コンポーネント固有の状態にはuseStateを使用
- 関連する複数の状態はuseReducerでまとめる
- 派生状態にはuseMemoを使用
- フォーム状態には適切なフォームライブラリを検討

```typescript
// useReducerの例
type FormState = {
  name: string;
  category: string;
  brand: string;
  unopenedCount: number;
  openedCount: number;
  threshold: number;
  purchaseUrl: string;
};

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: any }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// コンポーネント内での使用
const [formState, dispatch] = useReducer(formReducer, initialState);
```

### サーバー状態

- サーバーコンポーネントを活用したデータフェッチング
- クライアントコンポーネントではSWRまたはReact Queryを検討
- エラー状態とローディング状態の適切な処理

## データフロー

1. ユーザーアクション → コンポーネント
2. コンポーネント → ストア（アクション）
3. ストア → リポジトリ（データ操作）
4. リポジトリ → 永続化層
5. 状態更新 → コンポーネント再レンダリング

## エラー処理

### Result型を使用したエラーハンドリング

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

// 成功の場合
function ok<T, E>(value: T): Result<T, E> {
  return { ok: true, value };
}

// 失敗の場合
function err<T, E>(error: E): Result<T, E> {
  return { ok: false, error };
}
```

### エラー型の定義

```typescript
type ApiError =
  | { type: 'network'; message: string }
  | { type: 'notFound'; message: string }
  | { type: 'unauthorized'; message: string }
  | { type: 'validation'; message: string; fields: Record<string, string> };
```

### エラーハンドリングの例

```typescript
async function fetchItem(id: string): Promise<Result<Item, ApiError>> {
  try {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) {
      switch (response.status) {
        case 404:
          return err({ type: 'notFound', message: 'アイテムが見つかりません' });
        case 401:
          return err({ type: 'unauthorized', message: '認証されていません' });
        default:
          return err({
            type: 'network',
            message: `HTTPエラー: ${response.status}`,
          });
      }
    }
    return ok(await response.json());
  } catch (error) {
    return err({
      type: 'network',
      message: error instanceof Error ? error.message : '不明なエラー',
    });
  }
}

// 使用例
const result = await fetchItem('123');
if (result.ok) {
  // 成功時の処理
  const item = result.value;
  // ...
} else {
  // エラー時の処理
  switch (result.error.type) {
    case 'notFound':
      // 見つからない場合の処理
      break;
    case 'unauthorized':
      // 認証エラーの処理
      break;
    // ...
  }
}
```

### ユーザーへのエラー表示

- エラーの種類に基づいた適切なユーザーフィードバック
- グローバルエラー状態の管理
- トースト通知やインライン表示の使い分け

## パフォーマンス最適化

### 状態更新の最適化

- 不要な再レンダリングを避ける
- 状態の正規化を検討
- 大きなリストには仮想化を検討
- メモ化を適切に使用

### メモ化の活用

```typescript
// useMemoの例
const filteredItems = useMemo(
  () => items.filter((item) => item.category === selectedCategory),
  [items, selectedCategory]
);

// useCallbackの例
const handleItemUpdate = useCallback(
  (id: string, updates: Partial<Item>) => {
    updateItem(id, updates);
  },
  [updateItem]
);
```

## 永続化戦略

- localStorageを使用した基本的な永続化
- Zustandのpersistミドルウェアの活用
- 将来的にはFirebaseなどのBaaSも検討可能
- オフライン対応の検討

## 状態管理のテスト

- ストアのテスト
- アクションのテスト
- 副作用のテスト
- モックを使用したテスト
