var fs = require('fs');

var data = require('./data.json');

var features = [ 'audio-api', 'battery-status', 'blobbuilder', 'bloburls', 'canvas', 'canvas-blending', 'channel-messaging', 'clipboard', 'contenteditable', 'cors', 'deviceorientation', 'dragndrop', 'eventsource', 'fileapi', 'filereader', 'filesystem', 'fullscreen', 'geolocation', 'hashchange', 'high-resolution-time', 'history', 'iframe-sandbox', 'indexeddb', 'input-range', 'json', 'matchmedia', 'mutationobserver', 'nav-timing', 'notifications', 'offline-apps', 'pagevisibility', 'pointer', 'progressmeter', 'promises', 'requestanimationframe', 'rtcpeerconnection', 'shadowdom', 'sharedworkers', 'sql-storage', 'stream', 'svg', 'svg-filters', 'svg-fragment', 'svg-img', 'touch', 'user-timing', 'vibration', 'web-speech', 'webgl', 'websockets', 'webworkers', 'x-doc-messaging', 'xhr2' ];

var agents = {
	"ie": "IE",
	"firefox": "Firefox",
	"chrome": "Chrome",
	"safari": "Safari",
	"opera": "Opera",
  "android": "Android Browser",
	"op_mob": "Opera Mobile",
	"op_mini": "Opera Mini",
	"bb": "Blackberry Browser",
	"and_chr": "Chrome for Android",
	"and_ff": "Firefox for Android",
	"ie_mob": "IE Mobile",
	"ios_saf": "iOS Safari"
}

var statuses = {
	"rec": "Recommendation",
  "pr": "Proposed Recommendation",
  "cr": "Candidate Recommendation",
  "wd": "Working Draft",
  "other": "Other",
  "unoff": "Unofficial / Note"
}

var caniuse = {};

for(item in data) {
	for(feature in data[item]) {
		if(!!~features.indexOf(feature) || !~features.indexOf(feature)) {
			var details = data[item][feature];
			
			caniuse[feature] = {};
			//console.log('-----------------------------------------------')
			//console.log(feature)
			caniuse[feature].title = details.title;
			//console.log(details.title)
			caniuse[feature].description = details.description;
			//console.log(details.description)
			caniuse[feature].status = statuses[details.status];
			
			//console.log('Status: ' + statuses[details.status])
			//console.log(details.categories)
			
			var cache = {};			
			for(browser in details.stats) {
				var matched = false;
				cache[browser] = 0; 
				//console.log(details.stats[browser])
				for(version in details.stats[browser]) {
					if(
						!!~details.stats[browser][version].indexOf('p') || 
						!!~details.stats[browser][version].indexOf('a') || 
						!!~details.stats[browser][version].indexOf('y')
					) {
						if(!matched) {
							var partial = !!~details.stats[browser][version].indexOf('x') ? '*' : '';
							cache[browser] = version + partial;
							matched = true;
						}
					}
				}
			}
			var results = [];
			for(browser in cache) {
				if(cache[browser] !== 0 && cache[browser] !== '0') {
					results.push(agents[browser] + ' ' + cache[browser]);
				}
			}
			caniuse[feature].support = results.join(', ') || 'none';
		}
	}
}
//console.log(JSON.stringify(caniuse, null, '  '));

fs.writeFile("./caniuseInfos.json", JSON.stringify(caniuse, null, '  '), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("caniuse.json was saved!");
    }
}); 

