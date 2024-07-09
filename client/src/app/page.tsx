'use client';
import { useEffect, useState, FormEvent } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [activity, setActivity] = useState<{
    answers: Array<any>;
    questions: Array<any>;
    comments: Array<any>;
    upvotes: Array<any>;
    wikis: Array<any>;
  }>();
  const [tag, setTag] = useState('');
  const [experts, setExperts] = useState<any>(null);
  const [numPosts, setNumPosts] = useState('');
  const [posts, setPosts] = useState<any>(null);
  const [avgResponseTimeTag, setAvgResponseTimeTag] = useState('');
  const [avgResponseTime, setAvgResponseTime] = useState<any>(null);
  const [qaDiffOrder, setQaDiffOrder] = useState('');
  const [qaDiffAmount, setQaDiffAmount] = useState('');
  const [qaDiffUsers, setQaDiffUsers] = useState<any>(null);
  const [relatedTags, setRelatedTags] = useState<any>(null);
  const [relatedTagsTag, setRelatedTagsTag] = useState('');

  const [mentionedTags, setMentionedTags] = useState<any>(null);
  const [mentionedTagsTag, setMentionedTagsTag] = useState('');

  const [answerID, setAnswerID] = useState('');
  const [answerTag, setAnswerTag] = useState('');
  const [authorsAnswers, setAuthorsAnswers] = useState<any>(null);

  const [redemptionComment, setRedemptionComment] = useState<any>(null);
  const [redemptionUsername, setRedemptionUsername] = useState('');

  const handleActivitySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getactivity/${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setActivity(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleExpertsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getexperts/${tag}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setExperts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePostsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getmostcomments/${numPosts}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAvgResponseTimeSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getavgrestime/${avgResponseTimeTag}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAvgResponseTime(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQaDiffSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getqadiff/${qaDiffOrder}/${qaDiffAmount}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setQaDiffUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRelatedTagsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getrelatedtags/${relatedTagsTag}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRelatedTags(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMentionedTagsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getmentionedtags/${mentionedTagsTag}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMentionedTags(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRedemptionCommentSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getredemptioncomment/${redemptionUsername}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRedemptionComment(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAuthorsAnswersSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const baseLink = 'https://stackoverflow.com/a/';
    const encodedLink = encodeURIComponent(`${baseLink}${answerID}`);

    try {
      const response = await fetch(
        `http://localhost:3000/api/getauthorsanswers/${encodedLink}/${encodeURIComponent(
          answerTag
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAuthorsAnswers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form onSubmit={handleActivitySubmit}>
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Activity
          </button>
        </form>

        {activity && (
          <div className="mt-4">
            <h2>User Activity:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Questions</th>
                  <th className="py-2 px-4 border-b">Answers</th>
                  <th className="py-2 px-4 border-b">Wikis</th>
                  <th className="py-2 px-4 border-b">Comments</th>
                  <th className="py-2 px-4 border-b">Upvotes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {activity && activity.questions.length > 0 ? (
                    activity.questions.map((question: any, qIndex: number) => (
                      <td key={qIndex}>{question}</td>
                    ))
                  ) : (
                    <td></td>
                  )}
                  {activity && activity.answers.length > 0 ? (
                    activity.answers.map((answer: any, qIndex: number) => (
                      <td key={qIndex}>{answer}</td>
                    ))
                  ) : (
                    <td></td>
                  )}
                  {activity && activity.wikis.length > 0 ? (
                    activity.wikis.map((wiki: any, qIndex: number) => (
                      <td key={qIndex}>{wiki}</td>
                    ))
                  ) : (
                    <td></td>
                  )}
                  {activity && activity.comments.length > 0 ? (
                    activity.comments.map((comment: any, qIndex: number) => (
                      <td key={qIndex}>{comment}</td>
                    ))
                  ) : (
                    <td></td>
                  )}
                  {activity && activity.upvotes.length > 0 ? (
                    activity.upvotes.map((upvote: any, qIndex: number) => (
                      <tr key={qIndex}>
                        <td>{upvote.postID}</td>
                      </tr>
                    ))
                  ) : (
                    <td></td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleExpertsSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Experts
          </button>
        </form>

        {experts && (
          <div className="mt-4">
            <h2>Experts:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Author ID</th>
                  <th className="py-2 px-4 border-b">Number of Answers</th>
                </tr>
              </thead>
              <tbody>
                {experts.experts.map((expert: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{expert.username}</td>
                    <td className="py-2 px-4 border-b">{expert.authorID}</td>
                    <td className="py-2 px-4 border-b">{expert.numAns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handlePostsSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="number"
            placeholder="Enter number of posts"
            value={numPosts}
            onChange={(e) => setNumPosts(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Posts
          </button>
        </form>

        {posts && (
          <div className="mt-4">
            <h2>Posts with Most Comments from a Single User:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Post ID</th>
                  <th className="py-2 px-4 border-b">Question ID</th>
                  <th className="py-2 px-4 border-b">Body</th>
                </tr>
              </thead>
              <tbody>
                {posts.posts.map((post: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{post.postID}</td>
                    <td className="py-2 px-4 border-b">{post.questionID}</td>
                    <td className="py-2 px-4 border-b">{post.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleAvgResponseTimeSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter tag for avg response time"
            value={avgResponseTimeTag}
            onChange={(e) => setAvgResponseTimeTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Avg Response Time
          </button>
        </form>

        {avgResponseTime && (
          <div className="mt-4">
            <h2>Average Response Time:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Avg Response Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">
                    {avgResponseTime.time[0]?.average_response_time}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleQaDiffSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter order (asc/desc)"
            value={qaDiffOrder}
            onChange={(e) => setQaDiffOrder(e.target.value)}
          />
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="number"
            placeholder="Enter amount"
            value={qaDiffAmount}
            onChange={(e) => setQaDiffAmount(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Get QA Difference Users
          </button>
        </form>

        {qaDiffUsers && (
          <div className="mt-4">
            <h2>Users with QA Difference:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">User ID</th>
                  <th className="py-2 px-4 border-b">QA Difference</th>
                </tr>
              </thead>
              <tbody>
                {qaDiffUsers.users.map((user: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{user.userID}</td>
                    <td className="py-2 px-4 border-b">{user.qdelta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleRelatedTagsSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter tag"
            value={relatedTagsTag}
            onChange={(e) => setRelatedTagsTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Related Tags
          </button>
        </form>

        {relatedTags && (
          <div className="mt-4">
            <h2>Related Tags:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Tag Name</th>
                  <th className="py-2 px-4 border-b">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {relatedTags.tags.map((tag: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{tag.tagName}</td>
                    <td className="py-2 px-4 border-b">{tag.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleMentionedTagsSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter tag"
            value={mentionedTagsTag}
            onChange={(e) => setMentionedTagsTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Mentioned Tags
          </button>
        </form>

        {mentionedTags && (
          <div className="mt-4">
            <h2>Mentioned Tags:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Tag Name</th>
                  <th className="py-2 px-4 border-b">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {mentionedTags.tags.map((tag: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{tag.tagName}</td>
                    <td className="py-2 px-4 border-b">{tag.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleRedemptionCommentSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter username"
            value={redemptionUsername}
            onChange={(e) => setRedemptionUsername(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Get Redemption Comment
          </button>
        </form>

        {redemptionComment && (
          <div className="mt-4">
            <h2>Redemption Comment:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Comment ID</th>
                  <th className="py-2 px-4 border-b">Relative Diff</th>
                  <th className="py-2 px-4 border-b">Body</th>
                </tr>
              </thead>
              <tbody>
                {redemptionComment.comment.map(
                  (comment: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        {comment.commentID}
                      </td>
                      <td className="py-2 px-4 border-b">{comment.rel_diff}</td>
                      <td className="py-2 px-4 border-b">{comment.body}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleAuthorsAnswersSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter answer ID"
            value={answerID}
            onChange={(e) => setAnswerID(e.target.value)}
          />
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter tag"
            value={answerTag}
            onChange={(e) => setAnswerTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded"
          >
            Get Author's Answers
          </button>
        </form>
        {authorsAnswers &&
          authorsAnswers.posts &&
          authorsAnswers.posts.length > 0 && (
            <div className="mt-4">
              <h2>Author's Answers:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Post ID</th>
                    <th className="py-2 px-4 border-b">Body</th>
                    <th className="py-2 px-4 border-b">Author ID</th>
                  </tr>
                </thead>
                <tbody>
                  {authorsAnswers.posts.map((post: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{post.postID}</td>
                      <td className="py-2 px-4 border-b">{post.body}</td>
                      <td className="py-2 px-4 border-b">{post.authorID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </main>
  );
}
