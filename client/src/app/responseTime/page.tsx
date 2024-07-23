"use client";
import { useEffect, useState, FormEvent } from "react";
import AvgResponseTime from "./AvgResponseTime";

export default function Home() {
  return (
    <main className="flex-col items-center justify-center p-24">
      <div className="gradient"></div>
      <div className="max-w-6xl w-full mx-auto">
        <section id="avg" className="my-8 section-offset">
          <AvgResponseTime />
        </section>
      </div>
    </main>
  );
}
