import { useState, FormEvent } from "react";
import DOMPurify from "dompurify";

const Posts = () => {
  const [numPosts, setNumPosts] = useState("");
  const [posts, setPosts] = useState<any>(null);

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
    <div>
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
          <h2 className="text-xl font-bold mb-4">Posts with Most Comments from a Single User:</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment Author ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Comments from Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
              </tr>
            </thead>
            <tbody>
              {posts.posts.map((post: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{post.postID}</td>
                  <td className="py-2 px-4 border-b">{post.authorID}</td>
                  <td className="py-2 px-4 border-b">{post.numComments}</td>
                  <td className="py-2 px-4 border-b">
                    <div>
                          {
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body)}}/>
                          }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Posts;
