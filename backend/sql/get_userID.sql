SELECT userID
FROM stackoverflow_sample.Users t
WHERE t.username = @username
LIMIT 100;