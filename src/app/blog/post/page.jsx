import Navbar from "@/app/navbar/page";
import Image from "next/image";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function page() {
  return (
    <div>
      <Navbar />

      <div>
        <div className="text-center m-10">
          <div className="">
            <h1 className=" text-4xl font-extrabold">
              How to Use ChatGPT in Daily Life?
            </h1>
            <p className="mr-64 text-xl text-gray-600 m-4">
              Save time and money using ChatGPT
            </p>
            <div className="flex pl-72 gap-4">
              {" "}
              <Image
                src="/img.jpg"
                alt="Example Image"
                width={5}
                height={5}
                className="rounded-full h-14 w-14"
              />
              <p className="mb-4 text-left">
                Triensend AI
                <br />
                Published in Level Up Coding · 9 min read · Apr 4, 2023
              </p>
              <hr
                style={{
                  color: "black",
                  height: 5,
                }}
              />
              <hr />
            </div>
            <div className="flex pl-72 gap-56">
              <div className="flex gap-9">
                <p className="  text-center flex gap-3">
                  <p className="size-5">
                    <FontAwesomeIcon icon={faHandsClapping} />
                  </p>
                  3.6k
                </p>
                <p className="flex gap-3">
                  <p className="size-5">
                    <FontAwesomeIcon icon={faComment} />
                  </p>
                  37
                </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
