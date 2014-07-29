/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

window.onload = function() {
  devizr.init();  
};

describe("devizr", function() {
  
  describe("test", function() {
    
    it("Browser don't supports touch events", function() {
      expect(devizr.feature('touch')).toEqual(false);
    });
    
    it("Browser supports 'hashchange' event", function() {
      expect(devizr.feature('hashchange')).toEqual(true);
    });
    
    it("Browser supports HTML5 'template' element", function() {
      expect(devizr.feature('template')).toEqual(true);
    });
    
  });
  
  describe("test", function() {
    
    it("devizr.feature('fullscreen') returns a boolean", function() {
      
			// Moz only:
      if (typeof document.mozFullScreen !== 'undefined'){
        expect(devizr.feature('fullscreen')).toBool;
      }
			
    });
    
  });  
  
  describe("test", function() {
    
    it("devizr.resolve('notiFIcatioN') in current FF returns 'Notification'", function() {

      expect(devizr.resolve('notiFIcatioN')).toBe('Notification');
      
    });
    
    
  });  
  
});
