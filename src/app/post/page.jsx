"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/navbar/page";
import { useSearchParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsClapping,
  faComment,
  faBookmark,
  faCirclePlay,
  faShare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

function Post() {
  const [like, setLike] = useState({});
  const token = Cookie.get("token");
  const [post, setPost] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  async function likePost(id) {
    const token = Cookie.get("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/blogLike/${id}`,
        { id },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLike((prev) => {
          const updatedLikes = {
            ...prev,
            [id]: (prev[id] || 0) + 1,
          };
          localStorage.setItem("likeCounts", JSON.stringify(updatedLikes));

          return updatedLikes;
        });
      } else if (response.status === 200) {
        alert("Post already liked");
      }
      console.log("This is a response", response);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  async function getData(id) {
    try {
      const response = await axios.get(`http://localhost:5000/getPost/${id}`);
      console.log(response);
      setPost(response.data[0]);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getData(id);
    }
  }, [searchParams]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return token ? (
    <div>
      <Navbar />
      <div>
        <div className="text-center m-10">
          <div>
            <h1 className="text-4xl font-extrabold mr-48">{post.title}</h1>
            <p className="mr-16  text-xl text-gray-600 m-4">{post.heading}</p>
            <div className="flex pl-72 gap-4">
              <Image
                src={post.image_link}
                alt="Example Image"
                width={50}
                height={50}
                className="rounded-full h-14 w-14"
              />
              <div className="mb-4 text-left">
                {post.author_name}
                <br />
                Published in Level Up Coding · 9 min read · Apr 4, 2023
              </div>
              <hr />
            </div>
            <div className="flex pl-72 gap-56">
              <div className="flex gap-9">
                <div className="text-center flex gap-3">
                  <button className="size-5 flex gap-1 ">
                    <div className="flex">
                      <button
                        onClick={() => {
                          likePost(post.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHandsClapping}
                          className="mr-1"
                        />
                      </button>

                      {like[post.id] || 0}
                    </div>
                  </button>
                </div>
                <div className="flex gap-3">
                  <button className="size-5 ">
                    <FontAwesomeIcon icon={faComment} />
                  </button>
                  {post.comments}9
                </div>
              </div>
              <div className="flex gap-8">
                <button className="size-4">
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
                <button className="size-5">
                  <FontAwesomeIcon icon={faCirclePlay} />
                </button>
                <button className="size-5">
                  <FontAwesomeIcon icon={faShare} />
                </button>
                <div className="size-5">
                  <div className="relative">
                    <button className="relative">
                      {" "}
                      <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={post.image_link}
              alt="Example Image"
              width={600}
              height={200}
              className="ml-72 mt-11 h-96"
            />
            <h1
              className="mt-6 font-serif font-bold text-3xl ml-60"
              style={{ width: "700px" }}
            >
              {post.heading}
            </h1>
            <div className="text-left pl-72 font-extralight w-auto mr-60">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    router.push("/login")
  );
}

export default Post;
