# [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#page-title) チャネル同意のプロセスをスキップする

認証済ミニアプリでのみ利用できます

この機能は、認証済ミニアプリでのみ利用できます。未認証ミニアプリの場合、開発用の内部チャネルではテストできますが、公開用の内部チャネルでは利用できません。

「チャネル同意の簡略化」機能で同意される権限について

[LINE公式アカウント](https://developers.line.biz/ja/glossary/#line-official-account) を初めて友だち追加する際に表示される [ユーザーのプロフィール情報取得に同意](https://developers.line.biz/ja/docs/messaging-api/user-consent/) した場合、以降別のLINE公式アカウントによるプロフィール情報取得にも同意したと見なされ、同意画面がスキップされるようになります。本ページで説明する「チャネル同意の簡略化」機能を使うと、LINE公式アカウントの友だち追加と同様に、一度簡略化に対する同意を行えば、以降初めてアクセスするLINEミニアプリでは「チャネル同意画面」がスキップされるようになります。

ただし、LINEヤフー株式会社による個人情報保護方針に基づいて、「チャネル同意の簡略化」機能で同意がスキップされる権限は、 [ユーザーID](https://developers.line.biz/ja/glossary/#user-id)（ `openid` スコープ）のみに限定され、ユーザーのプロフィール情報取得やメッセージ送信に必要な権限（ [`profile` スコープや `chat_message.write` スコープ](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app) など）は、「チャネル同意の簡略化」の対象に含まれません。これらの権限については、各LINEミニアプリ内で権限が必要になったタイミングでユーザーに同意を促す画面が表示されます。

ユーザーは、 `openid` スコープを有効化したLINEミニアプリに初めてアクセスする際に、「 [チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/develop/configure-console/#consent-screen-settings)」において、LINEミニアプリ内で [ユーザーID](https://developers.line.biz/ja/glossary/#user-id) が利用されることに同意する必要があります。

この同意のプロセスを簡略化するには、 [LINE Developersコンソール](https://developers.line.biz/console/) のLINEミニアプリチャネルにおいて、「チャネル同意の簡略化」機能をオンにします。これにより、ユーザーは簡略化に対する同意を初回のみ行うだけで、別のLINEミニアプリに初めてアクセスする際は「チャネル同意画面」をスキップして、すぐにサービスの利用を開始できるようになります。

「チャネル同意の簡略化」設定をオンにすると、ユーザーがより簡単にLINEミニアプリにアクセスできるようになります。ユーザーの負担を軽減するために、「チャネル同意の簡略化」を有効化することをお勧めします。

「チャネル同意の簡略化」の動作条件

「チャネル同意の簡略化」は、以下の環境でのみ動作します。

- LINEミニアプリのLIFF SDKのバージョン：v2.13.x以上

LINEミニアプリの設計によっては正しく動作しなくなる可能性があります

LINEミニアプリチャネルにアクセスした際に、「チャネル同意の簡略化」機能で自動的に許可される権限は、 [ユーザーID](https://developers.line.biz/ja/glossary/#user-id) の取得のみです。そのため、LIFF SDKで取得した [アクセストークン](https://developers.line.biz/ja/glossary/#access-token) を使って、LINEログインAPIをはじめとする各種LINE APIを呼び出す設計にしている場合、「チャネル同意の簡略化」機能を使うと正しく動作しなくなる可能性があります。

「チャネル同意の簡略化」機能を利用する場合は、現在のLINEミニアプリにおけるアクセストークンの利用方法を確認し、開発環境で動作確認を行ったうえで利用を開始してください。

**影響例：**

LIFF SDKでアクセストークンと同時に取得した [IDトークン](https://developers.line.biz/ja/glossary/#id-token) を使って、アクセスユーザーの [プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)（表示名、メールアドレス、プロフィール画像など）を取得し、LINEミニアプリのサービスアカウントの作成に利用する設計の場合。

#### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#difference-between-on-and-off) 「チャネル同意の簡略化」設定のオン/オフ時の動作の違い

ユーザーが、LINEミニアプリに初めてアクセスした際に表示される「チャネル同意画面」で同意を実行しても、別のLINEミニアプリに初めてアクセスする際には「チャネル同意画面」が再び表示されます。

一方、「チャネル同意の簡略化」設定をオンに設定したLINEミニアプリにアクセスした際に表示される「簡略化同意画面」で同意を行った場合、別のLINEミニアプリに初めてアクセスした場合は「チャネル同意画面」が表示されず、「読み込み画面」が表示された後すぐにLINEミニアプリが開きます。

以下の表では、「チャネル同意の簡略化」設定のオン/オフによるLINEミニアプリにアクセスした際の動作の違いを説明しています。

| 「チャネル同意の<br>簡略化」設定 | LINEミニアプリAに初めてアクセスした場合                                                                                                                                                        | LINEミニアプリBに初めてアクセスした場合                                                                                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **オフ** の場合                  | ![チャネル同意の簡略化設定オフの場合（アプリA）](https://developers.line.biz/assets/img/channel-consent-simplification-disabled-app-a-ja.b6064ebb.png)<br>「チャネル同意画面」が表示されます。 | ![チャネル同意の簡略化設定オフの場合（アプリB）](https://developers.line.biz/assets/img/channel-consent-simplification-disabled-app-b-ja.692906ab.png)<br>「チャネル同意画面」が表示されます。    |
| **オン** の場合                  | ![チャネル同意の簡略化設定オンの場合（アプリA）](https://developers.line.biz/assets/img/channel-consent-simplification-enabled-app-a-ja.be57a461.png)<br>「簡略化同意画面」が表示されます。    | ![チャネル同意の簡略化設定オンの場合（アプリB）](https://developers.line.biz/assets/img/channel-consent-simplification-enabled-app-b-ja.1e9aabd0.png)<br>「チャネル同意画面」がスキップされます。 |

「チャネル同意の簡略化」を有効化したLINEミニアプリにアクセスした場合の詳しいフローについては、「 [「チャネル同意の簡略化」を有効化したLINEミニアプリにアクセスした際の動作](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#detailed-workflow)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#simplification-feature-setup) 「チャネル同意の簡略化」の設定方法

「チャネル同意の簡略化」は、以下の手順で設定します。

1. [LINE Developersコンソール](https://developers.line.biz/console/) のLINEミニアプリチャネルで、［ **ウェブアプリ設定**］タブの［ **チャネル同意の簡略化**］のトグルボタンをオン（右）にする。

「チャネル同意の簡略化」設定のデフォルトはオンです

LINEミニアプリチャネルを新規作成した場合、［ **チャネル同意の簡略化**］のデフォルトの設定はオン（右）です。「チャネル同意の簡略化」を利用しない場合は、開発者自身でオフ（左）にする必要があります。

![チャネル同意の簡略化設定のトグルボタン](https://developers.line.biz/assets/img/simplification-feature-setup-ja.c11689bc.png)

「チャネル同意の簡略化」機能の設定条件

「チャネル同意の簡略化」機能は、以下の場合に限り設定できます。

- LINEミニアプリチャネルの［ **サービスを提供する地域**］が「日本」の場合：

［ **サービスを提供する地域**］が「日本」のLINEミニアプリチャネルでのみ設定できます。LINEミニアプリチャネルの［ **サービスを提供する地域**］は、チャネル作成時にのみ設定できます。

![サービスを提供する地域の設定](https://developers.line.biz/assets/img/region-setting-ja.315087df.png)

- LINEミニアプリチャネルのステータスが「審査前」の場合：

「チャネル同意の簡略化」は、LINEミニアプリチャネルのステータスが `審査前` の場合に限り設定できます。

![開発中プロセス](https://developers.line.biz/assets/img/simplification-developing-ja.315dff99.png)

2. 有効化の確認ダイアログが表示されたら、 **有効化** をクリックする。

![確認ダイアログ](https://developers.line.biz/assets/img/simplification-dialog-ja.40c3f4d1.png)

openidが自動的に有効化されます

「チャネル同意の簡略化」を利用する場合は、ユーザーIDの取得権限を持つ `openid` スコープが必須です。「チャネル同意の簡略化」設定をオンにすると、 `openid` スコープが自動的に有効になります。「チャネル同意の簡略化」設定をオフにすると、 `openid` スコープの設定を任意で変更できるようになります。

![openidスコープの設定](Base64-Image-Removed)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#detailed-workflow) 「チャネル同意の簡略化」を有効化したLINEミニアプリにアクセスした際の動作

「チャネル同意の簡略化」設定を有効化したLINEミニアプリに初めてアクセスすると、「簡略化同意画面」が表示されます。

1. 「簡略化同意画面」で、［ **同意する**］をクリックする。

![簡略化同意画面](https://developers.line.biz/assets/img/simplification-process-01-ja.e69eee55.png)

「読み込み画面」が表示されます。

［ **同意する**］をクリックすると、別のLINEミニアプリでも [ユーザーID](https://developers.line.biz/ja/glossary/#user-id) が利用されることに同意したと見なされ、以降別のLINEミニアプリにアクセスした際には、「チャネル同意画面」がスキップされ、すぐにLINEミニアプリを開くことができるようになります。

「今はしない」をクリックした場合に、再び「簡略化同意画面」が表示されるタイミング

「簡略化同意画面」で、［ **今はしない**］をクリックすると、簡略化に対する同意がスキップされて、以降は他のLINEミニアプリを開いても「簡略化同意画面」が表示されなくなります。スキップ後、24時間経過すると「簡略化同意画面」が再び表示されるようになります。

なお簡略化に対する同意をスキップしている間は、「チャネル同意の簡略化」を無効化しているときのように、LINEミニアプリごとの個別の「チャネル同意画面」が表示されます。

2. 「読み込み画面」で、［ **今すぐ利用する**］をクリックする。

「読み込み画面」について

- 「読み込み画面」では、ユーザーが［ **今すぐ利用する**］をクリックせず、無操作のままプログレスバーが完了した場合も、LINEミニアプリが表示されます。
- 「簡略化同意画面」で同意した後は、各LINEミニアプリに初めてアクセスする場合にのみ「読み込み画面」が表示されます。

![LINEミニアプリの読み込み画面](https://developers.line.biz/assets/img/simplification-process-02-ja.0091537b.png)

LINEミニアプリが表示されます。

3. 「アクセス許可要求画面」が表示されたら、［ **許可する**］をクリックする。

「アクセス許可要求画面」が表示されるタイミング

「アクセス許可要求画面」は、LINEミニアプリを開いたタイミングではなく、 `openid` スコープ以外の権限（ [`profile` スコープや `chat_message.write` スコープ](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app) など）を必要とするタイミングで初めて表示されます。

そのため、LINEミニアプリ起動直後に、 [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) メソッドなど `openid` スコープ以外の権限を必要とするリクエストを実行する設計にしている場合は、LINEミニアプリにアクセスしたユーザーからは、アプリ起動時に「チャネル同意画面」がスキップせずに表示されたように見えてしまいます。 `openid` スコープ以外の権限を必要とするリクエストは、可能な限り必要となるタイミングで初めて実行するように実装することをお勧めします。

任意のタイミングで「アクセス許可要求画面」を表示する

[`liff.permission.query()`](https://developers.line.biz/ja/reference/liff/#permission-query) メソッドと [`liff.permission.requestAll()`](https://developers.line.biz/ja/reference/liff/#permission-request-all) メソッドを使うと、任意のタイミングで「アクセス許可要求画面」を表示できます。

以下は、 `profile` スコープの権限付与にユーザーが未同意の場合に「アクセス許可要求画面」を表示するコードの例です。

```
liff.permission.query("profile").then((permissionStatus) => {
     if (permissionStatus.state === "prompt") {
       liff.permission.requestAll();
     }
});

```

詳しくは、『LIFF APIリファレンス』の「 [`liff.permission.query()`](https://developers.line.biz/ja/reference/liff/#permission-query)」と「 [`liff.permission.requestAll()`](https://developers.line.biz/ja/reference/liff/#permission-request-all)」を参照してください。

各権限のアクセス許可要求にチェックを入れて、［ **許可する**］をクリックすると、LINEミニアプリが開きます。

![アクセス許可要求画面](https://developers.line.biz/assets/img/simplification-process-03-ja.7f9b033a.png)

友だち追加オプションによる友だち追加について

「アクセス許可同意画面」では、 [友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/) が表示されます。ただし、「チャネル同意の簡略化」を有効にした際に、 **Scopes** に `openid` スコープのみ指定している場合は、友だち追加オプションによる友だち追加の誘導ができなくなります。友だち追加オプションを有効にする場合は、「チャネル同意の簡略化」を無効化するか、 `openid` 以外のスコープも利用する設計にしてください。

![](https://developers.line.biz/assets/img/simplification-process-04-ja.c598a488.png)

上記の手順を行ったユーザーは、初めてアクセスするLINEミニアプリでも「チャネル同意画面」がスキップされ、「読み込み画面」表示後、すぐにLINEミニアプリを開くことができるようになります。

![チャネル同意の簡略化設定オンの場合](https://developers.line.biz/assets/img/channel-consent-simplification-enabled-ja.7cdd247c.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#does-not-work-for-liff-to-liff-transition) LIFF間遷移で開いたLINEミニアプリでは「チャネル同意の簡略化」は適用されません

LIFFアプリやLINEミニアプリから、別のLINEミニアプリへ遷移した場合、「チャネル同意の簡略化」は適用されません。遷移先のLINEミニアプリが「チャネル同意の簡略化」を有効化していた場合でも、初回のアクセスであればLINEミニアプリごとの個別の「チャネル同意画面」が表示されます。

LIFF間遷移について詳しくは、「 [LIFFアプリから別のLIFFアプリを開いた場合の動作について（LIFF間遷移）](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)」を参照してください。
