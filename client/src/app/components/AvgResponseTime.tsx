import { useState, FormEvent } from "react";

const AvgResponseTime = () => {
  const [avgResponseTimeTag, setAvgResponseTimeTag] = useState("");
  const [avgResponseTime, setAvgResponseTime] = useState<any>(null);

  const handleAvgResponseTimeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getavgrestime/${avgResponseTimeTag}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAvgResponseTime(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
       <form onSubmit={handleAvgResponseTimeSubmit} className="mt-8">
          <input
            className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
            type="text"
            placeholder="Enter tag for avg response time"
            value={avgResponseTimeTag}
            onChange={(e) => setAvgResponseTimeTag(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Avg Response Time
          </button>
        </form>

        {avgResponseTime && (
          <div className="mt-4">
            <h2>Average Response Time:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Avg Response Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">
                    {avgResponseTime.time[0]?.average_response_time}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default AvgResponseTime;
