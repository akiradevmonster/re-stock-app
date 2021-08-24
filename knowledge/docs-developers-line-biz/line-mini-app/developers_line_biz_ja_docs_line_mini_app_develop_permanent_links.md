# [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/#page-title) パーマネントリンクを作成する

ユーザーがLINEミニアプリにアクセスするために、LIFF URLだけでなく、パーマネントリンクも使用できます。ただし、LINEミニアプリのページをシェアするときは、LIFF URLではなく、パーマネントリンクを使用してください。

[ヘッダー](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header) に表示されるアクションボタンで、LINEミニアプリのページをシェアした場合は、自動的にそのページのパーマネントリンクが作成されます。

それ以外の状況では、以下の計算式に従ってパーマネントリンクを作成してください。

`LIFF URL + (LINEミニアプリページのURL - エンドポイントURL) = パーマネントリンク`

例：

| 項目                      | 設定                                           |
| ------------------------- | ---------------------------------------------- |
| LIFF URL（※）             | `https://miniapp.line.me/123456-abcedfg`       |
| LINEミニアプリページのURL | `https://example.com/shop?search=shoes#item10` |
| エンドポイントURL（※）    | `https://example.com`                          |

※ [LINE Developersコンソール](https://developers.line.biz/console/) の［ **ウェブアプリ設定**］タブで確認できます。

この場合、LINEミニアプリページのURLに対応するパーマネントリンクは、以下のとおりです。

```
https://miniapp.line.me/123456-abcedfg/shop?search=shoes#item10

```

ヒント

LINEミニアプリページのURLには、ページパス、クエリパラメータおよびフラグメントを使用できます。

LINEミニアプリのLIFF URLが変更されました

[2023年12月13日](https://developers.line.biz/ja/news/2023/12/13/change-of-liff-url-for-line-mini-app/) より、LINEミニアプリのLIFF URLが `https://miniapp.line.me/{liffId}` に変更されました。

従来の `https://liff.line.me/{liffId}` にアクセスした場合も、引き続き当該のLINEミニアプリが開きます。そのため、発行済みのQRコードも引き続き利用可能です。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/#difference-depends-on-app-version) LINEアプリのバージョンによるドメイン名の違い

ヘッダーに表示される [アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button) でLINEミニアプリをシェアする場合、LINEアプリのバージョンによって作成されるパーマネントリンクのドメイン名が異なります。

| LINEアプリのバージョン | 作成されるURLの例                  |
| ---------------------- | ---------------------------------- |
| 13.20以降              | `https://miniapp.line.me/{liffId}` |
| 13.20未満              | `https://liff.line.me/{liffId}`    |

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/#if-user-doesnt-have-line) LINEをインストールしていない場合の動作

ユーザーがLINEをインストールしている場合は、ユーザーがパーマネントリンクをクリックすると、LINEが自動的に起動してLINEミニアプリのページが表示されます。ユーザがLINEをインストールしていない場合は、ウェブブラウザが開き、LINEのダウンロードを求めるページが開きます。ユーザーがLINEをインストールすると、LINEミニアプリを利用できます。

ただし、 [LINE Developersコンソール](https://developers.line.biz/console/) 上で［ **LINE未使用ユーザーをウェブブラウザに誘導する**］を有効にすると、日本、タイ、台湾以外のLINE未使用ユーザーは外部ブラウザでLINEミニアプリのサービスを表示できるようになります。詳しくは、「 [LINE未使用ユーザーをウェブブラウザに誘導する](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#redirect-non-line-users-to-browser)」を参照してください。
