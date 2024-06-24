import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex justify-between text-center bg-black h-20 p-3">
      <div className="mt-3">
        <h1 className="font-extrabold text-4xl font-serif text-white">
          <Link href="/home"> VerseVibe</Link>
        </h1>
      </div>
      <div className="mt-4">
        <ul className="flex gap-7 font-semibold text-white">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>
      <div className="mt-4">
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
  );
}

export default Navbar;
