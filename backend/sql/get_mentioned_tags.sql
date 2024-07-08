WITH RECURSIVE
  RelatedTags AS (
    SELECT @tag as tagName, (SELECT 1) AS iteration
    UNION ALL
    (SELECT t.tagName, iteration + 1 AS iteration FROM
    (SELECT tagName, wikiID FROM stackoverflow_production.Tags) t
    JOIN (SELECT postID, body FROM stackoverflow_production.Wikis) w ON t.wikiID = w.postID
    JOIN RelatedTags ON w.body LIKE CONCAT('%', RelatedTags.tagName, '%')
    WHERE
    iteration < 3)
  )
  SELECT DISTINCT tagName FROM RelatedTags
