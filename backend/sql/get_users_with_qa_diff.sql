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
 ORDER BY (case when @order = 'desc' then qdelta end) DESC,
 (case when @order = 'asc' then qdelta end) ASC
 LIMIT @amount;