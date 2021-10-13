---
layout: post
title:  "Macのパッケージ管理システム Homebrewを導入する"
date:   2020-06-14
lastmod: 2020-09-17
categories: web
tags: mac homebrew web
thumbnail: '/assets/media/2020-06-14-mac-homebrew-setup/mac-homebrew-setup-thumbnail.png'
---


## はじめに

*Homebrew*とは、macOSで利用できる代表的なパッケージ管理システムです。Homebrewのリモートリポジトリ(オンライン上にあるソフトウェアの集積場所)から、様々なソフトウェアを`brew`コマンドを用いてインストールでき、インストールしたソフトウェアのアップデートやアンインストールなどを一元管理することができます。   

Homebrewは様々なソフトウェアを利用することができますが、特にプログラミング環境の構築に利用されることが多いです。例えばPHPやNode.js、Gitなどのインストールや管理にも使われています。  
HomebrewはMacでプログラミングする上で重要なツールと言えます。

また、Homebrewは基本的にコマンドラインを用いたソフトウェアの管理システムですが、*Homebrew Cask*という機能を使えば、グラフィカルなアプリケーションのインストールや管理もHomebrewで可能です。

**Homebrewを導入するためにはXcodeのコマンドラインツールが必要です。**あまり手順は多くありませんが、簡単な使い方を含めて備忘録としてまとめます。  

導入までの手順は以下の通りです。

1. `Xcode`のインストール
2. `Command Line Tools for Xcode`の設定
3. `Homebrew`のインストール

{:.window.note}
Xcode本体をインストールせず、Command Line Toolsのみをインストールする選択肢もあります。それについては後述の**Xcodeをインストールしない場合**からご覧ください。

## Xcodeのインストール

まずはApp Storeから*Xcode*をインストールします。  

{:.embed}
[Xcode - App Store](https://itunes.apple.com/jp/app/xcode/id497799835?mt=12){:target="_blank"}{:rel="noopener noreferrer"}

## Command Line Tools for Xcodeの設定

インストールしたら`Xcode`を起動します。起動後に表示されるウェルカムボードに、インストールされたXcodeの*バージョン情報*が表示されているのを確認してください。  

![Xcodeのウェルカムボード]({{ '/assets/media/2020-06-14-mac-homebrew-setup/xcode-welcome.png' | relative_url }})

それを踏まえて、画面左上のメニューバーの`Xcode` -> `Preferences...` -> `Location`タブを開くと、`Command Line Tools`のバージョン情報が書いてあります。  
**これがウェルカムボードに記載されていたXcodeのバージョンと同じかどうか確認します。**  
もし何も書いてない場合、プルダウンメニューから、ウェルカムボードに記載されていたXcodeのバージョンを選択できればOKです。  

{:.window.note}
同じバージョンの選択肢がない場合、Xcodeをアップデートすると選択肢が表示されるかもしれません。

![Command Line Toolsの設定]({{ '/assets/media/2020-06-14-mac-homebrew-setup/Command-Line-Tools.png' | relative_url }}) 

**これでXcodeでの作業は終わりです。**Xcodeを終了して構いません。

## Xcodeをインストールしない場合

Homebrewに必要なのはXcode本体ではなく、Xcodeに付属している*Command Line Tools*です。  
*Homebrewを使いたいけどXcodeはインストールしたくない*という場合のために、**Command Line Toolsのみをインストールできます。** 

`ターミナル`を開き、下記コマンドを実行します。

```bash
$ xcode-select --install
```

ポップアップウィンドウが表示された場合、`インストール`をクリックします。

インストール後、下記の`xcodebuild -version`コマンドでバージョン情報が表示されればインストール成功です。  
以降**Homebrewのインストール**へ続きます。

```bash
$ xcodebuild -version
Xcode 10.1
Build version 10B61
```

## Homebrewのインストール

`ターミナル`を開きます。  
下記リンクのHomebrewの公式サイトへアクセスします。トップページの`インストール`欄に書いてあるスクリプトをコピーして、`ターミナル`上に貼り付けて実行します。するとインストールが始まります。  
**インストール用のスクリプトは変更される可能性がありますので、必ず公式サイトから取得するようにしてください。**

{:.embed}
[Homebrew — macOS 用パッケージマネージャー](https://brew.sh/index_ja.html){:target="_blank"}{:rel="noopener noreferrer"}

![Homebrew Screen shot]({{ '/assets/media/2020-06-14-mac-homebrew-setup/homebrew-screen-shot.png' | relative_url }})

インストール途中、`Press　RETURN to Continue or any other key to abort`と表示されるので、`Return`キーを押します。  
Passwordを求められた場合は、お使いのmacのログイン用のパスワードを記入します。

インストールできたかどうかを`brew -v`コマンドで確認します。  
下記のようにバージョン情報が表示されれば、無事インストール完了です。


```bash
$ brew -v
Homebrew 1.5.4
Homebrew/homebrew-core (git revision e9cc; last commit 2018-02-16)
```

## Homebrewの使い方

### パッケージのインストール

Homebrewでパッケージをインストールするには、`brew install`コマンドを使います。  
`brew install`のあとに、インストールしたいパッケージ名を記述します。

```bash
$ brew install パッケージ名
```

例として、*PostgreSQL*をインストールする場合は下記になります。

```bash
$ brew install postgresql
```

{:.window.note}
Homebrewでは、パッケージのことをFormulaeと呼びます。  
インストール可能なFormulaeのリストは公式サイトに掲載されています。

{:.embed}
[Homebrew Formulae](https://formulae.brew.sh/){:target="_blank"}{:rel="noopener noreferrer"}

### パッケージのアンインストール

パッケージをアンインストールするには、`brew uninstall`コマンドを使用します。

```bash
$ brew uninstall パッケージ名
```

### アップデート、アップグレード

Homebrewのアップデート、アップグレードを行います。

```bash
$ brew update
$ brew upgrade
```

`brew update`コマンドは、Homebrew本体の更新と、インストールしたパッケージの最新情報の取得(更新はしない)を行います。  
`brew upgrade`コマンドは、インストールしたパッケージの更新を行います。  

下記のように、パッケージ名を指定して、パッケージごとに更新することもできます。

```bash
$ brew upgrade postgresql
```

### Homebrew Doctor

`brew doctor`という、Homebrewの問題をチェックしてくれるコマンドがあります。  
これを実行して、`Your system is ready to brew.`と表示されれば、問題なく使用可能という状態です。  

```bash
$ brew doctor
Your system is ready to brew.
```

`brew docotor`コマンドを実行後、何らかのエラーメッセージが表示された場合、大抵はアップデートやアップグレードで解消しますが、それでもエラーが表示される場合は、エラーメッセージを手がかりに対応していきます。

### インストールしたパッケージのリストの表示

`brew list`コマンドで、インストールしたパッケージ一覧を表示できます。

```bash
$ brew list
```

### パッケージの情報を見る

`brew info`コマンドで、パッケージの情報を見ることができます。

```bash
$ brew info パッケージ名
```

以下の例では、WebサーバのApacheの情報を見ることができます。

```bash
$ brew info httpd

httpd: stable 2.4.43 (bottled)
Apache HTTP server
https://httpd.apache.org/
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/httpd.rb
==> Dependencies
Required: apr ✔, apr-util ✔, brotli ✔, nghttp2 ✔, openssl@1.1 ✔, pcre ✔
==> Caveats
DocumentRoot is /usr/local/var/www.

The default ports have been set in /usr/local/etc/httpd/httpd.conf to 8080 and in
/usr/local/etc/httpd/extra/httpd-ssl.conf to 8443 so that httpd can run without sudo.

To have launchd start httpd now and restart at login:
  brew services start httpd
Or, if you don't want/need a background service you can just run:
  apachectl start
```

### サービスの開始

Homebrewでインストールしたパッケージの中には、Macのバックグラウンドサービスとして実行できるものがあります。  
サービスを起動させるには`brew services start`コマンドを使用します。

```bash
$ brew services start パッケージ名
```

下記の例では、先ほどインストールしたPostgreSQLのサービスを起動させます。

```bash
$ brew services start postgresql
```

### サービスの停止

サービスを停止させる場合は、`brew services stop`コマンドを使用します。

例では、先ほどインストールし起動させたPostgreSQLサーバを停止させます。

```bash
$ brew services stop postgresql
```

### サービスの状況確認

`brew services list`コマンドで、サービスの状況を確認できます。  
下記の例では、phpは起動しており、PostgreSQLサーバは停止していることがわかります。

```bash
$ brew services list
Name       Status  User    Plist
php@7.2    started ユーザ名 /Users/ユーザ名/Library/LaunchAgents/homebrew.mxcl.php@7.2.plist
postgresql stopped
```

### ヘルプ

`brew help`や`brew commands`といったコマンドで、他にどんな機能があるか表示することができます。  
詳しい使い方は公式サイトをご確認ください。

{:.embed}
[Homebrew — macOS 用パッケージマネージャー](https://brew.sh/index_ja.html){:target="_blank"}{:rel="noopener noreferrer"}

### Homebrew Taps

*Homebrew Taps*は、Homebrewの公式リポジトリ*以外*のパッケージをFormulaeとしてインストールできる機能です。

```bash
$ brew tap 追加するリポジトリのユーザ名/追加するリポジトリ
```

`brew tap`コマンドでリポジトリを追加できたら、Homebrewのパッケージのように利用できます。  
パッケージをインストールする場合は、通常のパッケージのように`brew install`コマンドでできます。

何のリポジトリを追加したかは、そのまま`brew tap`コマンドを実行すればリスト表示されます。

詳しくは公式サイトのドキュメントをご覧ください。

{:.embed}
[Homebrew Taps](https://docs.brew.sh/Taps){:target="_blank"}{:rel="noopener noreferrer"}

### Homebrew Cask

{:.window.info}
2021年2月にCaskのインストール方法が変更になったようです。

Homebrewは基本的にCLI(コマンドラインインターフェース)を用いたソフトウェアの管理システムですが、GUI(グラフィカルユーザインターフェース)アプリもHomebrewからインストールや管理のできる機能があります。それが*Homebrew Cask*です。

例えば、Google Chrome、Atom、SlackといったアプリもHomebrew Caskから利用できます。  

下記のコマンドで、テキストエディタのAtomをインストールできます。

```bash
$ brew install atom --cask
```

詳しくは公式のGithubページをご覧ください。

{:.embed}
[Homebrew Cask](https://github.com/Homebrew/homebrew-cask){:target="_blank"}{:rel="noopener noreferrer"}

