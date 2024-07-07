import Link from "next/link";
import Navbar from "../navbar/page";
import Image from "next/image";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold mb-6">About Us</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            Welcome to our blogging platform! Our mission is to provide a space
            for individuals to share their thoughts, ideas, and stories with the
            world. We believe in the power of words and aim to foster a
            community where everyone can express themselves freely and connect
            with like-minded individuals.
          </p>
        </div>
        <div className="mb-2">
          <h2 className="text-2xl font-bold mb-3">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-400 ">
        <div className="p-5 ">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            Have questions or want to get in touch? Feel free to reach out to us
            at{" "}
            <Link href="/contact">
              <a
                href="mailto:contact@blogplatform.com"
                className="text-blue-600"
              >
                Contact us page
              </a>
              .
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const teamMembers = [
  {
    name: "Shakshyam Bohara",
    role: "Founder & CEO",
    image: "/image3.jpg",
  },
  {
    name: "Ram Thapa",
    role: "helper",
    image: "/ram.jpg",
  },
];
