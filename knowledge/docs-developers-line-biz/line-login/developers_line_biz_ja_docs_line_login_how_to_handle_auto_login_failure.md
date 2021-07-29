# [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#page-title) 自動ログインに失敗した時の対応方法

## [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#overview) 概要

LINEログインを組み込んだウェブアプリにおいて、プライベートブラウジングが有効な場合には [自動ログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-auto-login) に失敗することがあります。また、ユーザーの利用するOSの仕様によって、失敗する場合もあります。

- [LINEアプリ上での自動ログインに失敗する場合](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#case-auto-login-on-line-app-fails)
- [ユニバーサルリンクやアプリリンクが動作せずにLINEアプリが起動しない場合](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#case-line-app-will-not-launch)

## [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#case-auto-login-on-line-app-fails) LINEアプリ上での自動ログインに失敗する場合

プライベートブラウジングが有効な場合などに、LINEアプリ上での自動ログインに失敗することがあります。ログインに失敗した場合も、 `code` パラメータと、 `state` パラメータが付与された状態でコールバックURLにリダイレクトされます。

この場合、 `code` パラメータは無効な値となっているため、アクセストークンは生成できません。また、 `state` パラメータはログインセッションと紐づく値と一致しません。

![](https://developers.line.biz/assets/img/auto-login-failure-case-1-ja.4be074a7.png)

自動ログインの失敗を検知する方法と、ログイン失敗時にユーザーへ表示すべき対応例について説明します。

### [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#how-to-verify) LINEアプリ上での自動ログイン失敗を検知する

「 [ユーザーに認証と認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」で説明されている `state` パラメータを使用することで、自動ログインの失敗を検知できます。

LINEアプリ上でのログインに失敗した場合、コールバックURLに付与された `state` パラメータの値と、認可URLに設定していた `state` パラメータの値が不一致となります。ウェブアプリでは、 `state` パラメータの値が不一致となった場合に、自動ログインに失敗したことを考慮して設計します。

"state"パラメータが不一致になるケース

LINEログインでは、 [クロスサイトリクエストフォージェリ(CSRF)(opens new window)](https://datatracker.ietf.org/doc/html/rfc6749#section-10.12) などの第三者による攻撃によっても `state` パラメータが不一致となる可能性があります。したがって `state` パラメータが不一致となる要因が、自動ログインに失敗したことによるものなのか、CSRFなどの第三者による攻撃なのかの判別ができないことになります。

そのため、 `state` パラメータが不一致となった場合には、ユーザーが意図せず自動ログインに失敗した場合のことを考えて対応方法を検討する必要があります。

### [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#when-automatic-login-fails) 自動ログインに失敗していた場合

自動ログインに失敗する環境において、LINEログインに失敗したユーザーに、自動ログインが有効な認可URLで再ログインを促してしまうと、ログインに失敗し続けることになります。一度自動ログインに失敗したら、 `disable_auto_login` パラメータを使用し、自動ログインを無効にした認可URLで再ログインを促すことで、ログインの連続失敗を避けることができます。

推奨される対応方法は以下の2つです。

- [ユーザーにエラーメッセージを表示し再ログインを促す](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#recommended-to-log-in-again)
- [ユーザーを自動ログインを行わない認可URLへリダイレクトする](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#redirect-to-authorization-url)

#### [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#recommended-to-log-in-again) ユーザーにエラーメッセージを表示し再ログインを促す

ユーザーに、ログインに失敗したことを画面上で伝え、再ログインを促す方法です。

この画面は「 [自動ログインに失敗した場合](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#when-automatic-login-fails)」に表示するため、再ログインを促す際には自動ログインを無効にする必要があります。自動ログインを無効にする場合は、以下のように認可URLのクエリパラメータで `disable_auto_login` パラメータを `true` に設定してユーザーをリダイレクトしてください。

```
https://access.line.me/oauth2/v2.1/authorize?disable_auto_login=true&response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz

```

この画面には、LINEヘルプセンターの「 [Webサイトで自動ログインを試みたが失敗した(opens new window)](https://help.line.me/line/ios/sp?lang=ja&contentId=20020693)」へのリンク（ `https://help.line.me/line/ios/sp?lang=ja&contentId=20020693`）も併せて表示することを推奨します。

以下は、ユーザーに再ログインを促す画面例です。

![ユーザーにエラーメッセージを表示する画面の例](https://developers.line.biz/assets/img/auto-login-failure-message-ja.d52719f0.png)

#### [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#redirect-to-authorization-url) ユーザーを自動ログインを行わない認可URLへリダイレクトする

自動ログインに失敗したユーザーを、自動ログインを無効にした認可URLへ直接リダイレクトする方法です。ユーザーを直接リダイレクトすることで、自動ログインに失敗したことを意識させずにログイン画面を表示できます。自動ログインを無効にする場合は、以下のように認可URLのクエリパラメータで `disable_auto_login` パラメータを `true` に設定してユーザーをリダイレクトしてください。

```
https://access.line.me/oauth2/v2.1/authorize?disable_auto_login=true&response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz

```

ユーザーに対して、リダイレクトが発生することを事前に知らせたいときは、リダイレクトメッセージを表示しても構いません。

以下は、リダイレクトメッセージを表示する画面例です。

![ユーザーを自動ログインを行わない認可URLへリダイレクトする](Base64-Image-Removed)

## [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#case-line-app-will-not-launch) ユニバーサルリンクやアプリリンクが動作せずにLINEアプリが起動しない場合

[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) における自動ログインは、iOSの [ユニバーサルリンク(opens new window)](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content/) やAndroidの [アプリリンク(opens new window)](https://developer.android.com/training/app-links) の機能を利用しています。

外部ブラウザや特定のアプリ内のブラウザで、ユニバーサルリンクやアプリリンクが機能せず、自動ログインが動作しないことがあります。この場合、LINEアプリは起動せず [メールアドレスログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#mail-or-qrcode-login) の画面が外部ブラウザ上やアプリ内のブラウザ上で表示されます。これは、ユーザーが利用するOSの仕様によって起きる場合があります。OSの仕様は完全には公開されていないため、自動ログインに失敗する条件をLINEプラットフォームが回避することが難しい場合があります。

![](https://developers.line.biz/assets/img/auto-login-failure-case-2-ja.24597e38.png)

### [\#](https://developers.line.biz/ja/docs/line-login/how-to-handle-auto-login-failure/#notes-on-universal-link) iOSでユニバーサルリンクを動作させるための注意点

以下のような場合、ユニバーサルリンクが動作しないことがあります。

- JavaScriptによるリダイレクトで、ユーザーを認可URLに遷移させる。
- ユーザーがURLを入力し、認可URLに直接遷移する。

上記に注意することで、ユニバーサルリンクが動作しない問題を回避できる場合があります。例えば、ユーザーに認可URLに遷移するためのボタンをタップさせて、ログインの処理を開始するようにします。
