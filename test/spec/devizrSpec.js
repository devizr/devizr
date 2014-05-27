/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

window.onload = function() {
  devizr.init();  
};

describe("devizr", function() {
  
  describe("test", function() {
    
    it("supports touch", function() {
      expect(devizr.feature('touch')).toEqual(false);
    });
    
    it("supports hashchange", function() {
      expect(devizr.feature('hashchange')).toEqual(true);
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
  
});
