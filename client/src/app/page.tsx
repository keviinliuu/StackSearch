"use client";
import Summary from "./components/Summary";

import Link from "../../node_modules/next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="gradient"></div>
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <img className="h-[80px]" src="/logo.png" alt="Logo"></img>
            <h1 className="text-orange-600 text-[80px] font-bold ">StackSearch</h1>
            <h2 className="text-gray-600 text-[24px] mt-4">Insights for StackOverflow</h2>
          </div>

          <div className="flex flex-col items-center
            ml-[10%]
            border-4
            border-orange-600
            border-solid
            rounded-2xl
            w-[400em]
            h-auto
          ">
            <h3 className="text-gray-600 text-[22px] mt-10 ">What would you like to find out today?</h3>
            <div className="grid grid-cols-3 grid-rows-4 gap-3 m-10">
              <Link href="/summary" className="col-span-3 flex flex-col justify-center"><div className="bg-transparent border-orange-600 border-solid border-2 rounded p-2 text-orange-600 text-center">Summary</div></Link>
              <Link href="/activity"><div className="bg-orange-600 rounded p-2 text-white text-center">Activity</div></Link>
              <Link href="/experts"><div className="bg-orange-600 rounded p-2 text-white text-center">Experts</div></Link>
              <Link href="/posts"><div className="bg-orange-600 rounded p-2 text-white text-center">Posts</div></Link>
              <Link href="/responseTime"><div className="bg-orange-600 rounded p-2 text-white text-center">Response Time</div></Link>
              <Link href="/qa"><div className="bg-orange-600 rounded p-2 text-white text-center">QA Difference</div></Link>
              <Link href="/related"><div className="bg-orange-600 rounded p-2 text-white text-center">Related Tags</div></Link>
              <Link href="/mentioned"><div className="bg-orange-600 rounded p-2 text-white text-center">Mentioned Tags</div></Link>
              <Link href="/redemption"><div className="bg-orange-600 rounded p-2 text-white text-center">Redemption</div></Link>
              <Link href="/authorsAnswers"><div className="bg-orange-600 rounded p-2 text-white text-center">Author's Answer</div></Link>
            </div>
          </div>

          

        </div>
      </div>
    </main>
  );
}
