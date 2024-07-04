"use client"; // Ensure this component is treated as a client component

import Navbar from "../navbar/page";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsClapping,
  faComment,
  faBookmark,
  faCircleMinus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function BlogContent() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:5000/getBlog");
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  if (!data.length) {
    return (
      <div>
        <Navbar />
        <h1 className="m-9 font-extrabold">Because you follow programming</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1 className="m-9 font-extrabold">Because you follow programming</h1>
      {data.map((post, index) => (
        <div key={index} className="m-14">
          <Link href={`/post/${post.id}`}>
            <div className="flex cursor-pointer">
              <div>
                <div className="flex items-center">
                  <Image
                    src={post.imageLink}
                    alt={post.AuthorName}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <p className="text-sm mb-4">{post.AuthorName}</p>
                </div>
                <div className="font-extrabold text-2xl mb-3">{post.title}</div>
                <div className="text-gray-500 mb-5">{post.heading}</div>
                <div className="flex justify-between items-center text-gray-600 text-sm gap-44">
                  <p>{post.date}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faHandsClapping}
                        className="mr-1"
                      />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faComment} className="mr-1" />
                      {post.comments}
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <FontAwesomeIcon icon={faCircleMinus} className="text-lg" />
                    <FontAwesomeIcon icon={faBookmark} className="text-sm" />
                    <FontAwesomeIcon icon={faEllipsis} className="text-lg" />
                  </div>
                </div>
              </div>
              <div className="ml-7">
                <Image
                  src={post.imageLink}
                  alt={post.title}
                  width={500}
                  height={500}
                  className="h-32 w-40 mt-5"
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogContent;
