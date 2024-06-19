SELECT userID
FROM Users t
WHERE t.username = 'arthur.sw';

SELECT * 
FROM Questions
WHERE authorID = 719276;

SELECT *
FROM Answers
WHERE authorID = 719276;

SELECT *
FROM Wikis
WHERE authorID = 719276;

SELECT *
FROM Comments
WHERE authorID = 719276;

SELECT postID
FROM (
    SELECT voterID, questionID as postID, isUpvote
    FROM QuestionVotes
    UNION ALL
    SELECT voterID, answerID as postID, isUpvote
    FROM AnswerVotes
)
WHERE voterID = 719276;

-----------

SELECT
COUNT(*) numAns,
a.authorID
FROM Answers a
JOIN Questions q ON a.questionID = q.questionID
WHERE
EXISTS (
    SELECT * 
    FROM
    Tags t
    JOIN QuestionTags qt ON qt.tagID = t.tagID
    WHERE
    q.postID = qt.postID
    AND t.tagName = 'dynatrace'
  ) 
AND a.authorID IS NOT NULL
GROUP BY
a.authorID
ORDER BY numAns DESC
LIMIT 10;

-----------

WITH mostComments as (
  SELECT
  COUNT(*) as numComments, 
  parentID, 
  authorID
  FROM Comments
  GROUP BY 
  parentID, 
  authorID
  ORDER BY 
  numComments desc
  LIMIT 5
)
SELECT
*,
numComments
FROM Answers a JOIN
mostComments mc ON a.postID = mc.parentID;

-----------

WITH first_answers AS (
  SELECT 
  q.postID as question_id,  
  MIN(TIMESTAMP_DIFF(a.creation_date, q.creation_date, MINUTE)) as first_ans_delay
  FROM
  Questions q
  JOIN Answers a ON q.postID = a.questionID
  WHERE 
  EXISTS (
    SELECT * 
    FROM
    Tags t
    JOIN QuestionTags qt ON qt.tagID = t.tagID
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

WITH askedQuestions AS
(
  SELECT 
  q.authorID,
  COUNT(*) AS qcount,
  FROM
  stackoverflow_sample.Questions q
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
  stackoverflow_sample.Answers a
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