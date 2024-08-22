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
import Cookie from "js-cookie";
import useStore from "@/store/useStore";

function BlogContent() {
  const token = Cookie.get("token");
  const router = useRouter();
  const [data, setData] = useState([]);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  async function getData() {
    try {
      const response = await axios.get("http://localhost:5000/getBlog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleClick = async (id) => {
    if (id) {
      await router.push(`/post?id=${id}`);
    } else {
      console.log("id not found");
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      getData();
      login();
    }
  }, [token]);

  const Logout = () => {
    Cookie.remove("token", { path: "" });
    logout();
    router.push("/login");
  };

  if (!token) {
    return null;
  }

  return (
    <>
      <Navbar />
      <h1 className="text-3xl pl-14 pr-10 pt-10 ml-7">
        <a href="" className="text-4xl mb-4">
          Blogs
        </a>
        <br />
        <nav className=" text-gray-500 text-base flex justify-end">
          <ul className="flex mb-5">
            <li>
              <a href="/home">Home</a>
            </li>
            &nbsp;/&nbsp;
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>
      </h1>
      <hr className="mb-10" />
      <div className="flex">
        <div
        // style={{
        //   width: "70%",
        //   background: "linear-gradient(to right, #faeead, #fbf0b8, #ffffff)",
        // }}
        >
          {data.map((post, index) => (
            <div key={index}>
              <div
                className="ml-20 mr-14 mt-5 cursor-pointer "
                onClick={() => handleClick(post.id)}
              >
                <div className="flex gap-24">
                  <div>
                    <div className="flex items-center gap-2 relative mb-1">
                      <Image
                        src={post.image_link}
                        alt="Example Image"
                        width={20}
                        height={20}
                        className="rounded-full mb-4 h-5 w-5"
                      />
                      <div className="text-sm mb-4">{post.author_name}</div>
                    </div>
                    <div className="font-extrabold text-2xl mb-3 w-96">
                      {post.title}
                    </div>
                    <div className="text-gray-600 mb-5 w-96">
                      {post.heading}{" "}
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
              </div>
              <div className="flex text-gray-500 text-sm gap-64 ml-20">
                <div className="flex gap-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#FFD43B", marginTop: "2px" }}
                    />
                    Mar 20
                    <div>
                      <FontAwesomeIcon
                        icon={faHandsClapping}
                        className="mr-1"
                      />
                      1.7k
                      {post.likes}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    23
                    {post.comments}
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleMinus} className="text-lg" />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faBookmark} className="text-lg" />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faEllipsis} className="text-lg" />
                  </button>
                </div>
              </div>
              <hr className="mt-5 ml-20" style={{ width: "630px" }} />
            </div>
          ))}
        </div>
        <div>this is a second content</div>
      </div>
      <button onClick={Logout} className="mt-10">
        Logout
      </button>
    </>
  );
}

export default BlogContent;
