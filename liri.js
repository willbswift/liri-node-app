require("dotenv").config();

    // Load the File Service Package inquirer
let fs = require("fs");
    // Load the NPM Package inquirer
let inquirer = require("inquirer");
    // Here we incorporate the "request" npm package
let request = require("request");
    // load the Momentjs npm package
var moment = require('moment');

//     // Create a "Prompt" with instructions and questions.
// inquirer.prompt([{
//         // Here we create a basic text prompt.
//     type: "input",
//     message: "What do you want to do?  concert-this, spotify-this-song, movie-this, or do-what-it-says",
//     name: "choice"
//   }]).then(response => {

let movieName = "";



                //liriApp[media][title]();
        // try calling your chosen animal and method from the terminal example: 'node tamagotchi-this dog letInside'
        // liriApp[media][title]();


    //define function
const getMovieInfo = function(movieName) {

        // We then run the request module on a URL with a JSON
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, movieObject) {
            // If the request is successful
        if (response.statusCode === 200) {
            console.log("I'm running")
            //console.log(JSON.parse(movieObject))
            console.log("Chosen Movie: " + JSON.parse(movieObject).Title);
            console.log("Release Year: " + JSON.parse(movieObject).Year);
            console.log("IMDB rating is: " + JSON.parse(movieObject).imdbRating);
            console.log("Rotten Tomatoes rating is: " + JSON.parse(movieObject).Ratings[1].Value);
            console.log("Produced primarly in: " + JSON.parse(movieObject).Country);
            console.log("Original Language: " + JSON.parse(movieObject).Language);
            console.log("Plot Sumary: " + JSON.parse(movieObject).Plot);
            console.log("Lead Actors: " + JSON.parse(movieObject).Actors);
        }
    });
};

let choice = process.argv.slice(2);
    console.log(choice);

    let media = choice[0];
    let title = choice.slice(1);

    fs.readFile( "keys.js", (err, data) => {
        // If there is an error log it.
        if (err) {
            console.log(err);
        }

        //"do-what-it-says"
    if (media === "do-what-it-says") {

        fs.readFile( "random.txt", "utf8", (err, random) => {
            let choice = random;
            console.log(choice);


//  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//  * Edit the text in random.txt to test out the feature for movie-this and my-tweets
        }); 
    }

    if (media === "concert-this") {
            // If there is an error log it.
        if (err) {
            console.log(err);
        }

        let artist = title;
            console.log("Concerts for " + artist);
            console.log("--------------------------")
        let artistName = "";

            // Loop through all the words in the node argument
            // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 0; i < artist.length; i++) {

            if (i > 0 && i < artist.length) {
                artistName = artistName + "+" + artist[i];
            }
            else {
                artistName += artist[i];
            }
                //console.log(artistName)

                // We then run the request module on a URL with a JSON
            request("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp", function(error, response, concerts) {

                    // If there were no errors and the response code was 200 (i.e. the request was successful)...
                if (!error && response.statusCode === 200) {
                        // Then we print out the list of concerts
                    //console.log(JSON.parse(concerts));
                    concertObject = JSON.parse(concerts);
                    
                    //FOR LOOP GOES HERE
                    for (var i = 0; i < concertObject.length; i++) {
                        console.log("Venue: " + concertObject[i].venue.name);
                        console.log("Location: " + concertObject[i].venue.city + "," + concertObject[i].venue.region);
                            // First Time
                        let startTime = moment(concertObject[i].datetime, "YYYY-MM-DDTHH:mm:ss")
                        let startTimeF = moment(startTime).format("MM/DD/YYYY")
                        console.log("Date: " + startTimeF);
                        console.log("--------------------------")
                    }; //close loop to print out results 
                } //close if correct response
            }); // close http request
        }; //close loop to generate artist name
    }; // close CONCERT fuctions 

    if (media === "movie-this") {
            // If there is an error log it.
        if (err) {
            console.log(err);
        }

        console.log(title);

        if(title.length < 1 || title === undefined){

            movieName = "Mr.+Nobody";
            
            getMovieInfo(movieName);
        }
        else {

                // Loop through all the words in the node argument
                // And do a little for-loop magic to handle the inclusion of "+"s
            for (let i = 0; i < title.length; i++) {
        
                if (i > 0 && i < title.length) {
                    movieName = movieName + "+" + title[i];
                }
                else {
                    movieName += title[i];
                }
            }

            getMovieInfo(movieName);
        }; // close movie/no-movie IF statement
    }; // close MOVIE fuctions 
        
}); // close key request 

    //let keys = data.toString().split(",");
    // let spotify = new Spotify(keys.spotify);
    // console.log(spotify);

//             // If there is no error... then print out the weather data.
//             // We use JSON.stringify to print the data in string format.
//             // We use the JSON.stringify argument of "2" to make the format pretty.
//             // See link here: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
//             console.log(JSON.stringify(result, null, 2));
//             console.log(result[0].location.timezone);
//             console.log(`You want to got to a ${response.choice} performance!`)
//         }
//     })







