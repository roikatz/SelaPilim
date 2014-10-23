var Twitter = require('./')
    , mongoose = require('mongoose')
    , Tweet = require('./lib/models/tweet-model')
    , fs = require('fs')
    , t = new Twitter({
        consumer_key: 'qzdhyEANdQOCXY6zsixwRWoXy',
        consumer_secret: '4nzU3uzxqJHgXRr8ikXeFeX2HCla8AEiLwkvTEdckff0b6oQMv',
        token: '2865550398-bSHwf7aKqlzrookfMy2XhcCSYEQvrf0mxG7O7rf',
        token_secret: 't1yURKhN8QnVwtJWaW3quxVZV8g9Efk488zxhVJloqbNU'
    });


mongoose.connect('mongodb://admin:Abcd1234@ds047050.mongolab.com:47050/football');


t.on('tweet', function (tweet) {
    saveTweet(tweet);
    // console.log(tweet.text);
});

t.on('error', function (err) {
    console.log('Oh no')
});

t.on('reconnect', function (msg) {
    console.log(msg)
});

var startTracking = function(){
    fs.readFile('./TeamsList.txt',  function (err, data) {
        if (err) throw err;
        var bufferString = data.toString();
        var bufferStringSplit = bufferString.split('\n');

        for(tag in bufferStringSplit){
            t.track(bufferStringSplit[tag], false);
        };

        t.reconnect();
    });
};


startTracking();


var saveTweet = function(tweet){
    data = {tweetData:{ tweetID: tweet.id,
        lang: tweet.lang,
        retweeted: tweet.retweeted,
        retweetedCount: tweet.retweet_count,
        timestamp: tweet.timestamp_ms,
        place: tweet.place,
        source: tweet.source,//(iPhone, Android, web)
        content: tweet.text
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

