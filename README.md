Devizr
======

> **Device asset manager** (.. and yet another frontend architecture approach)

## Different assets for different requirements.

### Methods of Detection
- **Device width detection** (Feature-Dependent Assets/Responsive Assets)
- **JS feature detection** (Feature-Dependent Assets)
- **Url fragment detection** (Routing-Dependent Assets - EXPERIMENTAL!)
- **Environment detection** (Environment-Dependent Assets - EXPERIMENTAL!)

#### Details

- Simple configuration
- Detection methods can be combined.
- Features detection with all prefixes.
- Task runner helper (for grunt, gulp, ..) via npm ```install node-devizr``` (see [node-devizr](https://github.com/up/node-devizr)) 

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

#### Methods and Properties

##### init()
Start detection
```js
devizr.init();
```

##### addTest()
Add new test
```js
devizr.addTest('contact-page', function(){
  return location.hash === '#contact';
});
```

##### supports()
Get feature (for inline usage)
```js
if(devizr.supports('touch')) {
  console.log('Hi from touch device!');
}
```

##### support
Get supported features as an array
```js
console.log(devizr.support);
```