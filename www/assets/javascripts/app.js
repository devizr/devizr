/* jshint browser:true */
/* global UglifyJS: true */

var app, pkg, toggle = true;

function getTextFile(src, callback) {
  var http = new XMLHttpRequest();
  http.open("GET", src);
  http.onreadystatechange = function() {
    if (http.readyState === 4) {
      callback(http.responseText);
    }
  };
  http.send();
}

function addCommentHeader(content, pkg) {
  var isotime = new Date().getFullYear() + '-' + 
    new Date().getMonth() + '-' + 
    new Date().getDay() + 'T' + 
    new Date(new Date()).toLocaleTimeString();
  
  return '/*! devizr ' + pkg.version + ' | MIT & BSD' + '\n' +
    ' * ' + pkg.description + '\n' +
    ' * Custom Build ' + isotime + '\n' +
    ' * Copyright (c) 2013, ' + new Date().getFullYear() + ' Uli Preuss'  + '\n' +
    ' * ' + pkg.homepage + '\n' +
    '*/\n' + content;
}

getTextFile('data/features.json', function(json_content) {
  
  var infos = JSON.parse(json_content);
  
  function getFeatureArray(content_array) {
    var features_string, 
      test_array = [], 
      test_array_clean = [], 
      test_string = content_array.join('').trim();
      
    test_array = test_string.split('\n');
    test_array.forEach(function(line, index) {
      if (index > 4 && index < test_array.length-1) {
        test_array_clean.push(line.trim());
      }
    });
    
    features_string = test_array_clean.join('');
    features_string = features_string.replace(/\},'/g, "}\n'");
    return features_string.split('\n');
  }
  
  getTextFile('../src/devizr.app.js', function(file_content) {
    app = file_content;
  });
  
  getTextFile('../package.json', function(file_content) {
    pkg = JSON.parse(file_content);
    document.querySelector('header span').innerHTML = pkg.version;
  });
  
  getTextFile('../src/devizr.tests.js', function(file_content) {

    var lines, html, name, header, headerId, features_array,
      comments = file_content.match(/(?:\/\*\*\*(?:[\s\S]*?)\*\/[^\*?\/':]*)/g),
      content_array = file_content.split(/(?:\/\*\*\*(?:[\s\S]*?)\*\/[^\*?\/':]*)/g);
    
    features_array = getFeatureArray(content_array);
    
    content_array.forEach(function(content, index) {
      
      if(index === 0) {
        return;
      }
      
      html = '';
      
      header = comments[index-1] || '';
      header = header.replace(/\*|\//g, '').trim();
      headerId = header.replace(/ /g, '').toLowerCase();
      
      html += '<h2>';
      html += '<input type="checkbox" class="group" id="' + headerId + '" value="' + headerId + '">';
      html += '<label for="' + headerId + '">' + header + '</label>';
      html += '</h2>';
      
      lines = content.trim().split('\n');

      lines.forEach(function(line) {

        line = line.trim();
        
        if (/^'\w+'/.test(line.trim())) {
          name = '' + line.match(/^'\w+'/i, '') || '';
          name = name.replace(/'/g, "");
          if(infos[name]) {
            var source = infos[name].source || '';
            if(!!~source.indexOf('caniuse')) {
              source = '<a href="http://caniuse.com/#search=' + 
                infos[name].title + '">http://caniuse.com/#search=' + 
                infos[name].title + '</a>'; 
            } else if(!!~source.indexOf('MDN')) {
              source = source.replace(/MDN| /g, '');
              source = '<a href="https://developer.mozilla.org/en-US/search?q=' + 
                source + '">https://developer.mozilla.org/en-US/search?q=' + 
                source + '</a>'; 
            }
            html += '' +
              '<div class="info-wrapper">' + '\n' + 
              '<h3>' + '\n' + 
              '<input type="checkbox" class="' + headerId + '" id="' + name + '" value="' + name + '">' + '\n' + 
              '<label for="' + name + '">' + infos[name].title + '</label>' + '\n' + 
              '</h3>' + '\n' + 
              '<p>' + infos[name].description + '</p>' + '\n' + 
              '<table>' + '\n' + 
              '<tr><td><b>ID</b></td><td class="content">' + name + '</td></tr>' + '\n' + 
              '<tr><td><b>Browser</b></td><td class="content">' + infos[name].support + '</td></tr>' + '\n' + 
              '<tr><td><b>Status</b></td><td class="content">' + infos[name].status + '</td></tr>' + '\n' + 
              '<tr><td><b>Source</b></td><td class="content">' + source + '</td></tr>' + '\n' + 
              '</table>' + '\n' + 
              '</div>';
          }
        }
        
      });

      document.querySelector('article').innerHTML += '' +
        '<div id="wrapper_' + name + '" class="' + '">' + html + '</div>';

    });
    
    document.querySelector('a#toggle').addEventListener('click', function(){
      var body = document.getElementsByTagName('body')[0];
      if(toggle) {
        toggle = false;
        body.className = "expand";
      } else {
        toggle = true;
        body.className = "collapse";
      }
    }, false);

    document.querySelector('a#generate').addEventListener('click', function(){
      var textarea = document.querySelector('textarea');
      var features_selected = [];
      var features = [];
      for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].checked === true) {
          for(var k = 0; k < features_array.length; k++) {
            if(features_array[k].split("':")[0] === "'" + inputs[i].value) {
              features_selected.push(features_array[k]);
              features.push(inputs[i].value);
            }
          }
        }
      }    
      
      if(features_selected.length === 0) {
        textarea.innerHTML = '';
        textarea.className = 'warning';
        setTimeout(function(){
          textarea.innerHTML = 'Please select one or more features';
          textarea.innerHTML+= '\nand then push \'Generate\'- button.';          
        },500);
        
      } else {
        var tests = 'tests = {\n  ' + features_selected.join(',\n  ') + '\n};';
        //var uriContent = "data:application/octet-stream," + encodeURIComponent(content);
        //var newWindow = window.open(uriContent, 'downloadDocument');
        
        var content = app.replace(/\/\/\{\{DEVIZR-TESTS\}\}/i, tests);
        
        // compressor needs figure_out_scope too
        var ast = UglifyJS.parse(content);
        ast.figure_out_scope();
        
        var compressor = UglifyJS.Compressor({ 
          //preserveComments: 'some' 
        });
        ast = ast.transform(compressor);

        // need to figure out scope again so mangler works optimally
        ast.figure_out_scope();
        ast.compute_char_frequency();
        ast.mangle_names();

        // get Ugly code back :)
        content = ast.print_to_string();  
        
        content = addCommentHeader(content, pkg);
        
        textarea.className = 'normal';
        textarea.innerHTML = content;
                  
        var generateButton = document.getElementById('generate');
        generateButton.download="devizr." + pkg.version + ".custom.min.js";
        generateButton.href = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(content);
  
      }
          
    }, false);

    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('click', function(){
        var id = 'wrapper_' + this.value;
        if(document.getElementById(id) !== null) {
          var hide = !!~document.getElementById(id).className.indexOf('hide') ? 'hide ' : '';
          if(this.checked) {
            document.getElementById(id).className = hide + 'checked';
          } else {
            document.getElementById(id).className = hide + 'unchecked';
          }
        } else if(this.className === 'group'){
          if(this.checked === false) {
            for(var k = 0; k < inputs.length; k++) {
              if(inputs[k].className === this.value) {
                inputs[k].checked = false;
              }
            }
          } else {
            for(var j = 0; j < inputs.length; j++) {
              if(inputs[j].className === this.value) {
                inputs[j].checked = true;
              }
            }
            
          }
        }
      }, false);
    }
 
  });
 
});
