"use client";
import { useEffect, useState, FormEvent } from "react";
import Experts from "./Experts";

export default function Home() {
  return (
    <main className="flex-col items-center justify-center p-24">
      <div className="gradient"></div>
      <div className="max-w-6xl w-full mx-auto">
        <section id="experts" className="my-8 section-offset">
          <Experts />
        </section>
      </div>
    </main>
  );
}
