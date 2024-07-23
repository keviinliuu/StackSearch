"use client";
import { useEffect, useState, FormEvent } from "react";
import Posts from "./Posts";

export default function Home() {
  return (
    <main className="flex-col items-center justify-center p-24">
      <div className="gradient"></div>
      <div className="max-w-6xl w-full mx-auto">
        <section id="posts" className="my-8 section-offset">
          <Posts/>
        </section>
      </div>
    </main>
  );
}
