# Updating team for City Of Zion from Google docs:
**https://docs.google.com/spreadsheets/d//edit?pli=1#gid=0**

## Get an API key for Google Docs
1. Create project on https://console.developers.google.com/apis/dashboard.
2. Click Enable APIs and enable the Google Sheets API
3. Go to Credentials, then click Create credentials, and select Service account key
4. Choose New service account in the drop down. Give the account a name, anything is fine.
5. For Role I selected Project -> Service Account Actor
6. For Key type, choose JSON (the default) and download the file. This file contains a private key so be very careful with it, it is your credentials after all
7. Save the file here as "google-api-key.json"

## Running:
1. Go into terminal, cmd.exe or shell and run
2. Install composer (getcomposer.org)
3. run `composer install`
4. php ./fetch-team-data.php
