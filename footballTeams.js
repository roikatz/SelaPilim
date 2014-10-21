var fs = require('fs');

var Twitter = require('./')
  , t = new Twitter({
    consumer_key: 'qzdhyEANdQOCXY6zsixwRWoXy',
    consumer_secret: '4nzU3uzxqJHgXRr8ikXeFeX2HCla8AEiLwkvTEdckff0b6oQMv',
    token: '2865550398-bSHwf7aKqlzrookfMy2XhcCSYEQvrf0mxG7O7rf',
    token_secret: 't1yURKhN8QnVwtJWaW3quxVZV8g9Efk488zxhVJloqbNU'
  })

t.on('tweet', function (tweet) {
    data = {tweetData:{ tweetID: tweet.id,
                        lang: tweet.lang,
                        retweeted: tweet.retweeted,
                        retweetedCount: tweet.retweet_count,
                        timestamp: tweet.timestamp_ms,
                        place: tweet.place,
                        source: tweet.source
           },
            userID:{ userID: tweet.user.id,
                      followers: tweet.user.followers_count
             }
    };

  console.log(data);
       // location, hasgtags, text, retweeted, retweet_count, source(iPhone, Android)

})

t.on('error', function (err) {
  console.log('Oh no')
})

t.on('reconnect', function (msg) {
  console.log(msg)
})

t.track('#Liverpool', false)

//t.track('@cnet', false)
t.reconnect()
