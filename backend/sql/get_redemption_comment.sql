SELECT
c.score - (SELECT AVG(c1.score) FROM stackoverflow_production.Comments c1 WHERE c1.authorID = c.authorID AND c1.creation_date < c.creation_date) rel_diff,
c.commentID,
c.body
FROM stackoverflow_production.Comments c
WHERE c.authorID = @authorID
ORDER BY rel_diff DESC
LIMIT 1;