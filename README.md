Devizr
======

> **Device asset manager** (and maybe a frontend architecture approach)

## Different assets for different requirements.

### Methods of Detection
- **Device width detection** (Feature-Dependent Assets/Responsive Assets)
- **JS feature detection** (Feature-Dependent Assets)
- **Url fragment detection** (Routing-Dependent Assets - EXPERIMENTAL!)
- **Environment detection** (Environment-Dependent Assets - EXPERIMENTAL!)

#### Details

- Simple configuration
- Detection methods can be combined.
- Features detection with (all) prefixes.
- Task runner helper (for _grunt_, _gulp_, _broccoli_, ..) via npm ```install node-devizr``` (see [node-devizr](https://github.com/up/node-devizr)) 

### Synopsis

#### Methods and Properties

##### init()
Start detection
```js
devizr.init();
```

##### load()
Load breakpoint array
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

##### supports()
Get feature (for inline usage)
```js
if(devizr.supports(FEATURE)) {
  // Do somthing ..
}
```

##### support
Get supported features as an array
```js
console.log(devizr.support);
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
if(devizr.supports('touch')) {
  console.log('Hi from touch device!');
}
```

```js
console.log(devizr.support);
```