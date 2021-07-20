# [\#](https://developers.line.biz/ja/docs/liff/overview/#page-title) LINE Front-end Framework (LIFF)

LINE Front-end Framework（LIFF）は、LINEヤフー株式会社が提供するウェブアプリのプラットフォームです。このプラットフォームで動作するウェブアプリを、LIFFアプリと呼びます。

LIFFアプリを使うと、LINEのユーザーIDなどをLINEプラットフォームから取得できます。LIFFアプリではこれらを利用して、ユーザー情報を活用した機能を提供したり、ユーザーの代わりにメッセージを送信したりできます。

LIFF v2で追加された機能については、「 [リリースノート](https://developers.line.biz/ja/docs/liff/release-notes/)」を参照してください。

今後追加が予定されている機能については、『LINEログインドキュメント』の [ロードマップ](https://developers.line.biz/ja/docs/line-login/roadmap/) を参照してください。

LIFFの機能をウェブ上で試せます

LINEヤフー株式会社では開発者向けに [LIFFプレイグラウンド(opens new window)](https://liff-playground.netlify.app/) というウェブアプリ（LIFFアプリ）を提供しています。LIFFプレイグラウンドではLIFFの基本的な機能が試せます。LIFFを用いるとどのようなことができるのかを確認したいときに参照してください。なお、 [LIFFプレイグラウンドのソースコード(opens new window)](https://github.com/line/liff-playground) をGitHubで公開しています。

OpenChatでのLIFFアプリの利用はサポートされていません

現在のところ、OpenChatではLIFFアプリの利用は正式にサポートされていません。たとえば、LIFFアプリからプロフィール情報を取得できない場合があります。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#line-api-use-case) デモ用のLIFFアプリを体験する

[LINE API Use Case(opens new window)](https://lineapiusecase.com/) では、デモ用のLIFFアプリと、そのソースコードを公開しています。お手持ちのスマートフォンでデモ用のLIFFアプリを開いて、店舗予約やテーブルオーダーを体験してみましょう。

- [デモ用のLIFFアプリでヘアサロンやレストランの店舗予約を体験する(opens new window)](https://lineapiusecase.com/ja/usecase/reservation.html)
- [デモ用のLIFFアプリでデジタル会員証を体験する(opens new window)](https://lineapiusecase.com/ja/usecase/membership.html)
- [デモ用のLIFFアプリでテーブルオーダーを体験する(opens new window)](https://lineapiusecase.com/ja/usecase/tableorder.html)
- [デモ用のLIFFアプリでスマホレジを体験する(opens new window)](https://lineapiusecase.com/ja/usecase/smartretail.html)

## [\#](https://developers.line.biz/ja/docs/liff/overview/#operating-environment) 推奨環境

LIFFの推奨環境は以下のとおりです。

なお、LIFFアプリを [LIFFブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser) で開いた場合と、 [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) で開いた場合では、使用できる機能が異なります。たとえば、 `liff.scanCode()` は、外部ブラウザでは利用できません。詳しくは、「 [LIFF v2 APIリファレンス](https://developers.line.biz/ja/reference/liff/)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/liff/overview/#when-the-liff-app-is-opened-in-a-liff-browser) LIFFアプリをLIFFブラウザで開く場合

| 項目    | 推奨環境                                                                                                                              | 最低動作環境                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| iOS     | 最新バージョン。 [WKWebView(opens new window)](https://developer.apple.com/documentation/webkit/wkwebview) が使用されます。           | LINEの推奨環境に準ずる。 \* |
| Android | 最新バージョン。 [Android WebView(opens new window)](https://developer.android.com/reference/android/webkit/WebView) が使用されます。 | LINEの推奨環境に準ずる。 \* |
| LINE    | 最新バージョン                                                                                                                        | LINEの推奨環境に準ずる。 \* |

LIFFアプリは、OS、LINEともに最新バージョンの環境での利用を推奨します

LIFFアプリは、OS、LINEともに最新バージョンの環境での利用を推奨します。上記の「最低動作環境」以降のバージョンでも、機能や設定によっては動作しない場合や画面が正常に表示されない場合があります。

\\\* LINEの推奨環境については、ヘルプセンターの「 [LINEの推奨環境を教えてください(opens new window)](https://help.line.me/line/ios/pc?lang=ja&contentId=10002433)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/liff/overview/#when-the-liff-app-is-opened-in-external-browser) LIFFアプリを外部ブラウザで開く場合

以下のブラウザの最新バージョンで動作します。

Microsoft Edge、Google Chrome、Firefox、Safari

## [\#](https://developers.line.biz/ja/docs/liff/overview/#liff-browser) LIFFブラウザ

LIFFブラウザはLIFFアプリ専用のブラウザです。ユーザーがLINEでLIFFのURLを開くと、LIFFブラウザでLIFFアプリが開きます。

![LIFF browser](Base64-Image-Removed)

LIFFブラウザはLINE内で動作するため、LIFFアプリはユーザーにログインを促さなくてもユーザーデータにアクセスすることができます。また、LIFFブラウザはLIFFアプリを共有したり、LIFFアプリから友だちにメッセージを送るなど、LINE特有の機能を提供しています。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#liff-browser-spec) LIFFブラウザの仕様

LIFFブラウザは、iOSでは [WKWebView(opens new window)](https://developer.apple.com/documentation/webkit/wkwebview)、Androidでは [Android WebView(opens new window)](https://developer.android.com/reference/android/webkit/WebView) を利用しています。そのため、LIFFブラウザの仕様および動作についてもこれらの仕組みに準拠します。

なお、LIFFブラウザは、外部ブラウザがサポートしているウェブ技術の一部をサポートしていません。詳しくは、「 [LIFFブラウザと外部ブラウザの違い](https://developers.line.biz/ja/docs/liff/differences-between-liff-browser-and-external-browser/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#liff-browser-cache) LIFFブラウザのキャッシュ

LIFFブラウザが利用している [WKWebView(opens new window)](https://developer.apple.com/documentation/webkit/wkwebview) や [Android WebView(opens new window)](https://developer.android.com/reference/android/webkit/WebView) は、表示したコンテンツの内容を、 [Cache-Control(opens new window)](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cache-Control) などのHTTPヘッダーの指示に従って、キャッシュとして保存して利用する場合があります。

LIFFブラウザにおけるキャッシュの制御については、 [Cache-Control(opens new window)](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cache-Control) などのHTTPヘッダーを用いて行ってください。

キャッシュの削除について

LIFFブラウザに保存されたキャッシュを明示的に削除することはできません。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#screen-size) LIFFブラウザの画面サイズ

LIFFブラウザは、以下の3つの画面サイズで表示できます。

![画面サイズ](Base64-Image-Removed)

画面サイズは、LIFFアプリをLINEログインチャネルに追加するときに指定します。詳しくは、「 [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#action-button) アクションボタン

LIFFアプリの画面サイズを「Full」に指定している場合、ヘッダーには、デフォルトでアクションボタンが表示されます。

このボタンを使って、LIFFアプリをユーザーの友だちにシェアできます。アクションボタンをタップすると、以下のオプションが、ユーザーのLINEの設定言語で表示されます。

| 項目                       | 説明                                                                                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **シェア**                 | 現在開いているページの [パーマネントリンク](https://developers.line.biz/ja/glossary/#permanent-link-liff) を、LINEメッセージでシェアします。                               |
| **閲覧中のページを最小化** | LIFFブラウザを最小化します。詳しくは、「 [LIFFブラウザを最小化する](https://developers.line.biz/ja/docs/liff/minimizing-liff-browser/)」を参照してください。               |
| **更新**                   | 現在開いているページを再読み込みします。                                                                                                                                   |
| **権限設定**               | 権限設定画面を開きます。権限設定画面では、現在開いているLIFFアプリのカメラやマイクへのアクセス権を確認できます。変更はできません。LINEバージョン14.6.0以降で利用可能です。 |

パーマネントリンクのシェアに失敗する場合があります

現在のページのURLがLINE Developersコンソールの［ **エンドポイントURL**］に指定したURLで始まらない場合、パーマネントリンクを取得できずシェアに失敗します。

アクションボタンを非表示にする

LINE DevelopersコンソールでLIFFアプリの［ **モジュールモード**］をオンにすると、アクションボタンを非表示にできます。詳しくは、「 [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#development-guidelines) 開発上のガイドライン

LIFFアプリを開発する際は、「 [LIFFアプリ開発ガイドライン](https://developers.line.biz/ja/docs/liff/development-guidelines/)」に従ってください。

## [\#](https://developers.line.biz/ja/docs/liff/overview/#support-tool) LIFFアプリの開発をサポートするツール

LINEヤフー株式会社では、開発者の方々がLIFFアプリの開発をより円滑に行えるよう、以下のツールを提供しています。

| ツール名                                                                              | このツールでできること                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [LIFFスターターアプリ](https://developers.line.biz/ja/docs/liff/trying-liff-app/)     | LIFFについて初めて学ぶ人向けのスターターアプリです。LIFFアプリの開発の始め方を理解しやすいよう、LIFFアプリの初期化のデモのみを行っています。まずは動くものを作って、LIFFの概要を大まかに理解したい方にお勧めです。                                                                                                                                                                                                                                                     |
| [Create LIFF App](https://developers.line.biz/ja/docs/liff/cli-tool-create-liff-app/) | LIFFアプリの開発環境がコマンド1つで構築できるCLIツールです。Reactの [Create React App(opens new window)](https://github.com/facebook/create-react-app) や、Next.jsの [Create Next App(opens new window)](https://nextjs.org/docs/pages/api-reference/cli/create-next-app) のように、Create LIFF Appからの質問に答えていくことで、用途に合わせたLIFFアプリのひな形を含む開発環境が生成され、すぐに開発を始めることができます。                                          |
| [LIFF CLI](https://developers.line.biz/ja/docs/liff/liff-cli/)                        | LIFFアプリの開発を円滑にするCLIツールです。LIFF CLIでできることは次のとおりです。<br>- LIFFアプリを作成、更新、参照、削除する<br>- LIFFアプリの開発環境を作成する<br>- LIFFアプリを [LIFF Inspector](https://developers.line.biz/ja/docs/liff/liff-plugin/#liff-inspector) でデバッグする<br>- ローカル開発サーバーをHTTPSで起動する<br>今後のアップデートで [LIFF Mock](https://developers.line.biz/ja/docs/liff/liff-plugin/#liff-mock) の機能も追加される予定です。 |
| [LIFFプレイグラウンド(opens new window)](https://liff-playground.netlify.app/)        | LIFFの機能をオンライン上で試すことができます。 [LIFFプレイグラウンドのソースコード(opens new window)](https://github.com/line/liff-playground) はGitHubで公開していますので、開発者は任意のLIFF IDを設定して、独自のLIFFプレイグラウンドをサーバー上にデプロイすることも可能です。                                                                                                                                                                                     |

## [\#](https://developers.line.biz/ja/docs/liff/overview/#workflow) 作業の流れ

LIFFアプリをエンドユーザーが利用できるようにするには、以下の手順を行います。

1. LIFFアプリを追加する [チャネルを作成する](https://developers.line.biz/ja/docs/liff/getting-started/)
2. [LIFFスターターアプリを試してみる](https://developers.line.biz/ja/docs/liff/trying-liff-app/)、または [LIFFアプリを開発する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/)
