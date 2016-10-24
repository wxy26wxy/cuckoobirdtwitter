console.log("The bot is starting");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
var fs=require('fs');

var exec=require('child_process').exec;
var base64 = require('base-64');





// // Setting up a user stream
// var stream = T.stream('user');

// // Anytime someone follows us
// stream.on('follow', followed);

// // Tweet when someone follows us
// function followed(eventMsg){
// 	var name = eventMsg.source.name;
// 	var screenName = eventMsg.source.screen_name;
// 	tweetIt('.@' + screenName + ' cuckoo')
// }

// // Set to tweet once per minute
 tweetIt();
// // setInterval(tweetIt, 1000*60);



function tweetIt() {
  var cmd = 'processing-java --sketch=`pwd`/clockkootest --run';
  exec(cmd, processing);
  
  function processing() {
  	var filename = 'clockkootest/0207.png';
  	var params = {
      encoding: 'base64'
  	}
    var b64 = fs.readFileSync(filename, params);

    T.post('media/upload', { media_data: b64 }, uploaded);

    function uploaded(err, data, response) {
      var id = data.media_id_string;
	  var tweet = {
	    status: '#clockoobirda',
	    media_ids: [id]
	  }
      T.post('statuses/update', tweet, tweeted);

    }

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
  }
}