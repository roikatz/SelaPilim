var Twitter = require('./')
    , mongoose = require('mongoose')
    , Tweet = require('./lib/models/tweet-model')
    , fs = require('fs')
    , utils = require('./utils')
    , t = new Twitter({
        consumer_key: 'qzdhyEANdQOCXY6zsixwRWoXy',
        consumer_secret: '4nzU3uzxqJHgXRr8ikXeFeX2HCla8AEiLwkvTEdckff0b6oQMv',
        token: '2865550398-bSHwf7aKqlzrookfMy2XhcCSYEQvrf0mxG7O7rf',
        token_secret: 't1yURKhN8QnVwtJWaW3quxVZV8g9Efk488zxhVJloqbNU'
    });

var curses = [],
    teams = [];

mongoose.connect('mongodb://admin:Abcd1234@ds047050.mongolab.com:47050/football');


t.on('tweet', function (tweet) {
    saveTweet(tweet);
    //console.log(tweet.text+' -- END TWEET -- ');
});

t.on('error', function (err) {
    console.log('Oh no')
});

t.on('reconnect', function (msg) {
    if (msg.err)
        console.log('reconnect: '+ msg.err.message);
});

var startTracking = function(){
    curses = loadDataFromFileSync('./CurseList.txt');
    teams = loadDataFromFileSync('./TeamsList.txt');

    for(team in teams){
        //t.track(teams[team], false); //track only the team name
        for (curse in curses) {
            t.track(teams[team] + ' ' + curses[curse], false);
        }
    };

    t.reconnect();
};

var loadDataFromFileSync = function(file){
    var data = fs.readFileSync(file);
    var bufferString = data.toString();
    bufferString = bufferString.replace(/(\r)/gm,"");
    return bufferString.split('\n');
};


startTracking();


var saveTweet = function(tweet){
    var content = tweet.text;
    var retweeted = tweet.retweeted;
    var retweetedCount = 0;

    if (tweet.retweeted_status) {
        retweeted = true;
        retweetedCount = tweet.retweeted_status.retweet_count;
        content = tweet.retweeted_status.text;
    }

    data = {tweetData:{ tweetID: tweet.id,
        lang: tweet.lang,
        retweeted: retweeted,
        retweetedCount: retweetedCount,
        timestamp: tweet.timestamp_ms,
        place: tweet.place,
        source: tweet.source,//(iPhone, Android, web)
        content: content
    },
        userID:{ userID: tweet.user.id,
            followers: tweet.user.followers_count
        }
    };

    var monTweet = new Tweet(data);
    monTweet.save(function (err, document) {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Saved document: " + document);
    });
};

