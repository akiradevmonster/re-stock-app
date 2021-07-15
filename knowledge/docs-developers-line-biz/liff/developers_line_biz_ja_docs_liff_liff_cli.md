# [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#page-title) LIFF CLI

- [LIFF CLIとは](https://developers.line.biz/ja/docs/liff/liff-cli/#what-is-liff-cli)
- [LIFF CLIの動作環境](https://developers.line.biz/ja/docs/liff/liff-cli/#liff-cli-operating-environment)
- [LIFF CLIのインストール](https://developers.line.biz/ja/docs/liff/liff-cli/#install-liff-cli)
- [チャネルの管理](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels)
  - [チャネルの追加](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-add)
  - [デフォルトのチャネルの設定](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use)
- [LIFFアプリの管理](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps)
  - [LIFFアプリの作成](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-create)
  - [LIFFアプリの更新](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-update)
  - [LIFFアプリの参照](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-list)
  - [LIFFアプリの削除](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-delete)
- [LIFFアプリのひな形を作成する](https://developers.line.biz/ja/docs/liff/liff-cli/#scaffold)
  - [オプション](https://developers.line.biz/ja/docs/liff/liff-cli/#scaffold-options)
- [LIFFアプリの開発環境を作成する](https://developers.line.biz/ja/docs/liff/liff-cli/#init)
  - [オプション](https://developers.line.biz/ja/docs/liff/liff-cli/#init-options)
- [ローカル開発サーバーをHTTPSで起動する](https://developers.line.biz/ja/docs/liff/liff-cli/#serve)
  - [LIFFアプリをLIFF Inspectorでデバッグする](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-inspect)
  - [ローカル開発サーバーを外部に公開する](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-proxy-type)
  - [serveコマンドの動作条件](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-operating-conditions)
  - [オプション](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-options)

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#what-is-liff-cli) LIFF CLIとは

LIFF CLIとは、LIFFアプリの開発を円滑にするCLIツールです。

- [GitHub(opens new window)](https://github.com/line/liff-cli)
- [npm(opens new window)](https://www.npmjs.com/package/@line/liff-cli)

LIFF CLIでできることは次のとおりです。

- LIFFアプリを作成、更新、参照、削除する
- LIFFアプリの開発環境を作成する
- LIFFアプリを [LIFF Inspector](https://developers.line.biz/ja/docs/liff/liff-plugin/#liff-inspector) でデバッグする
- ローカル開発サーバーをHTTPSで起動する

今後のアップデートで [LIFF Mock](https://developers.line.biz/ja/docs/liff/liff-plugin/#liff-mock) の機能も追加される予定です。

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#liff-cli-operating-environment) LIFF CLIの動作環境

LIFF CLIはNode.jsで動作します。パッケージ管理にはnpmまたはYarnが使用可能ですが、このページではnpmを使います。このページの内容は次の各バージョンで動作を確認しています。

| 名前                                                                       | バージョン |
| -------------------------------------------------------------------------- | ---------- |
| [LIFF CLI(opens new window)](https://www.npmjs.com/package/@line/liff-cli) | 0.3.0      |
| [LIFF SDK(opens new window)](https://www.npmjs.com/package/@line/liff)     | 2.24.0     |
| [Node.js(opens new window)](https://nodejs.org/en)                         | 22.2.0     |
| [npm(opens new window)](https://www.npmjs.com/)                            | 10.7.0     |

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#install-liff-cli) LIFF CLIのインストール

ターミナルまたはコマンドラインツール（以下「ターミナル」と言います）を開き、次のコマンドを実行します。

```
npm install -g @line/liff-cli

```

コマンドを実行すると、LIFF CLIがインストールされ、 `liff-cli` コマンドを実行できるようになります。

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels) チャネルの管理

`channel` コマンドを使うと、LIFF CLIで管理するチャネルを追加したり、デフォルトのチャネルを設定したりできます。なお、チャネルはあらかじめ [LINE Developersコンソール](https://developers.line.biz/console/) で作成する必要があります。

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-add) チャネルの追加

`add` サブコマンドを使うと、LIFF CLIで管理するチャネルを追加できます。追加したいチャネルのチャネルIDを `add` サブコマンドに渡すと、チャネルシークレットを入力するプロンプトが表示されます。チャネルシークレットを入力すると、チャネルが追加されます。

```
$ liff-cli channel add 1234567890
? Channel Secret?: ********************************
Channel 1234567890 is now added.

```

LIFF CLIの各コマンドにチャネルIDを渡す際は、上記のように、あらかじめ `add` サブコマンドでそのチャネルIDを持つチャネルを追加しておく必要があります。

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) デフォルトのチャネルの設定

`use` サブコマンドを使うと、LIFF CLIのデフォルトのチャネルを設定できます。設定したいチャネルのチャネルIDを `use` サブコマンドに渡します。

```
$ liff-cli channel use 1234567890
Channel 1234567890 is now selected.

```

デフォルトのチャネルは、LIFF CLIの各コマンドでチャネルIDを省略した場合に使われます。

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps) LIFFアプリの管理

`app` コマンドを使うと、LIFFアプリの作成、更新、参照、削除ができます。

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-create) LIFFアプリの作成

`create` サブコマンドを使うと、LIFFアプリを作成できます。LIFFアプリの作成に成功すると、LIFF IDがターミナルに表示されます。

```
$ liff-cli app create \
   --channel-id 1234567890 \
   --name "Brown Coffee" \
   --endpoint-url https://example.com \
   --view-type full
Successfully created LIFF app: 1234567890-AbcdEfgh

```

#### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-create-options) オプション

`create` サブコマンドでは、以下のオプションを利用できます。

| オプション              | 必須 | 説明                                                                                                                                                                                                                                                                                              |
| ----------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c`、 `--channel-id`   |      | LIFFアプリを作成したいチャネルのチャネルIDを指定します。省略すると、 [デフォルトのチャネル](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) のチャネルIDが指定されます。                                                                                                  |
| `-n`、 `--name`         | ✅   | LIFFアプリ名を指定します。LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含めることができません。                                                                                                                                                                            |
| `-e`、 `--endpoint-url` | ✅   | LIFFアプリのエンドポイントURLを指定します。LIFFアプリを実装したウェブアプリのURLです（例： `https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。<br>URLスキームは **https** である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。 |
| `-v`、 `--view-type`    | ✅   | LIFFアプリの画面サイズ。以下のいずれかの値を指定します。<br>- `full`<br>- `tall`<br>- `compact`<br>詳しくは、「 [LIFFブラウザの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。                                                                  |

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-update) LIFFアプリの更新

`update` サブコマンドを使うと、LIFFアプリの設定を更新できます。

```
$ liff-cli app update \
   --liff-id 1234567890-AbcdEfgh \
   --channel-id 1234567890 \
   --name "Brown Cafe"
Successfully updated LIFF app: 1234567890-AbcdEfgh

```

#### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-update-options) オプション

`update` サブコマンドでは、以下のオプションを利用できます。

| オプション       | 必須 | 説明                                                                                                                                                                                                                                                                                              |
| ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--liff-id`      | ✅   | 更新したいLIFFアプリのLIFF IDを指定します。                                                                                                                                                                                                                                                       |
| `--channel-id`   |      | LIFFアプリが属するチャネルのチャネルIDを指定します。省略すると、 [デフォルトのチャネル](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) のチャネルIDが指定されます。                                                                                                      |
| `--name`         |      | LIFFアプリ名を指定します。LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含めることができません。                                                                                                                                                                            |
| `--endpoint-url` |      | LIFFアプリのエンドポイントURLを指定します。LIFFアプリを実装したウェブアプリのURLです（例： `https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。<br>URLスキームは **https** である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。 |
| `--view-type`    |      | LIFFアプリの画面サイズ。以下のいずれかの値を指定します。<br>- `full`<br>- `tall`<br>- `compact`<br>詳しくは、「 [LIFFブラウザの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。                                                                  |

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-list) LIFFアプリの参照

`list` サブコマンドを使うと、LIFFアプリを参照できます。LIFF IDとLIFFアプリ名が一覧で表示されます。

```
$ liff-cli app list --channel-id 1234567890
LIFF apps:
1234567890-AbcdEfgh: Brown Coffee
1234567890-IjklMnop: Brown Cafe

```

#### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-list-options) オプション

`list` サブコマンドでは、以下のオプションを利用できます。

| オプション     | 必須 | 説明                                                                                                                                                                                             |
| -------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--channel-id` |      | LIFFアプリを参照したいチャネルのチャネルIDを指定します。省略すると、 [デフォルトのチャネル](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) のチャネルIDが指定されます。 |

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-delete) LIFFアプリの削除

`delete` サブコマンドを使うと、LIFFアプリを削除できます。

```
$ liff-cli app delete \
   --liff-id 1234567890-AbcdEfgh \
   --channel-id 1234567890
Deleting LIFF app...
Successfully deleted LIFF app: 1234567890-AbcdEfgh

```

#### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#commands-app-delete-options) オプション

`delete` サブコマンドでは、以下のオプションを利用できます。

| オプション     | 必須 | 説明                                                                                                                                                                                         |
| -------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--liff-id`    | ✅   | 削除したいLIFFアプリのLIFF IDを指定します。                                                                                                                                                  |
| `--channel-id` |      | LIFFアプリの属するチャネルのチャネルIDを指定します。省略すると、 [デフォルトのチャネル](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) のチャネルIDが指定されます。 |

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#scaffold) LIFFアプリのひな形を作成する

`scaffold` コマンドを使うと、 [Create LIFF App](https://developers.line.biz/ja/docs/liff/cli-tool-create-liff-app/) を通じてLIFFアプリのひな形を作成できます。LIFFアプリのプロジェクト名を `scaffold` コマンドに渡すと、そのプロジェクト名を使ってCreate LIFF Appを実行します。

```
liff-cli scaffold my-app --liff-id 1234567890-AbcdEfgh

```

Create LIFF Appについて詳しくは、「 [Create LIFF AppでLIFFアプリの開発環境を構築する](https://developers.line.biz/ja/docs/liff/cli-tool-create-liff-app/)」を参照してください。

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#scaffold-options) オプション

`scaffold` コマンドでは、以下のオプションを利用できます。

| オプション         | 必須 | 説明                              |
| ------------------ | ---- | --------------------------------- |
| `-l`、 `--liff-id` |      | LIFFアプリのLIFF IDを指定します。 |

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#init) LIFFアプリの開発環境を作成する

`init` コマンドを使うと、LIFFアプリの開発環境を作成できます。 `init` コマンドでは、以下の3つの処理を順に行います。

1. [チャネルの追加](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-add)
2. [LIFFアプリの作成](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-liff-apps-create)
3. [LIFFアプリのひな形を作成する](https://developers.line.biz/ja/docs/liff/liff-cli/#scaffold)

```
$ liff-cli init \
   --channel-id 1234567890 \
   --name "Brown Coffee" \
   --view-type full \
   --endpoint-url https://example.com

```

たとえば、上記のコマンドを実行すると、チャネルIDが「1234567890」のチャネルを追加します。次に、そのチャネルに、LIFFアプリ名が「Brown Coffee」、エンドポイントURLが「<https://example.com」、画面サイズが「Full」のLIFFアプリを作成します。最後に、作成したLIFFアプリのLIFF> IDを設定したひな形を作成します。

```
liff-cli init \
   --channel-id 1234567890 \
   --name "Brown Coffee" \
   --view-type full \
   --endpoint-url https://example.com

? Channel Secret?: ********************************
Channel 1234567890 is now added.
Welcome to the Create LIFF App
? Which template do you want to use? vanilla
? JavaScript or TypeScript? JavaScript
? Which package manager do you want to use? npm

Installing dependencies:
- @line/liff

removed 10 packages in 944ms

22 packages are looking for funding
  run `npm fund` for details

Installing devDependencies:
- vite

added 10 packages in 7s

25 packages are looking for funding
  run `npm fund` for details

Done! Now run:

  cd Brown Coffee
  npm run dev

App 1234567890-AbcdEfgh successfully created.

Now do the following:
  1. go to app directory: `cd Brown Coffee`
  2. create certificate key files (e.g. `mkcert localhost`, see: https://developers.line.biz/en/docs/liff/liff-cli/#serve-operating-conditions )
  3. run LIFF app template using command above (e.g. `npm run dev` or `yarn dev`)
  4. open new terminal window, navigate to `Brown Coffee` directory
  5. run `liff-cli serve -l 1234567890-AbcdEfgh -u http://localhost:${PORT FROM STEP 3.}/`
  6. open browser and navigate to http://localhost:${PORT FROM STEP 3.}/

```

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#init-options) オプション

`init` コマンドでは、以下のオプションを利用できます。なお、オプションを省略すると、 `init` コマンドを実行した際に、そのオプションを入力するプロンプトが表示されます。

```
$ liff-cli init
? Channel ID? 1234567890
? App name? Brown Coffee
? View type? full
? Endpoint URL? (leave empty for default 'https://localhost:9000') https://example.com

```

| オプション              | 必須  | 説明                                                                                                                                                                                                                                                                                    |
| ----------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c`、 `--channel-id`   | ✅ ※1 | LIFFアプリを作成したいチャネルのチャネルIDを指定します。                                                                                                                                                                                                                                |
| `-n`、 `--name`         | ✅ ※2 | LIFFアプリ名を指定します。LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含めることができません。                                                                                                                                                                  |
| `-v`、 `--view-type`    | ✅ ※2 | LIFFアプリの画面サイズ。以下のいずれかの値を指定します。<br>- `full`<br>- `tall`<br>- `compact`<br>詳しくは、「 [LIFFブラウザの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。                                                        |
| `-e`、 `--endpoint-url` |       | LIFFアプリのエンドポイントURLを指定します。LIFFアプリのデプロイ先のURLです（例： `https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。<br>URLスキームは **https** である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。 |

※1 [デフォルトのチャネル](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) を設定していない場合、オプションかプロンプトのいずれかで指定する必要があります。

※2 オプションかプロンプトのいずれかで指定する必要があります。

## [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#serve) ローカル開発サーバーをHTTPSで起動する

`serve` コマンドを使うと、ローカル開発サーバーをHTTPSで起動できます。

`serve` コマンドにLIFFアプリが動いているローカル開発サーバーを指定すると、ローカル開発サーバーを対象とするローカルプロキシサーバーをHTTPSで起動し、LIFFアプリのエンドポイントURLをローカルプロキシサーバーのURLで書き換えます。これにより、開発者はより簡単にローカル開発サーバーをHTTPSで起動できます。

公開済みのLIFFアプリではserveコマンドを実行しないでください

`serve` コマンドを実行すると、LIFFアプリのエンドポイントURLがローカルプロキシサーバーのURLで書き換えられるため、ユーザーがLIFFアプリにアクセスできなくなります。そのため、公開済みのLIFFアプリでは `serve` コマンドを実行しないでください。

![](Base64-Image-Removed)

```
# ローカル開発サーバーをURLで指定する場合
$ liff-cli serve \
   --liff-id 1234567890-AbcdEfgh \
   --url http://localhost:3000/

Successfully updated endpoint url for LIFF ID: 1234567890-AbcdEfgh.

→  LIFF URL:     https://liff.line.me/1234567890-AbcdEfgh
→  Proxy server: https://localhost:9000/

```

```
# ローカル開発サーバーをホストとポート番号で指定する場合
$ liff-cli serve \
   --liff-id 1234567890-AbcdEfgh \
   --host localhost \
   --port 3000

Successfully updated endpoint url for LIFF ID: 1234567890-AbcdEfgh.

→  LIFF URL:     https://liff.line.me/1234567890-AbcdEfgh
→  Proxy server: https://localhost:9000/

```

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-inspect) LIFFアプリをLIFF Inspectorでデバッグする

`serve` コマンドに `--inspect` オプションを指定すると、LIFFアプリを [LIFF Inspector](https://developers.line.biz/ja/docs/liff/liff-plugin/#liff-inspector) でデバッグできます。

`--inspect` オプションは、LIFF InspectorのLIFF Inspector ServerをHTTPSで起動するため、開発者はLIFFアプリにLIFF Inspector PluginをインストールするだけでLIFFアプリをデバッグできます。詳しくは、LIFF Inspectorの [README(opens new window)](https://github.com/line/liff-inspector/blob/main/README_ja.md) を参照してください。

```
$ liff-cli serve \
   --liff-id 1234567890-AbcdEfgh \
   --url http://localhost:3000/ \
   --inspect

Successfully updated endpoint url for LIFF ID: 1234567890-AbcdEfgh.

→  LIFF URL:     https://liff.line.me/1234567890-AbcdEfgh
→  Proxy server: https://localhost:9000/?li.origin=wss%3A%2F%2Flocalhost%3A9222
Debugger listening on wss://192.168.1.6:9222

You need to serve this server over SSL/TLS
For help, see: https://github.com/line/liff-inspector#important-liff-inspector-server-need-to-be-served-over-ssltls

```

LIFF URLにアクセスすると、 `serve` コマンドを実行したターミナルに `devtools://devtools/` から始まるURLが表示されます。このURLをGoogle Chromeで開くと、LIFFアプリをGoogle Chrome上でデバッグできます。

```
connection from client, id: 1234567890-AbcdEfgh
DevTools URL: devtools://devtools/bundled/inspector.html?wss=localhost:9222/?hi_id=1234567890-AbcdEfgh

```

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-proxy-type) ローカル開発サーバーを外部に公開する

この機能は実験的機能です

この機能は実験的機能です。今後、後方互換性を持たない変更が行われる可能性があります。

`--proxy-type` オプションに `ngrok-v1` を指定すると、ローカルプロキシサーバーの代わりに [ngrok v1(opens new window)](https://github.com/inconshreveable/ngrok) を使うことができます。これにより、ローカル開発サーバーを外部に公開できます。

```
$ liff-cli serve \
  --liff-id 1234567890-AbcdEfgh \
  --url http://127.0.0.1:3000/ \
  --proxy-type ngrok-v1

ngrok-v1 is experimental feature.
Successfully updated endpoint url for LIFF ID: 1234567890-AbcdEfgh.

→  LIFF URL:     https://liff.line.me/1234567890-AbcdEfgh
→  Proxy server: https://1234abcd.ngrok.example.com/

```

なお、この機能を使うには、 [ngrok v1(opens new window)](https://github.com/inconshreveable/ngrok) と [node-pty(opens new window)](https://www.npmjs.com/package/node-pty) を別途インストールする必要があります。

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-operating-conditions) `serve` コマンドの動作条件

`serve` コマンドが動作するには、次の条件をすべて満たす必要があります。

- localhostに対して有効な証明書（ `localhost.pem`）と秘密鍵（ `localhost-key.pem`）を作成する。
- `localhost.pem` と `localhost-key.pem` を作成した場所（例：LIFFアプリのプロジェクトのルートディレクトリ）で `serve` コマンドを実行する。

次の手順に従って、localhostに対して有効な証明書（ `localhost.pem`）と秘密鍵（ `localhost-key.pem`）を作成してください。ここでは [mkcert(opens new window)](https://github.com/FiloSottile/mkcert) を使います。mkcertについて詳しくは、mkcertの [README(opens new window)](https://github.com/FiloSottile/mkcert/blob/master/README.md) を参照してください。

1. 次のコマンドを実行し、 `mkcert` をインストールします。

   ```
   # macOSの場合（Homebrewを使用）
   $ brew install mkcert

   # Windowsの場合（Chocolateyを使用）
   $ choco install mkcert
   ```

2. `mkcert -install` を実行し、ローカル認証局を作成します。

   ```
   mkcert -install
   ```

3. `mkcert localhost` を実行し、localhostに対して有効な証明書（ `localhost.pem`）と秘密鍵（ `localhost-key.pem`）を作成します。

   ```
   $ mkcert localhost
   Note: the local CA is not installed in the Firefox trust store.
   Run "mkcert -install" for certificates to be trusted automatically ⚠️

   Created a new certificate valid for the following names 📜
    - "localhost"

   The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅
   ```

### [\#](https://developers.line.biz/ja/docs/liff/liff-cli/#serve-options) オプション

`serve` コマンドでは、以下のオプションを利用できます。

| オプション                     | 必須  | 説明                                                                                                                                                                                                                          |
| ------------------------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-l`、 `--liff-id`             | ✅    | ローカル開発サーバーのLIFFアプリのLIFF IDを指定します。 [デフォルトのチャネル](https://developers.line.biz/ja/docs/liff/liff-cli/#manage-channels-use) のLIFFアプリのLIFF IDのみを指定できます。                              |
| `-u`、 `--url`                 | ✅ ※1 | ローカル開発サーバーのURLを指定します。                                                                                                                                                                                       |
| `--host`                       | ✅ ※2 | ローカル開発サーバーのホストを指定します。                                                                                                                                                                                    |
| `--port`                       | ✅ ※2 | ローカル開発サーバーのポート番号を指定します。                                                                                                                                                                                |
| `-i`、 `--inspect`             |       | 指定すると、LIFF Inspectorを起動します。                                                                                                                                                                                      |
| `--proxy-type`                 |       | 使用するプロキシの種類。以下のいずれかの値を指定します。<br>- `local-proxy`：ローカルプロキシ<br>- `ngrok-v1`： [ngrok v1(opens new window)](https://github.com/inconshreveable/ngrok)<br>デフォルト値は `local-proxy` です。 |
| `--ngrok-command`              |       | ngrok v1を実行するコマンドを指定します。デフォルト値は `ngrok` です。                                                                                                                                                         |
| `--local-proxy-port`           |       | ローカル開発サーバーを対象とするローカルプロキシサーバーが待ち受けるポート番号を指定します。デフォルト値は `9000` です。                                                                                                      |
| `--local-proxy-inspector-port` |       | LIFF Inspector Serverを対象とするローカルプロキシサーバーが待ち受けるポート番号を指定します。デフォルト値は `9223` です。                                                                                                     |

※1 ローカル開発サーバーをURLで指定する場合は必須です。

※2 ローカル開発サーバーをホストとポート番号で指定する場合は必須です。
