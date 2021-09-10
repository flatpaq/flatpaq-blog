---
layout: post
title:  "ブログやドキュメント作成に便利なMarkdownの書き方"
date:   2020-07-21
categories: web
tags: markdown web note
thumbnail: '/assets/media/2020-07-21-markdown-note/markdown-thumbnail.svg'
---

![ブログやドキュメント作成に便利なMarkdownの書き方のサムネイルイメージ]({{ '/assets/media/2020-07-21-markdown-note/markdown-thumbnail.png' | relative_url }})


## はじめに

> Markdown(マークダウン)は、文書を記述するための軽量マークアップ言語のひとつである。本来はプレーンテキスト形式で手軽に書いた文書からHTMLを生成するために開発されたものである。  
> 
> [Wikipedia](https://ja.wikipedia.org/wiki/Markdown)

HTMLは文書データとしてユニバーサルな規格のひとつであり、WebページやWebアプリの開発だけでなく、ブログ記事を書くことにも利用されますが、記事を書く際にHTMLタグを挿入していくのはなかなか面倒だと思います。    

**Markdown記法は、簡易な記述方法でHTML要素を表現できるため、ドキュメントの作成において非常に便利です。**   
今回の記事では、Markdownの書き方を備忘録を兼ねてまとめます。    


## 基本的な書き方

- 拡張子`.md`でMarkdownファイルとなります。
- ほとんどのテキストエディタにはMarkdownファイルのプレビュー機能がついています。例えば[Visual Studio Code](https://code.visualstudio.com/)の場合は、`.md`ファイルを開いた状態で`shift` + `command`(Windowsの場合`Ctrl`) + アルファベットの`V`キーを同時に押すとビューアが開きます。
- 文章を1行空けて改行すれば段落扱いとなります。HTMLだと`<p>`タグで囲われた状態です。
- 同じ段落内で改行したい場合は、行の末尾に`半角スペース`を**2つ**記入することで、ひとつ下の行が段落内改行となります。
- バックスラッシュ(`\`)をMarkdown記号の前に挿入すると、Markdownを無効化(エスケープ)することができます。

要素(セマンティクス)  | HTMLタグ  | Markdown  |  書き方の例
--|---|---|--
段落  | `<p>`  | 1行開けて改行  |  `1段落目の文章`<br><br>`2段落目の文章`
見出しレベル1  | `<h1>`  | 行頭に`#`を書いて半角スペース  |  `# これは見出しです`
見出しレベル2  | `<h2>` | 行頭に`##`を書いて半角スペース  |  `## これは見出しレベル2です`
見出しレベル3  | `<h3>` | 行頭に`###`を書いて半角スペース  |  `### これは見出しレベル3です`
見出しレベル4  | `<h4>` | 行頭に`####`を書いて半角スペース  |  `#### これは見出しレベル4です`
見出しレベル5  | `<h5>` | 行頭に`#####`を書いて半角スペース  |  `##### これは見出しレベル5です`
見出しレベル6  | `<h6>` | 行頭に`######`を書いて半角スペース  |  `###### これは見出しレベル6です`
箇条書き  | `<ul>`<br>`<li>`  | 行頭に`*`か`+`または`-`を書いて半角スペース  |  `- たまご`<br>`- キャベツ`
番号付き箇条書き  | `<ol>`<br>`<li>`  | 行頭に*数字*と`.`を書いて半角スペース  |  `1. 起きる`<br>`2. 朝食をとる`<br>`3. 散歩する`
引用  | `<blockquote>`  | 行頭に`>`を書いて半角スペース  |  `> Markdown(マークダウン)は、文書を記述するための軽量マークアップ言語のひとつである。`
斜体(強調の場合あり)  | `<em>`  | `*`で文字を囲む  | `*強調しています*`
強調  | `<strong>`  | `**`で文字を囲む  |  `**とても強調しています**`
打ち消し線  | `<del>`  | `~~`で文字を囲む  | `~~打ち消し線~~`
水平線  | `<hr>`   | `-`、`*`、または`_`を3つ以上並べる  | `--------`


<section class="window note" markdown="block">
箇条書きまたは番号付き箇条書きは、`tab`などのインデントを利用して入れ子(ネスト)ができます。 

```markdown
- リスト1
  - リスト1-1
  - リスト1-2
- リスト2
- リスト3
  - リスト3-1
  - リスト3-2
```
</section>

## リンク

リンクは`[リンクテキスト](リンクのURL)`で使用できます。  

```md
[Google](https://www.google.co.jp/)
```

[Google](https://www.google.co.jp/)

## 画像の貼り付け

画像は`![画像の代替テキスト](ファイルパス/ファイル名.拡張子)`で使用できます。  

```md
![A happy new year](img/a-happy-new-year-image.png)
```

## テーブル

```md
| 言語名   | 特徴                |
|:-------:|:------------------ |
| Java    | 一度書けばどこでも動く |
| PHP     | Webアプリ開発に特化   |
```


`|`記号で列(column)を区切ります。  
また、`-`記号を並べて、区切った上の行をテーブルの見出しとして表現します。区切り行には、`-`や`半角スペース`はいくつ挿入されていても表示に影響はありません。  
`-`の隣に付いているコロン(`:`)は、左側のみに記述すると、その列のデータが左揃え表記になり、右側のみに記述すると右揃えになります。  
両側に記述すると中央揃えになります。

上記の例の出力結果は下のようになります。

| 言語名   | 特徴                |
|:-------:|:------------------ |
| Java    | 一度書けばどこでも動く |
| PHP     | Webアプリ開発に特化   |

## コードブロック

コードブロック(`<pre>`要素)を表記する場合は、バッククォート記号3つで、開始と終了の範囲をそれぞれ囲みます。

開始のバッククォート3つの直後に、拡張子またはプログラム言語名を記述すると、そのコードに合わせてシンタックスハイライトが適用されます。

![preのサンプル]({{ '/assets/media/2020-07-21-markdown-note/pre-sample.png' | relative_url }})

```js
window.addEventListener('load', mobileMenu);

function mobileMenu() {

  let mobileMenuBtn = document.querySelector('.mobile-menu');
  let bodyShadow = document.querySelector('.wrapper');
  let sidebarActive = document.querySelector('.sidebar-cont');

  bodyShadow.classList.remove('active');
  sidebarActive.classList.remove('active');

  mobileMenuBtn.addEventListener('click', function() {
    bodyShadow.classList.toggle('active');
    sidebarActive.classList.toggle('active');
  }, false);

};
```

## インラインコード

インラインコード(`<code>`要素)を表現する場合は、開始と終了をバッククォート1つずつで囲います。

```
`ctrl` + `shift` + `alt`
```

`ctrl` + `shift` + `alt`



## 脚注(注釈)

本文中に`[^1]`や`[^example]`のような文字列を挿入すると、ページ末尾に挿入される脚注(注釈)へのリンクを作成できます。

注釈内容は`[^1]:`のあとに記述します。

```
本文に注釈を挿入する。[^1]

数字だけでなく文字列をリンク記号にすることもできますが、最終的に番号に変換されます。[^example]


[^1]: 一つ目の脚注の文章。

[^example]: 最後の脚注の文章。
```

![脚注のサンプル画像]({{ '/assets/media/2020-07-21-markdown-note/footnote-sample.png' | relative_url }})




## チェックボックス

箇条書きの記号(行頭に`*`か`+`または`-`)のあとに、`半角スペース`と`[ ]`を追加するとチェックボックスを表示させることができます。  

`[ ]`の中に`x`(小文字のエックス)を挿入するとチェック済み表示となります。

```
- [x] パン
- [ ] ベーコン
- [ ] レタス
```

出力結果はビューアによって異なりますが、下の画像のようになります。  
TODOリストのように使用できますね。


![チェックボックスの例。xを入力したところにチェックがついている。]({{ '/assets/media/2020-07-21-markdown-note/check-box.png' | relative_url }})


## 数式

お使いのMarkdownの環境によりますが、[Mathjax](https://www.mathjax.org/)などの数式を表記できるJavascriptライブラリを利用すると、Markdownファイルに数式を書き、表示することができます。  
詳しくは割愛します。

