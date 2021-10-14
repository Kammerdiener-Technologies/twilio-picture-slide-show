# Twilio Picture Slide Show
This project will recieve images from a Twilio MMS and upload the images to a GCS bucket. From there it will be able to compile all of the images into a single Slide Show.

## Technologies
- Node v16.10.0
- Twilio Account
- GCP Cloud Functions
- Google Cloud Storage

## Local Dev
1. Run `npm install` to install all proper dependencies
2. Run `npm run`

## Environment Variables
| ENV Var | Description | Required | Default |
| ------- | ----------- | -------- | ------- |
| GOOGLE_CLOUD_PROJECT_ID | The Google Cloud Project where the Service Account and Bucket are located | Yes | "" |
| GOOGLE_CLOUD_KEYFILE | The Google Cloud Service Account Key File | Yes | "" |
| GOOGLE_CLOUD_BUCKET | The name of the Google Cloud Storage Bucket you want to push the photos into | Yes | "" |

