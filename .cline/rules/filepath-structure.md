## ディレクトリ配置規則

```
app/*                 # アプリケーション
src/*                 # ソースコード
public/               # 静的ファイル
.cline/               # Cline用のディレクトリ
.cline/rules/         # .clinerulesの元となる振る舞い･ルール（ユーザ･Clineの両方が作成･更新する）
.cline/memory/        # メモリバンク（Clineが作成･更新する）
.cline/memory-bank/   # 追加のコンテキストや知識情報（Clineが作成･更新する）
knowledge/            # Cline向けにユーザから提供される知識情報
docs/                 # ユーザ向けドキュメント置き場
```
