import { useState, FormEvent } from "react";

const QaDiff = () => {
  const [qaDiffOrder, setQaDiffOrder] = useState("");
  const [qaDiffAmount, setQaDiffAmount] = useState("");
  const [qaDiffUsers, setQaDiffUsers] = useState<any>(null);

  const handleQaDiffSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/getqadiff/${qaDiffOrder}/${qaDiffAmount}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setQaDiffUsers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleQaDiffSubmit} className="mt-8">
        <input
          className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
          type="text"
          placeholder="Enter order (asc/desc)"
          value={qaDiffOrder}
          onChange={(e) => setQaDiffOrder(e.target.value)}
        />
        <input
          className="py-2 px-4 mb-4 rounded border border-gray-400 mr-2"
          type="number"
          placeholder="Enter amount"
          value={qaDiffAmount}
          onChange={(e) => setQaDiffAmount(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Get QA Difference Users
        </button>
      </form>

      {qaDiffUsers && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Users with QA Difference:</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QA Difference
                </th>
              </tr>
            </thead>
            <tbody>
              {qaDiffUsers.users.map((user: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{user.userID}</td>
                  <td className="py-2 px-4 border-b">{user.qdelta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QaDiff;