# StackSearch

## Loading your Database

The database used for this app is a public dataset for StackOverflow from Google BigQuery, which can be found [here](https://console.cloud.google.com/bigquery?ws=!1m4!1m3!3m2!1sbigquery-public-data!2sstackoverflow).

To load your database, you can clone the database into your own GCP account, which you can then hook up to the application. Here are the following steps:

1) Create a GCP account and copy the database into your account.
2) Set up GCP [Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc) for the project.
3) Replace the `projectId` variable in `backend/server.ts` with your GCP project ID.

Now, the database has been successfully loaded into the program and is ready to receive queries once the program is up and running!