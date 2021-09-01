# [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#page-title) カスタム機能

さらにユーザー体験を充実させるために、以下の機能をLINEミニアプリに追加できます。使用できる機能は、LINEミニアプリが未認証ミニアプリか認証済ミニアプリかによって異なります。

| 機能                                                                                                                                                                               | 未認証ミニアプリ | 認証済ミニアプリ |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- |
| [サービスメッセージ](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#service-messages)                                                                 | ❌               | ✅               |
| [Custom Path](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#custom-path)                                                                             | ❌               | ✅               |
| [チャネル同意のプロセスをスキップする](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#channel-consent-simplification)                                 | ❌               | ✅               |
| [LINE未使用ユーザーをウェブブラウザに誘導する](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#redirect-non-line-users-to-browser)                     | ✅               | ✅               |
| [ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#create-shortcut-on-home-screen) | ❌               | ✅               |
| [ユーザーをLINE公式アカウントの友だち追加へ誘導する](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#OA-friend)                                        | ✅               | ✅               |
| [決済システムの利用](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#using-payment-systems)                                                            | ✅               | ✅               |
| [カスタムアクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#custom-action-button)                                                       | ✅               | ✅               |
| [LINE Profile+](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#line-profile-plus)                                                                     | ❌               | ✅               |

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#service-messages) サービスメッセージ

レストランや宿泊施設の予約の確認通知をユーザーに送信する場合は、「サービスメッセージ」を利用できます。

サービスメッセージは、ユーザーからのリクエストに対する確認や応答としてユーザーが知るべき情報を、LINEミニアプリから通知する機能です。

LINEミニアプリから送られたサービスメッセージは、LINEミニアプリの種類にかかわらず、LINEミニアプリを提供する地域ごとに決められたトークルームに表示されます。

| 日本                                                                                                     | タイ                                                                                                  | 台湾                                                                                                |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| LINEミニアプリ お知らせ                                                                                  | LINE MINI App Notice                                                                                  | LINE MINI App 通知                                                                                  |
| ![LINEミニアプリ お知らせ](https://developers.line.biz/assets/img/mini_service_notifier_jp.01e8e02b.png) | ![LINE MINI App Notice](https://developers.line.biz/assets/img/mini_service_notifier_th.c780b309.png) | ![LINE MINI App 通知](https://developers.line.biz/assets/img/mini_service_notifier_tw.be8840d5.png) |

サービスメッセージを送信するには、サービスメッセージAPIを使用します。詳しくは、「 [サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

サービスメッセージの送信条件

サービスメッセージは、LINEミニアプリ上でのユーザーの操作（アクション）に対する確認や応答としてのみ送信できます。値下げ、ショッピング特典、新商品、割引クーポン、プロモーションなどの情報を含む広告やイベントの通知は禁止されています。サービスメッセージの条件について詳しくは、「 [サービスメッセージの条件](https://developers.line.biz/ja/docs/line-mini-app/service/service-operation/#conditions-for-service-messages)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#custom-path) Custom Path

Custom Pathとは、本番用のLIFF URLに設定する独自の文字列のことをいいます。Custom Path機能を用いると、以下のように、LIFF URLに独自の文字列を設定できます。

| LIFF IDによるURLの例                     | Custom Pathを設定した例               |
| ---------------------------------------- | ------------------------------------- |
| `https://miniapp.line.me/123456-abcdefg` | `https://miniapp.line.me/cony_coffee` |

たとえば、ユニークな名前をCustom Pathとして設定することにより、ユーザーはURLからどのブランドや店舗のLINEミニアプリなのかがわかるようになります。Custom Pathについて詳しくは、「 [Custom Pathを設定する](https://developers.line.biz/ja/docs/line-mini-app/develop/custom-path/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#channel-consent-simplification) チャネル同意のプロセスをスキップする

ユーザーは、 `openid` スコープを有効化したLINEミニアプリに初めてアクセスする際に、「 [チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/develop/configure-console/#consent-screen-settings)」において、LINEミニアプリ内で [ユーザーID](https://developers.line.biz/ja/glossary/#user-id) が利用されることに同意する必要があります。

この同意のプロセスを簡略化するには、 [LINE Developersコンソール](https://developers.line.biz/console/) のLINEミニアプリチャネルにおいて、「チャネル同意の簡略化」機能をオンにします。これにより、ユーザーは簡略化に対する同意を初回のみ行うだけで、別のLINEミニアプリに初めてアクセスする際は「チャネル同意画面」をスキップして、すぐにサービスの利用を開始できるようになります。その結果、ユーザーがより簡単にLINEミニアプリにアクセスできるようになります。

詳しくは、「 [チャネル同意のプロセスをスキップする](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#redirect-non-line-users-to-browser) LINE未使用ユーザーをウェブブラウザに誘導する

[LINE Developersコンソール](https://developers.line.biz/console/) において、LINEミニアプリチャネルの［ **ウェブアプリ設定**］タブで［ **LINE未使用ユーザーをウェブブラウザに誘導する**］を有効にすると、日本、タイ、台湾以外のLINE未使用ユーザーはウェブブラウザでLINEミニアプリのサービスを利用できるようになります。

LINE未使用ユーザーがウェブブラウザでLINEミニアプリを開くと、以下の図のようなページが表示されます。ページ内の［ **Open in browser**］をタップすると、LIFFのエンドポイントURLのページがウェブブラウザで表示されます。

![](https://developers.line.biz/assets/img/redirect-non-line-users-to-browser.ccfaff6b.jpg)

この機能を有効にすることで、たとえばLINEを使用していない訪日外国人の方がLINEミニアプリのサービスを利用したい場合に、LINEアプリをインストールすることなく、ウェブブラウザでサービスを利用できます。

ウェブブラウザでの表示は、ユーザーのウェブブラウザの言語設定が日本語、タイ語、繁體中文のいずれでもない場合にのみ有効になります。ただし、ユーザーの端末にLINEアプリがインストールされている場合は、LINEアプリが起動してLINEミニアプリに遷移する場合があります。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#redirect-non-line-users-to-browser-what-to-check) 設定を有効にする前に確認すること

［ **LINE未使用ユーザーをウェブブラウザに誘導する**］を有効にする前に、ウェブブラウザでLIFFのエンドポイントURLにアクセスした場合に、LINEミニアプリのサービスを利用できるようにしてください。なお、ウェブブラウザで使用可能なLIFF APIのプロパティとメソッドは以下のとおりです。

- [liff.id](https://developers.line.biz/ja/reference/liff/#id)
- [liff.ready](https://developers.line.biz/ja/reference/liff/#ready)
- [liff.init()](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)
- [liff.getOS()](https://developers.line.biz/ja/reference/liff/#get-os)
- [liff.getAppLanguage()](https://developers.line.biz/ja/reference/liff/#get-app-language)
- [liff.getLanguage()](https://developers.line.biz/ja/reference/liff/#get-language)（非推奨）
- [liff.getVersion()](https://developers.line.biz/ja/reference/liff/#get-version)
- [liff.getLineVersion()](https://developers.line.biz/ja/reference/liff/#get-line-version)
- [liff.isInClient()](https://developers.line.biz/ja/reference/liff/#is-in-client)
- [liff.isLoggedIn()](https://developers.line.biz/ja/reference/liff/#is-logged-in)
- [liff.permanentLink.createUrlBy()](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)
- [liff.use()](https://developers.line.biz/ja/reference/liff/#use)

LINEログインを要求しないでください

LINE未使用ユーザーのウェブブラウザで表示するページでは、ユーザーに対してLINEログインを要求しないでください。LINE未使用ユーザーの体験を損ねてしまいます。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#create-shortcut-on-home-screen) ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する

ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加できます。この機能を使うと、ユーザーは端末のホーム画面からLINEミニアプリに直接アクセスできるようになります。

![](https://developers.line.biz/assets/img/add-shortcut-screen-ios-ja.6706a9af.png)![](https://developers.line.biz/assets/img/shortcut-ios-ja.218380ae.png)

会員証やモバイルオーダーなど、ユーザーの利用頻度の高いサービスでこの機能を活用することで、ユーザー体験を向上させることができます。

詳しくは、「 [ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#OA-friend) ユーザーをLINE公式アカウントの友だち追加へ誘導する

LINEミニアプリでは、友だち追加オプションを使って、 [チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/develop/configure-console/#consent-screen-settings)、もしくは [アクセス許可要求画面](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#detailed-workflow) からLINE公式アカウントの友だち追加への誘導ができます。

詳しくは、 「 [LINEミニアプリをはじめて開いたときにLINE公式アカウントを友だち追加する（友だち追加オプション）](https://developers.line.biz/ja/docs/line-mini-app/service/line-mini-app-oa/#link-a-line-official-account-with-your-channel)」を参照してください。

![bot link feature 1](https://developers.line.biz/assets/img/miniguide-incremental-01-ja.3670d1c1.png)![bot link feature 2](https://developers.line.biz/assets/img/miniguide-incremental-02-ja.3861a67e.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#using-payment-systems) 決済システムの利用

LINE Payだけでなく、クレジットカードなどの支払い方法をLINEミニアプリに統合できます。詳しくは、「 [決済システムを利用する](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/)」を参照してください。

![mini intro linepay](https://developers.line.biz/assets/img/mini_intro_linepay.c7fd9ddf.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#custom-action-button) カスタムアクションボタン

友だち同士で、LINEミニアプリを簡単にシェアするために [ビルトインのアクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button) が用意されていますが、 [カスタムアクションボタンを実装](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/) することもできます。

![](https://developers.line.biz/assets/img/mini_share_custom.8fa99b2b.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#line-profile-plus) LINE Profile+

LINEミニアプリでは、名前、性別、生年月日、電話番号、住所などのユーザー情報を取得してサービスに利用することができます。詳しくは、 [LINE Profile+](https://developers.line.biz/ja/docs/partner-docs/line-profile-plus/) を参照してください。

利用するには申請が必要です

この機能は、所定の申請等を行った法人ユーザーのみが利用可能です。LINEミニアプリ経由でLINE Profile+に登録されたデータをご利用になりたいお客様は、担当営業までご連絡いただくか、 [弊社パートナー(opens new window)](https://www.lycbiz.com/jp/partner/sales/) にお問い合わせください。

この機能は、あなたのサービスをより利用しやすく、ユーザーにとって便利にするためのものです。特定の利用目的なく情報を取得したり、過度な情報を取得したり、取得した情報を悪用したりすることは、LINEミニアプリの審査で却下される理由になります。

ユーザー情報の適切な使用の例としては、以下のようなものがありますが、これらに限定されません。

- 差出人や電話番号、住所などの連絡先情報を自動入力することで、毎回同じ情報を入力する手間を省く
- ユーザーの性別や誕生日などに合わせた商品をおすすめする
