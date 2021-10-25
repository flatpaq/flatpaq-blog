---
layout: post
title:  "Sassの基本的な記法まとめ"
date:   2020-06-27
lastmod: 2021-09-28
categories: web
tags: css sass frontend web
thumbnail: '/assets/media/2020-06-27-sass-basics/sass-basics-thumbnail.png'
---

![sass-basics-thumbnail]({{ '/assets/media/2020-06-27-sass-basics/sass-basics-thumbnail.svg' | relative_url }})


## はじめに

SassはCSS言語の拡張言語です。以下のような特徴があります。

- ファイルをひとつにまとめること(パーシャル)ができる
- 処理を入れ子(ネスト)にできる
- 変数が使用できる
- コードを再利用(継承、ミックスイン)できる
- 1行コメントを使うことができる
- ifやfor、関数などプログラムのような処理ができる
- コードを圧縮できる
- Webフレームワークに標準で組み込まれていることが多い

本記事では個人的によく使用するSassの機能をまとめます。この記事に掲載している内容はSassの持つ機能の極一部ですので、その点についてはご留意ください。

## Sassの注意点

- 環境構築が必要
- ブラウザはSassファイルを読み込むことはできないため、CSSファイルに変換(トランスパイル)する必要がある
- 拡張子は`.sass`ではなく`.scss`を使うのが一般的

## 環境構築

環境構築についてはMacでの方法を記述します。Windowsは割愛します。



<section class="window info" markdown="block">
  <h1>webpackを利用する</h1>

  <p>webpackを利用することでもSassが使えるようになります。また、多くのWebアプリケーションフレームワークではSassあるいはwebpackを簡単に利用できるようになっているため、そうしたフレームワークを使用して開発する場合は、Sassの環境構築はそちらを参考にしてください。</p>

  {:.embed}
  [npmとwebpackを利用してフロントエンド開発環境を構築する]({% link _posts/2020-11-29-npm-and-webpack-basics.md %}){:target="_blank"}{:rel="noopener noreferrer"}

</section>


### Homebrewのインストール

MacではHomebrewを利用してSassの利用に必要なパッケージをインストールします。  
Homebrewのインストールは下記のページを参考にしてみてください。

{:.embed}
[Macのパッケージ管理システム Homebrewを導入する]({% link _posts/2020-06-14-mac-homebrew-setup.md %}){:target="_blank"}{:rel="noopener noreferrer"}


### rbenvのインストール

Rubyのバージョン管理が行える`rbenv`をインストールします。

```bash
$ brew install rbenv
```

`rbenv`のコマンドが利用できるようにパスを通します。  
シェルは`bash`を利用しているため、`.bash_profile`にパスを追記しています。  
シェルが`zsh`の場合は、`.zshrc`に追記してください。

```bash
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

ターミナルを再起動します。
その後下記のコマンドを実行して、バージョン情報が表示されれば`rbenv`は有効になっています。

```bash
$ rbenv -v
```

### Rubyのインストール

下記コマンドでrubyをインストールします。数値はRubyのバージョンとなります。  

```bash
$ rbenv install 2.6.6
```

インストール後、システム全体のRubyのバージョンを変更するために下記コマンドを実行します。


```bash
$ rbenv global 2.6.6
```

下記コマンドを打ち、上記でインストールしたバージョンのRubyが表示されているか確認します。

```bash
$ ruby -v
ruby 2.6.6
```


### Sassのインストール

Sassをインストールします。Rubyの拡張ライブラリであるGemとしてインストールします。

下記コマンドを実行してシステム全体にインストールすることもできますが、`Bundler`というRuby Gemのパッケージ管理ツールを利用して、プロジェクトごとにSassをインストールすることもできます。

```bash
$ gem install sass
```

### BundlerからSassを使う場合

BundlerもGemの一つのため、下記コマンドでインストールします。

```bash
$ gem install bundler
```

インストールできたらプロジェクト用のディレクトリを作成し、移動します。

```bash
$ mkdir sass-sample
$ cd sass-sample
```

下記コマンドを実行すると、プロジェクトディレクトリ内に`Gemfile`というファイルが作成されます。  
このファイル内にプロジェクトで使用するGemを記述します。

```bash
$ bundle init
```

`Gemfile`を開いて、中に`gem 'sass'`と記述して、ファイルを保存します。
その後下記コマンドを実行すると`Gemfile`の内容に応じてSassがインストールされます。  

```bash
$ bundle install
```

これでSassが利用できるようになりました。


## CSSへのトランスパイル(変換)

先述したように、ブラウザはSassファイルを読み込むことができません。そのため、CSSファイルへと変換する必要があります。

拡張子が`.scss`のファイルをCSSに変換するには`sass`コマンドを使います。

```bash
$ sass Sassファイル名:出力するCSSファイル名 オプション
```

変換したいsassファイルと変換後のCSSファイル名をコロン(`:`)で繋げます。  
ファイル名の前に相対パスを表記することで、出力するディレクトリを指定できます。  
オプションは目的に応じて記述します。シンプルに変換するだけなら不要です。

```bash
$ sass test.scss:test.css

# ディレクトリを相対パスで指定する
$ sass src/style.scss:dist/style.css
```

{:.window.note}
`sass`コマンドを`scss`コマンドに置き換えても同じ動作をします。

{:.window.note}
`sass --help`コマンドでヘルプを呼び出せます。


### styleオプション

`--style スタイル名`オプションを利用することで、変換後のCSSの出力形式を指定できます。  
styleオプションは全部で4種類あります。

```bash
sass src/style.scss:dist/style.css --style nested
sass src/style.scss:dist/style.css --style expanded
sass src/style.scss:dist/style.css --style compact
sass src/style.scss:dist/style.css --style compressed

# --styleの省略形として-tを使うこともできます
sass src/style.scss:dist/style.css -t compressed
```

#### nested

Sassはセレクタなどをネスト(入れ子)で記述することができますが、そのネストをインデントで表現した形でCSSに出力されます。  
オプションを指定しなかった場合のデフォルトのスタイルです。

#### expanded

通常のCSSのように、可視性の高いスタイルになります。

#### compact

セレクタとプロパティが1行で表現されます。

#### compressed

インデントや改行、コメント文などをすべて取り除いて圧縮された形で出力されます。  
ファイルサイズが軽量化されます。


### watchオプション

`--watch`オプションをつけて`sass`コマンドを実行すると、対象のSassファイルが監視対象となり、ファイルに変更が加えられるとすぐにトランスパイルを行うようになります。  
`Ctrl` + `C`で監視を終了することができます。

```bash
# 一つのsassファイルの変更を監視
sass --watch src/style.scss:dist/style.css --style expanded

# ディレクトリ内の変更を監視する
sass --watch src:dist --style compressed
```


### シェルスクリプトを使ってトランスパイルする

Sassを使うたびに今までのコマンドを打つのは面倒なので、一連の処理をファイルにまとめてすぐに実行できるようにします。

#### Windows

バッチファイル(`.bat`)を作成して、それをダブルクリックするとSassのトランスパイルが簡単に利用できるようになります。

```bat
::行の先頭にコロンを二つつけた行はコメントになります

::バッチファイルがある場所に移動するコマンドです
cd /d %~dp0

::sassコマンドを記述します
sass --watch src:dist --style compressed
::sass --watch src:dist --style expanded
```

#### Mac

拡張子を`.sh`のファイルを作成することでシェルスクリプトが作成できます。

```sh
#!/bin/sh

cd $(dirname $0)
sass --watch src:dist --style compressed

# この行はコメントになります
# sass --watch src:dist --style expanded
```

`#!/bin/sh`はshebang(シェバン)と呼ばれ、このファイルがシェルスクリプトであることを認識させるための記述です。
`cd $(dirname $0)`は、このシェルスクリプトのあるディレクトリまで移動するという処理です。

ファイルを作成後、以下のコマンドで、このファイルに実行権限をつけます。

```bash
$ chmod u+x sass.sh
```

シェルスクリプトのパスをターミナルで入力すると、シェルスクリプトを実行できます。

```bash
$ ./sass.sh
```

ファイルをダブルクリックで実行したい場合は、`sass.sh`を右クリック -> `情報を見る` -> `このアプリケーションで開く` -> `ターミナル.app`を指定することで利用できます。


## Sassの主な機能


### インポート、パーシャル

CSSにも`@import`文がありますが、Sass独自の*インポート機能*は*パーシャル*と組み合わせて利用することで、CSS変換後のファイルをひとつにまとめることができます。

まず、*パーシャル(partial)*とは、**scssファイル名の先頭にアンダーバー(`_`)をつけることで、そのファイルをCSSに変換しないようにする**機能です。  
`_basic.scss`のように書きます。

パーシャルとして書いた`_basic.scss`はCSSに変換されないため、このままでは書いたスタイルは反映されませんが、`@import`機能を使用することで、**他のSassファイルに取り込まれ、ひとつのファイルにまとめること**ができます。


例として、`_reset.scss`、`_basic.scss`の二つのパーシャルファイルを`main.scss`にまとめる際は下記のように記述します。  
先頭の`_`や`.scss`拡張子を省略して記述します。

{:.file-path}
main.scss
```scss
@import "reset";
@import "basic";
```

インポートされるSassファイルは上から順番に読み込まれます。

<section class="window note" markdown="block">

<h1>インポートのネスト</h1>

`@import`はネストして使うことができます。(ネストの詳しい説明は`ネスト`の項をご覧下さい。) 

```scss
.old-page {
  @import "old-style";
}
```

上記のようにセレクタの中に`@import`文を書くことで、`_old-style.scss`内に記述されたスタイルの、全セレクタの先頭には`.old-page`がつくことになります。CSSに変換すると下記のようになります。

```css
.old-page header {
  padding: 24px;
}
.old-page footer {
  background: #fefefe;
}
```

こうすることで、例えばページのリニューアルを行う際に、古いスタイルと新しいスタイルを切り分けて作業ができるようになります。

</section>


### コメント

Sassファイルには、CSS従来のコメント文だけでなく、一行コメントの`//`が使えます。  

```scss
/* CSS従来のコメント文 */
// Sassのコメント文 この行はコメントアウトされます
```

SassのコメントはCSS変換時に削除されます。CSSの従来のコメント文も、`--style compressed`オプションの場合だと削除されます。


### 変数

プログラミング言語のように、値を変数に格納することができます。

```scss
$変数名: 値;
```

上記のように**先頭に`$`をつけて記述することで、変数を宣言する**ことができます。 
CSSのプロパティと値を定義するような形式で記述することで、値を変数に代入できます。

例えば下記の変数`$white-color`は下記のように利用することができます。


```scss
$white-color: #fff;
.wrapper {
  background: $white-color;
}
```

{:.window.info}
変数は基本的にプロパティの値として参照します。他の部分でも参照したい場合は*インターポレーション*を用いることで変数を参照できるようになります。詳しくは`変数や引数を柔軟に使用する(インターポレーション)`の項をご覧ください。

#### 変数の命名規則

変数名はCSSのClassやID名と同様に命名規則があります。  

- 半角英数字の他にハイフン(`-`)やアンダーバー(`_`)を使用できる
- 日本語などのマルチバイト文字が利用できる
- 変数名の先頭に連続したハイフン(`--`)は使用できない
- 変数名の先頭に半角数字は使用できない


#### 変数のスコープ

変数にはスコープ(適用できる範囲)があります。  
セレクタ内の波括弧(`{}`)で囲んだ中、つまりCSSルールセット内に変数が宣言されていた場合、その変数はその波括弧の外側では参照することができません。

```scss
.sidebar {
  $accent-color: #4c9aee;
}
.main {
  // ここでは$accent-colorを利用できない
  background: $accent-color;
}
```

全体で使用したい変数は`_variable.scss`といったファイルでまとめて宣言しておき、インポートする際には、`_variable.scss`を先頭に記述しておくことで他のSassファイルでも使うことができます。

{:.file-path}
_variable.scss
```scss
$accent-color: #4c9aee;
```

{:.file-path}
main.scss
```scss
@import "variable";
@import "reset";
@import "basic";
```



### ネスト

CSSのルールセットを**ネスト(入れ子)**することができます。


```scss
.box {
  padding: 16px;
  // .boxの中に.buttonセレクタを格納できます
  .button {
    margin: 0px;
  }
  // セレクタ記号を使うこともできます
  + .box {
    padding-bottom: 0px;
  }
  > a {
    text-decoration: none;
  }
}
```

上記のコードをCSSに変換すると下記のようになります。

```css
.box {
  padding: 16px;
}
.box .button {
  margin: 0px;
}
.box + .box {
  padding-bottom: 0px;
}
.box > a {
  text-decoration: none;
}
```

ネストで階層的に表現することでコードの記述量が減り、またメンテナンスもしやすくなります。




### 親セレクタを柔軟に参照できるアンパサンド

**アンパサンド(`&`)記号を使用することで、親セレクタを呼び出す位置を指定**することができます。  
下記のコードをご覧ください。

```scss
.tag a {
  background-color: #f3f0e5;
  &:hover {
    background-color: #ffe484;
  }
  header & {
    background-color: #81d3e6;
    color: #fefefe;
  }
}
```

CSSに変換するとこのようになります。

```css
.tag a {
  background-color: #f3f0e5;
}
.tag a:hover {
  background-color: #ffe484;
}
header .tag a {
  background-color: #81d3e6;
  color: #fefefe;
}
```

`&`記号を使って`.tag a`セレクタを呼び出す場所を、柔軟に設定できることがわかります。


### ミックスイン

**ミックスイン(mixin)とは、スタイルの集合体をあらかじめ定義しておき、任意の場所で呼び出すことができる機能**です。  
スタイルの再利用性を高めることができます。またメンテナンスも容易になります。

ミックスインの定義は下記のように行います。

```
@mixin ミックスイン名 {
  スタイルの集合体
}
```

ミックスイン名の命名規則は変数と同様になります。

ミックスインを呼び出す際は`@include ミックスイン名;`と記述します。

```scss
// ミックスインの定義
@mixin indication {
  padding: 2px 8px;
  border-radius: 7px;
  color: #1b2b3c;
  margin: 0px 12px 16px 0px;
  display: inline-block;
  width: auto;
  line-height: 2;
}
// ミックスインの呼び出し
.user-status {
  @include status-indication;
  span {
    color: #a3abb4;
  }
}
.admin-status {
  @include status-indication;
}
```

CSSに変換すると以下のコードになります。

```css
.user-status {
  padding: 2px 8px;
  border-radius: 7px;
  color: #1b2b3c;
  margin: 0px 12px 16px 0px;
  display: inline-block;
  width: auto;
  line-height: 2;
}
.user-status span {
  color: #a3abb4;
}
.admin-status {
  padding: 2px 8px;
  border-radius: 7px;
  color: #1b2b3c;
  margin: 0px 12px 16px 0px;
  display: inline-block;
  width: auto;
  line-height: 2;
}
```


また、ミックスインで定義するスタイルの集合体は、プロパティと値のルールセットだけではなく、セレクタを含むスタイルも定義できます。

```scss
@mixin window {
  .window {
    padding: 16px;
  }
}
```


#### ミックスインに引数を渡す

ミックスインには**引数**を渡すことができます。

```scss
@mixin ミックスイン名($引数名) {
  ルールセット
}
```

引数名の命名規則も変数と同様になります。

```scss
@mixin indication($margin-value) {
  padding: 2px 8px;
  border-radius: 7px;
  color: #1b2b3c;
  margin: $margin-value;
  display: inline-block;
  width: auto;
  line-height: 2;
}
```

呼び出す際は`@include ミックスイン名(引数の値);`と記述します。

```scss
@include ミックスイン名(引数の値);
```


```scss
section {
  @include indication(0px 12px 16px 0px);
}
```

上記の例をCSSに変換すると下記になります。

```css
section {
  padding: 2px 8px;
  border-radius: 7px;
  color: #1b2b3c;
  margin: 0px 12px 16px 0px;
  display: inline-block;
  width: auto;
  line-height: 2;
}
```


#### 引数の初期値

引数名のあとにコロン(`:`)を使うことで引数の初期値を設定することができます。

```scss
@mixin indication($margin-value: 0px 12px 16px 0px) {
  padding: 2px 8px;
  border-radius: 7px;
  color: #1b2b3c;
  margin: $margin-value;
  display: inline-block;
  width: auto;
  line-height: 2;
}
```

#### 引数を複数用意する

引数を複数用意するには引数同士をカンマ(`,`)でつなげます。

```scss
@mixin indication($padding-value: 2px 8px, $margin-value: 0px 12px 16px 0px) {
  padding: $padding-value;
  border-radius: 7px;
  color: #1b2b3c;
  margin: $margin-value;
  display: inline-block;
  width: auto;
  line-height: 2;
}
```

#### 可変長引数(残余引数)

プロパティには値にカンマを使うものがあります。そうした値を引数として使おうとすると、引数が複数個指定してあるものと認識してしまいエラーとなります。  
そのような場合は、引数名の末尾にドットを三つつける(`...`)と、可変長の引数として宣言でき、エラーを起こさず使用できます。

```scss
@mixin window-shadow($shadow-value...) {
  box-shadow: $shadow-value;
}
section {
  @include window-shadow(0px 6px 0px 0px #ececec, 0px 7px 1px 0px #ececec);
}
```


#### ミックスインの中に自由な領域を作る コンテントブロック


ミックスインの各呼び出し先で*自由に展開できる領域を作る*ことができる**コンテントブロック**という機能があります。

説明ではわかりづらいため、下記の例をご覧ください。  

```scss
$xl: 1200px;
$lg: 992px;
$md: 768px;
$sm: 576px; 

@mixin xl {
  @media (min-width: ($xl)) {
    @content;
  }
}
@mixin lg {
  @media (min-width: ($lg)) {
    @content;
  }
}
@mixin md {
  @media (min-width: ($md)) {
    @content;
  }
}
@mixin sm {
  @media (min-width: ($sm)) {
    @content;
  }
}

.window {
  margin: 16px;
  @include lg {
    margin: 0px;
  }
}
```

上記のコードは、ブレイクポイントごとの調整を、ミックスインを利用してメンテナンス性を高めたものです。  

まず、変数を4つ`$xl`、`$lg`、`$md`、`$sm`宣言して、メディアクエリ(`@media`)で使用するレスポンシブのサイズを宣言しています。  
そして4つのミックスインを定義して、その内部に先ほど宣言した変数を用いてメディアクエリ`@media`を定義して、4つのブレイクポイントを設定しています。  
さらにその中に`@content`を記述しています。ここが各呼び出し先で自由に展開できる領域となります。  

そして、**`@include ミックスイン名`で呼び出した際に、通常の呼び出し方とは違い`@include ミックスイン名`のあとに波括弧(`{}`)を用いてスタイルを記述しています。このスタイルが`@content`を定義した箇所に適用**されます。

上の例では`.window`はブレイクポイント992px以上だと`margin`が`0px`になり、992px未満だと`margin`が`16px`になるように書いています。  
下が変換のCSSです。

```css
.window {
  margin: 16px; 
}
@media (min-width: 992px) {
  .window {
    margin: 0px; 
  } 
}

```


### 変数や引数を柔軟に使用する(インターポレーション)

変数や引数は、基本的にプロパティの値として使いますが、値の一部として用いたり、セレクタとして利用したいといったことがあるかと思います。そうした場合は*インターポレーション*を利用することで変数や引数を様々な箇所に呼び出せるようになります。


インターポレーションは変数や引数を`#{$変数名}`の形にすることで使用できます。

下記の例ではミックスインの引数をセレクタの一部に用いています。

```scss
@mixin window($model) {
  h1 {
    margin: 0px;
  }
  .#{$model}-window-heading {
    margin-bottom: 32px;
  }
  .#{$model}-window-close-button {
    width: 120px;
  }
}

.tag-select-window {
  @include window(tag-select);
}
```


### 継承

継承はスタイルの再利用ができるという点ではミックスインと似た機能ですが、他のセレクタを呼び出すこと、引数が使えないこと、またトランスパイル後のセレクタのまとまり方が異なるなど、いくつか違いがあります。

継承は`@extend セレクタ名;`で、**他のセレクタが持っているスタイルを再利用**することができます。

```scss
.window {
  padding: 16px;
  .heading {
    font-size: 2rem;
  }
}
.box {
  @extend .window;
}
```

`.window`クラスを`.box`が継承しています。  
このコードをCSSに変換すると下記になります。

```css
.window, .box {
  padding: 16px;
}
.window .heading, .box .heading {
  font-size: 2rem;
}
```

**ミックスインとは違い、各セレクタごとにスタイルが出力されずにグルーピング**されています。  
しかも、**継承元の`.window`がネストで指定していた`.heading`クラスも`.box`クラスに継承されています。**

#### 継承で利用できないセレクタ

通常の要素セレクタをはじめ`.class`や`#id`、`.class1.class2`などの連結セレクタなど色々なセレクタを継承に利用することができますが、*空白があるセレクタ指定のものは継承に使用することができません。*

下記は継承に使用できないセレクタの例です。

```scss
.window p {
  // 子孫セレクタ
}
main > article {
  // 子セレクタ
}
p + ol {
  // 隣接セレクタ
}
h2 ~ h3 {
  // 間接セレクタ
}
```

また、**メディアクエリのブロック内部から、メディアクエリの外側にあるセレクタを継承することはできません。**


#### 継承の雛型

ミックスインの定義のように継承の雛型をあらかじめ作成しておくこともできます。

雛型を作成するには、*セレクタ名の先頭にパーセント(`%`)*を付けます。

```scss
%window {
  padding: 16px;
}
.box {
  @extend %window;
}
```

この雛型自体はCSSに変換された際には残りません。ミックスインのように使用することができます。



### 関数

関数は非常にたくさんの種類が用意されていますが、ここでよく使うものをピックアップします。

#### lighten

指定した基準色から明るい色を作れます。どれくらい明るくするかは、第2引数にパーセントで指定します。

```scss
.alert {
  border-left: 4px solid #ec6f6b;
  background: lighten(#ec6f6b, 20%);
}
```


#### darken

指定した基準色から暗い色を作れます。どれくらい暗くするかは、第2引数にパーセントで指定します。

```scss
.button {
  background: #4c9aee;
}
.button:hover {
  background: darken(#4c9aee, 20%);
}
```

#### mix

二つの色の中間色が作成できます。色を混ぜる割合を第3引数にパーセントで指定します。

```scss
.gray {
  background: mix(#000, #fff, 50%);
}
```


<section class="window note" markdown="block">
# 関数を自作することもできる

下記のように自作関数を定義して使うこともできます。

```scss
@function 関数名($引数名) {
  @return 戻り値;
}
```
</section>



### 制御構文

Sassはプログラミング言語のように制御構文を用いてスタイルを指定することができます。いくつかの制御構文を紹介します。

#### if

```scss
@if 条件式 {
  スタイル
}
@else if 条件式 {
  スタイル
}
@else {
  スタイル
}
```

#### for

for文には`through`を用いるものと`to`を用いるものがあります。

```scss
@for $カウンタ変数名 from 開始の数値 through 終了の数値 {
  スタイル
}
```

`through`を用いた場合は、終了の数値までを含んで繰り返します。


```scss
@for $カウンタ変数名 from 開始の数値 to 終了の数値 {
  スタイル
}
```

`to`の場合は、終了の数値未満まで繰り返します。

```scss
@for $i from 1 to 4 {
  .margin-#{$i * 16} {
    margin-bottom: 16px * $i;
  }
}
```

上のコードをCSSに変換すると下記になります。

```css
.margin-16 {
  margin-bottom: 16px; 
}
.margin-32 {
  margin-bottom: 32px; 
}
.margin-48 {
  margin-bottom: 48px; 
}
```

#### each

`each`も`for`同様繰り返しの制御構文ですが、`$変数`に配列(リスト)やマップ型変数を格納しておき、それらから要素を順番に取り出して処理するのに向いています。

```scss
@each $ブロック内変数名 in $配列名 {
  スタイル
}
```

```scss
// 配列(リスト)
$変数名: 値, 値, 値;

// マップ型変数
$変数名: (
  キー: 値,
  キー: 値,
  キー: 値
)
```

下記の例では、レイアウトごとの背景色をマップ型変数で管理しており、それらを`each`文でまとめてスタイリングしています。

```scss
$layout-color: (
  'wrapper': #f6f7f7,
  'header': #fefefe,
  'main': #fefefe,
  'sidebar': #f8fafa,
  'footer': #2f495e,
);
@each $layout, $color in $layout-color {
  .#{$layout} {
    background-color: $color;
  }
}
```

上記のコードをCSSに変換すると下記になります。

```css
.wrapper {
  background-color: #f6f7f7;
}

.header {
  background-color: #fefefe;
}

.main {
  background-color: #fefefe;
}

.sidebar {
  background-color: #f8fafa;
}

.footer {
  background-color: #2f495e;
}
```




