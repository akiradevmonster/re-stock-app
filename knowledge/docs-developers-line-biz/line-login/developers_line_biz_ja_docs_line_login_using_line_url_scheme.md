# [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#page-title) LINE URLスキームでLINEの機能を使う

LINE URLスキームを使うと、スタンプショップやLIFFアプリを開いたり、カメラを起動したりできます。LINE URLスキームは、LINE公式アカウントでも利用できます。たとえば、 [リッチメニュー](https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/) にLINE URLスキームを開く [アクション](https://developers.line.biz/ja/reference/messaging-api/#uri-action) を設定しておくことで、メニューをタップしたユーザーに対してLINE内のコンテンツを表示できます。

利用できるLINE URLスキームは、以下のとおりです。

- `https://line.me/R/`
- `https://liff.line.me/`
- `line://`（非推奨）

「line://」は非推奨です

ユーザーが `line://` で始まるURLにアクセスした際に、ユーザーおよびLINEヤフー株式会社の意図に反して、LINE以外のアプリを起動させる「乗っ取り攻撃」を防ぐため、 `line://` は非推奨です。「乗っ取り攻撃」は、特定の条件を満たした場合にのみ成立します。

なお、 `line://` を廃止する時期は未定です。

LINE以外のネイティブアプリを起動するURLスキームはLINEヤフー株式会社では提供していません

LINE以外のネイティブアプリを起動するURLスキームは、LINEヤフー株式会社では提供していません。ただし他社が提供するネイティブアプリにおいて、そのアプリを起動するURLスキームが用意されている場合は、そのURLスキームをLINEの [リッチメニュー](https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/) や [Flex Message](https://developers.line.biz/ja/docs/messaging-api/using-flex-messages/) などのURIアクションで利用することはできます。

## [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#what-happens-when-line-url-is-clicked) LINE URLスキームをクリックしたときの動作

ユーザーがLINE URLスキームを使ったURLにアクセスすると、LINEが自動的に起動してURLで指定されたコンテンツが表示されます。ユーザーがLINEをインストールしていない場合の動作は、LINE URLスキームごとに異なります。

| LINE URLスキーム     | LINEをインストールしていない場合の動作                         |
| -------------------- | -------------------------------------------------------------- |
| `https://line.me/R/` | ウェブブラウザが開き、LINEのダウンロードを求めるページが開く。 |
| `line://`（非推奨）  | 何も起きないか、エラーページが開く。                           |

## [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#supported-platforms) 動作環境

LINE URLスキームは、iOS版LINEまたはAndroid版LINEをインストールしたスマートフォンで利用できます。

注意

LINE URLスキームは、デスクトップ版（macOS、Windows）のLINEではサポートされません。

## [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#available-line-url-schemes) LINEで利用できるURLスキーム

LINEで利用できるURLスキームは以下のとおりです。なお、指定の動作環境でのみサポートされているLINE URLスキームについては、それぞれの項目内に記載しています。

- [カメラとカメラロールを開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-the-camera-and-camera-roll)
- [位置情報を送る](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#sending-the-location-screen)
- [LINE公式アカウントをシェアする](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#sharing-line-official-account)
- [LINE公式アカウントのLINE VOOMやプロフィールを開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-line-voom-and-profile)
- [LINE公式アカウントとのトーク画面を開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-chat-screen)
- [テキストメッセージを送る](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#sending-text-messages)
- [プロフィール情報を開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-profile-information)
- [その他の画面を開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-common-line-app-screens)
- [設定画面を開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-line-app-settings-screens)
- [スタンプショップを開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-the-sticker-shop)
- [着せかえショップを開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-the-theme-shop)
- [LIFFアプリを開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-a-liff-app)
- [URLを外部ブラウザで開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-url-in-external-browser)

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-the-camera-and-camera-roll) カメラとカメラロールを開く

このLINE URLスキームを使うと、カメラまたはカメラロールを開くことができます。カメラロールは、ユーザーがトークに送信する画像を選択する画面です。

カメラまたはカメラロールを開く際の制限事項

このURLスキームは、LINEのトーク（オープンチャットを含む）でのみサポートされます。トーク以外の機能や、LINE以外のアプリ、LIFFアプリではサポートされません。

![](https://developers.line.biz/assets/img/camera-screen.f1bbfb47.png)

![](https://developers.line.biz/assets/img/camera-roll.b648cfe1.png)

| LINE URLスキーム                         | 説明                                                                                                                                                                   |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `https://line.me/R/nv/camera/`           | カメラを開きます。前面カメラ（インカメラ）と背面カメラ（アウトカメラ）など複数のカメラが搭載されているスマートフォンの場合、使用するカメラを指定することはできません。 |
| `https://line.me/R/nv/cameraRoll/single` | カメラロールを開きます。トーク内で共有する画像を1つ選択できます。                                                                                                      |
| `https://line.me/R/nv/cameraRoll/multi`  | カメラロールを開きます。トーク内で共有する画像を複数選択できます。                                                                                                     |

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#sending-the-location-screen) 位置情報を送る

このLINE URLスキームを使うと、「位置情報」画面を開き、位置情報をLINE公式アカウントに送信できます。

「位置情報」画面を開く際の制限事項

このURLスキームはLINE公式アカウントとの1対1のトークでのみサポートされます。他の種類のトークや、LINE以外のアプリ、LIFFアプリではサポートされません。

![](https://developers.line.biz/assets/img/location.d1dc30a9.png)

| LINE URLスキーム                 | 説明                                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| `https://line.me/R/nv/location/` | 「位置情報」画面を開きます。ユーザーは、地図にピンを刺してシェアする位置情報を選択できます。 |

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#sharing-line-official-account) LINE公式アカウントをシェアする

このLINE URLスキームを使うと、指定したLINE公式アカウントをユーザーやユーザーの友だちにおすすめして、LINE公式アカウントを友だち追加するように促すことができます。

![](https://developers.line.biz/assets/img/bot-add-friend-ja.927db3df.png)

| LINE URLスキーム                                                | 説明                                                                                                                             |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <https://line.me/R/ti/p/> `{Percent-encoded LINE ID}`           | 指定したLINE公式アカウントのプロフィールを開きます。LINE公式アカウントとすでに友だちだった場合は、1対1のトーク画面を開きます。   |
| <https://line.me/R/nv/recommendOA/> `{Percent-encoded LINE ID}` | 「送信先を選択」画面を開きます。友だち、グループトーク、または複数人トークを選択してLINE公式アカウントのリンクをシェアできます。 |

「Percent-encoded LINE ID」はパーセントエンコードしてください

`{Percent-encoded LINE ID}` はUTF-8を用いて [パーセントエンコード(opens new window)](https://developer.mozilla.org/ja/docs/Glossary/Percent-encoding) してください。たとえば、LINE IDが `@linedevelopers` の場合は、 `https://line.me/R/ti/p/%40linedevelopers` や `https://line.me/R/nv/recommendOA/%40linedevelopers` のようにします。LINE IDをパーセントエンコードせずにそのまま置き換えた場合も動作しますが、非推奨です。

ただし「送信先を選択」画面を開くURLスキーム（ `https://line.me/R/nv/recommendOA/%40linedevelopers`）でLINE IDをパーセントエンコードした場合、Android版のLINEバージョン13.8.0未満では動作しません。

LINE公式アカウントのLINE IDは、 [ベーシックIDとプレミアムID(opens new window)](https://help.linebiz.com/lineadshelp/s/article/L000001191?language=ja) のどちらも利用できます。

LINE公式アカウントのLINE IDを確認するには？

LINE公式アカウントのLINE IDは [LINE Official Account Manager(opens new window)](https://manager.line.biz/) で確認できます。詳しくは、「 [LINE公式アカウントのLINE IDをシェアする](https://developers.line.biz/ja/docs/messaging-api/sharing-bot/#share-the-line-id-of-your-line-official-account)」を参照してください。

パソコンのブラウザで開いた場合

ユーザーが `https://line.me/R/ti/p/{Percent-encoded LINE ID}` をパソコンで開いた場合、LINE公式アカウントのWeb版プロフィール（例： [LINE FRIENDSのプロフィール(opens new window)](https://line.me/R/ti/p/%40linecharacter)）や、QRコードが表示されます。どちらが表示されるかは、以下の条件を満たしているかどうかで異なります。

- LINE公式アカウントが認証済アカウントである
- Web版プロフィールを「利用する」設定にしている

どちらの条件も満たしている場合、LINE公式アカウントのWeb版プロフィールがQRコード付きで表示されます。条件を満たしていない場合は、LINE公式アカウントのQRコードのみが表示されます。利用中の未認証アカウントを認証済アカウントに変更したり、Web版プロフィールを利用したりするための設定は、 [LINE Official Account Manager(opens new window)](https://manager.line.biz/) から行うことができます。

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-line-voom-and-profile) LINE公式アカウントのLINE VOOMやプロフィールを開く

このLINE URLスキームを使うと、LINE公式アカウントのLINE VOOMやプロフィールを開くことができます。

![](https://developers.line.biz/assets/img/bot-line-voom.2d2e22a7.png)

| LINE URLスキーム                                                                  | 説明                                                                                                                                                             |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <https://line.me/R/home/public/main?id=> `{LINE ID without @}`                    | 指定したLINE公式アカウントのLINE VOOMを開きます。                                                                                                                |
| <https://line.me/R/home/public/profile?id=> `{LINE ID without @}`                 | 指定したLINE公式アカウントのプロフィールを開きます。                                                                                                             |
| <https://line.me/R/home/public/post?id=> `{LINE ID without @}`&postId= `{postId}` | 指定したLINE公式アカウントの特定のLINE VOOMの投稿を開きます。各投稿のIDは、 [LINE VOOM Studio(opens new window)](https://voom-studio.line.biz/) で確認できます。 |

このURLスキームではLINE IDの先頭の@を含めないでください

`{LINE ID without @}` は、LINE公式アカウントのLINE IDに置き換えてください。ベーシックIDと [プレミアムID](https://developers.line.biz/ja/glossary/#premium-id) のどちらも指定できます。なお、LINE IDの先頭の `@` を含めないでください。たとえば、LINE IDが `@linedevelopers` の場合は、 `https://line.me/R/home/public/main?id=linedevelopers` のようにします。

LINE公式アカウントのLINE IDを確認するには？

LINE公式アカウントのLINE IDは [LINE Official Account Manager(opens new window)](https://manager.line.biz/) で確認できます。詳しくは、「 [LINE公式アカウントのLINE IDをシェアする](https://developers.line.biz/ja/docs/messaging-api/sharing-bot/#share-the-line-id-of-your-line-official-account)」を参照してください。

LINE VOOMへの投稿とプロフィールのカスタマイズ

あなたが管理しているLINE公式アカウントのLINE VOOMに投稿したり、プロフィールをカスタマイズしたりするには、 [LINE VOOM Studio(opens new window)](https://voom-studio.line.biz/) や [LINE Official Account Manager(opens new window)](https://manager.line.biz/) を使います。

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-chat-screen) LINE公式アカウントとのトーク画面を開く

このLINE URLスキームを使うと、LINE公式アカウントとのトーク画面を開くことができます。

| LINE URLスキーム                                                              | 説明                                                                                                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <https://line.me/R/oaMessage/> `{Percent-encoded LINE ID}`                    | LINE公式アカウントとのトーク画面を開きます。                                                                                    |
| <https://line.me/R/oaMessage/> `{Percent-encoded LINE ID}`/? `{text_message}` | `{text_message}` に設定したテキストメッセージがメッセージ入力欄に入力された状態で、LINE公式アカウントとのトーク画面を開きます。 |

「Percent-encoded LINE ID」と「text_message」はパーセントエンコードしてください

`{Percent-encoded LINE ID}` と `{text_message}` はUTF-8を用いて [パーセントエンコード(opens new window)](https://developer.mozilla.org/ja/docs/Glossary/Percent-encoding) してください。たとえば、LINE IDが `@linedevelopers` のLINE公式アカウントに対して、 `こんにちは` というテキストメッセージを送信する場合は、 `https://line.me/R/oaMessage/%40linedevelopers/?%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF` のようにします。LINE IDをパーセントエンコードせずにそのまま置き換えた場合も動作しますが、非推奨です。

LINE公式アカウントのLINE IDは、 [ベーシックIDとプレミアムID(opens new window)](https://help.linebiz.com/lineadshelp/s/article/L000001191?language=ja) のどちらも利用できます。

LINE公式アカウントのLINE IDを確認するには？

LINE公式アカウントのLINE IDは [LINE Official Account Manager(opens new window)](https://manager.line.biz/) で確認できます。詳しくは、「 [LINE公式アカウントのLINE IDをシェアする](https://developers.line.biz/ja/docs/messaging-api/sharing-bot/#share-the-line-id-of-your-line-official-account)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#sending-text-messages) テキストメッセージを送る

このLINE URLスキームを使うと、ユーザーの友だちまたはLINE公式アカウントに送信するテキストメッセージを設定できます。

| LINE URLスキーム                                 | 説明                                                                                                                                                                                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <https://line.me/R/share?text=> `{text_message}` | 「送信先を選択」画面を開きます。ユーザーは、友だち、グループトーク、または複数人トークを選択して、 `{text_message}` に設定されたテキストメッセージを送信できます。テキストはKeepメモやLINE VOOM、他のアプリにも送信できます。 |

「text_message」はパーセントエンコードしてください

`{text_message}` はUTF-8を用いて [パーセントエンコード(opens new window)](https://developer.mozilla.org/ja/docs/Glossary/Percent-encoding) してください。たとえば、 `こんにちは` というテキストメッセージを指定する場合は、 `https://line.me/R/share?text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF` のようにします。

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-profile-information) プロフィール情報を開く

このLINE URLスキームを使うと、ユーザーの「プロフィール」画面を開きます。この画面では、表示名、ステータスメッセージ、およびLINE IDを設定できます。また、さまざまなLINEプロフィール情報を確認できます。

![](https://developers.line.biz/assets/img/my-profile.8a16c552.png)

| LINE URLスキーム                    | 説明                                                                             |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| `https://line.me/R/nv/profile`      | ユーザーの「プロフィール」画面を開きます。                                       |
| `https://line.me/R/nv/profileSetId` | ユーザーの「ID」画面を開きます。LINE IDが未設定の場合は、LINE IDを設定できます。 |

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-common-line-app-screens) その他の画面を開く

このLINE URLスキームを使うと、トークタブを含むLINEのさまざまな画面を開きます。

![](https://developers.line.biz/assets/img/chats-list-ja.8740eb69.png)

| LINE URLスキーム                        | 説明                                   |
| --------------------------------------- | -------------------------------------- |
| `https://line.me/R/nv/chat`             | トークタブを開きます。                 |
| `https://line.me/R/nv/timeline`         | VOOMタブを開きます。                   |
| `https://line.me/R/nv/wallet`           | ウォレットタブを開きます。             |
| `https://line.me/R/nv/addFriends`       | 「友だち追加」画面を開きます。         |
| `https://line.me/R/nv/officialAccounts` | 「LINE公式アカウント」画面を開きます。 |

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-line-app-settings-screens) 「設定」画面を開く

このLINE URLスキームを使うと、LINEのさまざまな設定画面を開きます。

![](https://developers.line.biz/assets/img/settings.fec8a51c.png)

| LINE URLスキーム                                                                                            | 説明                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `https://line.me/R/nv/settings`                                                                             | 「設定」画面を開きます。                                                                                                                             |
| `https://line.me/R/nv/settings/account`                                                                     | 「アカウント」設定画面を開きます。ユーザーのLINEアカウント情報が表示されます。                                                                       |
| `https://line.me/R/nv/connectedApps`                                                                        | 「アカウント」 \> 「連動アプリ」設定画面を開きます。この画面では、認証済みアプリに付与されている権限を確認したり、アプリの連動を解除したりできます。 |
| `https://line.me/R/nv/connectedDevices`                                                                     | 「アカウント」 >「ログイン中の端末」設定画面を開きます。                                                                                             |
| `https://line.me/R/nv/settings/privacy`                                                                     | 「プライバシー管理」の設定画面を開きます。                                                                                                           |
| `https://line.me/R/nv/things/deviceLink`                                                                    | 「LINE Things」設定画面を開きます。LINEとデバイスを連携したり、連携済みのデバイスを確認したりする画面です。                                          |
| `https://line.me/R/nv/settings/sticker`                                                                     | 「スタンプ」設定画面を開きます。                                                                                                                     |
| `https://line.me/R/nv/stickerShop/mySticker`                                                                | 「スタンプ」 \> 「マイスタンプ」設定画面を開きます。                                                                                                 |
| `https://line.me/R/nv/settings/themeSettingsMenu`（iOS）、 `https://line.me/R/nv/settings/theme`（Android） | 「着せかえ」設定画面を開きます。<br>iOSとAndroidでスキームが異なります。                                                                             |
| `https://line.me/R/nv/themeSettings`                                                                        | 「着せかえ」 \> 「マイ着せかえ」設定画面を開きます。                                                                                                 |
| `https://line.me/R/nv/notificationServiceDetail`                                                            | 「通知」 \> 「連動アプリ」設定画面を開きます。この画面では、連動アプリの通知設定を設定できます。                                                     |
| `https://line.me/R/nv/settings/chatSettings`                                                                | 「トーク」設定画面を開きます。                                                                                                                       |
| `https://line.me/R/nv/suggestSettings`                                                                      | 「トーク」 \> 「サジェスト表示」設定画面を開きます。                                                                                                 |
| `https://line.me/R/nv/settings/callSettings`                                                                | 「通話」設定画面を開きます。                                                                                                                         |
| `https://line.me/R/nv/settings/addressBookSync`                                                             | 「友だち」設定画面を開きます。                                                                                                                       |
| `https://line.me/R/nv/settings/timelineSettings`                                                            | 「LINE VOOM」設定画面を開きます。                                                                                                                    |

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-the-sticker-shop) スタンプショップを開く

このLINE URLスキームを使うと、公式スタンプやクリエイターズスタンプの購入を促すために、LINE内でスタンプショップを開くことができます。

![](https://developers.line.biz/assets/img/sticker-shop-categories.f9029abf.png)

| LINE URLスキーム                                        | 説明                                                                                                                                                                                                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <https://line.me/R/shop/sticker/detail/> `{package_id}` | 指定されたスタンプの「スタンプ情報」画面を開きます。 `{package_id}` には、 [LINE STORE(opens new window)](https://store.line.me/) のスタンプページのURLに含まれる数字を指定します。                                                            |
| <https://line.me/R/shop/category/> `{category_id}`      | 「公式スタンプ」セクション内の指定されたカテゴリの人気ランキングが表示されます。 `{category_id}` には、 [LINE STORE(opens new window)](https://store.line.me/) の「公式スタンプ」セクション内のカテゴリページのURLに含まれる数字を指定します。 |
| <https://line.me/R/shop/sticker/author/> `{author_id}`  | 指定された作成者のスタンプリストを開きます。 `{author_id}` には、 [LINE STORE(opens new window)](https://store.line.me/) のスタンプの作成者ページのURLに含まれる数字を指定します。                                                             |
| `https://line.me/R/nv/stickerShop`                      | スタンプショップのホームタブを開きます。                                                                                                                                                                                                       |
| `https://line.me/R/shop/sticker/hot`                    | スタンプショップの人気タブを開きます。                                                                                                                                                                                                         |
| `https://line.me/R/shop/sticker/new`                    | スタンプショップの新着タブを開きます。                                                                                                                                                                                                         |
| `https://line.me/R/shop/sticker/event`                  | スタンプショップの無料タブを開きます。                                                                                                                                                                                                         |
| `https://line.me/R/shop/sticker/category`               | スタンプショップのカテゴリータブを開きます。                                                                                                                                                                                                   |

独自のスタンプセットを作成するには？

ユーザー向けに独自のスタンプセットを作成するには、 [LINE Creators Market(opens new window)](https://creator.line.me/ja/) サイトで [LINEスタンプメーカー(opens new window)](https://creator.line.me/ja/stickermaker/) アプリを使用してください。

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-the-theme-shop) 着せかえショップを開く

このLINE URLスキームを使うと、公式着せかえやクリエイターズ着せかえの購入を促すために、LINE内で着せかえショップを開くことができます。

![](https://developers.line.biz/assets/img/theme-shop.fe918789.png)

| LINE URLスキーム                                         | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <https://line.me/R/shop/theme/detail?id=> `{product_id}` | 指定された公式着せかえ、またはクリエイターズ着せかえの「着せかえ情報」画面を開きます。 `{product_id}` には、 [LINE STORE(opens new window)](https://store.line.me/) の、着せかえページのURLに含まれるIDを指定します。たとえば、「 [マットホワイト(opens new window)](https://store.line.me/themeshop/product/0bac8fed-4c75-40c5-9982-e9ecc3b9d191/ja) `https://store.line.me/themeshop/product/0bac8fed-4c75-40c5-9982-e9ecc3b9d191/ja`」を開く場合、 `0bac8fed-4c75-40c5-9982-e9ecc3b9d191` を指定します。 |

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-a-liff-app) LIFFアプリを開く

このLINE URLスキームを使うと、指定したLIFFアプリを開くことができます。LIFFアプリは、 [LINE Front-end Framework（LIFF）](https://developers.line.biz/ja/docs/liff/overview/) を利用して動作するウェブアプリです。

![](https://developers.line.biz/assets/img/liff-app.e702e89b.png)

| LINE URLスキーム                                                          | 説明                                                                                                         |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| <https://liff.line.me/> `{liffId}`                                        | 指定したLIFF IDのLIFFアプリを開きます。このURLスキームを、LIFF URLと呼びます。                               |
| <https://liff.line.me/> `{liffId}`/path_A/path_B/?key1=value1&key2=value2 | 指定したLIFF IDでLIFFアプリを開きます。 `/path_A/path_B/?key1=value1&key2=value2` を追加情報として渡します。 |

LIFFアプリが開くまでの処理について詳しくは、『LIFFドキュメント』の「 [LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-url-in-external-browser) URLを外部ブラウザで開く

クエリパラメータを使うと、 [LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab) の代わりに [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) でURLを開くことができます。

これらのクエリパラメータはLIFFアプリではサポートされません

これらのクエリパラメータは、LINEアプリからアクセスするすべてのURLで機能します。ただし、LIFFアプリのみ例外的にサポートされないため、LIFF URLにクエリパラメータを付与しても機能しません。

| クエリパラメータ付きのURL                       | 説明                                                                                                                                                 |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| <https://example.com/>? `openExternalBrowser=1` | 対象のURLを外部ブラウザで開きます。                                                                                                                  |
| <https://example.com/>? `openInAppBrowser=0`    | 対象のURLをChromeカスタムタブで開きます。（Android版LINEのみ対応）[\[1\]](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#fn1) |

---

1. QRコードリーダーを起動してURLを読み込んだ場合、当該クエリパラメータが付与されていなくても対象のURLをChromeカスタムタブで開きます。 [↩︎](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#fnref1)
