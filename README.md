Devizr
======

> Device asset manager and JS feature detector.


Synopsis
--------

### Configuration

```js
var breakpoints = [
  {
    width: 0,
    addons: {
      mobilenavigation: {
        script: "assets/javascripts/mobile.min.js",
        complete: app.initMobileNavigation
      }
    }
  },
  {
    width: 767,
    addons: {
      animation: {
        script: "assets/javascripts/animation.min.js",
        style: "assets/stylesheets/animation.min.css",
        tests: [
          "requestanimationframe",
          "!touch"
        ],
        complete: app.initAnimations
      },
      touchanimation: {
        script: "assets/javascripts/animation.touch.min.js",
        style: "assets/stylesheets/animation.min.css",
        tests: [
          "requestanimationframe",
          "touch"
        ],
        complete: app.initAnimations
      }
    }
  }
];
```

### Usage 
   
```js
devizr.init;
devizr.load(breakpoints);
```