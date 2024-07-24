import React, { useState, FormEvent } from "react";

const Summary: React.FC = () => {
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarizeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); 
    setSummary(null); 

    try {
      const response = await fetch(`http://localhost:3000/api/summarizeanswer/${encodeURIComponent(link)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred");
      }

      const data = await response.json();
      console.log(data)
      setSummary(data.summary);
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching the summary.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSummarizeSubmit} className="flex flex-col space-y-4">
        <input
          className="py-2 px-4 border border-gray-300 rounded-md w-full"
          type="text"
          placeholder="Enter Stack Overflow answer link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Summarize Answer
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
          <h2 className="text-lg font-bold">Error</h2>
          <p>{error}</p>
        </div>
      )}

      {summary && (
        <div className="mt-4 p-4 bg-white border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
