-- Feature 1

SELECT userID
FROM stackoverflow_production.Users t
WHERE t.username = 'arthur.sw';

SELECT * 
FROM stackoverflow_production.Questions
WHERE authorID = 719276
LIMIT 4;

SELECT *
FROM stackoverflow_production.Answers
WHERE authorID = 719276
LIMIT 4;

SELECT *
FROM stackoverflow_production.Wikis
WHERE authorID = 719276
LIMIT 4;

SELECT *
FROM stackoverflow_production.Comments
WHERE authorID = 719276
LIMIT 4;

SELECT postID
FROM (
    SELECT voterID, questionID as postID, isUpvote
    FROM stackoverflow_production.QuestionVotes
    UNION ALL
    SELECT voterID, answerID as postID, isUpvote
    FROM stackoverflow_production.AnswerVotes
)
WHERE voterID = 719276;

-----------

-- Feature 2

WITH AuthorIDs AS (
  SELECT
  COUNT(*) numAns,
  a.authorID
  FROM stackoverflow_production.Answers a
  JOIN stackoverflow_production.Questions q ON a.questionID = q.postID
  WHERE
  EXISTS (
      SELECT * 
      FROM
      stackoverflow_production.Tags t
      JOIN stackoverflow_production.QuestionTags qt ON qt.tagID = t.tagID
      WHERE
      q.postID = qt.postID
      AND t.tagName = 'dynatrace'
    ) 
  AND a.authorID IS NOT NULL
  GROUP BY
  a.authorID
  ORDER BY numAns DESC
  LIMIT 10
)
SELECT u.username, numAns, authorID
FROM AuthorIDs a
JOIN stackoverflow_production.Users u ON u.userID = a.authorID;

-----------

-- Feature 3

WITH mostComments as (
  SELECT
  COUNT(*) as numComments, 
  parentID, 
  authorID
  FROM stackoverflow_production.Comments
  GROUP BY 
  parentID, 
  authorID
  ORDER BY 
  numComments desc
  LIMIT 2
)
SELECT
a.postID, mc.authorID, mc.numComments, a.body
FROM stackoverflow_production.Answers a JOIN
mostComments mc ON a.postID = mc.parentID;

-----------

-- Feature 4

WITH first_answers AS (
  SELECT 
  q.postID as question_id,  
  MIN(TIMESTAMP_DIFF(a.creation_date, q.creation_date, MINUTE)) as first_ans_delay
  FROM
  stackoverflow_production.Questions q
  JOIN stackoverflow_production.Answers a ON q.postID = a.questionID
  WHERE 
  EXISTS (
    SELECT * 
    FROM
    stackoverflow_production.Tags t
    JOIN stackoverflow_production.QuestionTags qt ON qt.tagID = t.tagID
    WHERE
    q.postID = qt.postID
    AND t.tagName = 'dynatrace'
  )
  GROUP BY 
  q.postID
)
SELECT 
AVG(fa.first_ans_delay) as average_response_time
FROM
first_answers fa;

-----------

-- Feature 5

WITH tagID AS (SELECT tagID FROM stackoverflction.Tags WHERE tagName = 'python'),
questionsOfTag AS (SELECT qt.postID FROM stackoverflow_production.QuestionTags qt WHERE qt.tagID IN (SELECT * FROM tagID)),
occuringTagIDs AS (SELECT  ow_produ
COUNT(*) freq,
qt.tagID
FROM stackoverflow_production.QuestionTags qt
JOIN questionsOfTag q ON qt.postID = q.postID
GROUP BY qt.tagID)

SELECT t.tagName, ot.freq
FROM occuringTagIDs ot JOIN stackoverflow_production.Tags t ON ot.tagID = t.tagID
WHERE t.tagName != @tag
ORDER BY ot.freq DESC
LIMIT 10;

-----------

-- Feature 6

WITH askedQuestions AS
(
  SELECT 
  q.authorID,
  COUNT(*) AS qcount,
  FROM
  stackoverflow_production.Questions q
  GROUP BY 
  q.authorID
)
,
answers AS 
(
  SELECT
  a.authorID,
  COUNT(*) AS acount
  FROM
  stackoverflow_production.Answers a
  GROUP BY 
  a.authorID
)

SELECT 
 q.authorID as userID,
 (qcount - acount) AS qdelta
 FROM
  askedQuestions q JOIN
  answers a ON q.authorID = a.authorID 
 ORDER BY qdelta DESC
 LIMIT 10;
