// Karma configuration

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '../dest/devizr.js',
      'spec/devizrSpec.js',
      'spec/helper.js'
    ],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'junit', 'coverage'],
    //reporters: ['progress', 'junit', 'dots', 'coverage'],

    // junitReporter: {
    //   outputFile: 'results/test.xml'
    // },
    
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries (these files will be instrumented by Istanbul)
      '../dest/devizr.js': ['coverage']
    },
    
    coverageReporter: {
      type : 'html',
      dir : 'coverage/' 
    },
    
    // web server port
    port: 9876,

    proxies: {
      '/': 'http://localhost:9876/'
    },
    
    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || 
    //   config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox', 'Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
