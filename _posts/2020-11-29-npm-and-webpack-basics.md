---
layout: post
title:  "npmとwebpackを利用してフロントエンド開発環境を構築する"
date:   2020-11-29
lastmod: 2021-03-16
categories: web
tags: web npm webpack frontend node
thumbnail: '/assets/media/2020-11-29-npm-and-webpack-basics/npm-webpack.png'
---

![npmとwebpackを利用してフロントエンド開発環境を構築するのサムネイルイメージ]({{ '/assets/media/2020-11-29-npm-and-webpack-basics/npm-webpack.svg' | relative_url }})


## はじめに

Javascriptという言語は、それ自体はシンプルに書き始めることができます。HTMLとCSS、そしてJavascriptの、クライアントサイドの基本的なセットであれば、複雑で高度な開発環境は必要がないかもしれません。

しかし、外部ライブラリを柔軟に導入したい場合、どうしてもパッケージ管理システムなどが必要になってきます。さらに、**仮にパッケージ管理システムを導入したとしても、現行の仕様ではそのままライブラリを読み込むだけでは外部ライブラリを利用できません。それらのライブラリを実行可能な状態にするツールが必要になります。**  
また、Javascriptはブラウザごとに実装されている技術に差があり、これが処理や表示の違いなど、バグの原因になりやすいため、どのブラウザでも互換性のあるコードにする必要があります。

このように、Javascriptは書き進めるとだんだんシンプルではなくなってきます。また今日では、JavascriptはWebページにちょっとした動きを追加する言語というだけではなく、大規模な開発にも使われることが当たり前となっています。そこで、上記のような開発環境にまつわる問題点を、なるべく解決してくれる便利なツールがたくさん作られました。その最も基本と言えるものが**npm**と**webpack**です。

**上で述べた問題点は、npmとwebpackを利用することで解決できます。さらに、上記の問題だけはなく、開発を効率的にしてくれる様々な機能があります。**  
本記事では、現代のJavascript開発環境において必要不可欠なツール、npmとwebpackの基本的な使い方を解説します。

## npmとは

[npm](https://www.npmjs.com/)とは、*Node Package Manager*の略で、フロントエンド開発で利用されている**パッケージ管理システム**です。

npmは本来、Javascriptをサーバサイドで実行できる環境である[Node.js](https://nodejs.org/ja/)のパッケージ管理システムですが、サーバ環境のみならずローカル環境においても様々なパッケージの利用が行えるため、フロントエンド開発における重要なエコシステムとなっています。

npmを利用すると、外部ライブラリのインストールやアップデート、あるいは自作したパッケージの共有などを簡単に行えます。

{:.window.info}
npmと同じくらい人気があり、互換性のあるパッケージ管理システムとして[Yarn](https://yarnpkg.com/)があります。


## webpackとは

[webpack](https://webpack.js.org/)とは、Javascriptをはじめとしたフロントエンドのファイルの依存関係を解決し、1つのファイルにまとめてくれる**モジュールバンドラーと呼ばれるツール**です。非常に様々な機能があり、主に以下の点においてフロントエンド開発では欠かせないツールとなっています。


- ECMAScript6以降の新しい仕様で記述したJavascriptや、TypescriptなどのJavascript拡張言語(スーパーセット)を、現在普及しているブラウザに互換性のある形式に変換(トランスパイル)できる。
- Javascriptのモジュールを利用した際、依存関係を解決し1つのファイルにまとめることができる。
- npmなどのパッケージ管理システムからインストールした外部パッケージを利用可能な状態にできる。
- SassをCSSのコードにトランスパイルでき、かつCSSをJavascriptとともにバンドルできる。
- コードを圧縮して軽量化できる。
- 1つのファイルにまとめるため、HTTPリクエストの数を減らすことができる。
- 1つのファイルにまとめずに好きなように分割できるなど、柔軟な設定ができる。
- 非常の多くのオプションやプラグインがあり、多種多様な利用ができる。
- 多くのWebアプリケーションフレームワークに取り入れられている。

webpackはnpmパッケージとして利用するため、以降の手順としてまずはnpmのインストールを行い、その後webpackを導入します。


## npmのインストール

**npmはNode.jsをインストールすると一緒にインストールされます。**   
Node.jsは[Node.jsのダウンロードページ](https://nodejs.org/ja/download/)からインストーラーをダウンロードしてインストールすることもできるほか、HomebrewやWSL2などのCLIツールを使ってインストールすることもできます。  
ほかにもNodebrewやnvmなど、様々なツールがありますので、好みの方法でインストールします。  

### Windows

WindowsではWSL2を利用してNode.jsをインストールすることもできます。  
WSL2からインストールする場合は以下のMicrosoftのページを参考にしてください。(少し分かりづらい気もしますが...)

{:.embed}
[Windows 10 用 Windows Subsystem for Linux のインストール ガイド](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10){:target="_blank"}{:rel="noopener noreferrer"}

{:.embed}
[WSL 2 を使用して Node.js 開発環境を設定する](https://docs.microsoft.com/ja-jp/windows/nodejs/setup-on-wsl2){:target="_blank"}{:rel="noopener noreferrer"}

### Mac

Macでは[Homebrew](https://brew.sh/index_ja.html)を利用してNode.jsをインストールすることもできます。  
Homebrew自体のインストールは以下のページを参考にしてください。

{:.embed}
[MacにHomebrewを導入する]({% link _posts/2020-06-14-mac-homebrew-setup.md %}){:target="_blank"}{:rel="noopener noreferrer"}

Homebrewをインストールしたら、下記のコマンドをターミナルに入力してください。

```bash
$ brew install node
```


### インストールの確認

下記のコマンドを入力して、バージョン情報が表示されたらインストールは正しく行われています。

```bash
$ node -v
v14.4.0
$ npm -v
6.14.4
```

-----

## npmの使い方

### プロジェクト用のディレクトリを作る

まずはターミナルを開き、任意の場所にディレクトリを作成し、そのディレクトリへ移動します。   

```bash
$ mkdir project-name
$ cd project-name
```

### package.jsonの作成

ディレクトリ内に移動したら、`npm init -y`コマンドを実行します。

```bash
$ npm init -y
```

**この`npm init`というコマンドを実行すると、現在のディレクトリに`package.json`というファイルが新たに作成されます。**  
今回は`-y`オプションを利用しましたが、このオプションを付けずにコマンドを実行すると、ターミナル内で対話的にプロジェクト名やユーザ名を設定することもできます。

`package.json`の中身を見てみます。作成された直後の内容は、概ね以下のようになっていると思います。もしかするとnpmのバージョンによっては微妙に異なることがあるかもしれません。

{:.file-path}
project-name/package.json
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

`package.json`は、拡張子にあるようにJSON(JavaScript Object Notation)と呼ばれる形式で表記されています。名前の通りJavascriptのオブジェクト構文とよく似た書き方になっています。馴染みのない方でもなんとなく読めるかと思います。

**`package.json`は、このプロジェクトの名前や作者といった基本情報に加え、どの外部パッケージをどのバージョンで用いるのか(依存するのか)などを表記します。いわばプロジェクトを管理するための設定ファイルです。**  
**`package.json`を直下に置いたこのディレクトリが、ひとつのプロジェクトとして認識され、また共有する際にはこのプロジェクト自体がパッケージとなります。**  


### npmパッケージのインストール

**パッケージのインストールは、`package.json`のあるディレクトリ内で、`npm install パッケージ名`あるいは省略形の`npm i パッケージ名`コマンドで行います。**

例として、試しに[SimpleMDE](https://simplemde.com/){:target="_blank"}{:rel="noopener noreferrer"}というMarkdownエディタをインストールしてみます。


```bash
$ npm install simplemde
```

{:.window.note}
`npm install パッケージ名1 パッケージ名2`のように、パッケージ名の間を半角スペースで区切ることで、複数のパッケージを一度にインストールできます。  


**npmインストールを行うと、ディレクトリ内に主に3つの変更が加わります。**

1. `package.json`ファイルに`dependencies`という項目が追記される。
2. プロジェクト直下に`node_modules`というディレクトリが作成される。
3. プロジェクト直下に`package-lock.json`というファイルが作成される。

順を追って見ていきましょう。

#### dependencies

まず一つ目の変更点として、`package.json`ファイルに`dependencies`という項目が追記されています。  
先ほどの例の`npm install simplemde`を実行した後の`package.json`は以下のようになっています。

{:.file-path}
project-name/package.json
```
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "simplemde": "^1.11.2"
  }
}
```

ファイルの下の方に`dependencies`という項目が追加されているのが確認できます。  
**`dependencies`の項目内には、このプロジェクトで使用するパッケージが記述されます。** 

```
"dependencies": {
  "simplemde": "^1.11.2"
}
```

今回の例では、先ほどインストールしたSimpleMDEのパッケージ名とバージョン指定に関する値が書いてあります。  
バージョンの数値は`npm install`した時期など状況によって異なります。バージョンの指定方法については「パッケージのバージョンの指定方法」の項で後述します。



#### node_modules

続いて二つ目の変更点を確認します。`npm install`の後、プロジェクトディレクトリ直下に`node_modules`ディレクトリが作成されます。  
**この`node_modules`ディレクトリ内に、インストールしたnpmパッケージ(モジュール)が格納されます。**


```
project-name/
├-- package.json
├-- package-lock.json
└-- node_modules/   
    └-- 以下略
```

インストールするパッケージによっては、他のパッケージと依存関係を持っているものもあるため、その場合は依存関係にあるパッケージもまとめて`node_modules`に格納されます。  
今回の例では`simplemde`だけでなく他にも`codemirror`や`marked`などのパッケージがインストールされていることがわかります。


#### package-lock.json

三つ目の変更点を確認します。`npm install`の後、プロジェクト直下に`package-lock.json`というファイルが作成されます。

**`package-lock.json`とは、`package.json`に書かれた情報をもとに、実際に`node_modules`ディレクトリにインストールされたパッケージ名と、その明確なバージョン情報などが記載されたファイルです。**

なぜ`package.json`と`package-lock.json`という、似た二つのファイルがあるのかというと、`package.json`の方はプロジェクトの設定ファイルであり、パッケージのバージョン情報についてはあくまで指定をするためのファイルだからです。

後述の「パッケージのバージョンの指定方法」と「package.jsonをもとにパッケージをインストールする」の項で詳しく説明しますが、**`package.json`は手動で編集することができますが、`package-lock.json`は原則的に直接編集することはありません。`package.json`をもとに、実際にインストールされたパッケージのバージョン情報を反映したファイルが`package-lock.json`となっているからです。**


### `-D`オプションでのインストール

`npm install`コマンドに`--save-dev`もしくは省略形の`-D`オプションを付けると、**開発の時だけに利用し、実際のアプリケーションには組み込まれないパッケージとしてインストール**することができます。

```bash
$ npm install -D パッケージ名
```

**`--save-dev`か`-D`オプションでインストールされたパッケージは、`package.json`には`devDependencies`という項目内に記述されます。**  
微妙に`dependencies`と名前が似ていますが`devDependencies`です。

今回の記事で利用するwebpackは、開発時のみ必要なパッケージであり、完成したアプリケーションでは使わないので`devDependencies`を使って管理します。


### グローバルインストール

`npm install`の際に`-g`オプションを付けるとグローバルインストールとなります。  

```bash
$ npm install -g パッケージ名
```

`-g`オプションをつけてインストールされたパッケージは、プロジェクト内の`node_modules`配下にはインストールされません。  
代わりにコンピュータ内のnpmルートパスにある`node_modules`にインストールされます。  
グローバルインストールされたnpmパッケージは、プロジェクトに限らず利用できるようになります。  
そのためグローバルインストールコマンドは、特定のプロジェクト外でも実行できます。


### パッケージのアンインストール

`npm uninstall`あるいは`npm un`コマンドを使います。

```
$ npm un パッケージ名
```

グローバルインストールされたパッケージは`-g`オプションをつけます。

```
$ npm uninstall -g パッケージ名
```



### パッケージのバージョンの指定方法

`package.json`の`dependencies`や`devDependencies`には、インストールするパッケージのバージョンを様々な書き方で指定できます。  
以下によく使われる指定方法を記します。

npmのバージョンは[semver(Semantic Versioning)](https://semver.org/lang/ja/)に沿ってバージョニングする規約となっています。  
バージョンの各数値は`major.minor.patch`形式で表現されます。

> 1. APIの変更に互換性のない場合はメジャーバージョンを、
> 2. 後方互換性があり機能性を追加した場合はマイナーバージョンを、
> 3. 後方互換性を伴うバグ修正をした場合はパッチバージョンを上げます。  
> 
> [semver(Semantic Versioning)](https://semver.org/lang/ja/)


#### 完全一致

指定したバージョンに完全に一致したバージョンがインストールされます。

```json
"dependencies": {
  "foo": "1.1.2"
}
```

#### 比較演算子を使った指定

比較演算子を使ってバージョンを指定できます。

```json
"dependencies": {
  "foo": ">1.1.2", // 1.1.2より大きいバージョン
  "hoge": "<=1.1.2" // 1.1.2以下のバージョン
}
```

#### ワイルドカードを使った指定

`x`や`*`はワイルドカードとして利用できます。

```json
"dependencies": {
  "foo": "*", // バージョンを指定しない
  "hoge": "1.2.x", // >= 1.2.0 < 1.3.0
  "bar": "1.x", // >= 1.0.0 < 2.0.0
  "bar": "" // バージョンを指定しない
}
```


#### チルダ記号(~)を使った指定

チルダ記号(`~`)を使用すると、明記したバージョン値の位置以下は更新を許可します。  
例えば下記のように、`~major.minor`までバージョンが記述されている場合は`patch`レベルの値は更新されることを許可します。  
そうでない場合は、minorレベルの値を上げることを許可します。

```json
"dependencies": {
  "foo": "~1.2", // 1.2.x
}
```

```json
"dependencies": {
  "foo": "~1", // 1.x
  "hoge": "~1.1.2" // >= 1.1.2 < 1.2.0
}
```


#### キャレット記号(^)を使った指定

キャレット記号(`^`)を使うと、majorレベルは更新されず、それ以外が更新されます。

```json
"dependencies": {
  "foo": "^1.2.3", // >= 1.2.3 < 2.0.0
  "hoge": "^0.2.3", // >= 0.2.3 < 0.3.0
  "hoge": "^0.0.3" // >= 0.0.3 < 0.0.4
}
```


#### コマンドラインでのバージョン指定方法

`npm install`コマンドを実行の際にもパッケージのバージョンを指定できます。  
パッケージ名の後ろに`@`をつけ、その後ろにバージョン値を入力します。

```
$ npm install foo@1.1.2
```

### package.jsonをもとにパッケージをインストールする

これまでは空のディレクトリに`package.json`を新たに作成し、パッケージを管理する方法を説明しましたが、**すでに`package.json`があるプロジェクトの場合は、`package.json`のあるディレクトリに移動し、`npm install`コマンドを実行すると、`package.json`に基づいてパッケージをインストールできます。** 

```bash
$ npm i
```

これにより、開発者同士で同じパッケージのバージョン環境で開発できるようになります。

**同じように、`package.json`ファイルの`dependencies`や`devDependencies`を直接編集した場合も、`npm install`コマンドを実行することでパッケージのインストールや管理が行えます。**   
つまり、`npm install simplemde`とコマンドラインで実行するのと、下記のように`package.json`の`dependencies`の項目に、`simplemde`パッケージとバージョン指定を記入した後に`npm install`コマンドを実行するのは、(バージョンの指定によりますが)同じ結果となります。

{:.file-path}
project-name/package.json
```json
"dependencies": {
  "simplemde": "^1.11.2"
}
```

`package.json`を編集した後`npm install`

```bash
$ npm i
```

### パッケージのアップデート  

パッケージのバージョンアップには`npm update パッケージ名`または省略形として`npm up パッケージ名`コマンドを使用します。  
パッケージのアップデートの範囲は、`package.json`に記載したバージョン指定に基づきアップデートされます。

```bash
$ npm up simplemde
```

### その他の使い方

npmのその他の使い方については公式ドキュメントをご覧ください。  

{:.embed}
[npm Docs](https://docs.npmjs.com/){:target="_blank"}{:rel="noopener noreferrer"}


--------




## webpackを利用する

ここまでずいぶん説明が長くなりましたが、これからwebpackの使い方について記述します。  
まずはwebpackを動作させるための準備を行います。


## 作業用のディレクトリとファイルの作成

作業用のディレクトリとファイルを、現在のプロジェクトディレクトリ直下に作成します。

```bash
$ mkdir src dist
$ touch src/index.js src/style.scss dist/index.html webpack.config.js
```

**`src`ディレクトリには開発用のファイルを入れるようにします。**ここでは`index.js`とSassファイルの`style.scss`を作成します。

**`dist`ディレクトリには、webpackによってバンドルされたファイルが出力されるように、後に設定します。**  
バンドルされたjsファイルを読み込んで実行するために、同階層に`index.html`を作成します。  

そして、**webpackの設定用ファイルである`webpack.config.js`をプロジェクト直下に作成します。**


ディレクトリ構成図は以下のようになります。

```bash
project-name/
├-- webpack.config.js
├-- src
|   ├-- index.js
|   └-- style.scss
├-- dist
|   └-- index.html
├-- package.json
├-- package-lock.json
└-- node_modules/ 
    └-- 以下略
```


## index.htmlへ内容を記述

`dist/index.html`のコンテンツを記入します。  
15行目で、webpackによって出力されたファイルを`<script src="main.js" defer></script>`で読み込むように設定しています。  
また本記事では、webpackで処理した後に、JavascriptとCSSを分岐して出力するオプションをつけるため、12行目の`<link rel="stylesheet" href="style.css">`でCSSファイルを読み込むようにしています。

`body`要素内には、見出しとSimpleMDE用のコードを記述しています。バンドルが正しく行われれば、Markdownエディタが表示されるようにしています。

{:.file-path}
project-name/dist/index.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no">

  <title>テストページ - npmとwebpackを利用してフロントエンド開発環境を構築する</title>

  <!-- webpack処理後のCSSファイルを読み込む -->
  <link rel="stylesheet" href="style.css">

  <!-- webpack処理後のJavascriptファイルを読み込む -->
  <script src="main.js" defer></script>

</head>
<body>

  <h1>npmとwebpackを利用してフロントエンド開発環境を構築する</h1>

  <!-- SimpleMDEを使う -->
  <textarea id="mde"></textarea>

</body>
</html>
```


## SCSSファイル

`src/style.scss`のコンテンツを記述します。  
ここでは例として、見出しのスタイルを、Sassの変数機能を使って定義しています。

無事webpackが実行されるとスタイルが変更されます。

{:.file-path}
project-name/src/style.scss
```scss
$variable-color: #e06c75;
h1 {
  color: $variable-color;
  font-size: 42px;
}
```

## JSファイル

`src/index.js`には以下の内容を記述します。  
**2行目では、import文を使って、SimpleMDEモジュールを`node_modules`から読み込むように指定しています。**  
また5行目では、SimpleMDEパッケージ内にあるCSSファイルをインポートしています。

7行目から9行目までのコードでSimpleMDEをロードしています。  
最後に、12行目では、Sassファイルを相対パスでimportしています。

**Javascriptファイルの中にCSSやSassも読み込むようにしています。**

{:.file-path}
project-name/src/index.js
```js
// import文でSimpleMDEを読み込む
import SimpleMDE from 'simplemde'

// SimpleMDEのCSSをimport文で読み込む
import 'simplemde/dist/simplemde.min.css'

const simplemde = new SimpleMDE({
  element: document.getElementById('mde')
});

// Sassを相対パスでimport文で読み込む
import "./style.scss"
```

<section class="window info" markdown="block">
Javascriptのimport文の詳しい使い方については下記リンクが参考になるかと思います。  

{:.embed}
[import - JavaScript MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import){:target="_blank"}{:rel="noopener noreferrer"}
</section>

## webpackのインストール


下準備は終わりましたので、これからnpmを使って必要なパッケージをインストールします。  
下記のコマンドを実行します。  

```bash
$ npm install -D webpack webpack-cli @babel/core @babel/preset-env babel-loader css-loader style-loader sass sass-loader mini-css-extract-plugin
```

このインストールには`-D`オプションを付けています。webpackをはじめ今回使用するパッケージは、実際のアプリケーションには使わず、開発環境のみで使用するため`-D`オプションをつけてインストールします。

今のコマンドで以下のパッケージをインストールしました。かなりたくさんあります。`node_modules`内にもとんでもない数のパッケージが入っています...。  
では、どんなパッケージをインストールしたのか見ていきます。

- webpack
- webpack-cli
- @babel/core
- @babel/preset-env
- babel-loader
- css-loader
- style-loader
- sass
- sass-loader
- mini-css-extract-plugin


上記のパッケージのうち、webpack本体は`webpack`と`webpack-cli`です。**webpackに取り込まれたJavascriptやCSSなどのファイルは、一つのJavascriptファイルにバンドルされます。**

`babel`と書かれたパッケージは、[Babel](https://babeljs.io/)というトランスパイラのパッケージです。**Babel**は、ECMAScript6以降の新しい仕様で記述したJavascriptや、TypescriptなどのJavascript拡張言語(スーパーセット)を、現在普及している**ブラウザに互換性のある形式に変換(トランスパイル)してくれるツール**です。  

`css-loader`と`style-loader`は、CSSをバンドルするためのパッケージで、`sass`、`sass-loader`はSassをCSSにトランスパイルするためのパッケージです。  

`mini-css-extract-plugin`は、webpackに取り込んだCSSを、再度CSSファイルとして出力するためのパッケージです。Javascriptと一つにまとめたくない場合などに利用します。


パッケージのインストールを終えた後の`package.json`の内容は以下のようになったかと思います。  
(プロジェクト名やバージョン値は異なっている場合があります。)

{:.file-path}
project-name/package.json
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "simplemde": "^1.11.2"
  },
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/preset-env": "^7.13.10",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.1.3",
    "mini-css-extract-plugin": "^1.3.9",
    "sass": "^1.32.8",
    "sass-loader": "^11.0.1",
    "style-loader": "^2.0.0",
    "webpack": "^5.26.0",
    "webpack-cli": "^4.5.0"
  }
}
```


## webpackのコア機能

**webpackの設定は、先ほど空のファイルとして作成した`webpack.config.js`に記述していきます。**ただその前に、webpackのコア機能となっている**「Entry」「Output」「Loader」「Plugins」**の4つの仕組みを理解することが重要です。

### Entry

**Entryは、エントリポイントを指定する機能です。**エントリポイントとは、webpackがバンドルを行う開始点となるJavascriptファイルのことです。


### Output

**Outputは、バンドルされたファイルの出力先を指定する機能です。**エントリポイントを起点としてバンドルされたファイルが、Outputで指定されたパスとファイル名に出力されます。

### Loader

**Loaderは、パッケージ(モジュール)をはじめとしたフロントエンドのファイルの依存関係を解決し、アプリケーションで利用可能な状態にまとめてくれる、webpackの処理の中核となる機能です。**  
またLoaderには、先ほどインストールした`babel-loader`や`sass-loader`、`style-loader`や`css-loader`のように、様々な種類があります。


### Plugins

Loaderは上述のように、モジュールの変換のための機能ですが、**PluginsはLoaderの機能以外の幅広いタスクを実行できる機能です。**  
これもまた膨大な種類があります。

今回のサンプルでは`mini-css-extract-plugin`がこれにあたります。


## webpack.config.js

ではwebpackの設定ファイルである`webpack.config.js`に内容を記述します。  
非常にたくさんのプロパティがあるため、ここでは一つ一つの細かな解説を割愛しますが、コメントに各機能の簡単な解説を載せています。  
重要なこととして、webpackはローダー機能を、ファイルに書かれた処理を**下から上に**問い合わせて処理します。


{:.file-path}
project-name/webpack.config.js
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
  entry: "./src/index.js",

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

  // どの環境に最適化するかを指定。webはブラウザ環境、es5はECMAScript5です。指定した環境に合わせたトランスパイルを行います。
  target: ["web", "es5"],

};
```

## 実行

これで環境構築は完了しました。実際にwebpackを動作させてみます。  
**webpackの実行には、npmのパッケージ実行コマンドである`npx`コマンドを使ってみます。**

```bash
$ npx webpack
```

実行したらディレクトリ構成を確認してみてください。**`dist`ディレクトリ内に、`main.js`と`style.css`が生成されているかと思います。**

```bash
project-name/
├-- webpack.config.js
├-- src
|   ├-- index.js
|   └-- style.scss
├-- dist
|   └-- index.html
|   └-- main.js
|   └-- style.css
├-- package.json
├-- package-lock.json
└-- node_modules/ 
    └-- 以下略
```

ファイルの生成が確認できたら、**`dist`ディレクトリにある`index.html`を開いてください。下の画像のようなページが表示されたら、webpackが無事動作したことを確認できます。**

![完成形、npmとwebpackを使用してMarkdownエディタのSimpleMDEの画面が表示されました。]({{ '/assets/media/2020-11-29-npm-and-webpack-basics/finish.png' | relative_url }})

## webpackの公式リファレンス

webpackをさらに詳しく知りたい場合については、[公式ドキュメント](https://webpack.js.org/concepts/)を参考にしてください。  

{:.embed}
[webpack](https://webpack.js.org/concepts/){:target="_blank"}{:rel="noopener noreferrer"}

## Watchオプション


開発用のファイルに変更が生じた場合、それを反映させるために手動で`npx webpack`コマンドを実行する必要がありますが、`--watch`オプションをつけるとファイルに変更があった場合すぐに反映させることができます。
監視状態を終了させる場合は`control`(Windowsの場合`Ctrl`) + `C`で停止します。

```bash
npx webpack --watch
```


## npm script

ちなみに`package.json`には任意のコマンドを登録できる`scripts`というオプションがあります。  
予約語は設定できないなどのルールはありますが、下記のように記述することができます。

{:.file-path}
project-name/package.json
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  // scriptプロパティ内に任意のコマンドを指定できます。
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack", // このコマンドはnpm run buildで動作します。
    "watch": "webpack --watch" // 上記のコマンドにwatchオプションを追加したものです。
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "simplemde": "^1.11.2"
  },
  // 以下略

}
```

`npm run スクリプト名`で実行できます。  
上記の`build`スクリプトの場合は、下記のコマンドで実行できます。実行するとWebpackが動作します。

```bash
npm run build
```
