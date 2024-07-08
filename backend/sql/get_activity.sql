SELECT * 
FROM stackoverflow_production.Questions
WHERE authorID = @userID;

SELECT *
FROM stackoverflow_production.Answers
WHERE authorID = @userID;

SELECT *
FROM stackoverflow_production.Wikis
WHERE authorID = @userID;

SELECT *
FROM stackoverflow_production.Comments
WHERE authorID = @userID;

SELECT postID
FROM (
    SELECT voterID, questionID as postID, isUpvote
    FROM stackoverflow_production.QuestionVotes
    UNION ALL
    SELECT voterID, answerID as postID, isUpvote
    FROM stackoverflow_production.AnswerVotes
)
WHERE voterID = @userID;
