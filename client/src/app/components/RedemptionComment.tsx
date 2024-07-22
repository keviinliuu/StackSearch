import { useState, FormEvent } from "react";

const RedemptionComment = () => {
  const [redemptionUsername, setRedemptionUsername] = useState("");
  const [redemptionComment, setRedemptionComment] = useState<any>(null);

  const handleRedemptionCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getredemptioncomment/${redemptionUsername}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRedemptionComment(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
              {redemptionComment.comment.map((comment: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{comment.commentID}</td>
                  <td className="py-2 px-4 border-b">{comment.rel_diff}</td>
                  <td className="py-2 px-4 border-b">{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RedemptionComment;
