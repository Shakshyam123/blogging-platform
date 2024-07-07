import React from "react";
import Image from "next/image";
import Navbar from "@/app/navbar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsClapping,
  faComment,
  faBookmark,
  faCirclePlay,
  faShare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

function Post({ heading, authorName, content, title, imageLink }) {
  return (
    <div>
      <Navbar />
      <div>
        <div className="text-center m-10">
          <div className="">
            <h1 className="text-4xl font-extrabold">
              Are You Smart Enough To Find The Radius?
            </h1>
            <p className="mr-96  text-xl text-gray-600 m-4">
              This is a heading
            </p>
            <div className="flex pl-72 gap-4">
              <Image
                src="/shakshyam.jpg"
                alt="Example Image"
                width={50}
                height={50}
                className="rounded-full h-14 w-14"
              />
              <div className="mb-4 text-left">
                Shakshyam bohara
                <br />
                Published in Level Up Coding · 9 min read · Apr 4, 2023
              </div>
              <hr />
            </div>
            <div className="flex pl-72 gap-56">
              <div className="flex gap-9">
                <div className="text-center flex gap-3">
                  <p className="size-5">
                    <FontAwesomeIcon icon={faHandsClapping} />
                  </p>
                  3.6k
                </div>
                <div className="flex gap-3">
                  <p className="size-5">
                    <FontAwesomeIcon icon={faComment} />
                  </p>
                  37
                </div>
              </div>
              <div className="flex gap-8">
                <p className="size-4">
                  <FontAwesomeIcon icon={faBookmark} />
                </p>
                <p className="size-5">
                  <FontAwesomeIcon icon={faCirclePlay} />
                </p>
                <p className="size-5">
                  <FontAwesomeIcon icon={faShare} />
                </p>
                <p className="size-5">
                  <FontAwesomeIcon icon={faEllipsis} />
                </p>
              </div>
            </div>
            <Image
              src="/img.jpg"
              alt="Example Image"
              width={600}
              height={200}
              className="ml-72 mt-11 h-96"
            />
            <h1 className="mt-6 font-serif font-bold text-3xl">
              This is a heading
            </h1>
            <div className="text-left pl-72 font-extralight w-auto mr-60">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industr standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
