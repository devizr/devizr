/* jshint browser:true */
/* global UglifyJS:true */

var app, pkg, inputs, code, features_array, textarea, customFeatures, features;

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

function getIsotime() {
  var d = new Date();
  return d.getUTCFullYear() + '-' + 
    (d.getUTCMonth() + 1) + '-' + 
    d.getUTCDate() + 'T' + 
    new Date(d).toLocaleTimeString();
}

function toggleFeatureInfos() {
  var article = document.querySelector('article');
  if(article.className === "collapse") {
    article.className = "expand";
  } else {
    article.className = "collapse";
  }
}

function toggleFeatureSelection() {
  var section = document.querySelector('section');
  var checkboxes = document.querySelectorAll('input[value][type="checkbox"]');
	var i;
  if(section.className === "allselect") {
    for(i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;  
    }
    section.className = "noselect";
  } else {
    for(i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;  
    }
    section.className = "allselect";
  }
}

function toggleCheckboxGroup() {
  var id = 'wrapper_' + this.value,
    i = 0, elem, hide;
    
  if(document.getElementById(id) !== null) {
    elem = document.getElementById(id);
    hide = !!~elem.className.indexOf('hide') ? 'hide ' : '';
    if(this.checked) {
      elem.className = hide + 'checked';
    } else {
      elem.className = hide + 'unchecked';
    }
  } else if(this.className === 'group'){
    if(this.checked === false) {
      for( ; i < inputs.length; i++) {
        if(inputs[i].className === this.value) {
          inputs[i].checked = false;
        }
      }
    } else {
      for( ; i < inputs.length; i++) {
        if(inputs[i].className === this.value) {
          inputs[i].checked = true;
        }
      }
    }
  }
}

function printWarning() {
  textarea.innerHTML = '';
  textarea.className = 'warning';
  setTimeout(function(){
    textarea.innerHTML = "" +
      "Please select one or more features" + "\n" +
      "and then push 'Generate'- button.";          
  },500);
}

function printCode() {
  textarea.className = 'normal';
  textarea.innerHTML = code;
}

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

function minifyCode(code) {

  var ast = UglifyJS.parse(code);
  var compressor = UglifyJS.Compressor();
  
  // compress
  ast.figure_out_scope();
  ast = ast.transform(compressor);

  // mangle
  ast.figure_out_scope();
  ast.compute_char_frequency();
  ast.mangle_names();

  return ast.print_to_string();  
}

function addCommentHeader(code, pkg) {
  var isotime = getIsotime();
  
  return '/*! devizr ' + pkg.version + ' | MIT license' + '\n' +
    ' * ' + pkg.description + '\n' +
    ' * Custom Build ' + isotime + '\n' +
    ' * Copyright (c) 2013, ' + new Date().getFullYear() + ' Uli Preuss'  + '\n' +
    ' * ' + pkg.homepage + '\n' +
    '*/\n' + code;
}

function prepareCode() {
  var tests = 'tests = {\n  ' + customFeatures.join(',\n  ') + '\n};';
  var code = app.replace(/\/\/\{\{DEVIZR-TESTS\}\}/i, tests);
  code = code.replace(/\{\{VERSION\}\}/g, pkg.version);
  code = minifyCode(code);  
  return addCommentHeader(code, pkg);
}

function download() {
  var generateButton = document.getElementById('generate');
  generateButton.download="devizr." + pkg.version + ".custom.min.js";
  generateButton.href = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(code);      
}
      
function addFeatures() {
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].checked === true) {
      for(var k = 0; k < features_array.length; k++) {
        if(features_array[k].split("':")[0] === "'" + inputs[i].value) {
          customFeatures.push(features_array[k]);
          features.push(inputs[i].value);
        }
      }
    }
  }      
}
  
function generateCode() {
  customFeatures = [];
  features = [];
  textarea = document.querySelector('textarea');
  
  addFeatures();
  
  if(customFeatures.length === 0) {
    printWarning();    
  } else {
    code = prepareCode(customFeatures);    
    printCode(); 
    download();        
  }
  
}

getTextFile('../src/devizr.app.js', function(file_content) {
  app = file_content;
});

getTextFile('../package.json', function(file_content) {
  pkg = JSON.parse(file_content);
  document.querySelector('header span').innerHTML = pkg.version;
});

getTextFile('data/features.json', function(json_content) {
  
  var infos = JSON.parse(json_content);
    
  getTextFile('../src/devizr.tests.js', function(file_content) {

    var lines, html, name, header, headerId,
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
      
      html += '' +
      '<h2>' + '\n' + 
      '<input type="checkbox" class="group" id="' + headerId + '" value="' + headerId + '">' + '\n' + 
      '<label for="' + headerId + '">' + header + '</label>' + '\n' + 
      '</h2>';
      
      lines = content.trim().split('\n');

      lines.forEach(function(line) {

        line = line.trim();
        
        if (/^'\w+'/.test(line.trim())) {
          name = '' + line.match(/^'\w+'/i, '') || '';
          name = name.replace(/'/g, "");
          if(infos[name]) {
            var source = infos[name].source || '';
            if(!!~source.indexOf('caniuse')) {
              var title = infos[name].title.replace(/ & |\(basic support\)/g, '').toLowerCase();
              source = '<a href="http://caniuse.com/#search=' + 
                title + '">http://caniuse.com/#search=' + 
                title + '</a>'; 
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
            '<tr><td><b>ID</b></td><td class="content">' + name + '</td></tr>' + '\n';
          
            var support = infos[name].support;
            if(support && support !== '' && support !== '?' && support !== 'none') {
              html += '<tr><td><b>Browser</b></td><td class="content">' + support + '</td></tr>' + '\n';               
            }
            var status = infos[name].status;
            if(status && status !== '' && status !== '?' && status !== 'none') {
              html += '<tr><td><b>Status</b></td><td class="content">' + status + '</td></tr>' + '\n';
            }
            if(source && source !== '' && source !== '?' && source !== 'none') {
              html += '<tr><td><b>Source</b></td><td class="content">' + source + '</td></tr>' + '\n';
            }

            html += '' +
            '</table>' + '\n' + 
            '</div>';
          }
        }
        
      });

      document.querySelector('article').innerHTML += '' +
        '<div id="wrapper_' + name + '" class="' + '">' + html + '</div>';

    });
    
    document.querySelector('a#toggle-infos').addEventListener('click', toggleFeatureInfos, false);

    document.querySelector('a#toggle-selection').addEventListener('click', toggleFeatureSelection, false);

    document.querySelector('a#generate').addEventListener('click', generateCode, false);

    inputs = document.getElementsByTagName('input');
    
    for(var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('click', toggleCheckboxGroup, false);
    }
 
  });
 
});
