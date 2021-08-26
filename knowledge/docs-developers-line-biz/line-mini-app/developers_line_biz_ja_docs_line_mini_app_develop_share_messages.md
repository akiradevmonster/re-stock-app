# [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#page-title) カスタムアクションボタンを実装する

LINEミニアプリでは、現在開いているページを友だちと共有できるアクションボタンが、（A） [ヘッダー](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header) に用意されています。このアクションボタンはLINEによって実装されていてデフォルトで表示されますが、ボタンの動作やメッセージの内容は、カスタマイズできません。

一方、（B）ボディにカスタムアクションボタンを実装すると、メッセージの内容をカスタマイズしてLINEミニアプリをシェアできます。

![](https://developers.line.biz/assets/img/mini_concept.2b5be1ef.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#guidelines) ガイドライン

カスタムアクションボタンを実装してカスタムシェアメッセージを送信する場合は、ユーザーがメッセージの内容を早くかつ正確に把握できるように、以下のガイドラインに従ってください。

注意

提供するサービスの特性上、このドキュメントのガイドラインのとおりにカスタムシェアメッセージを実装できない場合は、 [mini_request@linecorp.com](mailto:mini_request@linecorp.com) までご連絡ください。

LINEミニアプリのLIFF URLが変更されました

[2023年12月13日](https://developers.line.biz/ja/news/2023/12/13/change-of-liff-url-for-line-mini-app/) より、LINEミニアプリのLIFF URLが `https://miniapp.line.me/{liffId}` に変更されました。

従来の `https://liff.line.me/{liffId}` にアクセスした場合も、引き続き当該のLINEミニアプリが開きます。そのため、発行済みのQRコードも引き続き利用可能です。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#using-share-target-picker) シェアターゲットピッカーの利用

ボディにカスタムアクションボタンを配置し、ボタンがタップされたときに、ターゲットピッカー（グループまたは友だちを選択する画面）を表示するように実装してください。ターゲットピッカーでユーザーが送信相手を選択すると、 [Flex Message](https://developers.line.biz/ja/docs/messaging-api/using-flex-messages/) など、開発者が作成したメッセージを送信できます。

![target picker](https://developers.line.biz/assets/img/share-target-picker_tobe_ja.c8cfbdd6.png)

シェアターゲットピッカーを利用する方法について詳しくは、「 [ユーザーの友だちにメッセージを送信する（シェアターゲットピッカー）](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#share-target-picker)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#custom-share-message-format) カスタムシェアメッセージのフォーマット

カスタムシェアメッセージは、Flex Messageの [バブル](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#bubble) コンテナを使用して作成します。 Flex Messageの [カルーセル](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#carousel) コンテナは使用しないでください。

また、カスタムシェアメッセージには、 [標準タイプ](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard) と [画像リストタイプ](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list) があり、それぞれ以下のA～Fのセクションに分かれています。

![](https://developers.line.biz/assets/img/mini_design_flex_msg_common.2147c637.png)

| ラベル | セクション   | 必須 | 説明                                                                                                                                                                                                                                                                                                                                       |
| ------ | ------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A      | 画像         | 任意 | 全体をスクロールせずに表示できる大きさの画像を設定してください。                                                                                                                                                                                                                                                                           |
| B      | タイトル     | 必須 | メッセージの内容を要約してください。                                                                                                                                                                                                                                                                                                       |
| C      | サブタイトル | ※    | メッセージの副題です。                                                                                                                                                                                                                                                                                                                     |
| D      | 詳細         | ※    | ラベルと説明を含めた項目を挿入してください。標準タイプと画像リストタイプで挿入できる項目の最大数が異なります。<br>- 標準タイプ：最大10件<br>- 画像リストタイプ：最大5件                                                                                                                                                                    |
| E      | ボタン       | 必須 | - ボタンを3個まで挿入できます。<br>- 最低1つのボタンは、シェアする内容を詳しく説明するページ（詳細ページ）を表示するように設定してください。                                                                                                                                                                                               |
| F      | フッター     | 必須 | LINEミニアプリのアイコン、LINEミニアプリの名前、および画像（ ![>](https://vos.line-scdn.net/service-notifier/footer_go_btn.png)）を挿入してください。この画像は変更しないでください。この画像をタップしたときに、LINEミニアプリのトップページ（ `https://miniapp.line.me/{your-liffId}`）を表示するようにURIアクションを指定してください。 |

※サブタイトル（C）または詳細（D）のいずれか一方を挿入する必要があります。両方を挿入することもできます。

#### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard) 標準タイプのガイドライン

標準タイプのFlex Messageは、以下のガイドラインに従ってください。

JSONファイルの例は、「 [ガイドラインに従ったJSONファイルの例](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages-standard/)」を参照してください。

注意

- アクションは、ボタン（E）およびフッター（F）の指定されたコンポーネントにのみ設定できます。
- ここで説明されていないプロパティは変更してはいけません。

![](https://developers.line.biz/assets/img/mini_design_flex_msg_standard.888ecedc.png)

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-image-a) 標準タイプ \- 画像（A）

画像（A）は、ヒーローブロックに入れてください。

| ラベル | セクション | 要素                                                                                                                                                                                         | 説明                                                                                                                                                                                                |
| ------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | 画像       | [ヒーローブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) \> [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | - `"url": "{画像のURL}"`<br>- `"size": "full"`<br>- `"aspectRatio": "{width}:{height}"`<br> <br> ただし、 `{height}` には、 `{width} * 2` 以下の値を設定してください。<br>- `"aspectMode": "cover"` |

```
{
    "type": "bubble",
    "hero": { // ヒーローブロック
        // 画像（A）
        "type": "image",
        "url": "https://example.com/hero-image.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover"
    },
    "body": {...}
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-body) 標準タイプ \- ボディ

タイトル（B）、サブタイトル（C）、詳細（D）、ボタン（E）を入れるボディブロックは、以下のように指定してください。

| ラベル | セクション | 要素                                                                                                                                                                                         | 説明                                            |
| ------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| -      | -          | [ボディブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) \> [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | - `"layout": "vertical"`<br>- `"spacing": "md"` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": { // ボディブロック
        // ボックス
        "type": "box",
        "layout": "vertical",
        "contents": [ ... ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-title-b) 標準タイプ \- タイトル（B）

| ラベル | セクション | 要素                                                                                      | 説明                                                                                                                                      |
| ------ | ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| B      | タイトル   | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | - `"layout": "vertical"`<br>- `"spacing": "none"`                                                                                         |
| B      | タイトル   | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{タイトル}"`<br> <br> 最大行数：2行<br>- `"size": "lg"`<br>- `"color": "#000000"`<br>- `"weight": "bold"`<br>- `"wrap": true` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // テキスト\
                        "type": "text",\
                        "text": "Main title",\
                        "size": "lg",\
                        "color": "#000000",\
                        "weight": "bold",\
                        "wrap": true\
                    }\
                ],\
                "spacing": "none"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-subtitle-c) 標準タイプ \- サブタイトル（C）

| ラベル | セクション   | 要素                                                                                      | 説明                                                                                                                  |
| ------ | ------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| C      | サブタイトル | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | - `"layout": "vertical"`<br>- `"spacing": "none"`                                                                     |
| C      | サブタイトル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{サブタイトル}"`<br> <br> 最大行数：2行<br>- `"size": "sm"`<br>- `"color": "#999999"`<br>- `"wrap": true` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                ...\
            },\
            {   // サブタイトル（C） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // テキスト\
                        "type": "text",\
                        "text": "Sub-title",\
                        "size": "sm",\
                        "color": "#999999",\
                        "wrap": true\
                    }\
                ],\
                "spacing": "none"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-details-d) 標準タイプ \- 詳細（D）

| ラベル | セクション       | 要素                                                                                      | 説明                                                                                                                               |
| ------ | ---------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| D      | 詳細             | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | - `"layout": "vertical"`<br>- `"spacing": "sm"`<br>- `"margin": "lg"`<br>- `"flex": 1`                                             |
| D      | 詳細 \- アイテム | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | D-1～D-2を1組だけ入れるボックスです。<br>- `"layout": "horizontal"`<br>- `"spacing": "sm"`<br>- `"flex": 1`                        |
| D-1    | 詳細 \- ラベル   | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{ラベル}"`<br> <br> 最大行数：1行<br>- `"size": "sm"`<br>- `"color": "#555555"`<br>- `"wrap": false`<br>- `"flex": 20` |
| D-2    | 詳細 \- 説明     | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{説明}"`<br> <br> 最大行数：1行<br>- `"size": "sm"`<br>- `"color": "#111111"`<br>- `"wrap": false`<br>- `"flex": 55`   |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                ...\
            },\
            {   // サブタイトル（C） - ボックス\
                ...\
            },\
            {   // 詳細（D） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // ラベル（D-1） - ボックス\
                        "type": "box",\
                        "layout": "horizontal",\
                        "contents": [\
                            {   // テキスト\
                                "type": "text",\
                                "text": "Label 1",\
                                "size": "sm",\
                                "color": "#555555",\
                                "wrap": false,\
                                "flex": 20\
                            },\
                            {   // 説明\
                                "type": "text",\
                                "text": "Description 1",\
                                "size": "sm",\
                                "color": "#111111",\
                                "wrap": false,\
                                "flex": 55\
                            }\
                        ],\
                        "flex": 1,\
                        "spacing": "sm"\
                    },\
                    {   // 説明（D-2） - ボックス\
                        "type": "box",\
                        "layout": "horizontal",\
                        "contents": [\
                            {   // テキスト\
                                "type": "text",\
                                "text": "Label 2",\
                                "size": "sm",\
                                "color": "#555555",\
                                "wrap": false,\
                                "flex": 20\
                            },\
                            {   // テキスト\
                                "type": "text",\
                                "text": "Description 2",\
                                "size": "sm",\
                                "color": "#111111",\
                                "wrap": false,\
                                "flex": 55\
                            }\
                        ],\
                        "flex": 1,\
                        "spacing": "sm"\
                    }\
                ],\
                "spacing": "sm",\
                "margin": "lg",\
                "flex": 1\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-button-e) 標準タイプ \- ボタン (E)

| ラベル | セクション                                   | 要素                                                                                      | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | -------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E      | ボタン                                       | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | E-1～E-2を入れるボックスです。<br>- `"layout": "vertical"`<br>- `"spacing": "xs"`<br>- `"margin": "lg"`                                                                                                                                                                                                                                                                                                                                                                                                                     |
| E-1    | ボタン<br>（linkスタイルのみを使用する場合） | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | - `"style": "link"`<br>- `"height": "sm"`<br>- `"color": "{文字の色}"`<br>- `"action" : { ... }`<br> <br> このボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、 [パーマネントリンク](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/) を指定してください。                                                                                                                             |
| E-2    | ボタン<br>（primaryスタイルを使用する場合)   | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | - 一番上のボタンに `"style": "primary"`、それ以外のボタンに `"style": "link"` を指定してください。 `"secondary"` は使用できません。<br>- `"height": "md"`<br>- `"color": "{文字の色または背景色}"`<br>- `"action" : { ... }`<br> <br> このボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、 [パーマネントリンク](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/) を指定してください。 |

primaryスタイルを使用する場合：

```
{
    "type": "bubble",
    "hero": { ... }
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                ...\
            },\
            {   // サブタイトル（C） - ボックス\
                ...\
            },\
            {   // 詳細（D） - ボックス\
                ...\
            },\
            {   // ボタン（E） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // ボタン（primary）\
                        "type": "button",\
                        "action": {\
                            "type": "uri",\
                            "label": "View details",\
                            "uri": "https://miniapp.line.me/123456-abcedfg"\
                        },\
                        "style": "primary",\
                        "height": "md",\
                        "color": "#17c950"\
                    },\
                    {   // ボタン（link）\
                        "type": "button",\
                        "action": {\
                            "type": "uri",\
                            "label": "Share",\
                            "uri": "https://miniapp.line.me/123456-abcedfg/share"\
                        },\
                        "style": "link",\
                        "height": "md",\
                        "color": "#469fd6"\
                    }\
                ],\
                "spacing": "xs",\
                "margin": "lg"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#standard-type-footer-f) 標準タイプ \- フッター（F）

フッター（F）は、フッターブロックに入れてください。

| ラベル | セクション                                                         | 要素                                                                                                                                                                                           | 説明                                                                                                                                                                                                                                                                                                                                |
| ------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -      | -                                                                  | [フッターブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) \> [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | - `"layout": "vertical"`                                                                                                                                                                                                                                                                                                            |
| -      | -                                                                  | [セパレータ](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#separator)                                                                                               | - `"color": "#f0f0f0"`                                                                                                                                                                                                                                                                                                              |
| F      | フッター                                                           | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)                                                                                                       | F-1～F-3を入れるボックスです。<br>- `"layout": "horizontal"`<br>- `"flex": 1`<br>- `"spacing": "md"`<br>- `"margin": "md"`                                                                                                                                                                                                          |
| F-1    | LINEミニアプリのアイコン                                           | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)                                                                                                         | - `"url": "{画像のURL}"`<br>- `"flex": 1`<br>- `"gravity": "center"`                                                                                                                                                                                                                                                                |
| F-2    | LINEミニアプリの名前                                               | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text)                                                                                                      | - `"text": "{LINEミニアプリの名前}"`<br> <br> 最大行数：1行<br>- `"flex": 19`<br>- `"size": "xs"`<br>- `"color": "#999999"`<br>- `"weight": "bold"`<br>- `"gravity": "center"`<br>- `"wrap": false`                                                                                                                                 |
| F-3    | ![>](https://vos.line-scdn.net/service-notifier/footer_go_btn.png) | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)                                                                                                         | - `"url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png"`<br>- `"flex": 1`<br>- `"gravity": "center"`<br>- `"size": "xxs"`<br>- `"action" : { ... }`<br> <br> この画像をタップしたときに、LINEミニアプリのトップページ（ `https://miniapp.line.me/{your-liffId}`）を表示するようにURIアクションを指定してください。 |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": { ... },
    "footer": { // フッターブロック
        // ボックス
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // セパレータ\
                "type": "separator",\
                "color": "#f0f0f0"\
            },\
            {   // フッター（F） - ボックス\
                "type": "box",\
                "layout": "horizontal",\
                "contents": [\
                    {   // LINEミニアプリのアイコン（F-1）\
                        "type": "image",\
                        "url": "https://example.com/line-mini-app-icon.png",\
                        "flex": 1,\
                        "gravity": "center"\
                    },\
                    {   // LINEミニアプリの名前（F-2）\
                        "type": "text",\
                        "text": "Service name",\
                        "flex": 19,\
                        "size": "xs",\
                        "color": "#999999",\
                        "weight": "bold",\
                        "gravity": "center",\
                        "wrap": false\
                    },\
                    {   // >（F-3）\
                        "type": "image",\
                        "url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png",\
                        "flex": 1,\
                        "gravity": "center",\
                        "size": "xxs",\
                        "action": {\
                            "type": "uri",\
                            "label": "action",\
                            "uri": "https://miniapp.line.me/123456-abcedfg"\
                        }\
                    }\
                ],\
                "flex": 1,\
                "spacing": "md",\
                "margin": "md"\
            }\
        ]
    }
}

```

#### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list) 画像リストタイプのガイドライン

画像リストタイプのFlex Messageは、以下のガイドラインに従ってください。

JSONファイルの例は、「 [ガイドラインに従ったJSONファイルの例](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages-standard/)」を参照してください。

注意

- アクションは、ボタン（E）およびフッター（F）の指定されたコンポーネントにのみ設定できます。
- ここで説明されていないプロパティは変更してはいけません。

![](https://developers.line.biz/assets/img/mini_design_flex_msg_list.86dcd8e4.png)

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-image-a) 画像リストタイプ \- 画像（A）

画像（A）は、ヒーローブロックに入れてください。

| ラベル | セクション | 要素                                                                                                                                                                                         | 説明                                                                                                                                                                                                |
| ------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | 画像       | [ヒーローブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) \> [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | - `"url": "{画像のURL}"`<br>- `"size": "full"`<br>- `"aspectRatio": "{width}:{height}"`<br> <br> ただし、 `{height}` には、 `{width} * 2` 以下の値を設定してください。<br>- `"aspectMode": "cover"` |

```
{
    "type": "bubble",
    "hero": { // ヒーローブロック
        // 画像（A）
        "type": "image",
        "url": "https://example.com/hero-image.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover"
    },
    "body": {...}
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-body) 画像リストタイプ \- ボディ

タイトル（B）、サブタイトル（C）、詳細（D）、ボタン（E）を入れるボディブロックは以下のように指定してください。

| ラベル | セクション | 要素                                                                                                                                                                                         | 説明                                            |
| ------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| -      | -          | [ボディブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) \> [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | - `"layout": "vertical"`<br>- `"spacing": "md"` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": { // ボディブロック
        // ボックス
        "type": "box",
        "layout": "vertical",
        "contents": [ ... ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-title-b) 画像リストタイプ \- タイトル（B）

| ラベル | セクション | 要素                                                                                      | 説明                                                                                                                                      |
| ------ | ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| B      | タイトル   | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | - `"layout": "vertical"`<br>- `"spacing": "none"`                                                                                         |
| B      | タイトル   | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{タイトル}"`<br> <br> 最大行数：2行<br>- `"size": "lg"`<br>- `"color": "#000000"`<br>- `"weight": "bold"`<br>- `"wrap": true` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // テキスト\
                        "type": "text",\
                        "text": "Main title",\
                        "size": "lg",\
                        "color": "#000000",\
                        "weight": "bold",\
                        "wrap": true\
                    }\
                ],\
                "spacing": "none"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-subtitle-c) 画像リストタイプ \- サブタイトル（C）

| ラベル | セクション   | 要素                                                                                      | 説明                                                                                                                  |
| ------ | ------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| C      | サブタイトル | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | - `"layout": "vertical"`<br>- `"spacing": "none"`                                                                     |
| C      | サブタイトル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{サブタイトル}"`<br> <br> 最大行数：2行<br>- `"size": "sm"`<br>- `"color": "#999999"`<br>- `"wrap": true` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                ...\
            },\
            {   // サブタイトル（C） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // テキスト\
                        "type": "text",\
                        "text": "Sub-title",\
                        "size": "sm",\
                        "color": "#999999",\
                        "wrap": true\
                    }\
                ],\
                "spacing": "none"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-details-d) 画像リストタイプ \- 詳細（D）

| ラベル | セクション             | 要素                                                                                      | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------ | ---------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D      | 詳細                   | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | - `"layout": "vertical"`<br>- `"spacing": "xl"`<br>- `"margin": "lg"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -      | 詳細 \- アイテム       | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | D-1～D-4を1組だけ入れるボックスです。<br>- `"layout": "horizontal"`<br>- `"flex": 1`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| D-1    | 詳細 \- 画像           | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)    | - `"url": "{画像のURL}"`<br>- `"flex": 3`<br>- `"size": "sm"`<br>- `"aspectRatio": "1:1"`<br>- `"aspectMode": "cover"`                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -      | 詳細 \- テキストエリア | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | D-2～D-4を入れるボックスです。<br>- `"layout": "vertical"`<br>- `"flex": 8`<br>- `"spacing": "xs"`<br>- `"margin": "md"`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| D-2    | 詳細 \- 標準テキスト   | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{標準テキスト}"`<br>- `"size": "md"`<br>- `"color": "#111111"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| D-3    | 詳細 \- 強調テキスト   | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | - `"text": "{強調テキスト}"`<br>- `"size": "md"`<br>- `"color": "#111111"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| D-4    | 詳細 \- 画像＋テキスト | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | D-4の画像とテキストを入れるボックス：<br>- `"layout": "horizontal"`<br>- `"flex": 1`<br>D-4の [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)：<br>- `"flex": 8`<br>- `"url": "{画像のURL}"`<br>- `"gravity": "center"`<br>- `"size": "xxs"`<br>- `"aspectRatio": "1:1"`<br>D-4の [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text)：<br>- `"flex": 85`<br>- `"margin": "xs"`<br>- `"text": "{テキスト}"`<br>- `"size": "sm"`<br>- `"color": "{色}"`<br>- `"gravity": "center"` |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                ...\
            },\
            {   // サブタイトル（C） - ボックス\
                ...\
            },\
            {   // 詳細（D） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // アイテム\
                        "type": "box",\
                        "layout": "horizontal",\
                        "contents": [\
                            {   // 画像\
                                "type": "image",\
                                "url": "https://example.com/item-image01.png",\
                                "flex": 3,\
                                "size": "sm",\
                                "aspectRatio": "1:1",\
                                "aspectMode": "cover"\
                            },\
                            {   // テキストエリア\
                                "type": "box",\
                                "layout": "vertical",\
                                "contents": [\
                                    {   // 標準テキスト（D-2）\
                                        "type": "text",\
                                        "text": "General text",\
                                        "size": "md",\
                                        "color": "#111111"\
                                    },\
                                    {   // 強調テキスト（D-3）\
                                        "type": "text",\
                                        "text": "Text to emphasize",\
                                        "size": "md",\
                                        "color": "#111111"\
                                    },\
                                    {   // 画像＋テキスト（D-4）\
                                        "type": "box",\
                                        "layout": "horizontal",\
                                        "contents": [\
                                            {   // 画像\
                                                "type": "image",\
                                                "url": "https://example.com/item-image02.png",\
                                                "flex": 8,\
                                                "gravity": "center",\
                                                "size": "xxs",\
                                                "aspectRatio": "1:1"\
                                            },\
                                            {   // テキスト\
                                                "type": "text",\
                                                "text": "Image + text",\
                                                "flex": 85,\
                                                "gravity": "center",\
                                                "size": "sm",\
                                                "color": "#17c950",\
                                                "margin": "xs"\
                                            }\
                                        ],\
                                        "flex": 1\
                                    }\
                                ],\
                                "flex": 8,\
                                "spacing": "xs",\
                                "margin": "md"\
                            }\
                        ],\
                        "flex": 1\
                    }\
                ],\
                "spacing": "xl",\
                "margin": "lg"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-button-e) 画像リストタイプ \- ボタン (E)

| ラベル | セクション                           | 要素                                                                                      | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E      | ボタン                               | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)  | E-1～E-2を入れるボックスです。<br>- `"layout": "vertical"`<br>- `"spacing": "xs"`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| E-1    | ボタン<br>（linkのみを使用する場合） | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | - `"style": "link"`<br>- `"height": "sm"`<br>- `"color": "{文字の色}"`<br>- `"action" : { ... }`<br> <br> このボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、 [パーマネントリンク](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/) を指定してください。                                                                                                                             |
| E-2    | ボタン<br>（primaryを使用する場合)   | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | - 一番上のボタンに `"style": "primary"`、それ以外のボタンに `"style": "link"` を指定してください。 `"secondary"` は使用できません。<br>- `"height": "md"`<br>- `"color": "{文字の色または背景色}"`<br>- `"action" : { ... }`<br> <br> このボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、 [パーマネントリンク](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/) を指定してください。 |

primaryを使用する場合：

```
{
    "type": "bubble",
    "hero": { ... }
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // タイトル（B） - ボックス\
                ...\
            },\
            {   // サブタイトル（C） - ボックス\
                ...\
            },\
            {   // 詳細（D） - ボックス\
                ...\
            },\
            {   // ボタン（E） - ボックス\
                "type": "box",\
                "layout": "vertical",\
                "contents": [\
                    {   // ボタン（primary）\
                        "type": "button",\
                        "action": {\
                            "type": "uri",\
                            "label": "View details",\
                            "uri": "https://miniapp.line.me/123456-abcedfg"\
                        },\
                        "style": "primary",\
                        "height": "md",\
                        "color": "#17c950"\
                    },\
                    {   // ボタン（link）\
                        "type": "button",\
                        "action": {\
                            "type": "uri",\
                            "label": "Share",\
                            "uri": "https://miniapp.line.me/123456-abcedfg/share"\
                        },\
                        "style": "link",\
                        "height": "md",\
                        "color": "#469fd6"\
                    }\
                ],\
                "spacing": "xs"\
            }\
        ],
        "spacing": "md"
    }
}

```

##### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/#image-list-type-footer-f) 画像リストタイプ \- フッター（F）

| ラベル | セクション                                                         | 要素                                                                                                                                                                                           | 説明                                                                                                                                                                                                                                                                                                                                |
| ------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -      | -                                                                  | [フッターブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) \> [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | - `"layout": "vertical"`                                                                                                                                                                                                                                                                                                            |
| -      | -                                                                  | [セパレータ](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#separator)                                                                                               | - `"color": "#f0f0f0"`                                                                                                                                                                                                                                                                                                              |
| F      | フッター                                                           | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)                                                                                                       | F-1～F-3を入れるボックスです。<br>- `"layout": "horizontal"`<br>- `"flex": 1`<br>- `"spacing": "md"`<br>- `"margin": "md"`                                                                                                                                                                                                          |
| F-1    | LINEミニアプリのアイコン                                           | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)                                                                                                         | - `"url": "{画像のURL}"`<br>- `"flex": 1`<br>- `"gravity": "center"`                                                                                                                                                                                                                                                                |
| F-2    | LINEミニアプリの名前                                               | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text)                                                                                                      | - `"text": "{LINEミニアプリの名前}"`<br> <br> 最大行数：1行<br>- `"flex": 19`<br>- `"size": "xs"`<br>- `"color": "#999999"`<br>- `"weight": "bold"`<br>- `"gravity": "center"`<br>- `"wrap": false`                                                                                                                                 |
| F-3    | ![>](https://vos.line-scdn.net/service-notifier/footer_go_btn.png) | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)                                                                                                         | - `"url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png"`<br>- `"flex": 1`<br>- `"gravity": "center"`<br>- `"size": "xxs"`<br>- `"action" : { ... }`<br> <br> この画像をタップしたときに、LINEミニアプリのトップページ（ `https://miniapp.line.me/{your-liffId}`）を表示するようにURIアクションを指定してください。 |

```
{
    "type": "bubble",
    "hero": { ... },
    "body": { ... },
    "footer": { // フッターブロック
        // ボックス
        "type": "box",
        "layout": "vertical",
        "contents": [\
            {   // セパレータ\
                "type": "separator",\
                "color": "#f0f0f0"\
            },\
            {   // フッター（F） - ボックス\
                "type": "box",\
                "layout": "horizontal",\
                "contents": [\
                    {   // LINEミニアプリのアイコン（F-1）\
                        "type": "image",\
                        "url": "https://example.com/line-mini-app-icon.png",\
                        "flex": 1,\
                        "gravity": "center"\
                    },\
                    {   // LINEミニアプリの名前（F-2）\
                        "type": "text",\
                        "text": "Service name",\
                        "flex": 19,\
                        "size": "xs",\
                        "color": "#999999",\
                        "weight": "bold",\
                        "gravity": "center",\
                        "wrap": false\
                    },\
                    {   // >（F-3）\
                        "type": "image",\
                        "url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png",\
                        "flex": 1,\
                        "gravity": "center",\
                        "size": "xxs",\
                        "action": {\
                            "type": "uri",\
                            "label": "action",\
                            "uri": "https://miniapp.line.me/123456-abcedfg"\
                        }\
                    }\
                ],\
                "flex": 1,\
                "spacing": "md",\
                "margin": "md"\
            }\
        ]
    }
}

```
