SELECT a.body AS answer, q.body AS question
FROM stackoverflow_production.Answers a
JOIN stackoverflow_production.Questions q ON a.questionID = q.postID
WHERE a.postID = @postId;
