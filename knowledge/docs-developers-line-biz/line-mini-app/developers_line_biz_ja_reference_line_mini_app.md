# [\#](https://developers.line.biz/ja/reference/line-mini-app/#page-title) LINEミニアプリ APIリファレンス

## [\#](https://developers.line.biz/ja/reference/line-mini-app/#service-messages) サービスメッセージ

認証済ミニアプリでのみ利用できます

この機能は、認証済ミニアプリでのみ利用できます。未認証ミニアプリの場合、開発用の内部チャネルではテストできますが、公開用の内部チャネルでは利用できません。

サービスメッセージAPIを使用すると、サービスからLINEミニアプリのユーザーに、サービスメッセージを送信できます。

サービスメッセージを送信するには、サービス通知トークンと [テンプレート](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/#service-message-templates) が必要です。

- [サービス通知トークンを発行する](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token)
- [サービスメッセージを送信する](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message)

### [\#](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token) サービス通知トークンを発行する

サービス通知トークンを発行します。サービス通知トークンを使用すると、紐づけられたユーザーに対してサービスメッセージを送信できます。

サービス通知トークンの特徴は以下のとおりです。

- サービス通知トークンは、発行から1年間（31,536,000秒間）有効です。有効期限が切れるまでに、最大5回サービスメッセージを送信できます。
- サービス通知トークンを使用すると、有効期限が切れておらず、残りの送信可能回数が0でない場合は、サービス通知トークンの値が更新されます。ユーザーに対して、後続のサービスメッセージを送信する場合は、更新後のサービス通知トークンを保存してください。

1つのアクセストークンで複数のサービス通知トークンを発行しないでください

[`liff.getAccessToken()`](https://developers.line.biz/ja/reference/liff/#get-access-token) で取得したアクセストークン（LIFFのアクセストークン）を再利用して、複数のサービス通知トークンを発行することは許可されていません。

LIFFのアクセストークン1つにつき、発行できるサービス通知トークンは1つだけです。

注意

サービス通知トークンは、一人のユーザーに紐づいています。あるユーザーに紐づいたサービス通知トークンを利用して、ほかのユーザーにサービスメッセージを送信することはできません。

_リクエストの例_

Shell

```bash
curl -X POST https://api.line.me/message/v3/notifier/token \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer W1TeHCgfH2Liwa...' \
-d '{
    "liffAccessToken": "eyJhbGciOiJIUzI1NiJ9..."
}'

```

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token-http-request) HTTPリクエスト

`POST https://api.line.me/message/v3/notifier/token`

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token-request-headers) リクエストヘッダー

Content-Type:

- 必須
- application/json

Authorization:

- 必須
- Bearer `{channel access token}`

詳しくは、「 [チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

##### ステートレスチャネルアクセストークンの使用を推奨します

LINEミニアプリチャネルでは、 [長期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#long-lived-channel-access-token) および、 [任意の有効期間を指定できるチャネルアクセストークン（チャネルアクセストークンv2.1）](https://developers.line.biz/ja/docs/basics/channel-access-token/#user-specified-expiration) は使用できません。

LINEミニアプリの開発では、 [ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token) または [短期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#short-lived-channel-access-token) を使用できます。このうち、ステートレスチャネルアクセストークンの使用を推奨します。ステートレスチャネルアクセストークンは、発行数に制限がないため、アプリケーション側でトークンのライフサイクルを管理する必要がありません。

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token-request-body) リクエストボディ

liffAccessToken:

- String
- 必須
- [`liff.getAccessToken()`](https://developers.line.biz/ja/reference/liff/#get-access-token) で取得したアクセストークン（LIFFのアクセストークン）

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token-response) レスポンス

ステータスコード `200` と以下の情報を含むJSONオブジェクトを返します。

notificationToken:

- String
- サービス通知トークン

expiresIn:

- Number
- サービス通知トークンの有効期限が切れるまでの秒数。サービス通知トークンは、発行から1年間（31,536,000秒間）有効です。

remainingCount:

- Number
- 発行されたサービス通知トークンで、サービスメッセージを送信できる回数

sessionId:

- String
- セッションID。詳しくは、「 [サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

##### _レスポンスの例_

JSON

```json
{
  "notificationToken": "34c11a03-b726-49e3-8ce0-949387a9..",
  "expiresIn": 31536000,
  "remainingCount": 5,
  "sessionId": "xD06...."
}
```

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token-error-response) エラーレスポンス

以下のいずれかのステータスコードとエラーメッセージを返します。

| ステータスコード          | 説明                                                                                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 Bad request           | 以下のいずれかです。<br>- リクエストボディに問題があります。<br>- `liffAccessToken` プロパティに指定したLIFFのアクセストークンを使用して、サービス通知トークンの発行が短時間に連続してリクエストされました。                                          |
| 401 Unauthorized          | 以下のいずれか、または両方です。<br>- 有効なチャネルアクセストークンが指定されていません。<br>- 有効なLIFFのアクセストークンが指定されていません。<br> - ユーザーがLIFFアプリを閉じると、有効期限が切れていなくてもアクセストークンは無効化されます。 |
| 403 Forbidden             | このチャネルには、サービス通知トークンを発行する許可が与えられていません。                                                                                                                                                                            |
| 500 Internal Server Error | 内部サーバーのエラーです。                                                                                                                                                                                                                            |

##### _エラーレスポンスの例_

JSON

```json
{
  "message": "[liffAccessToken] must not be blank"
}
```

### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message) サービスメッセージを送る

サービス通知トークンで指定されたユーザーに、サービスメッセージを送信します。

サービスメッセージを送信すると、有効期限が切れておらず、残りの送信可能回数が0でない場合は、サービス通知トークンの値が更新されます。ユーザーに対して、後続のサービスメッセージを送信する予定がある場合は、更新後のサービス通知トークンを保存してください。

#### _リクエストの例_

Shell

```bash
curl -X POST https://api.line.me/message/v3/notifier/send?target=service \
-H 'Authorization: Bearer W1TeHCgfH2Liwa...' \
-H 'Content-Type: application/json' \
-d '{
    "templateName": "thankyou_msg_en",
    "params": {
        "date": "2020-04-23",
        "username": "Brown & Cony"
    },
    "notificationToken": "34c11a03-b726-49e3-8ce0-949387a9.."
}'
```

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message-http-request) HTTPリクエスト

`POST https://api.line.me/message/v3/notifier/send`

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message-request-headers) リクエストヘッダー

Content-Type:

- 必須
- application/json

Authorization:

- 必須
- Bearer `{channel access token}`

詳しくは、『LINEプラットフォームの基礎知識』の「 [チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

##### ステートレスチャネルアクセストークンの使用を推奨します

LINEミニアプリチャネルでは、 [長期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#long-lived-channel-access-token) および、 [任意の有効期間を指定できるチャネルアクセストークン（チャネルアクセストークンv2.1）](https://developers.line.biz/ja/docs/basics/channel-access-token/#user-specified-expiration) は使用できません。

LINEミニアプリの開発では、 [ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token) または [短期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#short-lived-channel-access-token) を使用できます。このうち、ステートレスチャネルアクセストークンの使用を推奨します。ステートレスチャネルアクセストークンは、発行数に制限がないため、アプリケーション側でトークンのライフサイクルを管理する必要がありません。

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message-query-parameters) クエリパラメータ

target:

- 必須
- `service`

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message-request-body) リクエストボディ

templateName:

- String
- 必須

サービスメッセージに使用する、事前登録済みテンプレートの名前。BCP 47言語タグを末尾に追加してください。

- フォーマット： `{template name}_{BCP 47 language tag}`
- 最大文字数：30

params:

- object
- 必須

テンプレート変数と値のペアを指定するJSONオブジェクト。

テンプレートにテンプレート変数がない場合は、空のJSONオブジェクト（ `{ }`）を指定します。

テンプレート変数は、テンプレートごとに定義されています。必須の要素にテンプレート変数が含まれる場合は、必ずテンプレート変数と値のペアを指定してください。

詳しくは、「 [サービスメッセージのテンプレートを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/#service-message-templates)」を参照してください。

notificationToken:

- String
- 必須
- サービス通知トークン

##### 注意

サービスメッセージでサポートしている言語と言語タグは、以下のとおりです。

- アラビア語： `ar`
- 中国語（簡体字）： `zh-CN`
- 中国語（繁体字）： `zh-TW`
- 英語： `en`
- フランス語： `fr`
- ドイツ語： `de`
- インドネシア語： `id`
- イタリア語： `it`
- 日本語： `ja`
- 韓国語： `ko`
- マレー語： `ms`
- ポルトガル語（ブラジル）： `pt-BR`
- ポルトガル語（ポルトガル）： `pt-PT`
- ロシア語： `ru`
- スペイン語（スペイン）： `es-ES`
- タイ語： `th`
- トルコ語： `tr`
- ベトナム語： `vi`

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message-response) レスポンス

ステータスコード `200` と以下の情報を含むJSONオブジェクトを返します。

notificationToken:

- String
- 更新後のサービス通知トークン。このサービス通知トークンを使用して、後続のサービスメッセージを送信します。

expiresIn:

- Number
- 更新後のサービス通知トークンの有効期限が切れるまでの秒数

remainingCount:

- Number
- 更新後のサービス通知トークンで、後続のサービスメッセージを送信できる回数

sessionId:

- String
- セッションID。詳しくは、「 [サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

##### 注意

`expiresIn` および `remainingCount` の値が `0` の場合は、サービスメッセージは送信されたが、サービス通知トークンが更新できなかったことを示します。

##### _レスポンスの例_

JSON

```json
// リクエストは成功し、
// 新しいサービス通知トークンが
// 発行されました。
{
  "notificationToken": "c9884874-bf6a-4241-8999-2767241c...",
  "expiresIn": 31535906,
  "remainingCount": 3,
  "sessionId": "xD06...."
}

// リクエストは成功し、
// サービスメッセージは送信されたが、
// LINEプラットフォームがサービス
// 通知トークンを更新できない場合
{
  "expiresIn": 0,
  "remaningCount": 0
}
```

#### [\#](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message-error-response) エラーレスポンス

以下のいずれかのステータスコードとエラーメッセージを返します。

| ステータスコード          | 説明                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 400 Bad request           | 以下のいずれかです。<br>- リクエストボディに問題があります。<br>- サービスメッセージ送信対象のユーザーが存在しません。                           |
| 401 Unauthorized          | 以下のいずれか、または両方です。<br>- 有効なチャネルアクセストークンが指定されていません。<br>- 有効なサービス通知トークンが指定されていません。 |
| 403 Forbidden             | 以下のいずれかです。<br>- このチャネルには、サービスメッセージを送信する許可が与えられていません。<br>- 指定されたテンプレートが見つかりません。 |
| 500 Internal Server Error | 内部サーバーのエラーです。                                                                                                                       |

##### _エラーレスポンスの例_

JSON

```json
{
  "message": "Invalid notifier token"
}
```
