[![Build Status](https://travis-ci.org/CityOfZion/cityofzion-website.svg?branch=master)](https://travis-ci.org/CityOfZion/cityofzion-website)

The cityofzion.io website source: https://cityofzion.io

Very simple, no JS necessary. Using [Hugo](https://gohugo.io/), a fast static website generator.

## Getting started

**[Install Hugo](https://gohugo.io/getting-started/installing/):**

* On OSX with [homebrew](https://brew.sh/): `brew install hugo`
* Or download a release from here: https://github.com/gohugoio/hugo/releases

**[Install nodeJS](https://nodejs.org/en/download/)**
* Run `npm install`

**Get an API key for Google Docs**
1. Create project on https://console.developers.google.com/apis/dashboard.
2. Click Enable APIs and enable the Google Sheets API
3. Go to Credentials, then click Create credentials, and select Service account key
4. Choose New service account in the drop down. Give the account a name, anything is fine.
5. For Role I selected Project -> Service Account Actor
6. For Key type, choose JSON (the default) and download the file. This file contains a private key so be very careful with it, it is your credentials after all
7. Save the as "./google-api-key/google-api-key.json"


## To only retrieve new team data
```bash
gulp retrieveData
```

## Developing the website
Start development mode (with hot reloading):
```
hugo server -D
```
Then you can visit the generated site at http://localhost:1313

## Deployment
To produce a production build just run 
```bash
gulp build
```

It will now export a build to the public folder

