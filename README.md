# StackSearch

## Loading your Database

The database used for this app is a public dataset for StackOverflow from Google BigQuery, which can be found [here](https://console.cloud.google.com/bigquery?ws=!1m4!1m3!3m2!1sbigquery-public-data!2sstackoverflow).

To load your database, you can clone the database into your own GCP account, which you can then hook up to the application. Here are the following steps:

1) Create a GCP account and copy the database into your account.
2) Set up GCP [Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc) for the project.

Now, the database has been successfully loaded into the program and is ready to receive queries once the program is up and running!

## Loading the Production Database

The process to create our production database is very similar to what is mentioned above.

Notably, it is important to first ensure that the dataset copied above is located on the same server region as our project. If not, do the following:
1. Click on the dataset in the 'Explorer' page of the BigQuery console.
2. Click on the 'Copy' icon and select the option 'Create New Dataset'.
3. Fill out the relevant fields, making sure to select the correct server region (or multi-region) where your database schema is located.
4. Click 'Create dataset' to create the copy

Once that is done, then we can now run SQL INSERT queries to copy over the data into the database schema. Here is an example of such a query:

```sql
INSERT INTO `stackoverflow_production.Questions` (
  SELECT id, title, body, owner_user_id, score, creation_date, accepted_answer_id FROM `stackoverflow_full2.posts_questions`  WHERE owner_user_id IS NOT NULL
)
```

All the other SQL INSERT queries we used are are located in `backend/sql` in the file `insert_prod_data.sql`, with explanations provided.

There is no other code needed to create our production dataset.


## How to Run StackSearch

In order to run StackSearch, the backend and the frontend both need to be setup.

To setup the backend:

1) CD into the backend folder with `cd backend`
2) Create a `.env` file with the following template:

```
PORT=<PORT NUMBER HERE>
PROJECT_ID=<GCP PROJECT ID>
GOOGLEAI_API_KEY=<GOOGLE AI API KEY>
```

You can choose whatever port you want. `PROJECT_ID` should be replaced with your GCP project ID. `GOOGLEAI_API_KEY` should be replaced with either your own API key from Google AI, or if you don't have one, you can ask one of the system administrators for one. 

3) Run `npm i`
4) Run `nodemon server.ts`

To setup the frontend:

4) CD into the client folder with `cd client`
5) Run `npm i`
6) Run `npm run dev`![alt text](image.png)


## Features Currently Implemented

There are currently 9 features that have been implemented.

1) Get Activity - Given a username of a user, retrieve all of their questions, answers, wikis, comments, and upvotes.

2) Get Experts - Given a tag, retrieve a list of the top "experts" of the tag, i.e. the people who have given the most answers to posts that have that tag.

3) Get Posts with Most Comments from a Single User - Given an amount of posts to retrieve, retrieves the top number of posts with the most comments from the same user.

4) Get Average Response Time for a Tag - Given a tag, gets the average time taken for the first answer to be posted to a question that has that tag.

5) Get Greatest Question/Answer Difference - Given an amount of users to retrieve, retrieves the users who have the greatest disparity between the number of questions they have asked and the number of questions they have answered.

6) Get Commonly Co-occuring Tags - Given a tag, retrieves the most common co-occuring tags in posts for that tag.

7) Get Commonly Mentioned Tags within Wikis - Given a tag, recursively finds all the tags that are mentioned in the wiki of a given tag.

8) Get More Answers from this Author - Given a specific answer, gets all the other answers on other posts (of a certain tag) that the same author (of the given answer) wrote.

9) Get the "Redemption" Comment - Given a specific user, retrieves the comment that has the highest difference between its own score, and the average of all the comments previously left by the user. Essentially, it identifies a particularly noteworthy comment whose score stands out from previous comments written by that user.

The backend implementation for these features can be found in `backend/routes/queries.ts`. All of the corresponding SQL code is in `backend/sql`.

The frontend implementation can be found in `client/src/app/page.tsx`.

## Where to locate the SQL files (C2/C3/C4)

The SQL files are located in `backend/sql`.

The test sample SQL files and output are located in `backend/sample`.

The test production SQL files and output are located in `backend/production`.
