var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
    tweetData:{ tweetID: String,
        lang: String,
        retweeted: Boolean,
        retweetedCount: Number,
        timestamp: String,
        place: String,
        source: String,
        content: String
    },
    userID:{ userID: String,
        followers: Number
    }
});

module.exports = mongoose.model('Tweet', tweetSchema);