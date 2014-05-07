var fs = require('fs');
var features = require('./features.config.json');
var caniuse = require('./caniuse/caniuseInfos.json');

var results = {};
for(var feature in features) {
	if(typeof features[feature] === 'string') {
		results[feature] = caniuse[features[feature]];
		results[feature].source = "caniuse.com";
	} else {
		results[feature] = features[feature] ;	
		if(features[feature].source === undefined)	{
			results[feature].source = "?";
		}
	}
}
fs.writeFile("../www/data/features.json", JSON.stringify(results, null, '  '), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("features.json was saved in 'www/data'!");
  }
}); 




