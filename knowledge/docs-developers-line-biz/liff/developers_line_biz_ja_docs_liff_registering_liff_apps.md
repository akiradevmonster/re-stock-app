# [\#](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#page-title) LIFFアプリをチャネルに追加する

LIFFアプリは、 [LINE Developersコンソール](https://developers.line.biz/console/) でLINEログインのチャネルに追加すると、LINEまたは外部ブラウザで起動できるようになります。

LINEミニアプリとしての作成を推奨します

今後、LIFFとLINEミニアプリは、ブランド統合を予定しています。この統合により、LIFFはLINEミニアプリに統合されます。そのため、LIFFアプリを新規作成する際は、LINEミニアプリとして作成することを推奨します。詳しくは、「 [2025年2月12日のニュース](https://developers.line.biz/ja/news/2025/02/12/line-mini-app/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#before-you-begin) 始める前に

以下の作業が完了していることを確認します。

- [チャネルを作成する](https://developers.line.biz/ja/docs/liff/getting-started/)
- 「 [LIFFスターターアプリを試してみる](https://developers.line.biz/ja/docs/liff/trying-liff-app/)」または「 [LIFFアプリを開発する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/)」の手順に従って、任意のサーバーにLIFFアプリをデプロイする

## [\#](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app) LIFFアプリをチャネルに追加する

1つのチャネルごとに最大30件のLIFFアプリを追加できます。

1. [LINE Developersコンソール](https://developers.line.biz/console/) で、LIFFアプリを追加するLINEログインのチャネルを選択し、［ **LIFF**］タブをクリックします。

2. ［ **追加**］をクリックします。

3. 以下の項目を設定します。設定は後からでも変更できます。

**基本情報**

| 項目                     | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ユーザーに表示される画面                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| LIFFアプリ名             | LIFFアプリの名前。LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含められません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | [別のLIFFアプリを開いた場合に表示されるメッセージ](https://developers.line.biz/ja/docs/liff/opening-liff-app/#messages-liff-to-liff) |
| サイズ                   | LIFFアプリの画面サイズ。次のサイズから選択してください。<br>- `Compact`<br>- `Tall`<br>- `Full`<br>![](Base64-Image-Removed)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -                                                                                                                                    |
| エンドポイントURL        | LIFFアプリを実装したウェブアプリのURL（例： `https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。<br>URLスキームは **https** である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | [LIFFブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser) のヘッダー（ドメイン名のみ）                         |
| Scope \*1                | LIFF SDKの一部のメソッドを利用するために必要なスコープ。<br>- `openid`： [`liff.getIDToken()`](https://developers.line.biz/ja/reference/liff/#get-id-token) および [`liff.getDecodedIDToken()`](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token) を使用するためのスコープ。<br>- `email`： [`liff.getIDToken()`](https://developers.line.biz/ja/reference/liff/#get-id-token) および [`liff.getDecodedIDToken()`](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token) で、メールアドレスを取得するためのスコープ \*2<br>- `profile`： [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) および [`liff.getFriendship()`](https://developers.line.biz/ja/reference/liff/#get-friendship) を使用するためのスコープ。<br>- `chat_message.write`： [`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages) を使用するためのスコープ。アカウントの種類によっては、このオプションが［すべて表示］の下に表示されることがあります。 \*3 | LIFFアプリ起動時の権限の同意画面                                                                                                     |
| 友だち追加オプション \*4 | [友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/) の設定。<br>- `On (normal)`：LIFFアプリの権限の同意画面に、LINE公式アカウントを友だち追加するオプションを追加します。<br>- `On (aggressive)`：LIFFアプリの権限の同意画面の後に、LINE公式アカウントを友だち追加するかどうか確認する画面を表示します。<br>- `Off`：LINE公式アカウントを友だち追加するオプションを表示しません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | LIFFアプリ起動時の権限の同意画面                                                                                                     |

**オプション**

| 項目             | 説明                                                                                                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scan QR          | このチャネルに追加したLIFFアプリで [`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2) を利用する場合は、オンにします。                                                                             |
| モジュールモード | LIFFアプリをモジュールモードで使用する場合は、オンにします。［ **モジュールモード**］をオンにすると、アクションボタンを非表示にできます。このオプションはLIFFアプリの画面サイズで［ **Full**］を選択している場合のみ表示されます。 |

\*1 法人ユーザー、かつ利用申請をすることで表示されるスコープについては、法人ユーザー向けオプションドキュメントの「 [LINE Profile+](https://developers.line.biz/ja/docs/partner-docs/line-profile-plus/)」を参照してください。

\*2 LINEログインのチャネルで、OpenID Connectのメール取得権限を申請した場合のみ表示されます。

\*3 LIFF間遷移後のLIFFアプリで `chat_message.write` スコープが無効になる場合があります。詳しくは、「 [LIFF間遷移後の「chat_message.write」スコープについて](https://developers.line.biz/ja/docs/liff/opening-liff-app/#about-chat-message-write-scope)」を参照してください。

\*4 LINEログインのチャネルでのみ表示されます。

4. ［ **追加**］をクリックします。

LIFFアプリを追加すると、LIFF IDとLIFF URLが作成されます。

| 項目     | 説明                                                                                                                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LIFF ID  | LIFFアプリIDです。<br>例： `1234567890-AbcdEfgh`                                                                                                                                                                                                                    |
| LIFF URL | LIFFアプリにアクセスするためのURLです。ユーザーがLIFF URLにアクセスすると、LINEヤフー株式会社が提供するLIFFサーバーを経由して、開発者が提供するLIFFアプリのサーバー（エンドポイントURL）にリダイレクトされます。<br>例： `https://liff.line.me/1234567890-AbcdEfgh` |

## [\#](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#order-of-liff-apps) LIFFタブにおけるLIFFアプリの並び順

LINEログインチャネルの［ **LIFF**］タブにおいて、LIFFアプリは以下の並び順で表示されます。

1. 2023年5月23日以降にLINEログインチャネルへ追加されたLIFFアプリが、追加日の降順で表示される
2. 2023年5月23日より前にLINEログインチャネルへ追加されたLIFFアプリが、順不同で表示される

![LIFFタブで表示されるLIFFアプリの例](https://developers.line.biz/assets/img/order-of-liff-apps-ja.7c4e7bac.png)

## [\#](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#other-operations) その他の操作

LINE Developersコンソールの［LIFF］タブでは、以下の操作も実行できます。

- LIFFアプリの設定を編集する
- LIFFアプリをチャネルから削除する

## [\#](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#steps-after-adding-liff-app-to-channel) 次のステップ

LIFFアプリをチャネルに追加したら、LIFFアプリを開いてみましょう。

- [LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)
