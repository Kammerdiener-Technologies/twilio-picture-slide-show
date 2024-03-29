const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// GCP
const Cloud = require('@google-cloud/storage')
const { Storage } = Cloud

// TWILIO
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const GOOGLE_CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET

const app = express();

app.use(bodyParser.urlencoded({ extended: false } ));

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();
  
  const storage = new Storage();

  if(req.body.NumMedia !== '0') {
    const filename = `${req.body.MessageSid}.png`;
    const writeStream = storage.bucket(GOOGLE_CLOUD_BUCKET).file(filename)
        .createWriteStream({
            public: true,
        })
    
    
    const url = request(req.body.MediaUrl0);

    await url.pipe(writeStream)
        .on('finish', () => console.log("image saved"))
        .on('error', err => {
            writeStream.end();
            console.error(err);
        })

    twiml.message('Thanks for the image!');
  } else {
    twiml.message("Try sending a picture message.");
  }

  res.send(twiml.toString());
});

app.listen(3000, () => console.log('Live Long and Prosper on 3000!'));

module.exports = {
    app
};