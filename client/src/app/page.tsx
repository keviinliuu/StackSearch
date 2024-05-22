"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [names, setNames] = useState([])

  useEffect(()=> {
    handleSubmit();

  }, [])

  const handleSubmit = async () => {
    console.log("HELLO")
    try {
      fetch('http://localhost:3000/api/names', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((results)=>results.json())
      .then((resp)=> {
        console.log(resp.result);
        setNames(resp.result.map(x => x.display_name))
      })

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
        <p>{names}</p>
      </div>
    </main>
  );
}
