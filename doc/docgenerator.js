function getTextFile(src, callback) {
  var http = new XMLHttpRequest();
  http.open("GET", src);
  http.onreadystatechange = function() {
    if (http.readyState === 4) {
      var text = http.responseText;
      callback(text);
    }
  };
  http.send();
}

var converter = new Showdown.converter();

getTextFile('../src/devizr.tests.js', function(file_content) {

  var lines, html, name,
  comments = file_content.match(/(?:\/\*\*\*(?:[\s\S]*?)\*\/[^\*\/:]*)/gm);

  comments.forEach(function(comment) {

    name = '';
    browser = -1;
    html = '';
    lines = comment.trim().split('\n');

    lines.forEach(function(line) {

      line = line.trim();
      line = line.replace(/^\* /, '');
      if (/^## /.test(line.trim())) {
        line = line + '\n' + '{{name}}';
      }
      if (/^\>/.test(line.trim())) {
        browser = line.split(',').length;
      }
      if (/^'\w+'/.test(line.trim())) {
        name = '' + line.replace(/'/g, '');
        //name = line;
      } else if (!~line.indexOf('/***') && !~line.indexOf('*/')) {
        html += line + '\n';
      }

    });

    var checked = browser >= 4 || browser === -1 ? 'checked' : '';
    var className = checked ? 'checked' : 'unchecked';
    html = html.replace(
			'{{name}}', 
		  '#### ' + 
		  '<input class="checkbox_input" type="checkbox" ' + checked + ' id="' + name + '" value="' + name + '"> ' + 
			'<label for="' + name + '"><span style="font-weight: normal"> Add test </span><i>' + name + '</i></label>'
		);

    html = converter.makeHtml(html);
    document.querySelector('body').innerHTML += '' +
		  '<div id="wrapper_' + name + 
		  '" class="' + className + '">' + html + '</div>';

  });

	document.querySelector('button').addEventListener('click', function(){
		var divs = document.getElementsByTagName('div');
 	  for(var i = 0; i < divs.length; i++) {
		  divs[i].className+= ' hide';
 	  }
	}, false);

	var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
	 inputs[i].addEventListener('click', function(){
		 var id = 'wrapper_' + this.value;
		 var hide = !!~document.getElementById(id).className.indexOf('hide') ? 'hide ' : '';
		 if(this.checked) {
			 document.getElementById(id).className = hide + 'checked';
		 } else {
			 document.getElementById(id).className = hide + 'unchecked';
		 }
	 }, false);
 }
 
 hljs.initHighlighting();
 
});
