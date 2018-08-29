require("dotenv").config();

var fs = require("fs");
var chalk = require("chalk");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment")
var action = process.argv[2];
var query = process.argv.slice(3).join(" ");

switch (action) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

function concertThis() {
     // Then run a request to the OMDB API with the movie specified
     request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var json = JSON.parse(body);
            console.log(json[0].lineup);
            console.log(moment(json[0].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            console.log(json[0].venue.name);
            console.log(json[0].venue.city);
            
            
        }
    });
}

// artist
// venue name
// venue location
// date of concert

function spotifyThisSong() {
    spotify.search({ type: 'track', query: query }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
        console.log(data.tracks.items[0].artist);
    });
}

function movieThis() {
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log(JSON.parse(body));
        }
    });
}

function doWhatItSays() {


}





