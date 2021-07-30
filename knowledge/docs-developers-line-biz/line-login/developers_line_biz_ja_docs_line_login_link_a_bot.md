# [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#page-title) LINEログインしたときにLINE公式アカウントを友だち追加する（友だち追加オプション）

ユーザーがアプリにログインするときに、LINE公式アカウントを友だち追加するオプションを表示するように設定できます。これを、 **友だち追加オプション** と呼びます。友だち追加するLINE公式アカウントは、LINE Developersコンソールで指定します。

![同意画面](https://developers.line.biz/assets/img/consent-screen-with-bot-ja.04bae40e.png)

上記の同意画面でユーザーが［ **友だち追加**］を有効にしてログインすると、LINE公式アカウントがユーザーの友だちとして追加されます。ボットの作成について詳しくは、『Messaging APIドキュメント』の「 [Messaging APIの概要](https://developers.line.biz/ja/docs/messaging-api/overview/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#displaying-the-option-to-add-your-line-official-account-as-a-friend) LINE公式アカウントを友だち追加するオプションを表示するには

LINE公式アカウントを友だち追加するオプションを、同意画面に表示するには、以下の設定を行います。

1. [チャネルにLINE公式アカウントをリンクする](https://developers.line.biz/ja/docs/line-login/link-a-bot/#link-a-line-official-account)
2. [LINEログインの認可URLに `bot_prompt` クエリパラメータを付けてユーザーをリダイレクトする](https://developers.line.biz/ja/docs/line-login/link-a-bot/#redirect-users)

### [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#link-a-line-official-account) チャネルにLINE公式アカウントをリンクする

LINE Developersコンソールで、LINEログインのチャネルにLINE公式アカウントをリンクします。

注意

LINEログインのチャネルにLINE公式アカウントをリンクするには、以下の要件を満たす必要があります。

- LINE公式アカウントに関連付けられたMessaging APIのチャネルが、LINEログインのチャネルと同じプロバイダーに属していること。
- 操作するアカウントは、LINEログインのチャネルのAdmin権限と、LINE公式アカウントの管理者権限を持っていること。
  - LINEログインのチャネルのAdmin権限は、 [LINE Developersコンソール](https://developers.line.biz/console/) で確認できます。
  - LINE公式アカウントの管理者権限は、 [LINE Official Account Manager(opens new window)](https://manager.line.biz/) で確認できます。

1. [LINE Developersコンソール](https://developers.line.biz/console/) にログインし、LINEログインのチャネルがあるプロバイダーをクリックします。

2. LINEログインのチャネルをクリックします。

3. ［ **チャネル基本設定**］タブをクリックし、［ **リンクされたLINE公式アカウント**］の［ **編集**］をクリックします。

4. ユーザーに友だち追加させるLINE公式アカウントを選択して、［ **更新**］をクリックします。

現在ログインしているアカウントが管理者権限を持っているLINE公式アカウントを選択できます。

1つのLINEログインチャネルには、1つのLINE公式アカウントをリンクできます。

### [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#redirect-users) LINEログインの認可URLに `bot_prompt` クエリパラメータを付けてユーザーをリダイレクトする

チャネルにLINE公式アカウントをリンクし終えたら、LINEログインの認可URLに `bot_prompt` クエリパラメータを付けてユーザーをリダイレクトします。

```
https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={CHANNEL_ID}&redirect_uri={CALLBACK_URL}&state={STATE}&bot_prompt={BOT_PROMPT}&scope={SCOPE_LIST}

```

`bot_prompt` クエリパラメータの設定に応じて、以下のようにオプションが表示されます。

| 値           | 説明                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `normal`     | LINEログインの同意画面に、LINE公式アカウントを友だち追加するオプションを表示します。               |
| `aggressive` | LINEログインの同意画面の後に、LINE公式アカウントを友だち追加するかどうか確認する画面を表示します。 |

![表示される画面](https://developers.line.biz/assets/img/bot-prompt-ja.795267e5.png)

ヒント

`bot_prompt` 以外のクエリパラメータについて詳しくは、「 [認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」を参照してください。

#### [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#display-options-on-consent-screen) 同意画面のオプションの表示について

ユーザーとLINE公式アカウントの友だち関係にあわせて、LINE公式アカウントを友だち追加するオプションが以下のように表示されます。

| 同意画面が表示されたときの友だち関係 | ユーザーに表示されるオプション                                                                                                                           |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 友だち未追加                         | LINE公式アカウントを友だち追加するオプションが表示されます。ユーザーがオプションを有効にして続行すると、LINE公式アカウントが友だち追加されます。         |
| ブロック済み                         | LINE公式アカウントのブロックを解除するオプションが表示されます。ユーザーがオプションを有効にして続行すると、LINE公式アカウントのブロックが解除されます。 |
| 友だち追加済み                       | LINE公式アカウントが友だち追加済みであることが表示されます。LINE公式アカウントを友だち追加するオプションは表示されません。                               |

認証プロバイダーの場合、オプションはデフォルトで有効になります

LINEログインのチャネルが認証プロバイダー配下に存在する場合、 `bot_prompt=normal` のときに表示される同意画面上のオプションは、デフォルトで有効になります。

![](https://developers.line.biz/assets/img/add-friend-option-on-certified-provider-ja.56ab1970.png)

認証プロバイダーについて詳しくは、『LINE Developersコンソールドキュメント』の「 [認証プロバイダーについて](https://developers.line.biz/ja/docs/line-developers-console/overview/#certified-provider)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#getting-the-friendship-status-of-the-user-and-the-line-official-account) ユーザーとLINE公式アカウントの関係を取得する

友だち追加オプションを利用している場合は、LINEログインのチャネルにリンクされているLINE公式アカウントとユーザーの友だち関係を、次の方法で取得できます。

- [`friendship_status_changed` クエリパラメータを確認する](https://developers.line.biz/ja/docs/line-login/link-a-bot/#use-friendship_status_changed)
- [LINEログインAPIを使って友だち関係を取得する](https://developers.line.biz/ja/docs/line-login/link-a-bot/#use-line-login-api)

### [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#use-friendship_status_changed) `friendship_status_changed` クエリパラメータを確認する

[認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request) ときに `bot_prompt` クエリパラメータを指定していた場合は、ユーザーの認証と認可が完了すると、 `friendship_status_changed` クエリパラメータを含むコールバックURLにリダイレクトされます。

リダイレクト先URLの例：

```
https://client.example.org/cb?code={CODE}&state={STATE}&friendship_status_changed={FRIENDSHIP_STATUS_CHANGED}

```

`friendship_status_changed` クエリパラメータは、以下のいずれかの値になります。コールバックURLについて詳しくは、「 [認可コードを受け取る](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#receiving-the-authorization-code)」を参照してください。

| 値      | 説明                                                                                                                                                                                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `true`  | LINE公式アカウントとユーザーの関係が、ログイン時に変化しました。具体的には、以下のいずれかです。<br>- ユーザーがLINE公式アカウントを友だち追加した。<br>- ユーザーがブロックを解除した。                                                                                                 |
| `false` | LINE公式アカウントとユーザーの関係が、ログイン時に変化しませんでした。具体的には、以下のいずれかです。<br>- ユーザーは以前からLINE公式アカウントと友だちだった。<br>- ユーザーがLINE公式アカウントを友だち追加しなかった。<br>- ユーザーがLINE公式アカウントのブロックを解除しなかった。 |

注意

LINE公式アカウントを友だち追加するオプションを含む同意画面がユーザーに表示されなかった場合は、 `friendship_status_changed` クエリパラメータは含まれません。

### [\#](https://developers.line.biz/ja/docs/line-login/link-a-bot/#use-line-login-api) LINEログインAPIを使って友だち関係を取得する

[ウェブアプリで取得したアクセストークン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#get-access-token) を利用すると、LINEログインのチャネルにリンクされているLINE公式アカウントと、ユーザーの友だち関係を取得できます。

リクエストの例：

```
curl -v -X GET https://api.line.me/friendship/v1/status \
-H 'Authorization: Bearer {access token}'

```

レスポンスの例：

```
{
  "friendFlag": true
}

```

詳しくは、『LINEログイン v2.1 APIリファレンス』の「 [LINE公式アカウントとの友だち関係を取得する](https://developers.line.biz/ja/reference/line-login/#get-friendship-status)」を参照してください。
