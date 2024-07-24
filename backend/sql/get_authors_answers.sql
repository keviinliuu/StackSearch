WITH authID AS (SELECT authorID FROM stackoverflow_production.Answers WHERE postID = @postID),
tagID AS (SELECT tagID FROM stackoverflow_production.Tags WHERE tagName = @tag),
relevantAnswers AS (
SELECT
  a.postID,
  a.body,
  a.authorID,
  a.questionID
FROM
 stackoverflow_production.Answers a
WHERE
  a.authorID = (SELECT * FROM authID) 
),
relevantQuestions AS (
SELECT
  q.postID
FROM
  stackoverflow_production.Questions q
  JOIN stackoverflow_production.QuestionTags qt ON q.postID = qt.postID
WHERE
  qt.tagID = (SELECT * FROM tagID) 
)
SELECT
  a.postID,
  a.body,
  a.authorID
FROM
  relevantAnswers a
  JOIN relevantQuestions q ON a.questionID = q.postID
LIMIT 10;
