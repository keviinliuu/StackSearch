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
    AND t.tagName = @tag
  ) 
AND a.authorID IS NOT NULL
GROUP BY
a.authorID
ORDER BY numAns DESC
LIMIT @amount;