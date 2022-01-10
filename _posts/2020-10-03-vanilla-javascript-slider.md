---
layout: post
title:  "Vanilla JSでスライダーを作る"
date:   2020-10-03
lastmod: 2021-10-26
categories: web
tags: javascript web frontend ui
thumbnail: '/assets/media/2020-10-03-vanilla-javascript-slider/slider-thumbnail.png'
---

## はじめに

ライブラリやフレームワークなどを使わずに、VanillaJSでスライダーを自作した際のメモです。

メインビジュアルで使うような横幅いっぱいのスライドにしています。  
スライド用のイメージは、スライドさせる要素の背景(`background-image`)として挿入しています。  
スライドさせる要素内にカード型コンポーネントなどを格納して、それらをスライドさせることもできます。  
また、スワイプ操作でスライドができるようになっています。

下記サンプルです。

{:.embed}
[JavaScript Simple Slider]({{ '/samples/vanilla-javascript-slider/' | relative_url }}){:target="_blank"}{:rel="noopener noreferrer"}


## ファイル構成

```bash
vanilla-javascript-slider/
├-- index.html
├-- css
|   ├-- reset.css
|   └-- style.css
├-- js
|   └-- main.js
└-- img
    ├-- left.svg
    ├-- right.svg
    ├-- slide1.jpg
    ├-- slide2.jpg
    ├-- slide3.jpg
    ├-- slide4.jpg
    └-- slide5.jpg
```


## コード


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

  <!-- Page Title -->
  <title>JavaScript Simple Slider</title>

  <!-- Loading CSS -->
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">

  <!-- Loading Script -->
  <script src="js/main.js" defer></script>

</head>
<body>

<div class="wrapper">

  <div class="slider-container">
    <div class="slider-slides-group">
      <div class="slider-slide" style="background-image: url(img/slide1.jpg);"></div>
      <div class="slider-slide" style="background-image: url(img/slide2.jpg);"></div>
      <div class="slider-slide" style="background-image: url(img/slide3.jpg);"></div>
      <div class="slider-slide" style="background-image: url(img/slide4.jpg);"></div>
      <div class="slider-slide" style="background-image: url(img/slide5.jpg);"></div>
    </div>

    <div class="slider-cursors">
      <div class="slider-cursor-left"><img src="img/left.svg"></div>
      <div class="slider-cursor-right"><img src="img/right.svg"></div>
    </div>
    
    <div class="slider-indicators-container">
      <ul class="slider-indicators">
      </ul>
    </div>

  </div>

</div>

</body>
</html>
```

{:.file-path}
style.css
```css
@charset "utf-8";
.card {
  background: #fefefe;
  height: 300px;
}
img {
  margin: 0px;
}
.slider-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.slider-slides-group {
  width: 100%;
  height: 100vh;
  left: 0%;
  transition: 0.5s all ease-out;
  position: absolute;
  z-index: 10;
}
.slider-slide {
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-color: #000;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 16px;
  border-radius: 0px;
  z-index: 10;
  transition: 0.5s all ease-out;
}
.slider-slide.active-slide {
  left: 0%;
}
.slider-cursor-left {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center; 
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #a5ced2;
  position: absolute;
  z-index: 30;
  top: calc(50% - 32px);
  left: 12px;
  cursor: pointer;
  border-radius: 50%;
}
.slider-cursor-left img {
  position: relative;
  left: -2px;
}
.slider-cursor-right {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center; 
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #a5ced2;
  position: absolute;
  z-index: 30;
  top: calc(50% - 32px);
  right: 12px;
  cursor: pointer;
  border-radius: 50%;
}
.slider-cursor-righ img {
  position: relative;
  right: -2px;
}
div.slider-indicators-container {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center; 
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
ul.slider-indicators {
  list-style: none;
  padding: 0px;
  margin-bottom: 32px;
  position: absolute;
  bottom: 12px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center; 
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  z-index: 20;
}
li.slider-indicator {
  width: 12px;
  height: 12px;
  margin: 4px;
  background: #43515f;
  border-radius: 50%;
  cursor: pointer;
}
li.slider-indicator.active-indicator {
  transform: scale(1.4);
  background: #ea7979;
}
```

{:.file-path}
right.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1" stroke="#43515f" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="9 6 15 12 9 18" />
</svg>
```

{:.file-path}
left.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1" stroke="#43515f" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="15 6 9 12 15 18" />
</svg>
```

{:.file-path}
main.js
```js
// スライダー全体を囲むエリア
const slider = document.querySelector('.slider-slides-group');
// スライダーの各スライド
const slides = document.querySelectorAll('.slider-slide');
// スライドを左へ戻すカーソルボタン
const prevBtn = document.querySelector('.slider-cursor-left');
// スライドを右へ進めるカーソルボタン
const nextBtn = document.querySelector('.slider-cursor-right');
// 現在何番目のスライドが表示されているかを表示するインジケーター
const indicators = document.querySelector('.slider-indicators');
// 全体のスライド数
const slideLength = slides.length;
// 現在のスライドが何番目かをカウントする変数
let currentSlideCount = 0;

// スライドの数だけインジケーターの生成を行う
// また、1枚目のスライドの初期位置はleft: 0%にして、それ以降のスライドはそれぞれ100%ずつ右に移動させる
for (let i = 0; i < slideLength; i++ ) {
  let indicator = document.createElement('li');
  indicator.className = 'slider-indicator';
  indicators.appendChild(indicator);
  slides[i].style.left = i * 100 + '%';
};

// currentSlideCountの値に応じて、スライドとインジケーターにCSSクラスをつける
let indicatorList = document.querySelectorAll('.slider-indicator');
indicatorList[currentSlideCount].classList.add('active-indicator');
slides[currentSlideCount].classList.add('active-slide');

// 戻るボタンをクリックするとprevSlider関数を実行
prevBtn.addEventListener('click', prevSlider);
// 進むボタンをクリックするとnextSlider関数を実行
nextBtn.addEventListener('click', nextSlider);

// インジケーターをクリックするとその番号へスライドを変更し、インジケーターのCSSクラスを付け替える
if (indicatorList.length > 0) {
  indicatorList.forEach(function(indicator, index) {
    indicator.addEventListener('click', function() {
      initialize();
      currentSlideCount = index;
      update();
    });
  });
};

// インジケーターのCSSクラスを取り除く関数
function initialize() {
  indicatorList[currentSlideCount].classList.remove('active-indicator');
};

// 該当するインジケーターにCSSクラスを加えて、スライドの表示位置を変更する関数
function update() {
  indicatorList[currentSlideCount].classList.add('active-indicator');
  slider.style.left = -currentSlideCount * 100 + '%';
};

// スライドを1枚戻す関数
// もし現在のスライドが1番目だった場合、最後のスライドまで移動させる
function prevSlider() {
  initialize();
  if( currentSlideCount === 0 ) {
    currentSlideCount = slideLength - 1;
  } else {
    currentSlideCount--;
  }
  update();
};

// スライドを1枚進める関数
// もし現在のスライドが最後だった場合、最初のスライドに移動させる
function nextSlider() {
  initialize();
  if( currentSlideCount === ( slideLength - 1 ) ) {
    currentSlideCount = 0;
  } else {
    currentSlideCount++;
  }
  update();
};

// 3秒ごとにスライドを進める
// setInterval(nextSlider, 3000);

// -------------
// スワイプ機能

// 変数の定義
let startX;
let moveX;
let dist = 30;

slides.forEach(function(el) {

  // スライドをスワイプする際に、touchstart時とtouchmove時でのスワイプ操作のX座標を計測する。
  // touchend時点で、touchstartのX座標の値が、touchmoveのそれより大きければ左スワイプ、小さければ右スワイプとなる
  el.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
  });
  el.addEventListener('touchmove', function(e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
  });
  el.addEventListener('touchend', function(e) {
    if (startX > moveX && startX > moveX + dist) {
      nextSlider();
    } else if (startX < moveX && startX + dist < moveX) {
      prevSlider();
    }
  });

  // マウス操作の場合
  el.addEventListener('mousedown', function(e) {
    e.preventDefault();
    startX = e.pageX;
  });
  el.addEventListener('mousemove', function(e) {
    e.preventDefault();
    moveX = e.pageX;
  });
  el.addEventListener('mouseup', function(e) {
    if (startX > moveX && startX > moveX + dist) {
      nextSlider();
    } else if (startX < moveX && startX + dist < moveX) {
      prevSlider();
    }
  });

});

```
