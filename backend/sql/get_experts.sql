SELECT
COUNT(*) numAns,
a.authorID
FROM stackoverflow_sample.Answers a
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
a.authorID
ORDER BY numAns DESC
LIMIT @amount;
