# [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#page-title) ビルトイン機能

LINEミニアプリには、以下のビルトイン機能が組み込まれています。

- [アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button)
- [チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#consent-screen)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button) アクションボタン

LINEミニアプリのすべてのページに表示される [ヘッダー](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header) には、デフォルトでアクションボタンが表示されます。

このボタンを使って、LINEミニアプリをユーザーの友だちにシェアできます。アクションボタンをタップすると、以下のオプションが、ユーザーのLINEの設定言語で表示されます。

![](https://developers.line.biz/assets/img/mini_share_builtin.3b07b1a0.png)

| 項目                           | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **シェア**                     | 現在開いているページのLIFF URLまたはパーマネントリンクをLINEメッセージでシェアします。現在開いているページがLINEミニアプリのエンドポイントURLから始まらない場合、代わりにLINEミニアプリのLIFF URLをシェアします。メッセージには、以下の要素が含まれます。<br>- URL：現在開いているページのパーマネントリンク<br>- タイトル： [LINE Developersコンソール](https://developers.line.biz/console/) の［ **ウェブアプリ設定**］タブの［ **LIFFアプリ名**］に入力した名前<br>- 詳細：自動的に設定されたテキスト<br>- 画像： [LINE Developersコンソール](https://developers.line.biz/console/) の［ **チャネル基本設定**］タブの［ **チャネルアイコン**］に設定した画像 |
| **ホーム画面に追加**           | 現在開いているページへのショートカット追加画面を表示します。現在開いているページがLINEミニアプリのエンドポイントURLから始まらない場合、エラーになります。LINEバージョン14.3.0以降の認証済ミニアプリでのみ利用できます。詳しくは、「 [ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/)」を参照してください。                                                                                                                                                                                                                                                  |
| **閲覧中のページを最小化**     | LIFFブラウザを最小化します。認証済ミニアプリでのみ利用できます。詳しくは『LIFFドキュメント』の「 [LIFFブラウザを最小化する](https://developers.line.biz/ja/docs/liff/minimizing-liff-browser/)」を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **サービス提供元の詳細を見る** | [プロバイダーページ](https://developers.line.biz/ja/docs/partner-docs/provider-page/) を表示します。認証済ミニアプリでのみ利用できます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **更新**                       | 現在開いているページを再読み込みします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **権限設定**                   | 権限設定画面を開きます。権限設定画面では、現在開いているLINEミニアプリのカメラやマイクへのアクセス権を確認、変更できます。LINEバージョン14.6.0以降で利用できます。<br>ユーザーが権限を変更しても、LINEミニアプリ側でページを再読み込みしない限り、変更の内容が反映されない場合があるため注意してください。                                                                                                                                                                                                                                                                                                                                                       |

注意

現在開いているページをシェアするには、LINEミニアプリに対応するLINEバージョンでアクションボタンをタップする必要があります。ユーザーが使用しているLINEのバージョンが、LINEミニアプリの [対応バージョン](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#supported-platforms-and-versions) 未満の場合は、アクションボタンをタップしたページに関わらず、LINEミニアプリのトップページがシェアされます。

ヒント

- [カスタムアクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#custom-action-button) を実装すれば、LINEミニアプリの好きな場所に、好きな形式のシェア機能を実装できます。
- LINEミニアプリを閉じずに複数のトークルームを行き来するための機能など、新しい機能を追加する予定です。
- LINEミニアプリでは、アクションボタンを非表示にすることはできません。LINEミニアプリチャネルに追加されているLIFFアプリでは、［ **モジュールモード**］は設定できません。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#consent-screen) チャネル同意画面

チャネル同意画面は、ユーザーが初めてLINEミニアプリを利用するときに表示されます。チャネル同意画面では、LINEミニアプリごとにアクセス権限を付与するかどうかをユーザーに確認します。

LINEミニアプリが認証済ミニアプリの場合は、LINEミニアプリ名の横に認証バッジが表示されます。また、LINEミニアプリの提供者が認証プロバイダーでない場合は、「LINEヤフー株式会社は提供元を確認していません。」という注意書きが表示されます。

![](https://developers.line.biz/assets/img/mini-permission-request-ja.9669fc07.png)

すべてのLINEミニアプリはデフォルトで以下の権限を要求します。

- ユーザーのプロフィール情報を取得する権限
- トークへのメッセージを送信する権限

注意

チャネル同意画面では、LINEヤフー株式会社によって承認された権限のみを、ユーザーに要求できます。 [LINE Developersコンソール](https://developers.line.biz/console/) のLINEミニアプリチャネルの設定で、ユーザーに権限を要求する項目を指定できます。
