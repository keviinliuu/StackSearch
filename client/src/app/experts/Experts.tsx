import { useState, FormEvent } from "react";

const Experts = () => {
  const [tag, setTag] = useState("");
  const [experts, setExperts] = useState<any>(null);

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

  return (
    <div>
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
          <h2 className="text-xl font-bold mb-4">Experts:</h2>
          <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Answers</th>
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
    </div>
  );
};

export default Experts;