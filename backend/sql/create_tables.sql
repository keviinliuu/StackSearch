CREATE TABLE Users
(
    userID INT NOT NULL PRIMARY KEY,
    username VARCHAR NOT NULL,
    reputation INT NOT NULL,
    creation_date TIMESTAMP NOT NULL
)

CREATE TABLE Questions
(
    postID INT NOT NULL PRIMARY KEY,
    title VARCHAR NOT NULL,
    body VARCHAR NOT NULL,
    authorID INT NOT NULL FOREIGN KEY TO Users.userID,
    score INT NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    acceptedID INT NOT NULL FOREIGN KEY TO Answers.postID
)

CREATE TABLE Answers
(
    postID INT NOT NULL PRIMARY KEY,
    questionID INT NOT NULL FOREIGN KEY TO Questions.postID,
    body VARCHAR NOT NULL,
    authorID INT NOT NULL FOREIGN KEY TO Users.userID,
    score INT NOT NULL,
    creation_date TIMESTAMP NOT NULL
)

CREATE TABLE Wikis
(
    postID INT NOT NULL PRIMARY KEY,
    body VARCHAR NOT NULL,
    authorID INT NOT NULL FOREIGN KEY TO Users.userID,
    score INT NOT NULL,
    creation_date TIMESTAMP NOT NULL
)

CREATE TABLE QuestionTags
(
    postID INT NOT NULL FOREIGN KEY TO Questions.postID,
    tagID INT NOT NULL FOREIGN KEY TO Tags.TagID
)

CREATE TABLE Comments
(
    commentId INT NOT NULL PRIMARY KEY,
    body VARCHAR NOT NULL,
    parentID INT NOT NULL FOREIGN KEY TO Answers.PostID,
    authorID INT NOT NULL FOREIGN KEY TO Users.userID,
    score INT NOT NULL,
    creation_date TIMESTAMP NOT NULL
)

CREATE TABLE Tags
(
    tagID INT NOT NULL PRIMARY KEY,
    tagName VARCHAR NOT NULL,
    wikiID INT FOREIGN KEY TO Wikis.postID
)

CREATE TABLE QuestionVotes
(
    voterID INT NOT NULL FOREIGN KEY TO Users.userID,
    questionID INT NOT NULL FOREIGN KEY TO Questions.postID,
    isUpvote BOOLEAN NOT NULL
)

CREATE TABLE AnswerVotes
(
    voterID INT NOT NULL FOREIGN KEY TO Users.userID,
    answerID INT NOT NULL FOREIGN KEY TO Answers.postID,
    isUpvote BOOLEAN NOT NULL 
);



