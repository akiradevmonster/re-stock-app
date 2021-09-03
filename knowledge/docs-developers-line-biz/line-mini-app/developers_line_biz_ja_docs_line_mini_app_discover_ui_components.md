# [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#page-title) LINEミニアプリの構造

LINEミニアプリのページは、（A）ヘッダーおよび（B）ボディで構成されています。

![](https://developers.line.biz/assets/img/mini_concept.2b5be1ef.png)

LINEミニアプリのヘッダーは、プラットフォームネイティブのコンポーネントが使用されており、LINEが自動生成します。

ヘッダーは、以下のコンポーネントで構成されています。

![](https://developers.line.biz/assets/img/mini_uicomp_header.5033b746.png)

| 番号 | コンポーネント                                                                                                 | 説明                                                                                                                                                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | サービス名                                                                                                     | LINEミニアプリのページで指定した `<title>` 要素が表示されます。フォントは設定できません。                                                                                                                                                                      |
| -    | サブテキスト                                                                                                   | 未認証ミニアプリの場合、「サービス名」の下にコンテンツの元のドメインが表示されます。認証済ミニアプリの場合、「サービス名」の下にLINEミニアプリ名と認証バッジが表示されます。                                                                                   |
| 2    | [アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button) | タップすると、ユーザーがLINEミニアプリのページを友だちとシェアしたり、ユーザーのKeepメモに保存したり、ページをリロードするためのオプションが表示されます。オプションのテキストは設定できません。                                                               |
| 3    | 閉じるボタン／最小化ボタン                                                                                     | 未認証ミニアプリの場合、LINEミニアプリを閉じます。認証済ミニアプリの場合、LINEミニアプリを最小化します。詳しくは、『LIFFドキュメント』の「 [LIFFブラウザを最小化する](https://developers.line.biz/ja/docs/liff/minimizing-liff-browser/)」を参照してください。 |
| 4    | 戻るボタン                                                                                                     | 前のページを表示します。                                                                                                                                                                                                                                       |
| 5    | ローディングバー                                                                                               | 現在のページの読み込み状況を表示します。                                                                                                                                                                                                                       |

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#body) ボディ

ボディはWebViewが使用されています。HTML5およびLIFFを活用して、サービスごとに開発してください。

LINEミニアプリの開発に関する仕様については、「 [LINEミニアプリの仕様](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/)」を参照してください。
