console.log("start");
const Twit = require("twit");
const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
//var config = require(path.join( __dirname, 'config'));
var cors = require("cors");
var bodyParser = require("body-parser");

dotenv.config();
//created app based on express
const app = express();
//the app uses cors protockol for data exchange
app.use(cors());
//parser
//app.use(bodyParser);
app.use(bodyParser.json({ limit: "50mb" }));
//as we get requiest fron the client we send it to tweeter== endpoint from the client
app.post("/tweet", function (request, response, next) {
  //the client hello
  const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
  });
 


  const imageData = fs.readFileSync('../img/monster1.png', { encoding: 'base64' }); //replace with the path to your image
  console.log(imageData);
  T.post(
    "media/upload",
    { media_data: imageData },
    function (error, media, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Hello from the else");
        const status = {
          status: "I tweeted from Node.js!",
          media_ids: media.media_id_string,
        };
      }
    }
  );
  T.post(
    "media/upload",
    { media_data: imageData },
    function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string;
      var altText =
        "A drwaing of a monster from the Monster School of Drawing.";
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

      T.post(
        "media/metadata/create",
        meta_params,
        function (err, data, response) {
          if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = {
              status:
                "Draw a monster a day and master the art of draing in no time #nofilter",
              media_ids: [mediaIdStr],
            };

            T.post("statuses/update", params, function (err, data, response) {
              console.log(data);
            });
          }
        }
      );
    }
  );
});
//app listens to this port
app.listen(5000, () => console.log("server started...."));
