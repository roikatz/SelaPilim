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
    // console.log(tweet.text+' -- END TWEET -- ');
});

t.on('error', function (err) {
    console.log('Oh no')
});

t.on('reconnect', function (msg) {
    console.log('reconnect: '+msg)
});

var startTracking = function(){
    fs.readFile('./TeamsList.txt',  function (err, data) {
        if (err) throw err;
        var bufferString = data.toString();
        var bufferStringSplit = bufferString.split('\n');

        for(tag in bufferStringSplit){
            t.track(bufferStringSplit[tag]+' fuck, ' +
                    bufferStringSplit[tag]+' hate', false);
        };

        t.reconnect();
    });
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

