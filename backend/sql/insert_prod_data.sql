/*
NOTES:
For these queries, our input raw dataset is stackoverflow_full2, which follows the schema of the publicly available StackOverflow dataset on Google BigQuery
Our production dataset is stackoverflow_production, which follows the schema specified in the report.

We do not need to worry about foreign key constraints, since the public dataset originally has such constraints

*/


/*
IMPORTING QUESTIONS

Note that we only take userids who are not NULL, as specified in our schema
*/


INSERT INTO `stackoverflow_production.Questions` (
  SELECT id, title, body, owner_user_id, score, creation_date, accepted_answer_id FROM `stackoverflow_full2.posts_questions`  WHERE owner_user_id IS NOT NULL
)


/*
IMPORTING USERS
*/

INSERT INTO `stackoverflow_production.Users` (
  SELECT id, display_name, reputation, creation_date FROM `stackoverflow_full2.users`
);

/*
IMPORTING ANSWERS

Note that we only take userids who are not NULL, as specified in our schema
*/

INSERT INTO `stackoverflow_production.Answers` (
  SELECT id, parent_id, body, owner_user_id, score, creation_date FROM `stackoverflow_full2.posts_answers` 
  WHERE owner_user_id IS NOT NULL
)

/*
IMPORTING COMMENTS

Note that we only take userids who are not NULL and comments with a NONNULL body, as specified in our schema
*/

INSERT INTO `stackoverflow_production.Comments` (
  SELECT id, text, post_id, user_id, score, creation_date FROM `stackoverflow_full2.comments` WHERE user_id IS NOT NULL AND text IS NOT NULL
)

/*
IMPORTING WIKIS

Note that we only take userids who are not NULL and wikis with a NONNULL body, as specified in our schema
*/

INSERT INTO `stackoverflow_production.Wikis` (
  SELECT id, body, owner_user_id, score, creation_date FROM `stackoverflow_full2.posts_tag_wiki_excerpt` WHERE owner_user_id IS NOT NULL AND body IS NOT NULL
)


/*
IMPORTING TAGS
*/

INSERT INTO `stackoverflow_production.Tags` (
  SELECT id, tag_name, excerpt_post_id FROM `stackoverflow_full2.tags`
)


/*
IMPORTING QUESTIONTAGS

Note:
- In the publicly available dataset, tags for each question are indicated by a string delimited by '|'
Thus to create the relation, use SQL SPLIT AND UNNEST to create each relevant (questionID, tag) tuple. 
We join with the Tag table to get the tagID
*/

INSERT INTO `stackoverflow_production.QuestionTags` (
  SELECT a1.id, a2.tagID
  FROM 
  (SELECT 
  id,
  tag
  FROM 
  `stackoverflow_full2.posts_questions`,  
  UNNEST(SPLIT(tags, '|')) AS tag) a1
  JOIN `stackoverflow_production.Tags` a2 ON a1.tag = a2.tagName
)

/*
IMPORTING QUESTIONVOTES/ANSWERVOTES

Note: 
- In the publicly available dataset, it doesn't provide the userid of who voted for a question/answer. 
Therefore, we were required to synthetically assign random users to each question/answer vote.
To perform this, in our User table we add a row number based on the userID. 
Next, we use the voteID field from the public dataset to 'hash' into our User table on the row number field to pick a pseudo-random user for each vote.

- We filter the votes based on whether the posts are Questions or Answers

- In the public dataset, it provides a vote_type_id, whose value is 2 if an upvote or 3 if a downvote. We use the value accordingly for our isUpvote field. 
We ignore all other vote types.

*/

INSERT INTO `stackoverflow_production.QuestionVotes` (
  SELECT t1.userID, v.post_id, v.vote_type_id = 2
  FROM `stackoverflow_full2.votes` v
  JOIN (
    SELECT userID, ROW_NUMBER() OVER(ORDER BY userID ASC) AS rn,
    FROM `stackoverflow_production.Users`
  ) t1 ON MOD(v.id, 18712212) = t1.rn
  WHERE v.post_id IN (SELECT postid FROM `stackoverflow_production.Questions`)
  AND v.vote_type_id = 2 OR v.vote_type_id = 3
)

INSERT INTO `stackoverflow_production.AnswerVotes` (
  SELECT t1.userID, v.post_id, v.vote_type_id = 2
  FROM `stackoverflow_full2.votes` v
  JOIN (
    SELECT userID, ROW_NUMBER() OVER(ORDER BY userID ASC) AS rn,
    FROM `stackoverflow_production.Users`
  ) t1 ON MOD(v.id, 18712212) = t1.rn
  WHERE v.post_id IN (SELECT postid FROM `stackoverflow_production.Answers`)
  AND v.vote_type_id = 2 OR v.vote_type_id = 3
)