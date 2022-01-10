---
layout: post
title:  "Vue.jsでアコーディオンを作る"
date:   2020-10-10
categories: web
tags: javascript web frontend ui vue
thumbnail: ''
---

Vue.jsでアコーディオンを作った時のメモです。

## サンプル

サンプルは下記リンクです。

{:.embed}
[Vue Accordion]({{ '/samples/vue-accordion.html' | relative_url }}){:target="_blank"}{:rel="noopener noreferrer"}


## コード

- テンプレートの`slot`を用いてコンテンツを挿入しています。
- Vue.jsのトランジションをJavaScriptフックに適用して、アコーディオンの開閉時の高さを動かしています。

{:.file-path}
html
```html
<div class="container">

  <div id="app">

    <accordion>
      <div slot="title" class="title">アコーディオン1のタイトル</div>
      <section slot="content" class="content" >
        <h1>アコーディオン1のコンテンツ</h1>
        <p>アコーディオン1のコンテンツ</p>
      </section>
    </accordion>

    <accordion>
      <div slot="title" class="title">アコーディオン2のタイトル</div>
      <section slot="content" class="content">
        <h1>アコーディオン2のコンテンツ</h1>
        <p>アコーディオン2のコンテンツ</p>
      </section>
    </accordion>

    <accordion>
      <div slot="title" class="title">アコーディオン3のタイトル</div>
      <section slot="content" class="content">
        <h1>アコーディオン3のコンテンツ</h1>
        <p>アコーディオン3のコンテンツ</p>
      </section>
    </accordion>

  </div>

</div>
```

{:.file-path}
css
```css
.container {
  padding-top: 48px;
}
.accordion-title-wrapper {
  position: relative;
  display: block;
  cursor: pointer;
}
.title {
  padding: 16px;
  background: #f6f7f7;
}
h1 {
  font-size: 175%;
}
.accordion-title-wrapper .accordion-button-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  right: 16px;
  transition: 0.2s ease-in-out;
}    
.accordion-content-wrapper {
  overflow: hidden;
  transition: 0.2s ease-in-out;
}
.accordion .content {
  padding: 16px;
}
.accordion .content :last-child {
  margin-bottom: 16px;
}
.accordion-title-wrapper.open .accordion-button-icon {
  transform: translateY(-50%) rotate(45deg);
}
```


{:.file-path}
javascript
```js
Vue.component('accordion', {
  template: `
    <div class="accordion">
      <div class="accordion-title-wrapper" v-on:click="toggle()" v-bind:class="{ 'open': isOpen }">

        <slot name="title"></slot>

        <svg xmlns="http://www.w3.org/2000/svg" class="accordion-button-icon icon icon-tabler icon-tabler-plus" width="48" height="48" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>

      </div>

      <transition name="accordion" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:before-leave="beforeLeave" v-on:leave="leave">

        <div class="accordion-content-wrapper" v-if="isOpen">
          <slot name="content"></slot>
        </div>

      </transition>
      
    </div>
    `,

  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen;
    },
    beforeEnter: function (el) {
      el.style.height = '0';
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function (el) {
      el.style.height = '0';
    }
  }
});

new Vue({
  el: '#app'
});
```
