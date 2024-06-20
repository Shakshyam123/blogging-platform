"use Client";

import Link from "next/link";

import { useForm } from "react-hook-form";

function Page() {
  return (
    <div className="">
      <div className="flex text-center justify-between h-screen w-full  bg-[url('/seo.png')] bg-no-repeat bg-cover bg-blend-darken pl-6 pr-6 relative">
        <div className="mt-4">
          <h1 className="font-extrabold text-4xl font-serif text-white">
            <Link href="/navbar"> VerseVibe</Link>
          </h1>
        </div>
        <div className="mt-4">
          <ul className="flex gap-7 font-semibold text-white">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="mt-5">
          <Link href="/login">
            <span className="mr-5 cursor-pointer text-white">LOG IN</span>
          </Link>
          <Link
            href="/register"
            className="border-2  p-2 rounded-lg bg-transparent text-white hover:text-white hover:bg-gray-700 hover:border-gray-950 "
          >
            GET STARTED
          </Link>
        </div>
      </div>
      x``
      <div className="absolute top-28 text-white ml-10">
        <h1 className="font-bold text-3xl">CREATE YOUR WEBSITES</h1>
        <h1 className="text-8xl font-extrabold">
          The leader in
          <br /> website design
        </h1>
        <p className="text-xl mb-8">
          Stand out online with a professional website, <br />
          online store, or portfolio. With Squarespace,
          <br /> you can turn any idea into a reality.
        </p>
        <Link href="/register" className="bg-white text-black p-5 mt-10">
          GET STARTED
        </Link>
      </div>
    </div>
  );
}

export default Page;
