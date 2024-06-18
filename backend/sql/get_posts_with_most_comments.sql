WITH mostComments as (
  SELECT
  COUNT(*) as numComments, 
  parentID, 
  authorID
  FROM stackoverflow_sample.Comments
  GROUP BY 
  parentID, 
  authorID
  ORDER BY 
  numComments desc
  LIMIT @amount
)
SELECT
*,
numComments
FROM stackoverflow_sample.Answers a JOIN
mostComments mc ON a.postID = mc.parentID