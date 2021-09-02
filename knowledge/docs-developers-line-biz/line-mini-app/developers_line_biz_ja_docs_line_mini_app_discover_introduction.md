# [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#page-title) LINEミニアプリとは

LINEミニアプリは、 [LIFF（LINE Front-end Framework）](https://developers.line.biz/ja/docs/liff/) 上で実行されるウェブアプリです。LINEミニアプリを使えば、ユーザーはアプリをインストールしなくてもサービスを利用できます。

「LINEミニアプリ」が公式名です。

LINEミニアプリはウェブアプリですので、HTML5のほとんどの仕様が使用できます。詳しくは、「 [仕様](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#introduction-to-line-mini-app) はじめに

LINEミニアプリは [LINEミニアプリポリシー(opens new window)](https://terms2.line.me/LINE_MINI_App?lang=ja) における「本サービスのご利用対象者」であれば、どなたでも開発することができます。ただし、サービスを提供する地域が台湾およびタイの場合は、当社現地法人より承認を受けた方のみLINEミニアプリを開発できます。はじめに「 [クイックスタートガイド](https://developers.line.biz/ja/docs/line-mini-app/quickstart/)」をお読みください。

LINEミニアプリチャネルを作成するには、 [LINE Developersコンソール](https://developers.line.biz/console/) のアカウントが必要です。LINEミニアプリの設定から審査申請まで、多くの作業をLINE Developersコンソール上で行います。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#things-you-can-do-with-line-mini-app) LINEミニアプリでできること

LINEミニアプリには、以下のような便利な [ビルトイン機能](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/) が用意されています。

- LINEミニアプリをほかのユーザーにシェアする機能
- ユーザーに対してサービスへのアクセス権限の付与を依頼する機能

また、さらに充実したユーザー体験を提供するために、以下のような [カスタム機能](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/) をLINEミニアプリに追加できます。

- サービスメッセージ
- 決済システム（LINE Pay）の利用
- カスタムアクションボタン

LINEミニアプリを試す

LINEヤフー株式会社では、開発者向けに [LINEミニアプリプレイグラウンド(opens new window)](https://miniapp.line.me/lineminiapp_playground) というLINEミニアプリを公開しています。LINEアプリがインストールされたスマートフォンでLINEミニアプリプレイグラウンドを開くと、LINEミニアプリの一部機能を実際に試すことができます。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#verified-unverified-mini-app) 未認証ミニアプリと認証済ミニアプリ

LINEミニアプリは、弊社による認証審査に通過しているかどうかによって、未認証ミニアプリと認証済ミニアプリに分かれます。それぞれの違いについては、以下の各セクションを確認してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#unverified-mini-app) 未認証ミニアプリとは

未認証ミニアプリとは、弊社による認証審査に通過していないLINEミニアプリのことをいいます。LINEミニアプリチャネルを作成した後から、認証審査に通過するまでは、未認証ミニアプリとなります。

未認証ミニアプリはどなたでも作成できますが、次の「 [認証済ミニアプリとは](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#verified-mini-app)」に示すように、一部機能が制限されます。認証済ミニアプリにするためには、 [認証審査を申請](https://developers.line.biz/ja/docs/line-mini-app/submit/submission-guide/) してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#verified-mini-app) 認証済ミニアプリとは

弊社による認証審査に通過すると、そのLINEミニアプリは認証済ミニアプリとなります。認証済ミニアプリになると、以下の画像のように、ヘッダーなどに認証バッジがつきます。

![](https://developers.line.biz/assets/img/line-mini-app-header-after.14459c9f.png)

また、以下の各機能などが利用できるようになります。

- [ユーザー端末のホーム画面にショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/)
- [Custom Pathを設定する](https://developers.line.biz/ja/docs/line-mini-app/develop/custom-path/)
- [チャネル同意のプロセスをスキップする](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/)

以上のように、LINEミニアプリを認証済ミニアプリにすることで、信頼性や利便性などの面で、ユーザー体験を高めることができます。認証済ミニアプリで利用できる機能について詳しくは、「 [カスタム機能](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#what-does-line-mini-app-look-like) LINEミニアプリの構造

LINEミニアプリのページは、（A）ヘッダーおよび（B）ボディで構成されています。詳しくは、「 [LINEミニアプリの構造](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/)」を参照してください。

![LINEミニアプリの構造](https://developers.line.biz/assets/img/mini_concept.2b5be1ef.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#access-line-mini-app-methods-for-users) ユーザーがLINEミニアプリにアクセスする方法

ユーザーは、LINEからだけでなく、LINE外部からもLINEミニアプリにアクセスできます。LINE内には、LINEミニアプリにアクセスするためのポイントがいくつも用意されています。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#access-from-outside-line) LINE外部からアクセスする

[LINEミニアプリのパーマネントリンク](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/) にアクセスすると、LINE外部からもLINEミニアプリにアクセスできます。LINEミニアプリのパーマネントリンクは、以下の方法でユーザーにシェアできます。

- ウェブサイト、メール、テキストメッセージなどに掲載する
- QRコードを作成して各種媒体に掲載する

また、 [ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/) と、ホーム画面からLINEミニアプリに直接アクセスできます。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#line-official-account) LINE公式アカウント

LINE公式アカウントからもLINEミニアプリにアクセスできます。たとえば、LINE公式アカウントの友だちに送信するリッチメッセージや、LINE公式アカウントとのトーク画面に表示されるリッチメニューに、LINEミニアプリを開くリンクを追加できます。詳しくは、 [LINE公式アカウントを活用する](https://developers.line.biz/ja/docs/line-mini-app/service/line-mini-app-oa/) を参照してください。

![LINE公式アカウントでLINEミニアプリのプロモーションができる](https://developers.line.biz/assets/img/mini_with_oa.76d04f7a.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#home-tab) ホームタブ

LINEミニアプリをLINEのホームタブに固定する機能は廃止されました

詳しくは、2024年1月9日のニュース、「 [最近利用したLINEミニアプリにLINEのホームタブからアクセスできるようになりました](https://developers.line.biz/ja/news/2024/01/09/line-mini-app-history/)」を参照してください。

LINEの［ **ホーム**］タブの［ **サービス**］から、最近利用したLINEミニアプリにアクセスできます。［ **サービス**］には、最近利用したLINEミニアプリが、利用履歴の新しい順に最大で8件まで表示されます。この機能は、認証済ミニアプリでのみ利用できます。

ホームタブの表示ポリシーは、サービスを提供する地域によって異なります。

![](https://developers.line.biz/assets/img/mini-access-home-tab-ja.54f5617c.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#searching-on-line) LINEで探す

LINEの検索機能からも、LINEミニアプリにアクセスできます。この機能は、認証済ミニアプリでのみ利用できます。

![検索機能からアクセス](https://developers.line.biz/assets/img/mini_access_search.6c5afb8d.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#line-message) LINEメッセージ

友だち同士で、LINEミニアプリを簡単にシェアできます。 [ビルトインのアクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button) を使用するだけでなく、 [カスタムアクションボタン](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/) を使用して、LINEミニアプリのページをLINEメッセージでシェアできます。

![シェアメッセージ](https://developers.line.biz/assets/img/mini_access_share.ddf61cb8.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#what-you-can-do-with-the-liff-app-or-mini-app) LIFFアプリでできてLINEミニアプリでできないこと

| 項目                                         | 説明                                                                                                                                                                                                                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 外部ブラウザによる表示                       | 外部ブラウザでLINEミニアプリを開くと以下のようなページが表示され、LINEミニアプリをスマートフォン版LINE（LIFFブラウザ）で開くように案内されます。<br>![ランディングページ](https://developers.line.biz/assets/img/landing_page.59014576.png)                           |
| アクションボタンの非表示（モジュールモード） | LINEミニアプリでは、 [アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button) を非表示にすることはできません。LINEミニアプリチャネルに追加されているLIFFアプリでは、［ **モジュールモード**］は設定できません。 |
| 同一チャネルへの複数のLIFFアプリの追加       | LINEミニアプリチャネルでは、同一チャネルに複数のウェブアプリを追加することはできません。                                                                                                                                                                              |

LINEミニアプリとしての作成を推奨します

今後、LIFFとLINEミニアプリは、ブランド統合を予定しています。この統合により、LIFFはLINEミニアプリに統合されます。そのため、LIFFアプリを新規作成する際は、LINEミニアプリとして作成することを推奨します。詳しくは、「 [2025年2月12日のニュース](https://developers.line.biz/ja/news/2025/02/12/line-mini-app/)」を参照してください。

一部のユーザーのみ外部ブラウザで表示できるように設定できます

[LINE Developersコンソール](https://developers.line.biz/console/) 上で［ **LINE未使用ユーザーをウェブブラウザに誘導する**］を有効にすると、日本、タイ、台湾以外のLINE未使用ユーザーは外部ブラウザでLINEミニアプリのサービスを表示できるようになります。詳しくは、「 [LINE未使用ユーザーをウェブブラウザに誘導する](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#redirect-non-line-users-to-browser)」を参照してください。
