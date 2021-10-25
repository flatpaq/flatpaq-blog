---
layout: post
title:  "ひとまず始めるTypescript"
date:   2021-02-12
lastmod: 2021-10-24
categories: web
tags: javascript web frontend typescript
thumbnail: '/assets/media/2021-02-12-getting-started-with-typescript/getting-started-with-typescript-thumbnail.png'
---


![ひとまず始めるTypescriptのサムネイル]({{ '/assets/media/2021-02-12-getting-started-with-typescript/getting-started-with-typescript-thumbnail.png' | relative_url }})




型注釈やクラス、インターフェースなど、javascriptをより強力にするスーパーセットであるTypescriptを書き始めるにあたって、最低限これだけ押さえておけばひとまず大丈夫かなというそんな備忘録です。

Javascriptの説明については省略しています。

Typescriptの環境構築については下記の記事を参考にしてください。

<section class="card-embed">

  <a href="{% link _posts/2021-01-07-typescript-setup.md %}" target="_blank" rel="noopener noreferrer">

  <div class="row nopad">

  <div class="card-embed-img-area col-sm-5">
    <div class="card-embed-img" style="background-image: url('{{ '/assets/media/2021-01-07-typescript-setup/typescript-setup-thumbnail.svg' | relative_url }}');">   
    </div>
  </div>

  <div class="card-embed-heading-area col-sm-7 order-sm-first">
    <h1>Typescriptのセットアップ</h1>
  </div>

  </div>

  </a>
</section>


## 基本型 number、string、boolean

変数にデータ型を定義する場合は、変数宣言の際に`let 変数名: データ型 = 値;`と記述します。  
これを**型注釈(Type Annotation)**と呼びます。  
定数`const`の際も同じように`const 変数名: データ型 = 値;`と書きます。

基本のデータ型は真偽値、数値、文字列の3種類です。

```ts
// 真偽値を扱うboolean型
let flag: boolean = true;

// 数値を扱うnumber型
let value: number = 12;

// 文字列を扱うstring型
let word: string = "abc";
```


## 配列

配列の場合は`let 変数名: データ型[] = [値1, 値2, ...]`と宣言します。

```ts
// 文字列の配列の場合
let words: string[] = ["a", "b"];

// 数値の配列の場合
let luckyNumbers: number[] = [1033, 1046];
```

## any

`any`型を指定すると、どんなデータ型の値でも設定することができます。

```ts
let a: any = "abc";
```

便利な注釈方法ですが、Typescriptを使う意義が薄れてしまうためあまり乱用すべきではないでしょう。


## 型変換

当初に注釈したデータ型から異なる型に変換したい場合があります。その際は型変換を用います。

型変換には2種類の方法があります。

1. `<変換したいデータ型>変数名`
2. `変数名 as 変換したいデータ型`

```ts
// any型で変数hogeを定義
let hoge: any = "1";

// 1つ目の変換方法で、変数hogeをnumber型に変換して変数numAに格納
let numA: number = <number>hoge;

// 2つ目の変換方法で、変数hogeをnumber型に変換してnumBに格納
let numB: number = hoge as number;
```

2つの方法のどちらを使うかについては、例えばJSXでは1つ目の方法で書くことはできないなど、環境によって適切な方を選ぶ必要があります。


## 関数

関数には引数と戻り値にそれぞれデータ型を宣言できます。

```ts
function 関数名(引数: データ型): 戻り値のデータ型 {
  // 関数の処理
}
```

下記は、配列に格納された数値をすべてを合計する関数の例です。

```ts
// 配列に数値を格納する
let numberArray: number[] = [10, 20, 50];

// 引数に配列型を、戻り値にnumber型をそれぞれ型注釈する
function sum(arr: number[]): number {
  let sumValue: number = 0;
  for(let i = 0; i < arr.length; i++) {
    sumValue += arr[i];
  }
  return sumValue;
}

// 関数の実行
console.log(sum(numberArray));
// 80
```


アロー関数も同じように宣言できます。

```ts
// 配列に数値を格納する
let numberArray: number[] = [10, 20, 50];

// 引数に配列型を、戻り値にnumber型をそれぞれ型注釈する
const sum = (arr: number[]): number => {
  let sumValue: number = 0;
  for(let i = 0; i < arr.length; i++) {
    sumValue += arr[i];
  }
  return sumValue;
}

// 関数の実行
console.log(sum(numberArray));
// 80
```


戻り値がない関数の場合は、戻り値のデータ型に`void`を宣言することができます。

```ts
function 関数名(引数: データ型): void {
  // 関数の処理
}
```



## オブジェクト

以下のようなオブジェクトに型注釈を行う場合、変数の宣言とは方法を変える必要があります。

```ts
let animal = {
  id: 1, 
  name: "きりん"
}
```

まずは、上記の`animal`オブジェクトを引数にして、idとnameをコンソールに出力する関数を例にしてみます。

```ts
// 関数の定義
function printName(animal: {id: number, name: string}) {
  console.log(animal.id);
  console.log(animal.name);
}

// 先ほどのオブジェクト
let animal = {
  id: 1, 
  name: "きりん"
};

// 関数の実行
printName(animal);
// 1
// きりん
```

上記のコードでは、引数の定義部分で`animal`オブジェクトの型注釈を行なっています。  
オブジェクトの規模によりますが、引数の定義部分にプロパティとデータ型をひとつずつ書いていくのはなかなか面倒ですし、何より可読性が悪くなってしまいます。  
そこで*インターフェース*を利用してオブジェクトの型を定義してみます。

## インターフェース

インターフェースは、オブジェクトやクラスの構造自体の定義をするための機能です。インターフェースには、プロパティやメソッド、それぞれのデータ型を記述しますが、具体的な処理を持つことはできません。  

なぜこのような機能があるかというと、インターフェースには、インターフェースをクラスやオブジェクトに適用(実装)する場合は、インターフェースに定義したプロパティやメソッドをすべて用意しないとエラーになるという特徴があるためです。インターフェースは構造を保証することで、クラスやオブジェクトをより安全に利用するための機能といえます。  

インターフェースは下記のように記述します。インターフェース名は`UpperCamelケース`で命名します。

```ts
interface インターフェース名 {
  プロパティ名: データ型,
  プロパティ名: データ型,
  メソッド名(引数): データ型,
  メソッド名(引数): データ型,
  // ...
}
```

さきほどの`animal`オブジェクトをインターフェースで定義する場合下記のようになります。

```ts
interface AnimalInterface {
  id: number,
  name: string
}
```


では、インターフェースを利用したオブジェクトの型注釈を見てみます。  


```ts
// インターフェースの定義
interface AnimalInterface {
  id: number,
  name: string
}

// 関数の定義
function printName(animal: AnimalInterface) {
  console.log(animal.id);
  console.log(animal.name);
}

// animalオブジェクト
let animal = {
  id: 1, 
  name: "きりん"
};

// 関数の実行
printName(animal);
// 1
// きりん
```

インターフェースを定義し、関数の引数部分を`animal: AnimalInterface`と書くことで、オブジェクトをシンプルに利用できるようになりました。


<section class="window note" markdown="block">
オブジェクトの宣言時にインターフェースを適用する場合は、下記のようにオブジェクト名のあとに`: インターフェース名`を記述します。

```ts
let animal: AnimalInterface = {
  id: 1, 
  name: "きりん"
};
```

</section>


## undefinedでもエラーにならないようにする

必須ではない引数やプロパティなどの右に`?`をつけることで、値が代入されていない場合でもエラーにならないようにできます。

```ts
function hello(name?: string) {
  return `Hello, ${name || "World"}!`;
}
console.log(hello());
// Hello, World!
console.log(hello("FLATPAQ"));
// Hello, FLATPAQ!
```

もし引数が複数ある場合は、省略できる引数は右側に記述しないとエラーになります。

```ts
function hello(name?: string, locate: string) {
  return `Hello, ${name || "World"}! from ${locate}`;
}
console.log(hello("Japan"));
// 引数の順番を変更しないとエラーになる
```

インターフェースで使用する場合は下記のようになります。

```ts
interface Person {
  name: string,
  tel?: number
  // ...
}
```

## Nullでもエラーにならないようにする

値がnullになる可能性がある値の場合は`変数名: データ型 | null`と書きます。  
こうすることで値がnullでもエラーが発生しないようになります。


```ts
interface Person {
  name: string,
  tel: number | null,
  // ...
}
```

## ジェネリクス(総称型)

関数やクラス、インターフェースなどはなるべく汎用性を持たせて利用したいですが、その際データ型の制約が妨げになる場合があります。  
しかしそこで`any`型を使ってしまうと静的型付けのメリットがなくなります。  
こうしたケースには、データ型を柔軟に使うことができるの*ジェネリクス*という機能が便利です。

例として、関数で利用する場合は下記のように記述します。

```ts
function 関数名<T>(引数名: T): T {
  // 関数の処理
}
```

`T`という文字がいくつか出てきますが、これが*型変数*と呼ばれるものです。  
下記の例をご覧だください。

```ts
// 関数の定義
function simpleReturn<T>(arg: T): T {
  return arg;
}

// 関数をnumber型で実行する
let bit16Value = simpleReturn<number>(65536);
console.log(bit16Value);

// 関数をstring型で実行する
let putText = simpleReturn<string>("FLATPAQ");
console.log(putText);
```

関数を利用する際には関数名の右隣に`<データ型>`を記述します。  
これでデータ型ごとに関数を定義する必要がなくなりました。
