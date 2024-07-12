"use client";

import Navbar from "../navbar/page";
import Image from "next/image";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsClapping,
  faComment,
  faBookmark,
  faCircleMinus,
  faEllipsis,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BlogContent() {
  const router = useRouter();

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/deletePost/${id}`);
      setData(data.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const handleClick = async (id) => {
    if (id) {
      await router.push(`/post?id=${id}`);
    } else {
      console.log("id not found");
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:5000/getBlog");
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
        <div
          key={index}
          className="m-14 cursor-pointer"
          onClick={() => handleClick(post.id)}
        >
          <div className="flex">
            <div>
              <div className="flex items-center gap-2 relative">
                <Image
                  src={post.image_link}
                  alt="Example Image"
                  width={20}
                  height={20}
                  className="rounded-full mb-4 h-5 w-5"
                />
                <p className="text-sm mb-4">{post.author_name}</p>
              </div>
              <div className="font-extrabold text-2xl mb-3 w-96">
                {post.title}
              </div>
              <div className="text-gray-500 mb-5 w-96">{post.heading}</div>
              <div className="flex text-gray-600 text-sm gap-52">
                <div className="flex gap-4">
                  <div className=" flex gap-3">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#FFD43B" }}
                    />
                    <FontAwesomeIcon icon={faHandsClapping} className="mr-1" />
                    {post.likes}4.5k
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    {post.comments} 99
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      className="text-lg  "
                      style={{ handleDelete }}
                    />
                  </button>
                  <FontAwesomeIcon icon={faBookmark} className="" />
                  <FontAwesomeIcon icon={faEllipsis} className="text-lg" />
                </div>
              </div>
            </div>

            <div className="ml-7">
              <Image
                src={post.image_link}
                alt="Example Image"
                width={500}
                height={500}
                className="h-32 w-40 mb-8"
              />
            </div>
          </div>
          <hr className="mt-5" style={{ width: "630px" }} />
        </div>
      ))}
    </div>
  );
}

export default BlogContent;
