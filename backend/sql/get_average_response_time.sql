WITH first_answers AS (
  SELECT 
  q.postID as question_id,  
  MIN(TIMESTAMP_DIFF(a.creation_date, q.creation_date, MINUTE)) as first_ans_delay
  FROM
  stackoverflow_production.Questions q
  JOIN stackoverflow_production.Answers a ON q.postID = a.questionID
  WHERE 
  EXISTS (
    SELECT * 
    FROM
    stackoverflow_production.Tags t
    JOIN stackoverflow_production.QuestionTags qt ON qt.tagID = t.tagID
    WHERE
    q.postID = qt.postID
    AND t.tagName = @tag
  )
  GROUP BY 
  q.postID
)
SELECT 
AVG(fa.first_ans_delay) as average_response_time
FROM
first_answers fa;
