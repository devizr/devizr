Devizr
======

> **Device asset manager**

## Loading different assets for different devices

### Methods of Detection
- **Device width detection** (Feature-Dependent Assets/Responsive Assets)
- **JS feature detection** (Feature-Dependent Assets)
- **Url fragment detection** (Routing-Dependent Assets - EXPERIMENTAL!)
- **Environment detection** (Environment-Dependent Assets - EXPERIMENTAL!)

#### Details

- Clear and easy setup
- Detection methods can be combined.
- Features detection with all possible prefixes.
- Task runner helper (for _grunt_, _gulp_, _broccoli_, ..) via npm ```install node-devizr``` (see [node-devizr](https://github.com/up/node-devizr)) 

### Synopsis

#### Methods and Properties

##### init()
Start feature detection
```js
devizr.init();
```

##### load()
Load assets 
```js
devizr.load(BREAKPOINT_ARRAY);
```

##### addTest()
Add new test 
```js
devizr.addTest(ID, function(){
  return CONDITION;
});
```

##### feature()
Get feature (for inline usage)
```js
if(devizr.feature(FEATURE)) {
  // Do somthing ..
}
```

##### features
Get supported features as an array
```js
console.log(devizr.features);
```

#### Configuration

```
var BREAKPOINT_ARRAY_NAME = [
  {
    width: NUMBER,
    addons: {
      ID: {
        script: SCRIPT_URL_STRING,
        complete: CALLBACK_FUNCTION
      }
    }
  },
  {
    width: NUMBER,
    addons: {
      ANOTHER_ID: {
        script: SCRIPT_URL_STRING,
        style: STYLE_URL_STRING,
        tests: [
          FEATURE_NAME_STRING
        ],
        complete: CALLBACK_FUNCTION
      },
      STILL_ANOTHER_ID: {
        script: SCRIPT_URL_STRING,
        style: STYLE_URL_STRING,
        tests: [
          FEATURE_NAME_STRING, 
					ANOTHER_FEATURE_NAME_STRING 
        ],
        complete: CALLBACK_FUNCTION
      }
    }
  }
];
```

### Examples

#### Setup /configuration
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

```js
devizr.addTest('contact-page', function(){
  return location.hash === '#contact';
});
```

```js
devizr.init();
```

```js
devizr.load(breakpoints);
```

```js
if(devizr.feature('touch')) {
  console.log('Hi from touch device!');
}
```

```js
console.log(devizr.features);
```