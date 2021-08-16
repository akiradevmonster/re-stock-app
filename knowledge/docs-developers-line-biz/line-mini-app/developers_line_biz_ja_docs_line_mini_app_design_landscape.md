# [\#](https://developers.line.biz/ja/docs/line-mini-app/design/landscape/#page-title) LINEミニアプリのセーフエリア

ノッチがある端末でもLINEミニアプリのすべてを表示するために、CSSを使ってLINEミニアプリをセーフエリアに収めることを推奨します。
LINEミニアプリでは、ノーマルモードとランドスケープモードの両方をサポートします。ノーマルモードとランドスケープモードでは、必要なセーフエリアが異なります。

具体的には、LINEミニアプリのページのpaddingを、以下のように設定します。

- [ノーマルモードの場合](https://developers.line.biz/ja/docs/line-mini-app/design/landscape/#for-normal-mode)
- [ランドスケープモードの場合](https://developers.line.biz/ja/docs/line-mini-app/design/landscape/#for-landscape-mode)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/design/landscape/#for-normal-mode) ノーマルモードの場合

- 下：34px

paddingの例：

```
{
  padding-bottom: 34px;
}

```

![](Base64-Image-Removed)

## [\#](https://developers.line.biz/ja/docs/line-mini-app/design/landscape/#for-landscape-mode) ランドスケープモードの場合

- 左右：44px
- 下：21px

paddingの例：

```
{
  padding-right: 44px;
  padding-bottom: 21px;
  padding-left: 44px;
}

```

![](https://developers.line.biz/assets/img/mini_design_safearea_landscape.125ae7e4.png)
