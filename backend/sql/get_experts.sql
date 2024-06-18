SELECT
COUNT(*) numAns,
a.authorID,
u.username
FROM stackoverflow_sample.Answers a, stackoverflow_sample.Users u
JOIN stackoverflow_sample.Questions q ON a.questionID = q.postID
WHERE
EXISTS (
    SELECT * 
    FROM
    stackoverflow_sample.Tags t
    JOIN stackoverflow_sample.QuestionTags qt ON qt.tagID = t.tagID
    WHERE
    q.postID = qt.postID
    AND t.tagName = @tag
  ) 
AND a.authorID IS NOT NULL
GROUP BY
a.authorID,
u.username
ORDER BY numAns DESC
LIMIT @amount;
