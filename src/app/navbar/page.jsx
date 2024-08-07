import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="mt-2  flex gap-2">
        <Link href="/login" className="mt-3">
          <span className="mr-2 cursor-pointer text-white">LOG IN</span>
        </Link>
        <Link
          href="/register"
          className="border-2  p-2 rounded-lg bg-transparent text-white"
        >
          GET STARTED
        </Link>
        <Link href="/profile" className="mb-2">
          <Image
            src="/img.jpg"
            alt="Example Image"
            width={50}
            height={50}
            className="rounded-full mb-3"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
