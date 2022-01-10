---
layout: post
title:  "コードや英文の写経に適したタイピングゲームを作りました"
date:   2021-04-12
lastmod: 
categories: web
tags: javascript web frontend app
thumbnail: '/assets/media/2021-04-12-typing-game-made-with-javascript/typingforge-logo.png'
---

{:.img-border}
![Typingforgeのサムネイル]({{ '/assets/media/2021-04-12-typing-game-made-with-javascript/typingforge-logo.svg' | relative_url }})


## はじめに


タイトルにある通り、コードや英文の写経に適したタイピングゲームを作りました。  
ご自身のPCに保存されているテキストファイルを選択して、それをタイピングゲームのように打ち込むことができます。  

注意点として、日本語などのマルチバイト文字は使用できません。マルチバイトの文字は、ファイルをアップロードした際に空白に変換されます。  
また、個人の趣味で開発したものですので、使用については自己責任でお願いします。

## サンプルとコード

下記リンクで試すことができます。

{:.embed}
[Typingforge sample]({{ '/samples/typingforge/' | relative_url }}){:target="_blank"}{:rel="noopener noreferrer"}

非常にシンプルなJavaScriptで書いています。Webサービスではないので、アップロードされたファイルの中身が他者に知られることはありません。

コードをGithubに載せています。`dist`ディレクトリ以下に完成品をまとめています。ご自身のローカル環境で使用したい場合はこちらをご利用ください。

{:.embed}
[Typingforge Github](https://github.com/flatpaq/typingforge){:target="_blank"}{:rel="noopener noreferrer"}


## 使い方

トップ画面を開くと、画面右上部に3つアイコンが並んでいますが、左からそれぞれ

- テキストファイルを選択するボタン
- 現在タイピングしているテキストを、最初の一文字目からやり直すボタン
- ライトテーマとダークテーマの切り替えボタン

となっています。

{:.img-border}
![Typingforgeのトップ画面]({{ '/assets/media/2021-04-12-typing-game-made-with-javascript/typingforge-screenshot-top.png' | relative_url }})


ファイルをアップすると、画面中央部に、アップしたテキストが表示されます。  
テキストが表示されているエリアをクリックするとタイピングを始めることができます。

{:.img-border}
![Typingforgeのプレイ中の画面]({{ '/assets/media/2021-04-12-typing-game-made-with-javascript/typingforge-screenshot-play.png' | relative_url }})



全ての文字を打ち終えると、最初の一文字目を打った時間から、最後の文字を打ち終わるまでのタイムが表示されます。

![Typingforgeのタイピング終了後、タイムが表示される]({{ '/assets/media/2021-04-12-typing-game-made-with-javascript/typingforge-screenshot-finished.png' | relative_url }})


## 所感

タイプを間違えた際に音を鳴らすようにしていますが、発音タイミングが若干遅れてしまうのでそれをなんとかしたいなと思います。  

あと、当初はElectronなどを利用してネイティブアプリ化しようかと思いましたが、試作感が溢れるためとりあえず動く形で公開しました。

