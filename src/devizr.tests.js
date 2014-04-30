/*jshint browser:true */
/*global devizr: true, test: true, DocumentTouch:true, SVGFEColorMatrixElement:true */
"use strict";
var // Please do not change the first four lines!!!
tests = {

  /*** 
   * # Device related APIs
   * ...
  */

  /*** 
   * ## Detect Retina Display
   * ...  
   * ##### __Example__
   * ```javascript
   * if(window.devicePixelRatio >= 1.2){
   *   var images = document.getElementsByTagName('img');
   *   for(var i=0;i < images.length;i++){
   *     var attr = images[i].getAttribute('data-2x');
   *     if(attr){
   *       images[i].src = attr;
   *     }
   *   }
   * }
   * ```
   * > ?
  */
  'retina': function() {
    return window.devicePixelRatio > 1 || 
      (window.matchMedia && window.matchMedia(
        "(-webkit-min-device-pixel-ratio: 1.5)," + 
        "(-moz-min-device-pixel-ratio: 1.5)," + 
        "(min-device-pixel-ratio: 1.5)").matches);
  },

  /*** 
   * ## Full Screen API
   * Allowing content to take up the entire screen.
   * > Chrome 15, Firefox 10, IE 11, Opera 12.1, Safari 5.1
  */
  'fullscreen': function() {
    return test(window, 'fullScreen') || 
      test(document.documentElement, 'requestFullscreen', true);
  },

  /*** 
   * ## Ambient Light Sensor API
   * ...
   * > Firefox 22 (Mac OSX) only
  */
  'ambientlight': function() {
    return test(window, 'ondevicelight');
  },

  /*** 
   * ## Battery Status API
   * ...
   * > Firefox 16 only
  */
  'battery': function() {
    return test(navigator, 'battery', true);
  },

  /*** 
   * ## Geolocation API
   * ...
   * > Chrome 5, Firefox 3.5, Safari 5, IE 9, Opera 10.6
  */
  'geolocation': function() {
    return test(navigator, 'geolocation');
  },

  /*** 
   * ## Pointer Lock API
   * ...
   * > Chrome 23, Firefox 14
  */

  'pointerlock': function() {
    return test(document.documentElement, 'requestPointerLock', true) && 
      test(document, 'exitPointerLock', true) && 
      test(document, 'pointerLockElement', true);
  },

  /*** 
   * ## Proximity API
   * ...
   * > Firefox only
  */
  'userproximity': function() {
    return test(window, 'onuserproximity');
  },

  /*** 
   * ## Device Motion API
   * ...
   * > ?
  */
  'devicemotion': function() {
    return test(window, 'DeviceMotionEvent'); 
  },

  /*** 
   * ## Device Orientation API
   * ...
   * > Chrome 7.0, Firefox 6
  */
  'deviceorientation': function() {
    return test(window, 'DeviceOrientationEvent');
  },

  /*** 
   * ## Screen Orientation API
   * ...
   * > Firefox (android), Internet Explorer on Windows 8.1
  */
  'orientationchange': function() {
    return test(screen, 'onmozorientationchange') || 
      test(screen, 'onmsorientationchange');
  },

  /*** 
   * ## Vibration API
   * ...
   * > Chrome, Firefox 11
  */
  'vibrate': function() {
    return test(navigator, 'vibrate', true);
  },

  /*** 
   * ## navigator.getGamepads
   * Access and use gamepads and other game controllers.
   * > ?
  */
  'gamepads': function() {
    return test(navigator, 'getGamepads');
  },

  /*** 
   * ## getUserMedia/Stream API
   * Method of accessing external device data (such as a webcam video stream). 
   * > ?
  */
  'getusermedia': function() {
    return test(navigator, 'getUserMedia', true);
  },

  /*** 
   * ## Toolbar/context menu
   * Method of defining a toolbar menu, a context menu or a list of (interactive) options using the menu-element.
   * > Firefox 8
  */
  'contextmenu': function() {
    return test(document.documentElement, 'contextMenu') && 
      test(window, 'HTMLMenuItemElement');
  },



  /*** 
   * # Communication related APIs
   * ...
  */

  /*** 
   * ## navigator.onLine
   * Returns the online status of the browser. 
   * > Firefox 3, 
  */
  'online': function() {
    return test(navigator, 'onLine');
  },

  /*** 
   * ## online and offline events
   * ...
   * > ?
  */
  'onlineevents': function() {
    return test(window, 'ononline') && 
      test(window, 'onoffline');
  },

  /*** 
   * ## Server-sent DOM events
   * ...
   * > Chrome 9, Firefox 6, Opera 11, Safari 5
  */
  'eventsource': function() {
    return test(window, 'EventSource');
  },

  /*** 
   * ## Offline web applications
   * Method of defining web page files to be cached using a cache manifest file, 
   * allowing them to work offline on subsequent visits to the page
   * > IE 10, FF 3.5, Chrome 4, Safari 4, Opera 10.6 
   */
  'applicationcache': function() {
    return test(window, 'applicationCache');
  },

  /*** 
   * ## Network Information API
   * ...
   * > Firefox 12
  */
  'connection': function() {
    return test(navigator, 'connection');
  },

  /*** 
   * ## Web Notifications API
   * ...
   * > Chrome 5, Firefox 4, Safari 6
  */
  'notification': function() {
    return test(window, 'Notification', true);
  },

  /*** 
   * ## HTML5 Web Messaging
   * ...
   * > Chrome 1, Firefox 6, IE 8, Safari 4, Opera 9.5
  */
  'postmessage': function() {
    return test(window, 'postMessage');
  },

  /*** 
   * ## Web Sockets
   * ...
   * > Chrome 14, Firefox 6, IE 10, Safari 6, Opera 12.1
  */
  'websocket': function() {
    return test(window, 'WebSocket');
  },

  /*** 
   * ## xhr2
   * ...
   * > ?
  */
  'xhr2': function() {
    return test(window, 'FormData');
  },

  /*** 
   * ## xhrupload
   * ...
   * > ?
  */
  'xhrupload': function() {
    return test(window, 'XMLHttpRequestUpload');
  },

  /*** 
   * ## Cross-Origin Resource Sharing
   * Method of performing XMLHttpRequests across domains
   * > Chrome 4, Firefox 3,5, IE 10,  Safari 4, Opera 12
  */
  'cors': function() {
    return test(window, "XMLHttpRequest") && 
      'withCredentials' in new XMLHttpRequest();
  },

  /*** 
   * ## Web Intents
   * Discovery mechanism and a limited to the essentials RPC system
   * last updated 2012 ????
   * > ?
  */
  'webintents': function() {
    return test(navigator, 'startActivity');
  },


  /*** 
   * # Data related APIs
   * ...
  */

  /*** 
   * ## blobconstructor
   * ...
   * > ?
  */
  'blobconstructor': function() {
    return test(window, 'Blob');
  },

  /*** 
   * ## dataset
   * ...
   * > ?
  */
  'dataset': function() {
    return test(document.documentElement, 'dataset');
  },

  /*** 
   * ## formdata
   * ...
   * > ?
  */
  'formdata': function() {
    return test(window, 'FormData');
  },

  /*** 
   * ## filereader
   * ...
   * > ?
  */
  'filereader': function() {
    return test(window, 'File') && 
      test(window, 'FileReader') && 
      test(window, 'FileList');
  },

  /*** 
   * ## fileapi
   * ...
   * > ?
  */
  'fileapi': function() {
    return test(window, 'File') && 
      test(window, 'FileReader') && 
      test(window, 'FileList') && 
      test(window, 'Blob') && 
      test(window, 'URL');
  },

  /*** 
   * ## json
   * ...
   * > ?
  */
  'json': function() {
    return test(window, 'JSON') && !! JSON.parse;
  },

  /*** 
   * ## localstorage
   * ...
   * > ?
  */
  'localstorage': function() {
    return test(window, 'localStorage');
  },

  /*** 
   * ## sessionstorage
   * ...
   * > ?
  */
  'sessionstorage': function() {
    return test(window, 'sessionStorage');
  },

  /*** 
   * ## websqldatabase
   * ...
   * > Chrome ?, Safari ?, Opera ?
  */
  'websqldatabase': function() {
    return test(window, 'openDatabase');
  },

  /*** 
   * ## IndexedDB
   * ...
   * > Chrome 11, Firefox 4, IE 10, Opera 17
  */
  'indexeddb': function() {
    return test(window, 'indexedDB', true) && 
      test(window, 'IDBTransaction', true) && 
      test(window, 'IDBKeyRange', true);
  },

  /** FileHandle API
   * Firefox 15
   */
  'filehandle': function() {
    // var IDBReq = indexedDB.open("myDB");
    // return IDBReq.onsuccess = function(){
    //   var DB = this.result;
    //   return typeof DB.createObjectStore === 'function';
    // };    
  },


  /*** 
   * # User related APIs
   * ...
  */

  /*** 
   * ## Hashchange event
   * Triggered in JavaScript when the URL's hash has changed
   * > IE 8, Chrome 5, Firefox 3.6, Opera 10.6, Safari 5
  */
  'hashchange': function() {
    return test(window, 'onhashchange');
  },

  /*** 
   * ## Page Visibility
   * Determining whether a document is visible on the display
   * > ?
  */
  'pagevisibility': function() {
    return test(document, 'hidden', true);
  },

  /*** 
   * ## Touch events
   * ...
   * > Chrome 22, Firefox 18 - 24, Opera 15
  */
  'touch': function() {
    return test(window, 'ontouchstart') || 
      (test(navigator, 'MaxTouchPoints') && navigator.MaxTouchPoints > 0) || 
      (test(navigator, 'msMaxTouchPoints') && navigator.msMaxTouchPoints > 0) || 
      (test(window, 'DocumentTouch') && document instanceof DocumentTouch);
  },

  /*** 
   * ## contenteditable
   * ...
   * > ?
  */
  'contenteditable': function() {
    return test(document.documentElement, 'contenteditable') && 
      test(window, 'HTMLMenuItemElement');
  },

  /*** 
   * ## draganddrop
   * ...
   * > ?
  */
  'draganddrop': function() {
    return test(document.documentElement, 'draggable') && 
      test(document, 'ondrag') && 
      test(document, 'ondrag');
  },


  /*** 
   * # DOM related APIs
   * ...
  */

  /*** 
   * ## Mutation Observer
   * Method for observing and reacting to changes to the DOM. 
   * > ?
  */
  'mutationobserver': function() {
    return test(window, 'MutationObserver');
  },

  /*** 
   * ## treewalker
   * ... 
   * > ?
  */
  'treewalker': function() {
    return test(window, 'TreeWalker');
  },


  /*** 
   * ## nodeiterator
   * ... 
   * > ?
  */
  'nodeiterator': function() {
    return test(window, 'NodeIterator');
  },

  /*** 
   * ## range
   * ... 
   * > ?
  */
  'range': function() {
    return test(window, 'Range');
  },


  /*** 
   * ## matchmedia
   * Finding out whether or not a media query applies to the document.
   * > Chrome 9, Firefox 6, IE 10, Opera 12.1  Safari 5.1
  */
  'matchmedia': function() {
    return test(window, 'matchMedia');
  },


  /*** 
   * # Graphic related APIs
   * ...
  */

  /*** 
   * ## WebGL - 3D Canvas graphics
   * ... 
   * > Chrome 18, Firefox 4 (partial), IE 11 (partial), Opera 15, Safari 5.1 (partial)
  */
  'webgl': function() {
    return test(window, 'WebGLRenderingContext');
  },

  /*** 
   * ## SVG
   * ... 
   * > Chrome 4, Firefox 3, IE 9, Opera 9, Safari 5
  */
  'svg': function() {
    return document.createElementNS && 
      document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
  },

  /*** 
   * ## SVG filters
   * ... 
   * > Chrome 8, Firefox 3, IE 10, Opera 9, Safari 6
  */
  'svgfilters': function() {
    return test(window, 'SVGFEColorMatrixElement') && 
      SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
  },


  /*** 
   * # Audio related APIs
   * ...
  */

  /*** 
   * ## Web Audio API
   * ... 
   * > Chrome 31, Firefox 27, Opera 20, Safari 7
  */
  'webaudio': function() {
    return test(window, 'AudioContext', true);
  },

  /*** 
   * ## Web Speech API
   * https://gist.github.com/alrra/6741915
   * > Chrome 11, Firefox 4, IE 10, Opera 17
  */
  'speechsynthesis': function() {
    return test(window, 'speechSynthesis') && 
      test(window, 'SpeechSynthesisUtterance', true);
  },


  /*** 
   * # Time related APIs
   * ...
  */

  /*** 
   * ## performance
   * ...
   * > ?
  */
  'performance': function() {
    return test(window, 'performance', true);
  },

  /*** 
   * ## requestanimationframe
   * ...
   * > ?
  */
  'requestanimationframe': function() {
    return test(window, 'requestAnimationFrame', true);
  },


  /*** 
   * # Scripting related APIs
   * ...
  */

  /***
   * ## Web Workers
   * Method of running scripts in the background, isolated from the web page
   * > IE 10, Firefox 3.5, Chrome 4, Safari 4, Opera 10.6
   */
  'worker': function() {
    return test(window, 'Worker');
  },

  /*** 
   * ## Shared Web Workers
   * Allowing multiple scripts to communicate with a single web worker.
   * > Chrome 4, Firefox 29, Safari 5, Opera 10.6
   */
  'sharedworker': function() {
    return test(window, 'SharedWorker');
  },

  /***
   * ## document.currentScript
   * Returns the script-element whose script is currently being processed.
   * > Chrome 29, Firefox 4, Opera 16, IE ?
  */
  'currentscript': function() {
    return test(document, 'currentScript') && 
      test(document, 'onbeforescriptexecute') && 
      test(document, 'onafterscriptexecute');
  },
  
  
  /*** 
   * # Environment detection
   * **Experimental** (environment detection has a high rate of misuse).
  */
  
  /***
   * ## Is mobile device (smartphone)
   * EXPERIMENTAL!
   * > ?
  */
  'is_mobile': function() {
    return (test('android') && test('mobile')) || 
      (test('blackberry') && test('mobile')) ||
      (test('firefox') && test('fennec')) ||
      (test('windows') && test('phone')) ||
      (test('opera') && test('presto')) ||
      (test('netfront') && !test('kindle')) ||
      test('iphone|ipod|meego|webos|iemobile') || 
      test('symbianos|doris|dorothy|gobrowser|maemo|minimo') || 
      test('semc-browser|skyfire|teashark|teleca|uzardweb');
  },
  
  /***
   * ## Is tablet device
   * EXPERIMENTAL!
   * > ?
  */
  'is_tablet': function() {
    return (!test('is_mobile') && devizr.supports('touch')) ||
      test('tablet|kindle|silk|ipad');  
  },

  /***
   * ## Is desktop device
   * EXPERIMENTAL!
   * > ?
  */
  'is_desktop': function() {
    return !devizr.supports('is_mobile') && !devizr.supports('is_tablet');  
  },

  /*** 
   * ## Is slow connection
   * From modernizr 'lowbandwidth'
   * > Firefox 12, ..
  */
  'is_slowconnection': function() {
    var connection = (test(navigator, 'connection') && 
      navigator.connection) || { type: 0 }; 
    return connection.type == 3 || // connection.CELL_2G
      connection.type == 4 || // connection.CELL_3G
      /^[23]g$/.test(connection.type); // string value in new spec
  }
  
};
