"use client";
import Summary from "./components/Summary";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="gradient"></div>
      <div className="max-w-6xl w-full mx-auto">
        <Summary/>
      </div>
    </main>
  );
}
