"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Image from "next/image";

function HoverModel() {
  const [data, setData] = useState("");
  console.log("this is a data", data);
  async function getUserData() {
    try {
      const token = Cookie.get("token");
      const response = await axios.get("http://localhost:5000/authorDetail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="border-2 h-auto p-5 absolute bg-white shadow rounded-lg z-auto top-auto left-24">
      <div className="mb-4">
        <div className="flex gap-32">
          <div>
            <Image
              src={data.profile_image}
              alt={`hello`}
              width={60}
              height={60}
              className="rounded-full h-24 w-24"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="bg-black text-white rounded-xl h-8 mt-3 pl-3 pr-3 pb-3 pt-1">
            Follow
          </button>
        </div>
        <div>
          <div>
            <h2 className="font-bold">
              {data.first_name} {data.last_name}
            </h2>
          </div>
          <div>
            <p className="font-bold mt-1 text-gray-400">6.9k followers</p>
          </div>
          <div>
            <p className="w-72 mt-2 text-sm">
              {data.heading}Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverModel;
