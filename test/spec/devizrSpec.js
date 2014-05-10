/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

window.onload = function() {
  devizr.init();  
};

describe("devizr", function() {
  
  describe("test", function() {
    
    it("supports touch", function() {
      expect(devizr.supports('touch')).toEqual(false);
    });
    
    it("supports hashchange", function() {
      expect(devizr.supports('hashchange')).toEqual(true);
    });
    
  });
  
  describe("test", function() {
    
    it("devizr.supports('fullscreen') returns a boolean", function() {
      // Moz only:
        if (typeof document.mozFullScreen !== 'undefined'){

          expect(devizr.supports('fullscreen')).toBool;
          
        }
      
    });
    
  });  
  
});
