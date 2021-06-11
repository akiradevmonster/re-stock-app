# Re-Stock アプリ 技術コンテキスト

## 使用技術

Re-Stock アプリは、モダンな Web 技術スタックを使用して構築されています。主要な技術コンポーネントは以下の通りです：

### フロントエンド

- **フレームワーク**: Next.js 15.2.1 (App Router)
- **言語**: TypeScript 5.x
- **UI ライブラリ**: React 19.0.0
- **スタイリング**: Tailwind CSS 3.4.x + shadcn/ui
- **状態管理**: Zustand
- **フォーム管理**: React Hook Form + zod
- **データ永続化**: localStorage (初期実装)

### 開発ツール

- **パッケージマネージャ**: Yarn
- **ビルドツール**: Turbopack (Next.js 15 の機能)
- **リンター**: ESLint 9.x
- **フォーマッター**: Prettier
- **テストフレームワーク**: Jest + React Testing Library
- **バージョン管理**: Git (GitHub Flow)

## 開発環境のセットアップ

### 必要条件

- Node.js 20.x 以上
- Yarn 1.22.x 以上
- Git

### インストール手順

```bash
# リポジトリのクローン
git clone https://github.com/username/re-stock-app.git
cd re-stock-app

# 依存関係のインストール
yarn install

# 開発サーバーの起動
yarn dev
```

### 開発サーバー

開発サーバーは以下のコマンドで起動できます：

```bash
yarn dev
```

これにより、Turbopack を使用した高速な開発サーバーが起動し、http://localhost:3000 でアプリケーションにアクセスできます。

### ビルドと本番環境

本番環境用のビルドは以下のコマンドで実行できます：

```bash
yarn build
```

ビルドされたアプリケーションは以下のコマンドで起動できます：

```bash
yarn start
```

## 技術的制約

### ブラウザサポート

- 最新の Chrome、Firefox、Safari、Edge をサポート
- Internet Explorer はサポート対象外
- モバイルブラウザ（iOS Safari、Android Chrome）をサポート

### パフォーマンス目標

- First Contentful Paint (FCP): 1.5 秒以内
- Time to Interactive (TTI): 3 秒以内
- Lighthouse パフォーマンススコア: 90 以上

### アクセシビリティ

- WCAG 2.1 AA レベルの準拠を目指す
- スクリーンリーダー対応
- キーボードナビゲーション対応

### オフライン対応

- 基本機能はオフラインでも動作するように設計
- localStorage を使用したデータの永続化
- 将来的には Service Worker を使用した PWA 対応も検討

## 依存関係

### コア依存関係

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.2.1"
  }
}
```

### 開発依存関係

```json
{
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.2.1",
    "@eslint/eslintrc": "^3"
  }
}
```

### 追加予定の依存関係

以下のパッケージは、実装の進行に合わせて追加する予定です：

- **zustand**: 状態管理
- **react-hook-form**: フォーム管理
- **zod**: スキーマバリデーション
- **@radix-ui/react-\***: アクセシブルな UI コンポーネント
- **class-variance-authority**: コンポーネントのバリエーション管理
- **clsx**: 条件付きクラス名の結合
- **tailwind-merge**: Tailwind クラスの最適化
- **neverthrow**: Result 型の実装
- **date-fns**: 日付操作
- **jest**: テスト
- **@testing-library/react**: React コンポーネントのテスト

## 技術的な意思決定

### Next.js App Router の採用

- サーバーコンポーネントによるパフォーマンス向上
- ファイルベースのルーティングによる開発効率の向上
- メタデータ API による SEO 対応の簡素化

### TypeScript の採用

- 型安全性による開発時のエラー検出
- コード補完とドキュメンテーションの向上
- リファクタリングの安全性向上

### Tailwind CSS の採用

- ユーティリティファーストのアプローチによる開発速度の向上
- カスタマイズ性と一貫性のバランス
- バンドルサイズの最適化

### shadcn/ui の採用

- コピー&ペーストによるコンポーネントの柔軟なカスタマイズ
- Radix UI をベースとしたアクセシビリティの確保
- Tailwind CSS との統合

### Zustand の採用

- シンプルな API と小さなバンドルサイズ
- Redux よりも少ないボイラープレートコード
- React Hooks との統合

### localStorage の採用（初期実装）

- セットアップの簡易さ
- バックエンドインフラなしで動作
- オフライン対応の容易さ

## 将来的な技術拡張

### バックエンド統合

- Firebase Firestore または他の BaaS の導入
- ユーザー認証の実装
- クラウドストレージの活用

### モバイルアプリ対応

- PWA (Progressive Web App) 対応
- React Native への移植の検討

### パフォーマンス最適化

- 画像最適化
- コード分割
- サーバーサイドレンダリングの活用

### 多言語対応

- i18next の導入
- 言語切り替え機能の実装
