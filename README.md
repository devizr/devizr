Devizr
======

> Device asset manager

* Device width detection
* JS feature detection
* Environment detection (experimental!)


Synopsis
--------

### Configuration

```js
var breakpoints = [
  {
    width: 0,
    addons: {
      mobilenavigation: {
        script: "assets/mobile.min.js",
        complete: app.initMobile
      }
    }
  },
  {
    width: 767,
    addons: {
      desktop: {
        script: "assets/desktop.min.js",
        style: "assets/desktop.min.css",
        tests: [
          "!touch"
        ],
        complete: app.initDesktop
      },
      touch: {
        script: "assets/touch.min.js",
        style: "assets/touch.min.css",
        tests: [
          "touch"
        ],
        complete: app.initTouch
      }
    }
  }
];
```

### Usage 
   
```js
devizr.init();
devizr.load(breakpoints);
```