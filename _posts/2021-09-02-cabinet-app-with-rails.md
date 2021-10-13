---
layout: post
title: "Markdownをツールバー付きのエディタで編集できる、社内向け情報共有ツールを作りました"
date: 2021-09-02
lastmod: 2021-10-13
categories: web
tags: ruby rails web backend app
thumbnail: '/assets/media/2021-09-02-cabinet-app-with-rails/cabinet-thumbnail.png'
---

![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/cabinet-thumbnail.svg' | relative_url }})

## はじめに

Markdownをツールバー付きのエディタで編集できる、社内向け情報共有ツールを作りました。  
バックエンドのシステムはRuby on Railsで開発しています。

コードは下記で公開しています。  
まだまだ足りない部分がたくさんありますが、ひとまず公開して、今後も少しずつ手を入れていきたいと思います。

{:.embed}
[Cabinet Github](https://github.com/flatpaq/cabinet){:target="_blank"}{:rel="noopener noreferrer"}

## 主な機能の紹介


### 記事の投稿・編集

記事をMarkdownツールバー付きのエディタで投稿・編集できます。  


{:.img-border}
![Cabinet 記事の編集中の画面]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/articles-edit.png' | relative_url }})


公開状態を`公開`にして投稿すると、ログインしているユーザー全員がその記事を読むことができます。

{:.img-border}
![Cabinet 記事を閲覧中の画面]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/articles-show.png' | relative_url }})

{:.img-border}
![Cabinet 記事を閲覧中の画面]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/articles-show-2.png' | relative_url }})


### 画像の投稿

画像はエディタにドラッグ&ドロップすると挿入できます。


{:.img-border}
![Cabinet 画像をドラッグアンドロップで投稿する動画]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/image-drop.gif' | relative_url }})


### 記事の閲覧・編集権限の設定

ひとつの記事ごとに、閲覧できるユーザーや、編集できるユーザーを指定することができます。  
また、ユーザー単位で選択できるほか、任意のユーザーをまとめたグループ単位でも選択することができます。


![Cabinet 読み取り権限の設定画面]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/readable-article-group-assignments.png' | relative_url }})


### トップページ

トップページは誰でも自由に編集ができるようになっています。各記事へのリンクを貼り付けるなど、多様な使い方ができます。

{:.img-border}
![Cabinet トップページ]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/articles-top.png' | relative_url }})




### 更新履歴から記事内容の復元

記事の内容を更新履歴から復元することができます。  

![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/history.png' | relative_url }})


### 記事の検索

記事をキーワード検索することができます。複数の単語を入れて絞り込み検索をすることも可能です。

### 記事の下書き

記事を下書きとして保存することもできます。下書きとなっている記事は他のユーザーに見られることはありません。

### ゴミ箱

削除した記事はゴミ箱に入りますが、いつでも取り出すことができます。ゴミ箱に入れた記事は他のユーザーに見られることはありません。





### タグによる記事の紐付け

タグを作成して記事を関連付けることができます。

![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/articles-edit-tags-checkboxes.png' | relative_url }})


### いいね機能

記事に対していいねボタンを押すことができます。


### ユーザーとグループ

管理者権限のあるユーザーが新規ユーザーを作成することができます。

また、任意のユーザーをまとめたグループを作成することができます。  
グループは誰でも作成できます。  

{:.img-border}
![Cabinet グループのメンバー選択画面]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/groups-select-members.png' | relative_url }})



## ER図

ER図は下記のようになっています。

![CabinetのER図]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/cabinet-er.svg' | relative_url }})


## その他スクリーンショット

### ログイン画面

![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/login.png' | relative_url }})


### 記事一覧画面

{:.img-border}
![Cabinet 記事一覧の画面]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/articles-index.png' | relative_url }})


### ヘッダーメニュー

{:.img-border}
![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/header-menu.png' | relative_url }})


### ユーザー詳細画面

{:.img-border}
![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/users-show.png' | relative_url }})

### ユーザー編集画面


{:.img-border}
![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/users-edit.png' | relative_url }})

### ユーザー一覧

{:.img-border}
![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/users-index.png' | relative_url }})


### モバイル環境での表示

{:.img-border}
![Cabinetのサムネイル]({{ '/assets/media/2021-09-02-cabinet-app-with-rails/mobile.png' | relative_url }})






