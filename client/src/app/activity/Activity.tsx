import { useState, FormEvent } from "react";
import DOMPurify from "dompurify";

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
              <h2 className="text-xl font-bold mb-4">Questions:</h2>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.questions.map((question: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{question.postID}</td>
                      <td className="py-2 px-4 border-b">
                        <div>
                          {
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.title)}}/>
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.answers.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Answers:</h2>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.answers.map((answer: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{answer.postID}</td>

                      <td className="py-2 px-4 border-b no-horizontal-scroll">
                        <div>
                          {
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer.body)}}/>
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.wikis.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Wikis:</h2>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wiki ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.wikis.map((wiki: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{wiki.wikiID}</td>
                      <td className="py-2 px-4 border-b no-horizontal-scroll">{wiki.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.comments.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Comments:</h2>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.comments.map((comment: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{comment.commentID}</td>
                      <td className="py-2 px-4 border-b no-horizontal-scroll">{comment.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activity.upvotes.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Upvotes:</h2>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
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