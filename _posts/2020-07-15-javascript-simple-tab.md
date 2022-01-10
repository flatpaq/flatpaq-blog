---
layout: post
title:  "JavaScriptでシンプルなタブを作る"
date:   2020-07-15
categories: web
tags: javascript web frontend ui
thumbnail: '/assets/media/2020-07-15-javascript-simple-tab/javascript-simple-tab-thumbnail.png'
---

プレーンなJavaScriptでのシンプルなタブ機能です。

{:.embed}
[JavaScriptでシンプルなタブ]({{ '/samples/js-simple-tab/' | relative_url }}){:target="_blank"}{:rel="noopener noreferrer"}

{:.file-path}
index.html
```html
<div class="tab-wrapper">

  <nav class="tabs">
    <p class="tab active">Tab 1</p>
    <p class="tab">Tab 2</p>
    <p class="tab">Tab 3</p>
  </nav>

  <div class="tab-contents-area">

    <p class="tab-cont active">
      Tab 1 Content
    </p>

    <p class="tab-cont">
      Tab 2 Content
    </p>

    <p class="tab-cont">
      Tab 3 Content
    </p>

  </div>

</div>
```

{:.file-path}
style.scss
```scss
.tab-wrapper {
  padding-top: 48px;
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  margin-right: auto;
  margin-left: auto;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;
}

.tabs {
  padding: 0px 24px;

  .tab {
    min-width: 120px;
    text-align: center;
    margin-bottom: 0px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    padding: 4px 12px 3px;
    border: 1px solid #46a9ec;
    border-right: transparent;
    border-radius: 0px;
    color: #46a9ec;

    &.active {
      background: #46a9ec;
      color: #fefefe;
      cursor: default;
    }
  
  }

  .tab:first-of-type {
    border-radius: 4px 0px 0px 4px;
  }

  .tab:last-of-type {
    border-radius: 0px 4px 4px 0px;
    border-right: 1px solid #46a9ec;
  }

}

.tab-contents-area {
  padding: 32px 24px 0px;

  .tab-cont {
    display: none;
    transition: all 0.2s ease-in-out;

    &.active {
      display: block;
    }
  
  }

}
```

{:.file-path}
main.js
```js
document.addEventListener('DOMContentLoaded', function() {

  let tabIndex = 0;
  const tabs = document.querySelectorAll('.tabs > .tab');
  const tabContents = document.querySelectorAll('.tab-contents-area > .tab-cont');

  tabs.forEach(function(tab, index) {

    tab.addEventListener('click', function(el) {

      tabs.forEach(function(allTab) {
        allTab.classList.remove('active');
      });

      el.target.classList.add('active');

      tabIndex = index;

      tabContents.forEach(function(tabCont) {
        tabCont.classList.remove('active');
      });
      tabContents[tabIndex].classList.add('active');
      
    });

  });

});
```