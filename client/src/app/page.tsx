"use client";
import { useEffect, useState, FormEvent } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [activity, setActivity] = useState<{
    answers: Array<any>;
    questions: Array<any>;
    comments: Array<any>;
    upvotes: Array<any>;
    wikis: Array<any>;
  }>();
  const [tag, setTag] = useState("");
  const [experts, setExperts] = useState<any>(null);
  const [numPosts, setNumPosts] = useState("");
  const [posts, setPosts] = useState<any>(null);

  const handleActivitySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getactivity/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setActivity(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleExpertsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getexperts/${tag}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setExperts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getmostcomments/${numPosts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error:", error);
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
      </div>
    </main>
  );
}
