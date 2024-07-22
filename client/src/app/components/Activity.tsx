import { useState, FormEvent } from "react";

const Activity = () => {
  const [username, setUsername] = useState("");
  const [activity, setActivity] = useState<{
    answers: Array<any>;
    questions: Array<any>;
    comments: Array<any>;
    upvotes: Array<any>;
    wikis: Array<any>;
  } | null>(null);

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

  return (
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
        <>
          {activity.questions.length > 0 && (
            <div className="mt-4">
              <h2>Questions:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Post ID</th>
                    <th className="py-2 px-4 border-b">Question</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.questions.map((question: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{question.postID}</td>
                      <td className="py-2 px-4 border-b">{question.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.answers.length > 0 && (
            <div className="mt-4">
              <h2>Answers:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Post ID</th>
                    <th className="py-2 px-4 border-b">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.answers.map((answer: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{answer.postID}</td>
                      <td className="py-2 px-4 border-b">{answer.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.wikis.length > 0 && (
            <div className="mt-4">
              <h2>Wikis:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Wiki ID</th>
                    <th className="py-2 px-4 border-b">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.wikis.map((wiki: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{wiki.wikiID}</td>
                      <td className="py-2 px-4 border-b">{wiki.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.comments.length > 0 && (
            <div className="mt-4">
              <h2>Comments:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Comment ID</th>
                    <th className="py-2 px-4 border-b">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.comments.map((comment: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{comment.commentID}</td>
                      <td className="py-2 px-4 border-b">{comment.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.upvotes.length > 0 && (
            <div className="mt-4">
              <h2>Upvotes:</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Post ID</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.upvotes.map((upvote: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{upvote.postID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Activity;
