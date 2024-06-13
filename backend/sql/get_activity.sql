SELECT * 
FROM Questions
WHERE authorID = @userID

SELECT *
FROM Answers
WHERE authorID = @userID

SELECT *
FROM Wikis
WHERE authorID = @userID

SELECT *
FROM Comments
WHERE authorID = @userID

SELECT *
FROM (
    SELECT voterID, questionID as postID, isUpvote
    FROM QuestionVotes
    UNION
    SELECT voterID, answerID as postID, isUpvote
    FROM AnswerVotes
)
WHERE voterID = @userID

