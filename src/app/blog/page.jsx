"use client";

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
  faStarChristmas,
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
        <div key={index} className="m-14 ">
          <Link href={`/post`}>
            <div className="flex cursor-pointer">
              <div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/shakshyam.jpg"
                    alt="Example Image"
                    width={20}
                    height={20}
                    className="rounded-full mb-4 h-5 w-5"
                  />
                  <p className="text-sm mb-4">{post.author_name}</p>
                </div>
                <div className="font-extrabold text-2xl mb-3">{post.title}</div>
                <div className="text-gray-500 mb-5">{post.heading}</div>
                <div className="flex text-gray-600 text-sm gap-52">
                  <div className="flex gap-4">
                    <div className=" flex ">
                      <FontAwesomeIcon
                        icon={faStarChristmas}
                        style={{ color: "#FFD43B" }}
                        className="mr-1"
                      />
                      <p>Feb-5</p>
                      <FontAwesomeIcon
                        icon={faHandsClapping}
                        className="mr-1"
                      />
                      {post.likes}4.5k
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faComment} className="mr-1" />
                      {post.comments}99
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
                  src="/img.jpg"
                  alt="Example Image"
                  width={500}
                  height={500}
                  className="h-32 w-40 mb-8"
                />
              </div>
            </div>
          </Link>
          <hr className="mt-5" />
        </div>
      ))}
    </div>
  );
}

export default BlogContent;
