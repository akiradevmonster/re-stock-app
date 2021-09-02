# [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#page-title) LINEミニアプリの仕様

LINEミニアプリの開発に関する仕様を説明します。

- [HTML5サポート](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#html5-support)
  - [対応メディア形式](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#support-media-formats)
  - [ブラウザにおけるHTML5のサポート状況](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#html5-support-in-browser)
- [対応プラットフォームとバージョン](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#supported-platforms-and-versions)
- [LIFFの対応バージョン](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#supported-liff-versions)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#html5-support) HTML5サポート

LINEミニアプリを開発する場合は、 [HTML5(opens new window)](https://html.spec.whatwg.org/) のほとんどの仕様を使用できます。たとえば、 [Geolocation API(opens new window)](https://www.w3.org/TR/geolocation/) を使用して、ユーザーの位置情報を取得し、近くの店舗の情報をユーザーに提供できます。Google Maps APIなど、HTML5と互換性のあるほとんどのMap APIも使用できます。

![](https://developers.line.biz/assets/img/mini_map_api.e113821a.png)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#support-media-formats) 対応メディア形式

HTML5でサポートされているメディア形式は、LINEミニアプリでサポートされています。
以下のHTML5の仕様を参照してください。

- [img 要素(opens new window)](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)
- [Media 要素(opens new window)](https://html.spec.whatwg.org/multipage/media.html)

### [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#html5-support-in-browser) ブラウザにおけるHTML5のサポート状況

外部ブラウザにおけるHTML5のサポート状況を調べるには、以下のサイトが便利です。

- [https://caniuse.com(opens new window)](https://caniuse.com/)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#supported-platforms-and-versions) 対応プラットフォームとバージョン

LINEミニアプリは、 [LIFF](https://developers.line.biz/ja/docs/liff/overview/) を使用して開発します。そのため、LINEミニアプリの対応するOSバージョンとLINEバージョンは、LIFFの [推奨環境](https://developers.line.biz/ja/docs/liff/overview/#operating-environment) に準拠しています。

注意

サポートされているバージョンは、予告なしに変更される場合があります。

注意

[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) でLINEミニアプリを開くと以下のようなページが表示され、LINEミニアプリをスマートフォン版LINE（ [LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser)）で開くように案内されます。

![](https://developers.line.biz/assets/img/landing_page.59014576.png)

ただし、 [LINE Developersコンソール](https://developers.line.biz/console/) 上で［ **LINE未使用ユーザーをウェブブラウザに誘導する**］を有効にすると、日本、タイ、台湾以外のLINE未使用ユーザーは外部ブラウザでLINEミニアプリのサービスを表示できるようになります。詳しくは、「 [LINE未使用ユーザーをウェブブラウザに誘導する](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#redirect-non-line-users-to-browser)」を参照してください。

## [\#](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#supported-liff-versions) LIFFの対応バージョン

LINEミニアプリは、 [LIFF](https://developers.line.biz/ja/docs/liff/overview/) を使用して開発します。
LINEミニアプリで使用できるLIFF SDKの最小バージョンはv2.1です。

LINEミニアプリでは、LIFF v2.1.xが提供するすべてのLIFF APIを使用できます。
