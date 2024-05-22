"use client";

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:port/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        console.log('Data submitted successfully!');
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form onSubmit={handleSubmit}> 
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
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
