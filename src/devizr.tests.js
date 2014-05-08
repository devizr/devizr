/*jshint browser:true */
/*global devizr: true, test: true, DocumentTouch:true, SVGFEColorMatrixElement:true */
"use strict";
var // Please do not change the first four lines!!!
tests = {

  /*** Device related APIs **************************************************************/

  'fullscreen': function() {
    return test(window, 'fullScreen') || 
      test(document.documentElement, 'requestFullscreen', true);
  },

  'ambientlight': function() {
    return test(window, 'ondevicelight');
  },

  'battery': function() {
    return test(navigator, 'battery', true);
  },

  'geolocation': function() {
    return test(navigator, 'geolocation');
  },

  'pointerlock': function() {
    return test(document.documentElement, 'requestPointerLock', true) && 
      test(document, 'exitPointerLock', true) && 
      test(document, 'pointerLockElement', true);
  },

  'userproximity': function() {
    return test(window, 'onuserproximity');
  },

  'devicemotion': function() {
    return test(window, 'DeviceMotionEvent'); 
  },

  'deviceorientation': function() {
    return test(window, 'DeviceOrientationEvent');
  },

  'orientationchange': function() {
    return test(screen, 'onmozorientationchange') || 
      test(screen, 'onmsorientationchange');
  },

  'vibrate': function() {
    return test(navigator, 'vibrate', true);
  },

  'gamepads': function() {
    return test(navigator, 'getGamepads');
  },

  'getusermedia': function() {
    return test(navigator, 'getUserMedia', true);
  },

  'contextmenu': function() {
    return test(document.documentElement, 'contextMenu') && 
      test(window, 'HTMLMenuItemElement');
  },
  
  'touch': function() {
    return test(window, 'ontouchstart') || 
      (test(navigator, 'MaxTouchPoints') && navigator.MaxTouchPoints > 0) || 
      (test(navigator, 'msMaxTouchPoints') && navigator.msMaxTouchPoints > 0) || 
      (test(window, 'DocumentTouch') && document instanceof DocumentTouch);
  },

  'contenteditable': function() {
    return test(document.documentElement, 'contenteditable') && 
      test(window, 'HTMLMenuItemElement');
  },

  'draganddrop': function() {
    return test(document.documentElement, 'draggable') && 
      test(document, 'ondrag') && 
      test(document, 'ondrop');
  },
  

  /*** Communication related APIs *******************************************************/

  'online': function() {
    return test(navigator, 'onLine');
  },

  'onlineevents': function() {
    return test(window, 'ononline') && 
      test(window, 'onoffline');
  },

  'eventsource': function() {
    return test(window, 'EventSource');
  },

  'applicationcache': function() {
    return test(window, 'applicationCache');
  },

  'connection': function() {
    return test(navigator, 'connection');
  },

  'notification': function() {
    return test(window, 'Notification', true);
  },

  'postmessage': function() {
    return test(window, 'postMessage');
  },

  'websocket': function() {
    return test(window, 'WebSocket');
  },

  'xhr2': function() {
    return test(window, 'FormData') && 
      test(window, 'XMLHttpRequestUpload');
  },

  'cors': function() {
    return test(window, "XMLHttpRequest") && 
      'withCredentials' in new XMLHttpRequest();
  },

  /*** Data related APIs ****************************************************************/

  'blobconstructor': function() {
    return test(window, 'Blob');
  },

  'dataset': function() {
    return test(document.documentElement, 'dataset');
  },

  'filereader': function() {
    return test(window, 'File') && 
      test(window, 'FileReader') && 
      test(window, 'FileList');
  },

  'fileapi': function() {
    return test(window, 'File') && 
      test(window, 'FileReader') && 
      test(window, 'FileList') && 
      test(window, 'Blob') && 
      test(window, 'URL');
  },

  'json': function() {
    return test(window, 'JSON') && !! JSON.parse;
  },

  'namevaluestorage': function() {
    return test(window, 'localStorage') && test(window, 'sessionStorage');
  },

  'websqldatabase': function() {
    return test(window, 'openDatabase');
  },

  'indexeddb': function() {
    return test(window, 'indexedDB', true) && 
      test(window, 'IDBTransaction', true) && 
      test(window, 'IDBKeyRange', true);
  },

  'filehandle': function() {
    // var IDBReq = indexedDB.open("myDB");
    // return IDBReq.onsuccess = function(){
    //   var DB = this.result;
    //   return typeof DB.createObjectStore === 'function';
    // };    
  },

  /*** User related APIs ****************************************************************/

  'hashchange': function() {
    return test(window, 'onhashchange');
  },

  'pagevisibility': function() {
    return test(document, 'hidden', true);
  },

  'donottrack': function() {
    return test(navigator, 'doNotTrack');
  },

  /*** DOM related APIs *****************************************************************/

  'mutationobserver': function() {
    return test(window, 'MutationObserver');
  },

  'treewalker': function() {
    return test(window, 'TreeWalker');
  },

  'nodeiterator': function() {
    return test(window, 'NodeIterator');
  },

  'range': function() {
    return test(window, 'Range');
  },

  'matchmedia': function() {
    return test(window, 'matchMedia');
  },


  /*** Graphic related APIs *************************************************************/

  'webgl': function() {
    return test(window, 'WebGLRenderingContext');
  },

  'svg': function() {
    return document.createElementNS && 
      document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
  },

  'svgfilters': function() {
    return test(window, 'SVGFEColorMatrixElement') && 
      SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
  },


  /*** Audio related APIs ***************************************************************/

  'webaudio': function() {
    return test(window, 'AudioContext', true);
  },

  'speechsynthesis': function() {
    return test(window, 'speechSynthesis') && 
      test(window, 'SpeechSynthesisUtterance', true);
  },


  /*** Time related APIs ****************************************************************/

  'performanceapi': function() {
    return test(window, 'performance', true);
  },

  'highresolutiontime': function() {
    return test(window, 'performance', true) && 
      typeof window.performance.now === 'function';
  },

  'usertiming': function() {
    return test(window, 'performance', true) && 
      typeof window.performance.now === 'function' && 
      typeof window.performance.mark === 'function' ;
  },

  'requestanimationframe': function() {
    return test(window, 'requestAnimationFrame', true);
  },


  /*** Scripting related APIs ***********************************************************/

  'worker': function() {
    return test(window, 'Worker');
  },

  'sharedworker': function() {
    return test(window, 'SharedWorker');
  },

  'currentscript': function() {
    return test(document, 'currentScript') && 
      test(document, 'onbeforescriptexecute') && 
      test(document, 'onafterscriptexecute');
  },
  
  
  /*** Environment detection (Experimental!) ********************************************/
  
  'MOBILE': function() {
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
  
  'TABLET': function() {
    return (!test('MOBILE') && devizr.supports('touch')) ||
      test('tablet|kindle|silk|ipad');  
  },

  'DESKTOP': function() {
    return !test('MOBILE') && !test('TABLET');  
  },

  'SLOWCONNECTION': function() {
    var connection = (test(navigator, 'connection') &&  navigator.connection) || { type: 0 }; 
    return connection.type == 3 || connection.type == 4 || /^[23]g$/.test(connection.type);
  },
  
  'RETINA': function() {
    return window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(
        "(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches
			);
  },
  
  'MACOS': function() {
    return test('mac os|macos');
  },

  'WINDOWS': function() {
    return test('windows|htc_hd2|xblwp|zunewp|IEMobile');
  },

  'LINUX': function() {
    return test('linux') &&
      (test('debian|fedora|ubuntu|gentoo|red hat|suse|arch|centos') || 
      test('slackware|mint|midori|kanotix|linspire|maemo|mageia|mandriva'));
  },

  'BSD': function() {
    return test('freebsd|openbsd|netbsd|dragonfly');
  },

  'ANDROID': function() {
    return test('android');
  },

  'BLACKBERRY': function() {
    return test('blackberry|bb10');
  },

  'IOS': function() {
    return (test('like Mac OS') && test('iphone|ipad|ipod')) ||
      (test('Puffin') && test('Linux'));
  },

  'FIREFOXOS': function() {
    return test('firefox') && test('mobile');
  },

  'CHROMEOS': function() {
    return test('cros');
  },

  'UBUNTUTOUCH': function() {
    return test('ubuntu') && test('touch|tablet|mobile');
  },

  'GNUOS': function() {
    return test('gnu|icecat');
  },

  'WEBOS': function() {
    return test('webos|hpwos');
  },

  'SOLARIS': function() {
    return test('sunos');
  },

  'SYMBIAN': function() {
    return test('symbos');
  },

  'XBOX': function() {
    return test('xbox');
  },

  'WII': function() {
    return test('wii|nintendo');
  },

  'JAVA': function() {
    return test('java');
  }
  
};
