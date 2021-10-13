"use strict";

// スライダー全体を囲むエリア
const slider = document.querySelector('.slider-slides-group'); // スライダーの各スライド

const slides = document.querySelectorAll('.slider-slide'); // スライドを左へ戻すカーソルボタン

const prevBtn = document.querySelector('.slider-cursor-left'); // スライドを右へ進めるカーソルボタン

const nextBtn = document.querySelector('.slider-cursor-right'); // 現在何番目のスライドが表示されているかを表示するインジケーター

const indicators = document.querySelector('.slider-indicators'); // 全体のスライド数

const slideLength = slides.length; // 現在のスライドが何番目かをカウントする変数

let currentSlideCount = 0; // スライドの数だけインジケーターの生成を行う
// また、1枚目のスライドの初期位置はleft: 0%にして、それ以降のスライドはそれぞれ100%ずつ右に移動させる

for (let i = 0; i < slideLength; i++) {
  let indicator = document.createElement('li');
  indicator.className = 'slider-indicator';
  indicators.appendChild(indicator);
  slides[i].style.left = i * 100 + '%';
}

; // currentSlideCountの値に応じて、スライドとインジケーターにCSSクラスをつける

let indicatorList = document.querySelectorAll('.slider-indicator');
indicatorList[currentSlideCount].classList.add('active-indicator');
slides[currentSlideCount].classList.add('active-slide'); // 戻るボタンをクリックするとprevSlider関数を実行

prevBtn.addEventListener('click', prevSlider); // 進むボタンをクリックするとnextSlider関数を実行

nextBtn.addEventListener('click', nextSlider); // インジケーターをクリックするとその番号へスライドを変更し、インジケーターのCSSクラスを付け替える

if (indicatorList.length > 0) {
  indicatorList.forEach(function (indicator, index) {
    indicator.addEventListener('click', function () {
      initialize();
      currentSlideCount = index;
      update();
    });
  });
}

; // インジケーターのCSSクラスを取り除く関数

function initialize() {
  indicatorList[currentSlideCount].classList.remove('active-indicator');
}

; // 該当するインジケーターにCSSクラスを加えて、スライドの表示位置を変更する関数

function update() {
  indicatorList[currentSlideCount].classList.add('active-indicator');
  slider.style.left = -currentSlideCount * 100 + '%';
}

; // スライドを1枚戻す関数
// もし現在のスライドが1番目だった場合、最後のスライドまで移動させる

function prevSlider() {
  initialize();

  if (currentSlideCount === 0) {
    currentSlideCount = slideLength - 1;
  } else {
    currentSlideCount--;
  }

  update();
}

; // スライドを1枚進める関数
// もし現在のスライドが最後だった場合、最初のスライドに移動させる

function nextSlider() {
  initialize();

  if (currentSlideCount === slideLength - 1) {
    currentSlideCount = 0;
  } else {
    currentSlideCount++;
  }

  update();
}

; // 3秒ごとにスライドを進める

setInterval(nextSlider, 3000); // モバイル時のみ有効なスワイプ機能

let startX;
let startY;
let moveX;
let moveY;
let dist = 30; // スライドをスワイプするタイミングで、touchstartイベントとtouchmoveイベントでスワイプのX座標を計測する。
// touchstartのX座標の値が、touchmoveのそれより大きければ左スワイプ、小さければ右スワイプとなる

slides.forEach(function (el) {
  el.addEventListener('touchstart', function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });
  el.addEventListener('touchmove', function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
  });
  el.addEventListener('touchend', function (e) {
    if (startX > moveX && startX > moveX + dist) {
      nextSlider();
    } else if (startX < moveX && startX + dist < moveX) {
      prevSlider();
    }
  });
});