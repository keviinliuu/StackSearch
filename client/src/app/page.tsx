"use client";
import { useEffect, useState, FormEvent } from "react";
import Navbar from "./components/Navbar";
import Activity from "./components/Activity";
import Experts from "./components/Experts";
import Posts from "./components/Posts";
import AvgResponseTime from "./components/AvgResponseTime";
import QaDiff from "./components/QaDiff";
import RelatedTags from "./components/RelatedTags";
import MentionedTags from "./components/MentionedTags";
import RedemptionComment from "./components/RedemptionComment";
import AuthorsAnswers from "./components/AuthorsAnswers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="gradient"></div>
      <div className="max-w-6xl w-full mx-auto">
        <Navbar />
        <section id="activity" className="my-8 section-offset">
          <Activity />
        </section>
        <section id="experts" className="my-8 section-offset">
          <Experts />
        </section>
        <section id="posts" className="my-8 section-offset">
          <Posts />
        </section>
        <section id="response-time" className="my-8 section-offset">
          <AvgResponseTime />
        </section>
        <section id="qa-diff" className="my-8 section-offset">
          <QaDiff />
        </section>
        <section id="related-tags" className="my-8 section-offset">
          <RelatedTags />
        </section>
        <section id="mentioned-tags" className="my-8 section-offset">
          <MentionedTags />
        </section>
        <section id="redemption" className="my-8 section-offset">
          <RedemptionComment />
        </section>
        <section id="authors-answers" className="my-8 section-offset">
          <AuthorsAnswers />
        </section>
      </div>
    </main>
  );
}
