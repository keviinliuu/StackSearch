import { useState, FormEvent } from "react";

const RelatedTags = () => {
  const [relatedTagsTag, setRelatedTagsTag] = useState("");
  const [relatedTags, setRelatedTags] = useState<any>(null);

  const handleRelatedTagsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getrelatedtags/${relatedTagsTag}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRelatedTags(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
          <h2 className="text-xl font-bold mb-4">Related Tags:</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
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
    </div>
  );
};

export default RelatedTags;
