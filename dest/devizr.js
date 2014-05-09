/*!
 * devizr 0.5.1
 * Device asset manager and JS feature detector
 * Copyright (c) 2013, 2014 Uli Preuss
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*jshint browser:true */
/*global define:true */

(function(window, document, navigator) {
  "use strict";

  var devizr = (function(){

    var viewport = { width: window.innerWidth, height: window.innerHeight },
      stylesLoaded = false, 
      support = [],
			env = [],
      cache = [],
      test, tests = {};
      
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
    
      'touch': function() {
        return test(window, 'ontouchstart') || 
          (test(navigator, 'MaxTouchPoints') && navigator.MaxTouchPoints > 0) || 
          (test(navigator, 'msMaxTouchPoints') && navigator.msMaxTouchPoints > 0) || 
          (test(window, 'DocumentTouch') && document instanceof DocumentTouch);
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
      
      /*** HTML5 Elements & Attributes ******************************************************/
    
      'video': function() {
        return test(window, 'HTMLVideoElement');
      },
      
      'audio': function() {
        return test(window, 'HTMLAudioElement');
      },
      
      'picture': function() {
        return test(window, 'HTMLPictureElement');
      },
      
      'progressmeter': function() {
        return test(window, 'HTMLProgressElement') && 
    		  test('progress', 'max') &&
          test(window, 'HTMLMeterElement') && 
    			test('meter', 'max');
      },
    
      'attrdownload': function() {
        return test('a', 'download');
      },
      
      'attrsandbox': function() {
        return test('iframe', 'sandbox');
      },
      
      'contextmenu': function() {
        return test(document.documentElement, 'contextMenu') && 
          test(window, 'HTMLMenuItemElement');
      },
      
      'contenteditable': function() {
        return test(document.documentElement, 'contenteditable') && 
          test(window, 'HTMLMenuItemElement');
      },
         
      
      /*** Environment detection (Experimental!) ********************************************/
      
      'SSL': function() {
        return location.protocol === 'https:';
      },
      
      'ES3': function() {
        return (function(){ return !!this; }()) &&
          !Function.prototype.bind;
      },
      
      'ES5': function() {
        return (function(){ return !this; }()) &&
          Function.prototype.bind;
      },
        
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
     
      'MACOSX': function() {
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
    
        
    function DevizrError(message) {
      this.name = "Devizr Error";
      this.message = message || "";
    }
    DevizrError.prototype = new Error();
    DevizrError.prototype.constructor = DevizrError;

    function addTest(id, test_fn) {
      tests[id] = test_fn;
    }
    
    function detectJSFeaturesInIframe() {
    
      var prefixes = ["moz", "Moz", "webkit", "WebKit", "ms", "MS", "o", "O"],
          body = document.getElementsByTagName('body')[0],
          iframe = document.createElement('iframe');

      iframe.width = '1';
      iframe.height = '1';
      iframe.style.visibility = 'hidden'; 
      body.appendChild(iframe);
  
      function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function getIframeInterfaces(iface){
			  if(typeof iface === 'string') {
			  	return iframe.contentDocument.createElement(iface);
			  }
        switch(iface){
        case window : return iframe.contentWindow;
        case document : return iframe.contentDocument;
        case document.documentElement : return iframe.contentDocument.documentElement;
        case navigator : return iframe.contentWindow.navigator;
        case screen : return iframe.contentWindow.screen;
        }  
      }

      test = function(iface, prop, prefixed){
        
        var i, prefixedProp, result = false,
				    re, useragent = window.navigator.userAgent.toLowerCase();

        if(arguments.length === 1) {

					re = new RegExp(arguments[0], 'i');
			    return re.test(useragent);
        
        } else {
        
          iface = getIframeInterfaces(iface);

          if(prefixed) {
            for(i = 0; i < prefixes.length; i++) {
              prefixedProp = prefixes[i] + capitaliseFirstLetter(prop);
              if( prefixedProp in iface) {
                result = true;
              }
            }    
          }
    
          if(prop in iface) {
            result = true;
          }
    
          return result;
        }
              
      };

      for(var name in tests) {
        if(typeof tests[name] === 'function') {
          if(tests[name]()) {
						if(name === name.toUpperCase()) {
	            env.push(name);				
						} else {
	            support.push(name);				
						}
          }
        }
        else {
          throw new DevizrError("Invalid test - '" + name + "' is not a function!");
        }
      }

      iframe.onload = function(){
        body.removeChild(iframe);
      };

    }
   
    function preCheck(breakpoints){
    
      var len, i = 0, width, addons, item, addon, breakpoint, matchedBreakpoint = 0;
    
      if(is(breakpoints, "Array")) {
        len = breakpoints.length;
        for( ; i < len; i++) {
          width = breakpoints[i].width;
          if(!width) {
            width = 0;
          }
          if(viewport.width > width > matchedBreakpoint) {
            matchedBreakpoint = i;
          }      
        }
        breakpoint = breakpoints[matchedBreakpoint];
      } else if(is(breakpoints, "Object")) {
        breakpoint = breakpoints;
      } else {
        throw new Error("devizr: Object or Array required!");
      }
    
      addons = breakpoint.addons;
      for(item in addons) {
        if(addons.hasOwnProperty(item)) {
          addon = addons[item];
          if(addon.script) {
            loadScript(addon);
          }
          if(addon.style) {
            addon.stylesRequired = true;
            loadStylesheet(addon);
          }
        }
       }
    
    }

    function is(obj, type){
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';      
    }
  
    function supports(feature){
      return !!~support.indexOf(feature);
    }
  
    function runTestsAndSelectAssets(addon, type){
      var tests = addon.tests,
        testsPassed = true,
        i = 0;
    
      if(typeof tests === 'string') {
        tests = [tests];
      }
    
      if(tests) {
        for( ; i < tests.length; i++) {
          if(tests[i][0] === '!') {
            if(supports(tests[i].substring(1))) {
              testsPassed = false;
            }          
          } else {
            if(!supports(tests[i])) {
              testsPassed = false;
            }
          }
        }                
      }
  
      if(testsPassed) {
        return addon[type];
      }
    
    }

    function loadScript(addon) {
      var script, firstScript, ival;
    
      addon.script = runTestsAndSelectAssets(addon, "script");

      if(!addon.script || !!~cache.indexOf(addon.script)) {
        return;
      }
    
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = addon.script;
      script.async = true;
      script.onload = function(){
        cache.push(addon.script);  
        if(addon.complete) {
          if(addon.stylesRequired) {
            ival = setInterval(function() {
              if (stylesLoaded) {
                clearInterval(ival);
                addon.complete();
              }
            }, 10);
          } else {
            addon.complete();
          }        
        }
      };
      firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }
  
    function loadStylesheet(addon) {
      var style, css, head, http = new XMLHttpRequest();
    
      addon.style = runTestsAndSelectAssets(addon, "style");
      if(!addon.style || !!~cache.indexOf(addon.style)) {
        return;
      }
      cache.push(addon.style);

      http.open("GET", addon.style);
      http.onreadystatechange = function() {
        if (http.readyState === 4) {
          style = document.createElement("style");
          style.type = "text/css";
          css = http.responseText;
          if (style.styleSheet){
            style.styleSheet.cssText = css;
          } else {
            style.appendChild(document.createTextNode(css));
          }
          head = document.getElementsByTagName("head")[0];
          head.appendChild(style);
          stylesLoaded = true;
        }
      };
      http.send(null);
    }
  
    return {
      version: '0.5.1',
      load : preCheck,
      support: support,
			env: env,
      supports: supports,
      tests: tests,
      cache : cache,
      addTest: addTest,
      init: detectJSFeaturesInIframe
    };
    
  }());

  if (typeof define === 'function' && define.amd) {
    //define(['Modernizr'], function() {
    define([], function() {
      return devizr;
    });
  }
  else {
    window.devizr = devizr;
    // init detection
  }

}(window, document, navigator));
