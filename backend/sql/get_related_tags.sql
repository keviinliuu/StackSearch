WITH tagID AS (SELECT tagID FROM stackoverflow_production.Tags WHERE tagName = @tag),
questionsOfTag AS (SELECT qt.postID FROM stackoverflow_production.QuestionTags qt WHERE qt.tagID IN (SELECT * FROM tagID)),
occuringTagIDs AS (SELECT  
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
