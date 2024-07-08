WITH authID AS (SELECT authorID FROM stackoverflow_production.Answers WHERE postID = @postID),
tagID AS (SELECT tagID FROM stackoverflow_production.Tags WHERE tagName = @tag)
SELECT
a.postID,
a.body,
a.authorID
FROM
stackoverflow_production.Answers a
JOIN (SELECT postID FROM stackoverflow_production.Questions) q ON a.questionID = q.postID
WHERE
a.authorID IN (SELECT * FROM authID)
AND (SELECT * FROM tagID) IN (SELECT qt.tagID FROM stackoverflow_production.QuestionTags qt WHERE qt.postID = q.postID)
LIMIT 10;