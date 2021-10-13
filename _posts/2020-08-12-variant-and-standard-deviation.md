---
layout: post
title:  "分散、標準偏差、偏差値を計算するプログラムをVue.jsで作る"
date:   2020-08-12
categories: web
tags: javascript web frontend math
thumbnail: '/assets/media/2020-08-12-variant-and-standard-deviation/standard-deviation-thumbnail.png'
---


PCで標準偏差を計算する方法は、ExcelやPythonを始め様々な環境で関数やライブラリが用意されているので特に自分で書く必要がないかもしれませんが、Vue.jsの練習として書いてみました。

下記リンクから試すことができます。  
`60, 80, 100`のようにカンマ区切りで数値を入力すると計算されます。

{:.embed}
[分散と標準偏差と偏差値の計算]({{ '/samples/standard-deviation.html' | relative_url }}){:target="_blank"}{:rel="noopener noreferrer"}


## 標準偏差の求め方

標準偏差は平均からの値の散らばり具合を数値で表したものです。下記が式になります。

![標準偏差の数式]({{ '/assets/media/2020-08-12-variant-and-standard-deviation/standard-deviation-formula.svg' | relative_url }})

数式だとややこしいかもしれませんが、手順を書いてみると至ってシンプルです。

1. 全ての値の合計値を要素数で割り、平均値を求める
2. 各データの値と平均値の差分を求める
3. それぞれの差分を2乗して合計する
4. 合計したデータを要素数で割る(これが分散)
5. 計算した値の平方根を求める



## 偏差値の求め方

標準偏差を求めることができれば、偏差値の計算はシンプルです。下記が式となります。

![標準偏差の数式]({{ '/assets/media/2020-08-12-variant-and-standard-deviation/deviation-value-formula.svg' | relative_url }})

xに偏差値を求めたい数値を代入します。


## コード

```html
<h1>分散と標準偏差と偏差値の計算</h1>

<div id="app">

  <div class="row">

    <div class="col-md-7">

      <label>カンマ区切りで数値を記述してください</label>
      <textarea v-model="scores" v-on:input="computeDeviation" class="form">
      </textarea>

      <label>偏差値を算出する数値を記述してください</label>
      <input type="text" v-model="myScore" v-on:input="myScoreValidate" class="form">

    </div>

    <div class="col-md-5">

      <div class="window">

        <label>偏差値</label>
        <p class="value" v-cloak v-if="myScore">{% raw %}{{ computedData.deviationValue }}{% endraw %}</p>
        <p class="value" v-else>0</p>

        <label>標準偏差</label>
        <p class="value" v-cloak v-if="scores">{% raw %}{{ computedData.standardDeviation }}{% endraw %}</p>
        <p class="value" v-else>0</p>

        <label>平均</label>
        <p class="value" v-cloak v-if="scores">{% raw %}{{ computedData.scoreAverage }}{% endraw %}</p>
        <p class="value" v-else>0</p>

        <label>分散</label>
        <p class="value" v-cloak v-if="scores">{% raw %}{{ computedData.scoreVariant }}{% endraw %}</p>
        <p class="value" v-else>0</p>

      </div>
      
    </div>

  </div>

</div>
```

```js
var app = new Vue({
  el: '#app',
  data: function() {
    return {
      scores: '',
      myScore: '', 
      computedData: {
        standardDeviation: '',
        scoreAverage: '',
        scoreVariant: '',
        deviationValue: ''
      }
    }
  },

  methods: {
    myScoreValidate() {

      // 数字以外は受け付けないようにする
      this.myScore = this.myScore.replace(/\D/g, '');
      this.computeDeviation();
    },

    computeDeviation() {
      // 数字とカンマ以外は受け付けないようにする
      this.scores = this.scores.replace(/[^0-9,]/g, '');

      // カンマで区切って配列に格納する
      let scoreArray = this.scores.split(',');

      // 数値に変換して配列に入れなおす
      scoreArray = scoreArray.map((value, index) => {
        return Number(scoreArray[index]);
      });

      // 配列の合計の値を求める
      let sum = 0;
      for (let i = 0; i < scoreArray.length; i++) {
        sum += scoreArray[i];
      }

      // 配列の平均を算出する
      let scoreAverage = sum / scoreArray.length;
      this.computedData.scoreAverage = scoreAverage;

      // それぞれの平均からの差を求めて配列に格納する
      let diffArray = [];
      for (let i = 0; i < scoreArray.length; i++) {
        diffArray[i] = scoreArray[i] - scoreAverage;
      }

      // 平均からの差を格納した配列の各要素の数値をそれぞれを2乗する
      diffArray = diffArray.map((value, index) => {
        // return diffArray[index] * diffArray[index];
        return Math.pow(diffArray[index],2);
      });

      // 平均からの差を格納した配列の合計の値を求める
      let diffSum = 0;
      for (let i = 0; i < diffArray.length; i++) {
        diffSum += diffArray[i];
      }

      // Array.lengthで割って分散を求める
      let variant = diffSum / scoreArray.length;
      this.computedData.scoreVariant = variant;

      // 分散からルートをとって標準偏差を求める
      this.computedData.standardDeviation = Math.sqrt(variant);

      // myScoreを基準に偏差値を算出する
      let myScoreNumber = Number(this.myScore);
      myScoreNumber = 10 * (myScoreNumber - scoreAverage);
      myScoreNumber = 50 + (myScoreNumber / Math.sqrt(variant));

      // 偏差値を出力する
      this.computedData.deviationValue = myScoreNumber;

    }

  },

});
```