import { useState, FormEvent } from "react";

const AuthorsAnswers = () => {
  const [answerID, setAnswerID] = useState("");
  const [answerTag, setAnswerTag] = useState("");
  const [authorsAnswers, setAuthorsAnswers] = useState<any>(null);

  const handleAuthorsAnswersSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const baseLink = "https://stackoverflow.com/a/";
      const encodedLink = encodeURIComponent(`${baseLink}${answerID}`);
      const response = await fetch(
        `http://localhost:3000/api/getauthorsanswers/${encodedLink}/${answerTag}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAuthorsAnswers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
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

      {authorsAnswers && authorsAnswers.posts && authorsAnswers.posts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Author's Answers:</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
              </tr>
            </thead>
            <tbody>
              {authorsAnswers.posts.map((post: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{post.postID}</td>
                  <td className="py-2 px-4 border-b">{post.authorID}</td>
                  <td className="py-2 px-4 border-b">{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuthorsAnswers;
