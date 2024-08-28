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
import Link from "next/link";
import Cookie from "js-cookie";
import Modal from "../blog/openModal/page";
import HoverModel from "./hoverMOdel/page";
import useStore from "@/store/useStore";
import { Trykker } from "next/font/google";

function BlogContent() {
  const token = Cookie.get("token");
  const router = useRouter();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  const [open, setOpen] = useState(false);
  const [onHoverModel, setOnHoverModel] = useState(false);
  const [blogLike, setBlogLike] = useState("");

  useEffect(() => {
    setIsClient(true);

    if (!token) {
      router.push("/login");
    } else {
      getData();
      login();
    }
  }, [token]);

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
  async function getNewData() {
    try {
      const res = await axios.get("http://localhost:5000/reccomendation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function blogLikes() {
    try {
      const response = await axios.post("http://localhost:5000/blogLike", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogLike(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/deletePost/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setData(data.filter((post) => post.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  const handleClick = async (id) => {
    if (id) {
      await router.push(`/post?id=${id}`);
    } else {
      console.log("id not found");
    }
  };

  const Logout = () => {
    Cookie.remove("token", { path: "" });
    logout();
    router.push("/login");
  };
  if (!token || !isClient) {
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
        <div>
          {data.map((post, index) => (
            <div key={index}>
              <div
                className="ml-20 mr-14 mt-5 cursor-pointer"
                onClick={() => handleClick(post.id)}
              >
                <div className="flex gap-24">
                  <div>
                    <div className="flex gap-2 mb-1">
                      <div
                        className="cursor-pointer gap-64"
                        onMouseEnter={() => {
                          setOnHoverModel(post.id);
                        }}
                        onMouseLeave={() => setOnHoverModel(null)}
                      >
                        <Image
                          src={post.image_link}
                          alt="Example Image"
                          width={20}
                          height={20}
                          className="rounded-full mb-4 h-5 w-5 "
                        />
                      </div>
                      <div className="">
                        {onHoverModel === post.id && (
                          <HoverModel
                            onMouseEnter={() => {
                              onHoverModel(true);
                            }}
                            onMouseLeave={() => {
                              setOnHoverModel(null);
                            }}
                          ></HoverModel>
                        )}
                      </div>
                      <div className="text-sm mb-4">{post.author_name}</div>
                    </div>
                    <div className="font-extrabold text-2xl mb-3 w-96">
                      {post.title}
                    </div>
                    <div className="text-gray-600 mb-5 w-96">
                      {post.heading}
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
              <div className="flex text-gray-500 text-sm gap-36 ml-20">
                <div className="flex gap-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#FFD43B" }}
                    />
                    Mar 20
                    <div>
                      <button
                        onClick={() => {
                          blogLikes();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHandsClapping}
                          className="mr-1"
                        />
                      </button>
                      1.7k
                      {post.likes}
                    </div>
                  </div>
                  <div className="flex mt-0.5">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    23
                    {/* {post.comments} */}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className=" ">
                    <button>
                      <FontAwesomeIcon icon={faBookmark} className="text-lg" />
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                      onClick={() => {
                        setOpen(post.id);
                      }}
                      className=""
                    >
                      {" "}
                      <FontAwesomeIcon icon={faEllipsis} className="text-lg" />
                    </button>
                  </div>
                  {open === post.id && (
                    <div className="absolute top-auto">
                      <Modal
                        className=""
                        open={open === post.id}
                        onClose={() => {
                          setOpen(false);
                        }}
                      ></Modal>
                    </div>
                  )}
                </div>
              </div>

              <hr className=" ml-20 mt-5" style={{ width: "630px" }} />
            </div>
          ))}
        </div>
        <div className="ml-20 ">
          <div className="">
            <h1 className="font-bold mb-9">Recommendation</h1>
          </div>
          <div className="">
            {data.map((post) => (
              <>
                <div
                  className="w-80 mb-8  cursor-pointer"
                  onClick={() => handleClick(post.id)}
                >
                  <div className="flex gap-4 ">
                    <Image
                      src={post.image_link}
                      alt="Example Image"
                      width={20}
                      height={20}
                      className="rounded-full mb-4 h-5 w-5"
                      referrerPolicy="no-referrer"
                    />
                    <h1 className="text-xm ">{post.author_name}</h1>
                  </div>
                  <div className="font-bold">{post.heading}</div>
                </div>
              </>
            ))}
          </div>
        </div>
        {/* <Link href="/home">See more suggestions</Link> */}
      </div>

      <button onClick={Logout} className="mt-10">
        Logout
      </button>
    </>
  );
}

export default BlogContent;
