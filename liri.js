require('dotenv').config()

var fs = require("fs");

var keys = require("./keys.js")

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var keys = require("./keys");

var getMyTweets = function() {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'LiriBot2' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);
            }
        }
    });

}

var getArtistNames = function (artist) {
    return artist.name;
}



var getMeSpotify = function (songName) {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getArtistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("====================================================");
        }
    });
}

var getMeMovie = function (movieName) {

    request("http://www.omdapi.com/?t=" + movieName + "&y=&plot=short&r=json",
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Title: " + jsonData.Title);
                console.log("Year: " + jsonData.Year);
                console.log("Rated: " + jsonData.Rated);
                console.log("IMDB Rating: " + jsonData.imdbRating);
                console.log("Country: " + jsonData.Country);
                console.log("Language: " + jsonData.Language);
                console.log("Plot: " + jsonData.Plot);
                console.log("Rotten tomaotes rating: " + jsonData.tomatoRating);
                console.log("Rotten tomaotes URL: " + jsonData.tomatoURL);
            }
        });

}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotifysong':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;    
        default:
            console.log('LIRI does not know that');
    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);