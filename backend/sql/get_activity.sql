SELECT * 
FROM stackoverflow_sample.Questions
WHERE authorID = @userID;

SELECT *
FROM stackoverflow_sample.Answers
WHERE authorID = @userID;

SELECT *
FROM stackoverflow_sample.Wikis
WHERE authorID = @userID;

SELECT *
FROM stackoverflow_sample.Comments
WHERE authorID = @userID;

SELECT postID
FROM (
    SELECT voterID, questionID as postID, isUpvote
    FROM stackoverflow_sample.QuestionVotes
    UNION ALL
    SELECT voterID, answerID as postID, isUpvote
    FROM stackoverflow_sample.AnswerVotes
)
WHERE voterID = @userID;

SELECT username
FROM stackoverflow_sample.Users t
WHERE t.userID = @userID
LIMIT 100;