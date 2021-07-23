# [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#page-title) LIFFスターターアプリを試してみる

LIFFについて初めて学ぶとき、LIFFアプリ開発をどうやって始めればよいか分からないかもしれません。このようなときには、 [LIFFスターターアプリ(opens new window)](https://github.com/line/line-liff-v2-starter) が役に立ちます。

LIFFスターターアプリは、LIFFアプリ開発に必要な最低限の機能を持ったテンプレートです。LIFFスターターアプリを元にカスタマイズしていくことで、独自のLIFFアプリを開発できます。このページでは、LIFFスターターアプリについて次の手順で説明しています。

- [LIFFスターターアプリとは何か](https://developers.line.biz/ja/docs/liff/trying-liff-app/#what-is-liff-starter-app)
- [LIFFスターターアプリの始め方](https://developers.line.biz/ja/docs/liff/trying-liff-app/#how-to-start-liff-starter-app)
  - [動作環境](https://developers.line.biz/ja/docs/liff/trying-liff-app/#environment)
  - [ソースコードのダウンロード〜実行](https://developers.line.biz/ja/docs/liff/trying-liff-app/#download-run-source-code)
  - [サーバーへのデプロイ](https://developers.line.biz/ja/docs/liff/trying-liff-app/#deploy-to-server)
  - [LIFF IDの取得・設定](https://developers.line.biz/ja/docs/liff/trying-liff-app/#get-and-set-liff-id)
- [次のステップ](https://developers.line.biz/ja/docs/liff/trying-liff-app/#next-step)

このページを読むことで、LIFFアプリをサーバー上にデプロイし、LINE上でLIFFアプリを開く体験ができます。LIFFを用いて作りたいアプリがあるときに、どのように作ればよいかをイメージできます。

LIFFスターターアプリを試す前に

- LIFFについては「 [概要](https://developers.line.biz/ja/docs/liff/overview/)」を参照してください。
- LIFFの機能をオンライン上で試したい場合は [LIFFプレイグラウンド(opens new window)](https://liff-playground.netlify.app/) をご利用ください。LIFFを用いるとどのようなことができるのかを確認できます。なお、 [LIFFプレイグラウンドのソースコード(opens new window)](https://github.com/line/liff-playground) はGitHubで公開していますので、開発者は自身のLIFF IDを設定して、独自のLIFFプレイグラウンドをデプロイできます。例えば開発者のLIFF IDをもとに [`liff.login()`](https://developers.line.biz/ja/reference/liff/#login) や [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) といった各クライアントAPIをウェブ上で実行できます。

## [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#what-is-liff-starter-app) LIFFスターターアプリとは何か

LIFFスターターアプリは、LIFFアプリのテンプレートです。LIFFアプリはゼロから作ることもできますが、LIFFスターターアプリを使うことで、より早く開発を体験できます。

LIFFスターターアプリは、vanilla JavaScriptの他、Next.jsとNuxtでの実装も提供しています。各リポジトリは次の通りです。

- [vanilla JavaScriptによる実装(opens new window)](https://github.com/line/line-liff-v2-starter/tree/master/src/vanilla)
- [Next.jsによる実装(opens new window)](https://github.com/line/line-liff-v2-starter/tree/master/src/nextjs)
- [Nuxtによる実装(opens new window)](https://github.com/line/line-liff-v2-starter/tree/master/src/nuxtjs)

各リポジトリのREADMEに従うことで、LIFFアプリの開発を始められます。このページでは、vanilla JavaScriptでLIFFアプリ開発を始める方法を説明します。

## [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#how-to-start-liff-starter-app) LIFFスターターアプリの始め方

このセクションのゴールは、サーバー上にLIFFスターターアプリをデプロイし、LINEの [LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser) で開くことです。手順としては、まずローカル環境でLIFFアプリの動作を確認します。その次にサーバー上にLIFFアプリをデプロイし、最後にLIFF IDという値をサーバー側に設定します。

### [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#environment) 動作環境

LIFFスターターアプリはNode.jsで動作します。また、パッケージ管理にはYarnを用いています。後述するNetlifyのCLIも含めて、このページの内容は次の各バージョンで動作を確認しています。

| 名前                                                      | バージョン |
| --------------------------------------------------------- | ---------- |
| [Node.js(opens new window)](https://nodejs.org/en)        | 16.13.1    |
| [Yarn(opens new window)](https://yarnpkg.com/)            | 1.22.17    |
| [Netlify CLI(opens new window)](https://cli.netlify.com/) | 9.16.3     |

### [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#download-run-source-code) ソースコードのダウンロード〜実行

1. 初めに、LIFFスターターアプリのソースコードをダウンロードします。ターミナルまたはコマンドラインツール（以下「ターミナル」といいます）を開いてください。任意のディレクトリ上で、次のコマンドを実行します。

   ```
   git clone https://github.com/line/line-liff-v2-starter.git
   ```

2. ダウンロードしたソースコード（ `line-liff-v2-starter` ディレクトリ）の `src` ディレクトリ内に、vanilla JavaScript、Next.js、Nuxtで実装されたLIFFアプリがあります。あなたが使いたい実装のディレクトリに移動してください。ここではvanilla JavaScriptを用います。

   ```
   cd line-liff-v2-starter/src/vanilla
   ```

   Next.jsやNuxtを使いたいときは

   Next.jsを使いたいときは `cd line-liff-v2-starter/src/nextjs/`、Nuxtを使いたいときは `cd line-liff-v2-starter/src/nuxtjs/` で、それぞれのディレクトリに移動してください。

3. 次に依存パッケージをインストールし、続いてLIFFアプリを起動します。インストールは `yarn install` コマンド、LIFFアプリの起動は `yarn dev` コマンドを実行します。コンパイル成功のメッセージ（ `compiled successfully`）が表示されて、ターミナルの画面出力が止まったら、ローカルサーバーでLIFFアプリが起動しています。

   ```
   yarn install
   yarn dev
   ```

4. ターミナルに表示されたURL（vanilla JavaScriptの場合は `http://localhost:3000`）にブラウザでアクセスすると、次のような画面が表示されます。

   ![LIFFアプリ](https://developers.line.biz/assets/img/screenshot-pc.db885252.png)

   LIFF IDを設定する必要があります

   環境変数としてLIFF IDを設定する必要がありますが、ここではまだ設定していません。LIFF IDの設定は「 [LIFF IDの取得・設定](https://developers.line.biz/ja/docs/liff/trying-liff-app/#get-and-set-liff-id)」で行います。

5. ブラウザでLIFFアプリの起動を確認できたら、Windowsならctrl+c、macOSならcommand+cでローカルサーバーを停止します。

### [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#deploy-to-server) サーバーへのデプロイ

ここまでの手順により、ローカルサーバー上でLIFFスターターアプリを起動できました。次はNetlifyを用いてサーバーにLIFFアプリをデプロイします。

Netlifyのアカウントが必要です

[Netlify(opens new window)](https://www.netlify.com/) は静的サイトのためのホスティングサービスです。Netlifyにデプロイする際は、あらかじめアカウントを開設してください。このページの内容はNetlifyの無料プランで実行できます。

1. 初めにNetlifyのCLIをインストールします。これはコマンドライン上でNetlifyへのログインやデプロイといった操作を行うためのツールです。

   ```
   npm install -g netlify-cli
   ```

2. これで `netlify` コマンドを使えるようになりました。次に `netlify login` コマンドでNetlifyアカウントにログインします。コマンドを実行するとブラウザでNetlifyのログイン画面が開くので、ログインします。

   netlify loginコマンドを実行する前に

   先に [Netlify(opens new window)](https://www.netlify.com/) のサイトでアカウントを開設してから、 `netlify login` コマンドを実行してください。

   ```
   netlify login
   ```

3. ログイン後、Netlifyの認可画面が表示されたら、［ **Authorize**］をクリックします。

   ![Netlifyの認可画面](https://developers.line.biz/assets/img/netlify-authorized.7ef9424d.png)

4. 続いてデプロイするためのファイルを生成します。これは `src/vanilla` ディレクトリ下で次のコマンドを実行します。なお、LIFFスターターアプリでは [webpack(opens new window)](https://webpack.js.org/) を用いてビルドを行なっています。

   ```
   yarn build
   ```

5. これで `src/vanilla/dist` 下にHTMLやJavaScriptといったファイルが生成されました。あとはこれらのファイルをNetlifyにデプロイします。

   Netlifyへのデプロイは、リポジトリのルートディレクトリ（ `line-liff-v2-starter`）上で `netlify deploy` コマンドを実行します。 `netlify deploy` コマンドは、オプションをつけなければドラフト状態でデプロイされます。まずはドラフト状態でデプロイを試します。

   ```
   cd ../../      # リポジトリのルートディレクトリに移動する
   netlify deploy # ドラフト状態でデプロイする
   ```

   `netlify deploy` コマンドの実行後、次のようにデプロイ先のsiteを聞かれた場合は、 `Create & configure a new site` を選択します。上下のキーで選択肢を移動できます。

   ```
   This folder isn't linked to a site yet
   ? What would you like to do?
   Link this directory to an existing site
   ❯ +  Create & configure a new site # 新しいsiteを作って設定する

   ```

   どのteam配下にsiteを作るかを確認されます。デフォルトのteamのまま進みます。

   ```
   ? Team: (Use arrow keys)
   ❯ testlinedevelopers's team # デフォルトのteamのまま進む

   ```

   Site nameを何にするか聞かれるので、一意の名前を入力します。

   ```
   ? Site name (optional): # 一意の名前を入力する

   ```

   ドラフト状態でのデプロイができました。ターミナルに表示される `Website Draft URL` にブラウザでアクセスすると、ページを表示できます。

6. ドラフト状態で試した結果、問題がなければ `netlify deploy` コマンドに `--prod` オプションをつけて本番環境へデプロイします。

   ```
   netlify deploy --prod # 本番環境にデプロイする

   ```

以上でLIFFアプリをNetlifyにデプロイできました。デプロイ時にターミナルに表示される `Website URL` にブラウザでアクセスすると、ページを表示できます。

### [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#get-and-set-liff-id) LIFF IDの取得・設定

ここまででサーバー上にLIFFスターターアプリをデプロイできました。

この時点で、Netlifyの `Website URL` を [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser) や [LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab) で開けば、デプロイしたLIFFスターターアプリをページとして確認できます。しかしLIFFスターターアプリを、LINEの [LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser) でLIFFアプリとして開くことはできません。

LIFFスターターアプリをLIFFアプリとして開くためには、LIFF IDが必要です。まず「 [チャネルを作成する](https://developers.line.biz/ja/docs/liff/getting-started/)」と「 [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を読み、LIFF IDを取得してください。

エンドポイントURLを入力する

チャネルにLIFFアプリを追加する際に［ **エンドポイントURL**］を入力する必要があります。ここには、前の手順で本番環境へのデプロイ時に取得した `Website URL` を入力してください。

上記手順でLIFF IDを取得できます。これをサーバー側の環境変数 `LIFF_ID` として設定します。

1. Netlifyで環境変数を設定するには `netlify env:set` コマンドを用います。つまり、 `LIFF_ID` を設定するには次のコマンドを実行します。

   ```
   netlify env:set LIFF_ID "Your LIFF ID"

   ```

2. 環境変数を設定したら、再度Netlifyにデプロイします。この理由として、Netlifyでは環境変数はデプロイ時にセットされるためです。

   ```
   netlify build
   netlify deploy --prod

   ```

   #### 環境変数の確認方法

   NetlifyのSite settingsで環境変数を確認できます。詳しくは、『Netlify Docs』の「 [Build environment variables(opens new window)](https://docs.netlify.com/configure-builds/environment-variables/)」を参照してください。

   ![NetlifyのSite settings](https://developers.line.biz/assets/img/netlify-environment.92c02e7e.png)

3. これでLINEからLIFFアプリを開けるようになりました。LIFFアプリのURLは、 [LINE Developersコンソール](https://developers.line.biz/console/) で作成したチャネルの［ **LIFF**］タブにLIFF URLとして表示されます。

LIFF URLをLINEの任意のトークルームに送信し、トークルーム上のLIFF URLをタップすると、LINEの [LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser) でLIFFアプリが開けます。

![LIFFアプリ](https://developers.line.biz/assets/img/screenshot-mobile.8f3187f8.png)

#### LIFF IDを設定せずにLIFFアプリを開いた場合

環境変数の `LIFF_ID` を設定せずにLIFFアプリを開いた場合、 [`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app) によるLIFFアプリの初期化に失敗しますが、LIFFスターターアプリの見た目に変化はありません。

#### ローカルサーバー上でLIFF_IDを設定するとき

ローカルサーバーを起動するときに `LIFF_ID` を設定するには、次のようにサーバーを起動します。

```
LIFF_ID="Your LIFF ID" yarn dev

```

## [\#](https://developers.line.biz/ja/docs/liff/trying-liff-app/#next-step) 次のステップ

これでLIFFアプリを開発する準備ができました。実際の開発を行う際は、「 [LIFFアプリを開発する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/)」を参照してください。
