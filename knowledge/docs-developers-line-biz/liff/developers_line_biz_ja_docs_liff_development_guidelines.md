# [\#](https://developers.line.biz/ja/docs/liff/development-guidelines/#page-title) LIFFアプリ開発ガイドライン

LIFFを使ったウェブアプリを開発する際は、以下の開発ガイドラインに従ってください。

- [ユーザー情報は必ず安全に取り扱う](https://developers.line.biz/ja/docs/liff/development-guidelines/#liff-development-rules1)
- [LIFFアプリを初期化する際の注意点](https://developers.line.biz/ja/docs/liff/development-guidelines/#liff-development-rules2)
- [LIFFアプリを開発する際に必ず守るべきこと](https://developers.line.biz/ja/docs/liff/development-guidelines/#liff-development-rules3)
- [LINEプラットフォームへの大量リクエストの禁止](https://developers.line.biz/ja/docs/liff/development-guidelines/#prohibiting-mass-requests-to-line-platform)

LIFFはLINEログインの仕組みを利用しています。そのため、『LINEログインドキュメント』の「 [LINEログイン開発ガイドライン](https://developers.line.biz/ja/docs/line-login/development-guidelines/)」の内容にも従ってください。

注意

LIFF開発における基本ルールは、 [規約とポリシー](https://developers.line.biz/ja/terms-and-policies/) に記載される内容に基づきます。

## [\#](https://developers.line.biz/ja/docs/liff/development-guidelines/#liff-development-rules1) ユーザー情報は必ず安全に取り扱う

- LIFFアプリおよびサーバーでユーザー情報を使用する場合、LIFFアプリでユーザー情報を正しく処理しないと、なりすましやその他の種類の攻撃に対して脆弱になります。LIFFアプリおよびサーバーで、LIFFアプリで取得したユーザー情報を、安全に使用する方法について詳しくは、「 [LIFFアプリおよびサーバーでユーザー情報を使用する](https://developers.line.biz/ja/docs/liff/using-user-profile/)」を参照してください。
- LIFFのエンドポイントURLやLIFF URLのURLフラグメントには、アクセストークンやユーザーIDなどの機密情報が含まれます。外部にURLが漏洩しないように注意してください。

## [\#](https://developers.line.biz/ja/docs/liff/development-guidelines/#liff-development-rules2) LIFFアプリを初期化する際の注意点

`liff.init()` メソッドが返す `Promise` オブジェクトがresolveする前に、サーバーやフロントエンド側の処理などでURLを変更しないようにしてください。URLを変更すると、 `INIT_FAILED` が返され、LIFFアプリを開けません。
そのほか、LIFFアプリ初期化時の注意事項について詳しくは、「 [LIFFアプリを初期化する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#initializing-liff-app)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/liff/development-guidelines/#liff-development-rules3) LIFFアプリを開発する際に必ず守るべきこと

- LIFFアプリをSPA（Single Page Application）で構築する場合、LIFFはフラグメントを用いたルーティングとは相性が悪いため、 [History API(opens new window)](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface) を利用して実装してください。
- 以下のようなデバイスまたはOSの機能を利用するAPIは、必ずユーザー操作をきっかけにして実行されるように実装してください。
  - 位置情報の取得
  - カメラへのアクセス
  - マイクへのアクセス
- ユーザーの同意なく、cookie、localStorage、またはsessionStorageを使ってユーザーをトラックしたり、LINEのユーザー情報と外部セッション情報を結びつけたりしないでください。
- テスト段階のLIFFアプリに対するアクセス権限は、LIFFアプリ側で制限してください。
- LIFFアプリとLIFFアプリ内で開くコンテンツのURLスキームは、 **https** である必要があります。コンテンツのURLスキームがhttpの場合は、 [LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab) で表示されます。この場合、LIFFアプリとしてチャネルに追加されていても、LIFFアプリとして動作しません。

LIFFアプリにおけるcookie、localStorage、またはsessionStorageの利用

LIFFアプリではcookie、localStorage、またはsessionStorageを利用できます。ただし、OSの仕様変更によって将来的に利用が制限される可能性があります。

## [\#](https://developers.line.biz/ja/docs/liff/development-guidelines/#prohibiting-mass-requests-to-line-platform) LINEプラットフォームへの大量リクエストの禁止

負荷テストを目的に、 [LIFF URLスキーム](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-a-liff-app) （ `https://liff.line.me/{liffId}`）を経由してLIFFアプリへ大量のアクセスを行ったり、 [LIFF API](https://developers.line.biz/ja/reference/liff/) に大量のリクエストを送信したりしないでください。LIFFアプリの負荷テストを行う場合は、LINEプラットフォームへの大量のリクエストが発生しないテスト環境を用意してください。

注意

レート制限を超えて送信を行った場合、 `429 Too Many Requests` が返却され、エラーとなります。
