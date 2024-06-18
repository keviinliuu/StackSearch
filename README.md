# StackSearch

## Loading your Database

The database used for this app is a public dataset for StackOverflow from Google BigQuery, which can be found [here](https://console.cloud.google.com/bigquery?ws=!1m4!1m3!3m2!1sbigquery-public-data!2sstackoverflow).

To load your database, you can clone the database into your own GCP account, which you can then hook up to the application. Here are the following steps:

1) Create a GCP account and copy the database into your account.
2) Set up GCP [Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc) for the project.

Now, the database has been successfully loaded into the program and is ready to receive queries once the program is up and running!

## How to Run StackSearch

In order to run StackSearch, the backend and the frontend both need to be setup.

To setup the backend:

1) CD into the backend folder with `cd backend`
2) Create a `.env` file with the following template:

```
PORT=<PORT NUMBER HERE>
PROJECT_ID=<GCP PROJECT ID>
```

You can choose whatever port you want. `PROJECT_ID` should be replaced with your GCP project ID.

3) Run `npm i`
4) Run `nodemon server.ts`

To setup the frontend:

// TODO 


## Features Currently Supported

There are currently 3 features that are supported (with more to come!)

1) Get Activity - Given a username of a user, retrieve all of their questions, answers, wikis, comments, and upvotes.

2) Get Experts - Given a tag, retrieve a list of the top "experts" of the tag, i.e. the people who have given the most answers to posts that have that tag.

3) Get Posts with Most Comments from a Single User - Given an amount of posts to retrieve, retrieves the top number of posts with the most comments from the same user.
