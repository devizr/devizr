/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, devizr:true */

function getNumberOfBodyChilden(){
  var body = document.getElementsByTagName('body')[0];
  return body.childNodes.length;
}

function appendElement(id){
  var body = document.getElementsByTagName('body')[0];
  var p = document.createElement('p');
  p.id = id;
  p.innerHTML = id;
  body.appendChild(p);
}

function removeElement(id){
  var body = document.getElementsByTagName('body')[0];
  var p = document.getElementById(id);
  body.removeChild(p);
}

var jasmineExtensions = {
  devizrSpies: {},
  spyOnEvent: function(element, eventName) {
    var control = {
      triggered: false
    };
    element.on(eventName, function() {
      control.triggered = true;
    });
    jasmineExtensions.devizrSpies[element[eventName]] = control;
  }
};
 
var spyOnEvent = jasmineExtensions.spyOnEvent;
 
beforeEach(function() {
  this.addMatchers({
    toHaveBeenTriggered: function() {
      var control = jasmineExtensions.devizrSpies[this.actual];
      return control.triggered;
    }
  });
});




