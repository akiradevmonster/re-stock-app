# [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#page-title) 運用中のウェブアプリをLINEミニアプリ化する

運用しているウェブアプリをLINEミニアプリにしたいとき、どのようにすればいいのかわからないかもしれません。ここでは、LINEミニアプリの概要をはじめ、ウェブアプリをLINEミニアプリにするために必要な知識や手順などを説明します。このページを読むことで、ウェブアプリをLINEミニアプリにするときの全体像を知ることができます。

- [LINEミニアプリとは](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#what-is-line-mini-app)
- [前提条件](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#requirements)
- [ウェブアプリをLINEミニアプリにする手順](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure)
  - [1\. LINEミニアプリチャネルを作成する](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-1)
  - [2\. ウェブアプリ側でLIFF SDKを読み込む](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-2)
  - [3\. LIFFアプリを初期化する](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-3)
  - [4\. 必要な機能を実装する](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-4)
  - [5\. LINEミニアプリチャネルの設定をする](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-5)
  - [6\. LINEミニアプリの審査を依頼する](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-6)
- [次のステップ](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#next-step)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#what-is-line-mini-app) LINEミニアプリとは

はじめに、LINEミニアプリについて説明します。LINEミニアプリとは、LINEアプリの中で利用できるウェブアプリで、 [LIFF（LINE Front-end Framework）](https://developers.line.biz/ja/docs/liff/overview/) というフレームワークを用いて実装します。LIFFの機能を用いることで、LINEユーザーにスムーズなログイン体験を提供したり、ユーザーのプロフィールを取得したりできます。

また、 [サービスメッセージ](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/) という機能により、LINEミニアプリ上でのユーザーの操作に対する応答として、LINEミニアプリからユーザーに通知を送ることができます。HTML5のほぼすべての仕様もサポートしており、たとえば [位置情報API(opens new window)](https://developer.mozilla.org/ja/docs/Web/API/Geolocation_API) を用いることで、ユーザーの位置情報を取得できます。

![](https://developers.line.biz/assets/img/product-image.e8bf6742.png)

このように、ウェブアプリをLINEミニアプリにすることで、面倒なログインやプロフィールの入力などによるユーザーの離脱を防げます。LINEミニアプリの利用もLINEアプリからすぐに開始でき、またLINEアプリ上ですべての操作が完結するため、ユーザー体験を向上させることができます。

LINEミニアプリとネイティブアプリの比較について

ネイティブアプリに対するLINEミニアプリのメリットについては、『LINE API Use Case』の [ネイティブアプリとLINEミニアプリの比較記事(opens new window)](https://lineapiusecase.com/ja/api/native-mini.html) を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#requirements) 前提条件

運用しているウェブアプリをLINEミニアプリにする際に、どのようなものが必要なのでしょうか。はじめに、ウェブアプリをLINEミニアプリにするために必要な条件について説明します。

ウェブアプリをLINEミニアプリにするには、以下のことが必要になります。

- ウェブアプリを開発、公開するための知識や技術
- LINEビジネスID

LINEミニアプリは、LINEアプリ上で動作するウェブアプリです。このため、運用中のウェブアプリを開発したときの知識や技術がそのまま利用できます。たとえば、HTMLやCSS、JavaScriptに関する知識や、テキストエディタなどの開発環境などが役に立ちます。ウェブアプリを公開するためのウェブサーバーなども、引き続き必要になります。

また、LINEミニアプリを開発するときは、 [LINE Developersコンソール](https://developers.line.biz/console/) を利用します。このLINE Developersコンソールにログインするには、LINEビジネスIDが必要となります。LINEビジネスIDについて詳しくは、『LINE Developersコンソールドキュメント』の「 [LINE Developersコンソールへのログイン](https://developers.line.biz/ja/docs/line-developers-console/login-account/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure) ウェブアプリをLINEミニアプリにする手順

それでは、ウェブアプリをLINEミニアプリにする具体的な手順について説明します。ここでは、ユーザー情報を扱っている運用中のウェブアプリと、LINEアカウントを連携する例を見てみます。

1. LINEミニアプリチャネルを作成する
2. ウェブアプリ側でLIFF SDKを読み込む
3. LIFFアプリを初期化する
4. 必要な機能を実装する
5. LINEミニアプリチャネルの設定をする
6. LINEミニアプリの審査を依頼する

それぞれの手順について説明します。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-1) 1\. LINEミニアプリチャネルを作成する

LINEミニアプリをユーザーに公開するには、LINEミニアプリチャネルという [チャネル](https://developers.line.biz/ja/glossary/#channel) が必要になります。はじめに、 [LINE Developersコンソール](https://developers.line.biz/console/) にログインし、LINEミニアプリチャネルを作成してください。LINEミニアプリチャネルの作成について詳しくは、「 [LINEミニアプリ用LINE Developersコンソールガイド](https://developers.line.biz/ja/docs/line-mini-app/discover/console-guide/)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-2) 2\. ウェブアプリ側でLIFF SDKを読み込む

LINEミニアプリは、 [LIFF（LINE Front-end Framework）](https://developers.line.biz/ja/docs/liff/overview/) というフレームワークを用いるLIFFアプリとして動作します。このため、まずはウェブアプリ側でLIFF SDKを読み込む必要があります。

LIFF SDKを読み込む方法としては、CDNから読み込むか、あるいはnpmパッケージを利用する方法があります。たとえば、LIFF SDKをCDNから読み込むには、以下のようなコードを記述します。

```
<script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>

```

LIFF SDKの読み込みについて詳しくは、『LIFFドキュメント』の「 [LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-3) 3\. LIFFアプリを初期化する

LIFF SDKを用いるには、 `liff.init()` というメソッドを実行して、LIFFアプリを初期化する必要があります。このとき、LIFF IDを指定します。LIFF IDは、手順1で作成したLINEミニアプリチャネルで確認できます。LIFF IDの確認方法について詳しくは、「 [LIFF IDの確認とエンドポイントURLの設定](https://developers.line.biz/ja/docs/line-mini-app/discover/console-guide/#confirm-liff-id-and-set-endpoint-url)」を参照してください。

`liff.init()` を用いてLIFFアプリを初期化するには、次のようなコードを実装します。

```
liff
  .init({
    liffId: "123456-abcdefg", // LIFF IDを指定する
  })
  .then(() => {
    // LIFF APIを使用する
  })
  .catch((err) => {
    // 初期化中にエラーが発生したとき
    console.log(err.code, err.message);
  });

```

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-4) 4\. 必要な機能を実装する

ここまでで、機能を実装する準備が整いました。次は、必要な機能を実装していきます。LINEミニアプリでは、以下のような機能や仕様を用いることができます。

- LIFF API
- サービスメッセージ
- HTML5の仕様

それぞれについて説明します。

#### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-4-liff-api) LIFF API

LIFFアプリを初期化したら、LIFF APIを用いて必要な機能を実装します。LIFF APIを用いると、ユーザーのログイン処理をしたり、ユーザーのプロフィールを取得したりできます。たとえば、ユーザーIDを取得するには、まず `liff.getIDToken()` によりIDトークンを取得します。

```
const idToken = liff.getIDToken();

```

この `idToken` をサーバー側に送信し、サーバー側で「 [IDトークンを検証する](https://developers.line.biz/ja/reference/line-login/#verify-id-token)」エンドポイントにより検証することで、ユーザーIDを取得できます。取得したユーザーIDと、運用中のウェブアプリの会員情報を紐づけることで、たとえばユーザーに最適化したメッセージの配信などが可能になります。

LIFF APIについて詳しくは、『LIFFドキュメント』の「 [LIFF APIを呼び出す](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#calling-liff-api)」を参照してください。

#### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-4-service-message) サービスメッセージ

LINEミニアプリでは、サービスメッセージという機能を用いることができます。サービスメッセージを用いると、LINEミニアプリ上でのユーザーの操作に対する応答として、LINEミニアプリからユーザーに通知を送ることができます。サービスメッセージについて詳しくは、「 [サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

#### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-4-html5) HTML5の仕様

LINEミニアプリは、HTML5のほぼすべての仕様をサポートしています。たとえば [位置情報API(opens new window)](https://developer.mozilla.org/ja/docs/Web/API/Geolocation_API) を用いることで、ユーザーの位置情報を取得できます。LINEミニアプリの仕様について詳しくは、「 [LINEミニアプリの仕様](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-5) 5\. LINEミニアプリチャネルの設定をする

LIFFアプリの実装が完了したら、次はLINEミニアプリとして動作できるようにします。このためには、手順1で作成したLINEミニアプリチャネルにおいて、LIFFアプリのURLをエンドポイントURLとして設定する必要があります。エンドポイントURLの設定について詳しくは、「 [LIFF IDの確認とエンドポイントURLの設定](https://developers.line.biz/ja/docs/line-mini-app/discover/console-guide/#confirm-liff-id-and-set-endpoint-url)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#procedure-6) 6\. LINEミニアプリの審査を依頼する

以上の手順が完了したら、あとはユーザーにLINEミニアプリを公開するだけです。開発したLINEミニアプリをユーザーに公開するには、LINEヤフー株式会社による審査に通過する必要があります。審査について詳しくは、「 [審査を依頼する](https://developers.line.biz/ja/docs/line-mini-app/submit/submission-guide/)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/#next-step) 次のステップ

LINEミニアプリを開発する際は、「 [LINEミニアプリ開発ガイドライン](https://developers.line.biz/ja/docs/line-mini-app/development-guidelines/)」に従ってください。このガイドラインでは、LINEプラットフォームにリクエストを送るときの注意点や、ログの保存についてなどが示されています。

また、「 [カスタム機能](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/)」では、ユーザー体験をさらに向上させるための機能について説明しています。たとえば、ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する機能などがあります。
