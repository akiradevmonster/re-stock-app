# [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#page-title) LINEミニアプリのアイコンを作成する

LINEミニアプリのアイコンは、チャネル同意画面やホームタブ、LINEメッセージ、サービスメッセージなど、さまざまな場所で使用されます。このページでは、アイコンを作成する際に従うべきガイドラインと、アイコン用の画像をアップロードする方法を示します。

- [LINEミニアプリのアイコンの掲載場所](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#main-locations)
- [ガイドライン](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#guidelines)
- [アイコン用の画像をアップロードする方法](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#how-to-upload)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#main-locations) LINEミニアプリのアイコンの掲載場所

LINEミニアプリのアイコンの主な掲載場所は以下のとおりです。

- [チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/develop/configure-console/#consent-screen-settings)
- [ホームタブ](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#home-tab)
- [LINEメッセージ](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/#line-message)
- [サービスメッセージ](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)

![](https://developers.line.biz/assets/img/channel-consent-screen-ja.df8b20ef.png)![](https://developers.line.biz/assets/img/home-tab-ja.a46f5d4a.png)![](https://developers.line.biz/assets/img/line-message-ja.f575ff11.png)![](https://developers.line.biz/assets/img/service-messages-ja.8befce5b.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#guidelines) ガイドライン

LINEミニアプリのアイコンをデザインする際に従うべきガイドラインを以下に示します。アイコンは、特にモバイル端末において小さく表示されることがあります。どのような場所であってもユーザーがアイコンを視認できるようデザインしてください。

- [【必須】アイコンのサイズ](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#icon-size)
- [【必須】ロゴのサイズ](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#logo-size)
- [【推奨】ロゴのデザイン](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#logo-design)
- [【禁止】LINEミニアプリのロゴの使用](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#use-of-line-mini-app-logo)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#icon-size) 【必須】アイコンのサイズ

アイコンの背景領域（BG SIZE）のサイズは、130x130pxにしてください。

![](Base64-Image-Removed)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#logo-size) 【必須】ロゴのサイズ

ロゴのサイズ（LOGO SIZE）は、最小で54x54px、最大で90x90pxにしてください。なお、54x54pxから76x76pxにすることを推奨します。

![](https://developers.line.biz/assets/img/mini-icon-guideline-size-ja.2ff3ac16.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#logo-design) 【推奨】ロゴのデザイン

ロゴの視認性と品質を常に保つために、ロゴは単独のシンボルまたはワードマークとしてデザインしてください。

![](https://developers.line.biz/assets/img/mini-icon-guideline-design.3ca06968.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#use-of-line-mini-app-logo) 【禁止】LINEミニアプリのロゴの使用

ロゴの中に、以下に示すLINEミニアプリのロゴを含めないでください。

| 日本語                                                                                    | 英語                                                                                      |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![](https://developers.line.biz/assets/img/mini-icon-guideline-mini-logo-ja.af22d990.png) | ![](https://developers.line.biz/assets/img/mini-icon-guideline-mini-logo-en.dab52513.png) |

## [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#how-to-upload) アイコン用の画像をアップロードする方法

[LINE Developersコンソール](https://developers.line.biz/console/) の［ **チャネル基本設定**］タブにある［ **チャネルアイコン**］より、アイコン用の画像をアップロードします。アイコンとして利用可能なファイルフォーマットは、PNGとJPEGのみです。

アップロードしたアイコン用の画像は自動で切り抜かれ、アイコンの背景が透過されます。このとき、プレビュー画像において、ロゴが緑の正方形の中に収まっていることを確認してください。

![](https://developers.line.biz/assets/img/mini-icon-form-ja.3c47d8e7.png)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#template) PSD形式のテンプレートファイルをもとに作成する（任意）

アイコンの作成に利用できるPSD形式のテンプレートファイルを提供しています。テンプレートファイルを用いることで、アイコンのアウトラインを設定できます。アウトラインを設定することで、LINEアプリ上でアイコンと同系色の背景の前面にアイコンが掲載された場合でも、アイコンを認識しやすくなります。以下の「テンプレートファイル（PSD形式）」をダウンロードした上で、アイコンを作成してください。

[テンプレートファイル（PSD）をダウンロードする(opens new window)](https://vos.line-scdn.net/line-developers/docs/media/line-mini/icon_template_file.psd)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/design/line-mini-app-icon/#icon-color) 【推奨】アイコンの色

テンプレートファイルをもとにアイコンを作成する際は、背景領域の色（Background color）に応じて、輪郭色（Outline Color）を指定してください。このとき、テンプレートファイルにおいて、背景色のタイプを選択することを推奨します。また、テンプレートファイルの未使用のレイヤーは非表示にした上で保存してください。

![](https://developers.line.biz/assets/img/mini_icon_guideline_color.6187477d.png)

| 背景領域の色（Background color） | 輪郭色（Outline color） | 輪郭色の透明度（Outline opacity） |
| -------------------------------- | ----------------------- | --------------------------------- |
| 白（#FFFFFF）                    | 黒（#000000）           | 12%                               |
| 黒（#000000 または #181818）     | 白（#FFFFFF）           | 8%                                |
| その他の色                       | 黒（#000000）           | 8%                                |
