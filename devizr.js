/*!
 * devizrJS ##VERSION##
 * Copyright (c) 2013, ##YEAR## Uli Preuss
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
/*global define:true, DocumentTouch:true */

(function(window, document, navigator) {
  "use strict";

  var devizr = (function(){

    var viewport = { width: window.innerWidth, height: window.innerHeight },
      styleDecl = window.getComputedStyle(document.documentElement, ""),
      pfx = (
        Array.prototype.slice.call(styleDecl).join("").match(/-(moz|webkit|ms)-/) || 
        (styleDecl.OLink === "" && ["", "o"])
      )[1],
      stylesLoaded = false, 
      support = [],
      cache = [],
      features, simpleTestCases, props, i;
    
      features = [
        "applicationcache", "datalist", "deviceorientation", "dragndrop", "downloadattr", "eventsource", "fileapi", 
        "formdata", "geolocation", "hashchange", "highresolutiontime", "iframesandbox", "indexeddb", "iscontenteditable", 
        "localstorage", "matchmedia", "meter", "mutationobserver", "notification", "online", "pagevisibility", "performance", 
        "postmessage", "progress", "requestAnimationframe", "requiredattr", "retina", "sessionstorage", "sharedworker", 
        "svg", "template", "touch", "timing", "usermedia", "usertiming", "vibrationapi", "webaudioapi", "webgl", "websocket", 
        "worker", "xhrupload"
      ];
    
      simpleTestCases = [
        // [INTERFACE, PROPERTY/ATTRIBUTE, IDENTIFIER, PREFIX],
        [window, "WebGLRenderingContext", "webgl"],
        [window, "postMessage", "postmessage"],
        [window, "applicationCache", "applicationcache"],
        [window, "onhashchange", "hashchange"],
        [window, "matchMedia", "matchmedia"],
        [window, "EventSource", "eventsource"],
        [window, "WebSocket", "websocket"],
        [window, "Notification", "notification"],
        [window, "Worker", "worker"],
        [window, "SharedWorker", "sharedworker"],
        [window, "localStorage", "localstorage"],
        [window, "sessionStorage", "sessionstorage"],
        [window, "FormData", "formdata"],
        [window, "MutationObserver", "mutationobserver"],
        [window, "ondeviceorientation", "deviceorientation"],
        [window, "XMLHttpRequestUpload", "xhrupload"],
        [window, "performance", "performance", true],
        [window, "requestAnimationFrame", "requestanimationframe", true],
        [window, "AudioContext", "webaudioapi", true],
        [navigator, "geolocation", "geolocation"],
        [navigator, "getUserMedia", "usermedia", true],
        [navigator, "vibrate", "vibrationapi", true],
        [navigator, "onLine", "online"],
        [document, "hidden", "pagevisibility", true],
        [document.documentElement, "requestFullscreen", "fullscreen", true],
        ["iframe", "iframesandbox", "sandbox"],
        ["template", "template", "content"],
        ["div", "iscontenteditable", "isContentEditable"],
        ["div", "dragndrop", "draggable"],
        ["a", "downloadattr", "download"],
        ["input", "requiredattr", "required"],
        ["meter"],
        ["progress"]
      ];

      for(i = 0; i < simpleTestCases.length; i++) {
        props = simpleTestCases[i];
        if(props.length === 4) {
          if(typeof props[0] === "object") {
            if(props[1] in props[0] || pfx + capitaliseFirstLetter(props[1]) in props[0]) {
              support.push(props[2]);
            }  
          } else if (typeof props[0] === "string") {
            if(props[2] in document.createElement(props[0]) || pfx + capitaliseFirstLetter(props[1]) in props[0]) {
              support.push(props[1]);
            }         
          }
        } else if(props.length === 3) {
          if(typeof props[0] === "object") {
            if(props[1] in props[0]) {
              support.push(props[2]);
            }  
          } else if (typeof props[0] === "string") {
            if(props[2] in document.createElement(props[0])) {
              support.push(props[1]);
            }         
          }
        } else if(props.length === 1) {
          if(!!document.createElement(props[0])) {
            support.push(props[0]);
          } 
        }
      }
  
        
    if(
      ("ontouchstart" in window) || 
      (navigator.MaxTouchPoints > 0) || 
      (navigator.msMaxTouchPoints > 0) || 
      (window.DocumentTouch && document instanceof DocumentTouch)) {
        support.push("touch");
    } else { 
      if(checkTouchEnabledViaCSS()) {
        support.push("touch");
      }
    }
  
    if(window.devicePixelRatio > 1 ||
        (window.matchMedia && window.matchMedia(
          "(-webkit-min-device-pixel-ratio: 1.5)," + 
          "(-moz-min-device-pixel-ratio: 1.5)," +
          "(min-device-pixel-ratio: 1.5)"
        ).matches)) {
        support.push("retina");
    }
    
    if(document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) {
      support.push("svg");  
    }
  
    if("File" in window && "FileReader" in window && "Blob" in window && "URL" in window) {
      support.push("fileapi");  
    }
  
    if (supports("performance") && ("timing" in window.performance || pfx + "Timing" in window.performance)) {
      support.push("timing");  
    }
    if (supports("performance") && ("now" in window.performance || pfx + "Now" in window.performance)) {
      support.push("highresolutiontime");  
    }
    if (supports("performance") && ("mark" in window.performance || pfx + "Mark" in window.performance)) {
      support.push("usertiming");  
    }
  
    if (
      ("indexedDB" in window && "IDBTransaction" in window && "IDBKeyRange" in window) || 
      (pfx + "IndexedDB" in window && pfx + "IDBTransaction" in window && pfx + "IDBKeyRange" in window) 
    ) {
      support.push("indexeddb");
    }
  
    if("list" in document.createElement("input") && !!document.createElement("datalist") && "HTMLDataListElement" in window) {
      support.push("datalist");
    } 
  
    function checkTouchEnabledViaCSS(){
      var body = document.getElementsByTagName("body")[0],
        div = document.createElement("div"),
        style = document.createElement("style"),
        css = '@media(touch-enabled),(-' + pfx + '-touch-enabled){#devizrTest{top:3px;position:absolute}}',
        bool;
  
      div.id = "devizrTest";
      style.type = "text/css";
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      div.appendChild(style);
      body.appendChild(div);
  
      bool = div.offsetTop === 3;
      body.removeChild(div);
      return bool;    
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
   
    function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
			version: '##VERSION##',
      load : preCheck,
      support: support.sort(),
      supports: supports,
      features: features,
      cache : cache
    };
    
  }());

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return devizr;
    });
  }
  else {
    window.devizr = devizr;
  }

}(window, document, navigator));
