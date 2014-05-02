Devizr
======

> Device asset manager (.. and yet another frontend architecture approach)

## Different assets for different requirements.

### Methods of Detection
- **Device width detection** (Feature-Dependent Assets/Responsive Assets)
- **JS feature detection** (Feature-Dependent Assets)
- **Url fragment detection** (Routing-Dependent Assets - EXPERIMENTAL!)
- **Environment detection** (Environment-Dependent Assets - EXPERIMENTAL!)

Can be combined.

### Synopsis

#### Configuration

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

#### Usage 
   
```js
// Start detection
devizr.init();

// Add new test
devizr.addTest('contact-page', function(){
  return location.hash === '#contact';
});

// Get feature (for inline usage)
if(devizr.supports('touch')) {
  console.log('Hi from touch device!');
}

// Get supported features as an array
console.log(devizr.support);
```