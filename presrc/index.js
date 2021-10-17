// Loading Animation
window.onload = function() {
  const spinner = document.getElementById('loading-wrapper');
  spinner.classList.add('loaded');
}

// Hamburger Menu Button
// document.addEventListener('DOMContentLoaded', hamburgerBtn);
function hamburgerBtn() {
  var forEach=function(t,o,r){
    if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);
    else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)
  };
  var hamburgers = document.querySelectorAll(".hamburger");
  if (hamburgers.length > 0) {
    forEach(hamburgers, function(hamburger) {
      hamburger.addEventListener("click", function() {
        this.classList.toggle("is-active");
      }, false);
    });
  }
};

// Table of Contents in Post page
document.addEventListener('DOMContentLoaded', setToc);
function setToc() {
  let idcount = 1;
  let toc = '';
  let currentlevel = 1;
  let tocEls = document.querySelectorAll('article h2,article h3,article h4,article h5,article h6');
  tocEls.forEach(function(el) {
    let level = 1;
    if(el.tagName === 'H2') {
      level = 2;
    } else if(el.tagName === 'H3') {
      level = 3;
    } else if(el.tagName === 'H4') {
      level = 4;
    } else if(el.tagName === 'H5') {
      level = 5;
    } else if(el.tagName === 'H6') {
      level = 6;
    }
    while(currentlevel < level) {
      toc += `<ol>`;
      currentlevel++;
    }
    while(currentlevel > level) {
      toc += `</ol>`;
      currentlevel--;
    }
    el.id = `heading-num${idcount}`;
    idcount++;
    toc += `<li><a href="#${el.id}" class="toc-link">${el.textContent}</a></li>\n`;
  });
  while(currentlevel > 0) {
    toc += `</ol>`;
    currentlevel--;
  }
  if(document.querySelectorAll('article h2')) { 
    document.getElementById('toc').innerHTML = toc;
  } 
  else{
    document.getElementById('toc').setAttribute('class', 'no-toc');
  }
}

// Smooth Scroll
document.addEventListener('click', el => {
  const link = el.target;
  if (!link.classList.contains('toc-link')) return;
  el.preventDefault();
  const targetId = link.hash;
  const targetElement = document.querySelector(targetId);
  const headRoom = targetElement.getBoundingClientRect().top;
  const offsetTop = window.pageYOffset;
  const marginTop = 104;
  const top = headRoom + offsetTop - marginTop;
  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

// Fixing Sidebar and Scroll Bar
window.addEventListener('load', stickyHeight);
window.addEventListener( 'resize', stickyHeight );
function stickyHeight() {

  // get height of header-cat-nav
  // let nav = document.querySelector('.header-cat-nav-wrapper');
  // let navHeight = nav.offsetHeight;

  // get height and style of .sidebar-cont
  let sidebarCont = document.querySelector('.sidebar-cont');

  let sidebarHeight = sidebarCont.scrollHeight;
  let sidebarStyle = sidebarCont.style;

  // get height of header for mobile
  let headerEl = document.querySelector('header');
  let headerElHeight = headerEl.offsetHeight -1;

  // intersectionObserver
  let headerContEl = document.querySelector('.header-cont');
  const observer = new IntersectionObserver( ([el]) => {
    return el.target.classList.toggle('is-sticky', el.intersectionRatio < 1);
    }, { threshold: [1] }
  );
  observer.observe(headerContEl);
  // observer.observe(nav);

  // buffer
  let buffer = 32;

  // get width and height of window
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  // set top and max-height of sidebar-cont class
  if (windowWidth >= 768) {

    // Fixed for desktop display
    sidebarStyle.top = headerElHeight + buffer + 'px';
    sidebarStyle.maxHeight = windowHeight - ( headerElHeight + (buffer * 2) ) + 'px';

    // for desktop display
    // sidebarStyle.top = navHeight + buffer + 'px';
    // sidebarStyle.maxHeight = windowHeight - ( navHeight + (buffer * 2) ) + 'px';

  } else {
    // for mobile display
    sidebarStyle.top = headerElHeight + 'px';
    sidebarStyle.maxHeight = windowHeight - headerElHeight + 'px';
  }

  // calculate as Rate that originally height divide by max-height of sidebar-cont class
  // Fixed
  let sidebarMaxHeight = windowHeight - ( headerElHeight + (buffer * 2) );
  // let sidebarMaxHeight = windowHeight - ( navHeight + (buffer * 2) );

  let sidebarHeightRate = sidebarMaxHeight / sidebarHeight;

  // calculate height of scrollbar
  let scrollbar = document.querySelector('.scroll-bar'); 
  let sidebarScrollBarHeight = sidebarMaxHeight * sidebarHeightRate;
  let scrollbarStyle = scrollbar.style;

  // set height of scrollbar
  if ( sidebarHeight > sidebarScrollBarHeight ) {
    scrollbarStyle.height = Math.round(sidebarScrollBarHeight) + 'px'; 
  } else {
    scrollbarStyle.height = 0 + 'px';
  }


  // let flug = true;
  function timefunc() {

    // if(flug){
      // flug = false;

      // setTimeout(function(){

        let scrollBarAmount = sidebarCont.scrollTop;
        let scrollTop = scrollBarAmount + (scrollBarAmount * sidebarHeightRate);
        scrollbarStyle.top = Math.round(scrollBarAmount + (scrollBarAmount * sidebarHeightRate)) + 'px';

        // if scrollbar height greater than sidebar height
        if ( ( scrollTop + sidebarScrollBarHeight ) > sidebarHeight - buffer) {
          scrollbarStyle.top = Math.round(sidebarHeight - sidebarScrollBarHeight) + 'px';
        }

        // flug = true;
        // return flug;
      // }, 0);

    // }

  }
  // set speed of scrollbar
  sidebarCont.addEventListener('scroll', timefunc);
}

// Scroll Spy
document.addEventListener('DOMContentLoaded', activeBar);
function activeBar() {

  let tocActiveEl = [];
  let rect = [];
  let elPosition = [];
  let elHeight = [];
  let tocLink = [];
  let scrollAmount = 0;

  const buffer = 105;

  tocActiveEl = document.querySelectorAll('article h2,article h3,article h4,article h5,article h6');
  for (let i = 0; i < tocActiveEl.length; i++) {
    tocLink[i] =  document.querySelector(`.sidebar a.toc-link[href="#${tocActiveEl[i].id}"]`);
  }

  let flug = true;

  function timefunc() {

    if(flug){

      flug = false;
  
      setTimeout(function() {

        // get scroll amount
        scrollAmount = window.pageYOffset;

        // header
        // let header = document.querySelector('.header-cont');
        // header.classList.toggle('is-sticky', scrollAmount > 0);

        for (let i = 0; i < tocActiveEl.length; i++) {

          // get relative Y coordinates of each Element
          rect[i] = tocActiveEl[i].getBoundingClientRect().top;
          // absolute position of each Element obtained getBoundingClientRect plus window.pageYOffset
          elPosition[i] = rect[i] + scrollAmount - buffer;
        }
        for (let i = 0; i < tocActiveEl.length; i++) {
          elHeight[i] = elPosition[i+1] - elPosition[i];

          if(tocActiveEl[tocActiveEl.length - 1]) {
            let footerEl = document.querySelector('footer');
            let footerRect = footerEl.getBoundingClientRect().top;
            let footerPosition = footerRect + scrollAmount;
            elHeight[elHeight.length - 1] = footerPosition - elPosition[elPosition.length - 1];
          }
          if ( (scrollAmount > elPosition[i]) && (elHeight[i] > scrollAmount - elPosition[i]) ) {
            tocLink[i].classList.add("active");
          } else {
            tocLink[i].classList.remove("active");
          }
        }

        flug = true;
        return flug;

      }, 200);
    }
  }

  document.addEventListener('scroll', timefunc);
}

// Mobile Menu to active
window.addEventListener('load', mobileMenu);
function mobileMenu() {

  let mobileMenuBtn = document.querySelector('.mobile-menu');
  let modalShadow = document.querySelector('.modal-shadow');
  let sidebarActive = document.querySelector('.sidebar-cont');
  let hamburgerMenu = document.querySelector('.hamburger');

  modalShadow.classList.remove('active');
  sidebarActive.classList.remove('active');
  hamburgerMenu.classList.remove('is-active');

  mobileMenuBtn.addEventListener('click', function() {

    if (sidebarActive.classList.contains('active')) {
      modalShadow.classList.remove('active');
      sidebarActive.classList.remove('active');
      hamburgerMenu.classList.remove('is-active');  
    } else {
      modalShadow.classList.add('active');
      sidebarActive.classList.add('active');
      hamburgerMenu.classList.add('is-active');
    }
  }, false);

  modalShadow.addEventListener('click', function() {
    modalShadow.classList.remove('active');
    sidebarActive.classList.remove('active');
    hamburgerMenu.classList.remove('is-active');
  }, false);

};

// Add Ripple Class to Embed link
document.addEventListener('DOMContentLoaded', addRippleClass);
function addRippleClass() {
  let embedEl = document.querySelectorAll('.embed a');
  embedEl.forEach(function(el) {
    el.classList.add('ripple');
  });
};

// Ripple Effect
const rippleEffect = (event) => {

  let target = event.target;

  if (!target) {
    return;
  } 

  const cover = document.createElement('span');
  const coverSize = target.offsetWidth;
  const loc = target.getBoundingClientRect();

  const x = event.pageX - loc.left - window.pageXOffset - (coverSize / 2);
  const y = event.pageY - loc.top - window.pageYOffset - (coverSize / 2);

  const pos = `top: ${y}px; left: ${x}px; height: ${coverSize}px; width: ${coverSize}px;`;

  target.appendChild(cover);
  cover.setAttribute('style', pos);
  cover.setAttribute('class', 'ripple-active');

  setTimeout(() => {
    cover.remove();
  }, 2000);
};
document.addEventListener('DOMContentLoaded', rippleStart);
function rippleStart() {
  Array.from(document.querySelectorAll('.ripple')).forEach((elem) => {
    // elem.addEventListener('click', rippleEffect);
    elem.addEventListener('mouseenter', rippleEffect);
  });

};



// -------------------



// Use Library

// tilt effect
import 'vanilla-tilt';
document.addEventListener('DOMContentLoaded', tiltEffect);
function tiltEffect() {
  VanillaTilt.init(document.querySelectorAll(".card"), {
    reverse: true,
    max: 5,
    speed: 400,
    transition: true,
    scale:  1.02
  });
};

// Highlighting
document.addEventListener('DOMContentLoaded', articleHighlight);
function articleHighlight() {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
  hljs.initLineNumbersOnLoad();
};

// Animejs
import anime from 'animejs/lib/anime.es.js';

// Barbajs
import barba from '@barba/core';

// Get a mask element for transition anime
const mask = document.querySelector('.mask');

// Replace meta infomation
const replaceHeadTags = target => {
  const head = document.head
  const targetHead = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
  const newPageHead = document.createElement('head')
  newPageHead.innerHTML = targetHead
  const removeHeadTags = [
    "meta[name='description']",
    "meta[property^='og']",
    "meta[property^='article']",
    "link[rel='canonical']",
  ].join(',')
  const headTags = [...head.querySelectorAll(removeHeadTags)]
  headTags.forEach(item => {
    head.removeChild(item)
  })
  const newHeadTags = [...newPageHead.querySelectorAll(removeHeadTags)]
  newHeadTags.forEach(item => {
    head.appendChild(item)
  })
}

// Google Analyticsへの送信
const gaPush = pagename => {
  ga('send', 'pageview', pagename)
}
const gtagPush = pagename => {
  gtag('config', ga_code, {'page_path' : pagename});
}

barba.init({
  // debug: true,
  // cacheIgnore: true
  // prefetchIgnore: true,
  transitions: [{
    leave: (data) => {
      return new Promise((resolve) => {
        leaveAnimation(data.current.container);
        setTimeout(() => {
          resolve();
        }, 600);
      });
    },
    beforeEnter: ({ next }) => {
      replaceHeadTags(next);
      gaPush(location.pathname);
      gtagPush(location.pathname);
    },
    enter: (data) => {
      enterAnimation(data.next.container);
    }
  }]  
});

function leaveAnimation(e) {
  anime.timeline().add({
    easing: 'easeOutSine',
    targets: '.transition-mask',
    duration: 10,
    // delay: 200,
    opacity: [0, 1]
  }).add({
    easing: 'easeOutSine',
    targets: mask,
    duration: 300,
    opacity: [0, 1],
    begin: () => {
      mask.style.visibility = "visible";
    }
  }).add({
    easing: 'easeOutSine',
    targets: '.transition-mask',
    duration: 300,
    // delay: 200,
    translateY: ['100%', 0]
  }, '-=100');
}
function enterAnimation(e) {
  anime.timeline().add({
    easing: 'easeOutSine',
    targets: '.transition-mask',
    duration: 300,
    // delay: 200,
    translateY: [0, '-100%']
  }).add({
    easing: 'easeOutSine',
    targets: '.transition-mask',
    duration: 10,
    // delay: 200,
    opacity: [1, 0]
  }).add({
    easing: 'easeInSine',
    targets: mask,
    duration: 300,
    // translateY: [0, '-100%']
    opacity: [1, 0],
    complete: () => {
      mask.style.visibility = "hidden";
    }
  }, '-=300');
}

barba.hooks.afterLeave(() => {

  if(window.pageYOffset) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
      // behavior: 'instant'
    });
  }

});

barba.hooks.beforeEnter((data) => {
  // let hamburgers = document.querySelectorAll(".hamburger");
  // if (hamburgers.length > 0) {
  //   hamburgers.forEach(function(hamburger) {
  //     hamburger.classList.remove('is-active');
  //   });
  // }

  data.current.container.remove();

  addRippleClass();
  rippleStart();
  setToc();
  articleHighlight();

});

barba.hooks.enter(() => {
  activeBar();

  // move window.pageYOffset function to afterLeave hook
    
});

barba.hooks.afterEnter(() => {
  tiltEffect();
});

barba.hooks.after(() => { 
  stickyHeight();
  mobileMenu();
});
