---
layout: post
title:  "TypeScriptのセットアップ"
date:   2021-01-07
lastmod: 2021-10-09
categories: web
tags: javascript web frontend ui
thumbnail: '/assets/media/2021-01-07-typescript-setup/typescript-setup-thumbnail.png'
---

![TypeScriptのセットアップのサムネイル]({{ '/assets/media/2021-01-07-typescript-setup/typescript-setup-thumbnail.svg' | relative_url }})


型注釈やクラス、インターフェースなど、javaScriptをより強力にするスーパーセット、TypeScriptの実行環境を構築した際のメモです。

## TypeScriptのインストール

### webpackを使用する場合

下記の記事を参考にしてwebpackのセットアップを行います。

{:.embed}
[npmとwebpackを利用してフロントエンド開発環境を構築する]({% link _posts/2020-11-29-npm-and-webpack-basics.md %}){:target="_blank"}{:rel="noopener noreferrer"}

上記の記事では以下のパッケージをインストールしています。

```
$ npm install -D webpack webpack-cli @babel/core @babel/preset-env babel-loader css-loader style-loader sass sass-loader mini-css-extract-plugin
```

今回はこれらに加えて、下記の`typescript`と`ts-loader`のふたつのパッケージをインストールします。アプリケーション実行時には使用しないため`-D`オプションを付けます。

```bash
$ npm install -D typescript ts-loader
```

`typescript`パッケージはTypeScriptの本体となるもので、`ts-loader`はwebpackでトランスパイルする際に使用します。

インストールが完了したら`tsconfig.jsonの作成`の項へ進んでください。


### webpackを使用しない場合

まず`Node.js`をインストールします。今回はHomebrewを利用してインストールしています。

```bash
$ brew install node
```

プロジェクト用のディレクトリを作成し、`cd`コマンドでそのディレクトリ直下に移動します。

```bash
$ mkdir project-name
$ cd project-name
```

ディレクトリ内に移動したら、`npm init -y`コマンドを実行し、プロジェクトディレクトリ直下に`package.json`ファイルを作成します。

```bash
$ npm init -y
```

`typescript`パッケージをインストールします。

```bash
$ npm install -D typescript
```


-------------------

## tsconfig.jsonの作成

TypeScriptのインストールが完了したら、下記コマンド`npx tsc --init`を実行します。  
するとTypeScriptの設定を行うことができる`tsconfig.json`が作成されます。

```bash
$ npx tsc --init
```

{:.window.info}
上記コマンドを使用せずに`tsconfig.json`を作成しても問題はありません。

## tsconfig.jsonの設定

作成された`tsconfig.json`に以下2点の変更を加えます。

1. `"module": "commonjs",`の項目を`"module": "ES2015",`に変更します。
2. `"sourceMap": true,`のコメントを外して有効にします。


## tsファイルの作成

以下のようなディレクトリ構成にします。

```bash
project-name/
├-- webpack.config.js(webpackを使用している場合)
├-- src
|   ├-- index.ts
├-- dist
|   └-- index.html
├-- package.json
├-- package-lock.json
└-- node_modules/ 
    └-- 以下略
```

`src`ディレクトリ内にTypeScriptのファイルとなる`index.ts`を作成してください。  
また、`dist`ディレクトリに`index.html`を作成してください。

{:.file-path}
index.ts
```ts
// TypeScriptを使う
let numberArray: number[] = [10, 20]

function func(i: number[]): number {
  return i[0] + i[1];
}

console.log(func(numberArray));
```

{:.file-path}
index.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no">

  <title>テストページ - TypeScriptのセットアップ</title>

  <!-- webpack処理後のJavaScriptファイルを読み込む -->
  <script src="main.js" defer></script>

</head>
<body>

  <h1>TypeScriptのセットアップ</h1>


</body>
</html>
```


------------

## トランスパイル

### webpackを使用する場合


先述した[npmとwebpackを利用してフロントエンド開発環境を構築する]({% link _posts/2020-11-29-npm-and-webpack-basics.md %}){:target="_blank"}{:rel="noopener noreferrer"}で行なった`webpack.config.js`ファイルに変更を加えます。

変更を加える箇所は全部で3点です。

1. `.ts`ファイルを処理するため、エントリーポイントを`index.js`から`index.ts`に変更する(**17行目**)
2. `ts-loader`をルールに追加する(**50行から56行目まで**)
3. import文で`.ts`のファイルを`.js`に解決できるように`resolve`を追記する(**113行目から119行目まで**)


```js
// mini-css-extract-pluginの読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 定数MODEに'production'か'development'どちらかを代入します
// 'production'モードではファイルは圧縮して最適化され、'development'の場合は圧縮されず、デバッグに便利なソースマップが出力されます
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // modeの値は上記の定数で管理
  mode: MODE,

  // 処理の起点となるエントリポイントの指定
  // entry: "./src/index.js",
  entry: './src/index.ts',

  // 出力先(アウトプット)の指定
  output: {
    // ディレクトリの指定をします。dist内に出力します
    // __dirname変数は、このファイルが格納されているディレクトリのパスを取得できます
    path: `${__dirname}/dist`,
    // 出力するファイル名を指定します
    filename: 'main.js'
  },

  // ローダー機能。rules内に各ローダーの処理を明記して使用します。ローダーは下から上に処理が走ります。
  module: {
    rules: [

      {
        // 拡張子が.jsの場合
        test: /\.js$/,
        use: [
          {
            // BabelによるJsのトランスパイル機能を利用
            loader: "babel-loader",
            // オプションの設定
            options: {
              presets: [
                // プリセットを指定することで、ECMAScript5に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },

      // TypeScript用のローダー
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScriptをコンパイルする
        use: 'ts-loader',
      },

      {
        // 拡張子がscssまたはcssの場合の処理
        test: /\.(scss|css)$/,
        use: [
          // Jsファイルに取り込まれたCSSをDOM要素へ注入するローダー
          "style-loader",
 
          // mini-css-extract-pluginプラグインを使用してCSSを別ファイルに書き出します。
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },

          {
            // Jsファイル内に書かれたCSSを取り込む機能
            loader: "css-loader",
            // オプションの指定
            options: {
              // CSSのurl()値のメディアを取り込むのを禁止
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
 
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },

          {
            // SassをCSSへトランスパイルする機能
            loader: "sass-loader",
            // オプションの指定
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },

  // プラグイン
  plugins: [
    // CSSファイルを外出しにするプラグイン
    new MiniCssExtractPlugin({
      // 出力するファイル名の指定
      filename: "style.css",
    }),
  ],

  // import文で.tsファイルを.jsに解決します
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },

  // どの環境に最適化するかを指定。webはブラウザ環境、es5はECMAScript5です。指定した環境に合わせたトランスパイルを行います。
  target: ["web", "es5"],

};
```

これで準備は完了しました。`npx webpack`でwebpackを実行します。
その後`dist/index.html`を開き、コンソールに`30`と表示されていれば無事トランスパイル成功です。

```
$ npx webpack
```

### webpackを使用しない場合

`npx tsc`コマンドを使用します。`--outFile`オプションを利用することで、変換後のjsファイルのディレクトリおよびファイル名を指定できます。

```bash
$ npx tsc tsファイル --outFile 変換後のjsファイル
```

```bash
$ npx tsc src/index.ts --outFile dist/main.js
```

## 型定義ファイルのインストール

JavaScriptライブラリによってはTypeScriptの型定義に対応していないものがあります。そうした場合`npm install @types/パッケージ名`とすることで型定義ファイルをインストールすることができます。

```bash
$ npm install @types/パッケージ名
```

TypeScriptに対応しているパッケージは`@types/`が不要な場合もあります。

