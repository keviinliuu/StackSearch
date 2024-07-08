SELECT userID
FROM stackoverflow_production.Users t
WHERE t.username = @username;