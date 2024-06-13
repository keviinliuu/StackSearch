SELECT
COUNT(*) numAns,
a.authorID
FROM Answers a
JOIN Questions q ON a.questionID = q.postID
WHERE
EXISTS (
    SELECT * 
    FROM
    Tags t
    JOIN QuestionTags qt ON qt.tagID = t.tagID
    WHERE
    q.postID = qt.postID
    AND t.tagName = @tag
  ) 
AND a.authorID IS NOT NULL
GROUP BY
a.authorID
ORDER BY numAns DESC
LIMIT 1;
