const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// GCP
const Cloud = require('@google-cloud/storage')
const { Storage } = Cloud

// TWILIO
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID
const GOOGLE_CLOUD_KEYFILE = process.env.GOOGLE_CLOUD_KEYFILE
const GOOGLE_CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET

const app = express();

app.use(bodyParser.urlencoded({ extended: false } ));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  
  const storage = Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
  });

  if(req.body.NumMedia !== '0') {
    const filename = `${req.body.MessageSid}.png`;
    const url = req.body.MediaUrl0;

    request(url).pipe(fs.createWriteStream(filename))
      .on('close', () => console.log('Image downloaded.'));

    const bucket = storage.bucket(GOOGLE_CLOUD_BUCKET);
    const fileName = path.basename(filename);
    const file = bucket.file(fileName);

    await bucket.upload(filename, {})
        .then(() => file.makePublic())
        .then(() => exports.getPublicUrl(bucketName, gcsName));

    twiml.message('Thanks for the image!');
  } else {
    twiml.message("Try sending a picture message.");
  }

  res.send(twiml.toString());
});

app.listen(3000, () => console.log('Live Long and Prosper on 3000!'));