import { useState, FormEvent } from "react";

const MentionedTags = () => {
  const [mentionedTagsTag, setMentionedTagsTag] = useState("");
  const [mentionedTags, setMentionedTags] = useState<any>(null);

  const handleMentionedTagsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getmentionedtags/${mentionedTagsTag}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMentionedTags(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default MentionedTags;
