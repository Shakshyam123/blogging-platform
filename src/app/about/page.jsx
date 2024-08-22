"use client";

import Navbar from "../navbar/page";
import Image from "next/image";
import Footer from "../footer/page";

export default function About() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl pl-14 pr-10 pt-10 ml-7">
        <a href="" className="text-4xl">
          About us
        </a>{" "}
        <br />
        <nav className=" text-gray-500 text-sm flex justify-end mb-4">
          <ul className="flex ">
            <li>
              <a href="/home">Home</a>
            </li>
            &nbsp;/&nbsp;
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </nav>
      </h1>
      <hr className=" " />
      <div className=" h-fit flex justify-start items-start">
        <div className="border-2 bg-gray-50 h-fit   ml-12 mt-12 mr-12 shadow-sm hover:shadow-xl rounded-md">
          <div className="m-7">
            <h1 className="text-4xl font-bold mb-5 text-center">
              Introduction
            </h1>
            <p>
              Welcome to VerseVibe, a digital sanctuary the art of storytelling
              meets the pulse of modern technology. Founded in 2024 by a group
              of visionary writers and developers, our platform was born out of
              a passion for literature and a desire to create a space where
              every voice could find its audience. Today, we stand as a thriving
              ecosystem of creative minds, united by the shared love for the
              written word. Our mission is simple yet profound: to democratize
              publishing, making it accessible to anyone with a story to tell.
              We offer a user-friendly interface that empowers writers to focus
              on their craft, while our advanced algorithms ensure that content
              reaches those most interested. From personal blogs to
              investigative journalism, poetry to fiction, our platform is a
              canvas for all genres and styles. But VerseVibe is more than just
              a place to publish; it’s a community. Readers and writers
              interact, share feedback, and grow together. We host regular
              writing challenges, webinars, and forums to foster learning and
              collaboration. Our commitment to quality and inclusivity means
              that every piece published goes through a fair review process,
              ensuring a high standard of content for our readers. Join us at
              VerseVibe, where your words have the power to inspire, educate,
              and entertain. Whether you’re a seasoned author or a budding
              writer, a voracious reader or simply curious, there’s a place for
              you here. Let’s embark on this literary journey together, one
              story at a time.
            </p>
          </div>
        </div>
      </div>
      <div className="border-2 bg-gray-50 h-fit ml-12 mr-12 shadow-sm hover:shadow-xl mt-5 mb-9 ">
        <div className="p-10">
          <h1 className="text-center font-bold text-4xl mb-7">
            Our TEAM MEMBERS
          </h1>
          <div className="flex justify-between">
            <div className="">
              <Image
                src="/image3.jpg"
                alt="Example Image"
                width={500}
                height={500}
                className="h-60 w-60 mb-8 rounded-full hover:h-64 hover:w-64"
              />
              <h1 className="bold text-xl">Shakshyam Bohara</h1>
              <p>Founder/CEO</p>
            </div>
            <div>
              <Image
                src="/ram.jpg"
                alt="Example Image"
                width={500}
                height={500}
                className="h-60 w-60 mb-8 rounded-full hover:h-64 hover:w-64"
              />
              <h1 className="bold text-xl">RamThapa</h1>
              <p>Helper</p>
            </div>
            <div>
              <Image
                src="/img.jpg"
                alt="Example Image"
                width={500}
                height={500}
                className="h-60 w-60 mb-8 rounded-full hover:h-64 hover:w-64"
              />
              <h1 className="bold text-xl">Sinchan</h1>
              <p>Reviewer</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const teamMembers = [
  {
    name: "Shakshyam Bohara",
    role: "Founder & CEO",
    image: "/image3.",
  },
  {
    name: "Ram Thapa",
    role: "helper",
    image: "/ram.jpg",
  },
];
