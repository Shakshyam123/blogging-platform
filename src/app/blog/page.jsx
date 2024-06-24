import React from "react";
import Navbar from "../navbar/page";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function Blog() {
  return (
    <div>
      <Navbar />
      <div className="m-14">
        <h1 className="m-9 font-extrabold">Because you follow programming</h1>
        <Link href="/blog/post">
          <div className="flex">
            <div>
              {" "}
              <div className="flex">
                {" "}
                <Image
                  src="/img.jpg"
                  alt="Example Image"
                  width={5}
                  height={5}
                  className="rounded-full h-5 w-5"
                />
                <p className="text-sm mb-4 ">
                  Esther is a confused human being
                </p>
              </div>
              <div className="font-extrabold text-2xl mb-3">
                How to Use ChatGPT in Daily Life?
              </div>
              <div className="text-gray-500 mb-5">
                Save time and money using chatGpt
              </div>
              <div className="flex gap-52">
                <div className="flex gap-4 text-gray-600 text-sm">
                  <p>may4,2023</p>
                  <p className="flex">
                    {" "}
                    <p className="size-5">
                      {" "}
                      <FontAwesomeIcon icon={faHandsClapping} />
                    </p>
                    1.8k
                  </p>
                  <p className="flex ">
                    <p className="size-4">
                      <FontAwesomeIcon icon={faComment} />
                    </p>
                    26
                  </p>
                </div>
                <div className="flex gap-5">
                  <p className="size-4 bg-white border-black">
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </p>{" "}
                  <p className="size-3">
                    <FontAwesomeIcon icon={faBookmark} />
                  </p>
                  <p className="size-5">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-7">
              <Image
                src="/img.jpg"
                alt="Example Image"
                width={500}
                height={500}
                className="h-32 w-40 mt-5"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="m-14">
        <Link href="/blog/post">
          <div className="flex">
            <div>
              {" "}
              <div className="flex">
                {" "}
                <Image
                  src="/img.jpg"
                  alt="Example Image"
                  width={5}
                  height={5}
                  className="rounded-full h-5 w-5"
                />
                <p className="text-sm mb-4 ">
                  Esther is a confused human being
                </p>
              </div>
              <div className="font-extrabold text-2xl mb-3">
                How to Use ChatGPT in Daily Life?
              </div>
              <div className="text-gray-500 mb-5">
                Save time and money using chatGpt
              </div>
              <div className="flex gap-52">
                <div className="flex gap-4 text-gray-600 text-sm">
                  <p>may4,2023</p>
                  <p className="flex">
                    {" "}
                    <p className="size-5">
                      {" "}
                      <FontAwesomeIcon icon={faHandsClapping} />
                    </p>
                    1.8k
                  </p>
                  <p className="flex ">
                    <p className="size-4">
                      <FontAwesomeIcon icon={faComment} />
                    </p>
                    26
                  </p>
                </div>
                <div className="flex gap-5">
                  <p className="size-4 bg-white border-black">
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </p>{" "}
                  <p className="size-3">
                    <FontAwesomeIcon icon={faBookmark} />
                  </p>
                  <p className="size-5">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-7">
              <Image
                src="/img.jpg"
                alt="Example Image"
                width={500}
                height={500}
                className="h-32 w-40 mt-5"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="m-14">
        <Link href="/blog/post">
          <div className="flex">
            <div>
              {" "}
              <div className="flex">
                {" "}
                <Image
                  src="/img.jpg"
                  alt="Example Image"
                  width={5}
                  height={5}
                  className="rounded-full h-5 w-5"
                />
                <p className="text-sm mb-4 ">
                  Esther is a confused human being
                </p>
              </div>
              <div className="font-extrabold text-2xl mb-3">
                How to Use ChatGPT in Daily Life?
              </div>
              <div className="text-gray-500 mb-5">
                Save time and money using chatGpt
              </div>
              <div className="flex gap-52">
                <div className="flex gap-4 text-gray-600 text-sm">
                  <p>may4,2023</p>
                  <p className="flex">
                    {" "}
                    <p className="size-5">
                      {" "}
                      <FontAwesomeIcon icon={faHandsClapping} />
                    </p>
                    1.8k
                  </p>
                  <p className="flex ">
                    <p className="size-4">
                      <FontAwesomeIcon icon={faComment} />
                    </p>
                    26
                  </p>
                </div>
                <div className="flex gap-5">
                  <p className="size-4 bg-white border-black">
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </p>{" "}
                  <p className="size-3">
                    <FontAwesomeIcon icon={faBookmark} />
                  </p>
                  <p className="size-5">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-7">
              <Image
                src="/img.jpg"
                alt="Example Image"
                width={500}
                height={500}
                className="h-32 w-40 mt-5"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
