import Link from "next/link";
import Navbar from "./navbar/page";
import { useEffect } from "react";

export default function Home() {
  const user = false;
  useEffect(() => {
    first;

    return () => {
      second;
    };
  }, [third]);

  return (
    <main>
      {" "}
      <div className="">
        <div className="h-screen w-full  bg-[url('/seo.png')] bg-no-repeat bg-cover bg-blend-darken relative">
          <Navbar />
          <div className="absolute top-28 text-white ml-7">
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
      </div>
    </main>
  );
}
