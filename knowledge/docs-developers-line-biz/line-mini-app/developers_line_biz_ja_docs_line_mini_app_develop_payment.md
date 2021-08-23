# [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/#page-title) 決済システムを利用する

ユーザーに決済システムを提供するために、LINEミニアプリにLINE Payや他の決済システムを利用できます。

ヒント

クレジットカードの情報などをLINEミニアプリで入力することを避けるために、決済はLINE Payで処理することをお勧めします。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/#line-pay) LINE Pay

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/#preparing-line-pay-merchant-account) LINE Pay加盟店アカウントの準備

LINEミニアプリで、LINE PayやLINE Checkoutを利用するには、まずLINE Pay加盟店のアカウントが必要です。
LINE Pay加盟店のアカウントがない場合は、 [LINE Payの公式ホームページ(opens new window)](https://pay.line.me/portal/jp/main) から申し込んでください。

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/#developing-service-that-uses-line-pay) LINE Payを利用するサービスの開発

加盟店のアカウントの申請が承認を受けたら、LINEミニアプリでLINE PayおよびLINE Checkoutを利用するように実装します。
LINE PayおよびLINE Checkoutについて詳しくは、LINE Pay Developersの『 [Online APIsドキュメント(opens new window)](https://pay.line.me/jp/developers/apis/onlineApis?locale=ja_JP)』を参照してください。

LINE Payを利用する際は、以下のような流れで決済を処理します。

1. LINEミニアプリでユーザーが決済を開始するときに、LINE Payの処理を開始します。

LINEミニアプリが表示する画面：

2. ユーザーがLINE Payで決済内容を確認して、LINE Payの認証情報を入力します。

LINE Payが表示する画面：

3. 注文の確認ページを表示します。

LINEミニアプリが表示する画面：

### [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/#testing-line-pay) LINE Payテスト

決済に関するテストは、LINE Payが提供している [Sandbox(opens new window)](https://pay.line.me/jp/developers/techsupport/sandbox/creation?locale=ja_JP) を利用できます。
テスト方法について詳しくは、『 [利用方法(opens new window)](https://pay.line.me/jp/developers/techsupport/sandbox/testflow?locale=ja_JP)』を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/develop/payment/#other-payment-methods) 他の決済方法

LINEミニアプリで、LINE PayおよびLINE Checkout以外の決済方法を提供するには、一般のウェブページで決済を提供して処理するのと同様に実装してください。
なお、外部のドメインや外部のアプリで決済を完了した後、ユーザーがLINEミニアプリのページに戻るようにしてください。
