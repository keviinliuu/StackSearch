"use client";
import { useEffect, useState, FormEvent } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [activity, setActivity] = useState<any>(null);
  const [tag, setTag] = useState('');
  const [experts, setExperts] = useState<any>(null);

  const handleActivitySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/getactivity/${(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data)
      setActivity(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleExpertsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/getexperts/${(tag)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setExperts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form onSubmit={handleActivitySubmit}>
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
            Get Activity
          </button>
        </form>

        {activity && (
          <div className="mt-4">
            <h2>User Activity:</h2>
            <ul>
              <li>Questions: {JSON.stringify(activity.questions)}</li>
              <li>Answers: {JSON.stringify(activity.answers)}</li>
              <li>Wikis: {JSON.stringify(activity.wikis)}</li>
              <li>Comments: {JSON.stringify(activity.comments)}</li>
              <li>Upvotes: {JSON.stringify(activity.upvotes)}</li>
            </ul>
          </div>
        )}

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
            <h2>Experts:</h2>
            <ul>
              {experts.experts.map((expert: any, index: number) => (
                <li key={index}>{JSON.stringify(expert)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
