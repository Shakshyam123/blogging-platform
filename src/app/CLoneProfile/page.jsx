"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CLoneProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = Cookie.get("token");

  async function getData() {
    try {
      const response = await axios.get("http://localhost:5000/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("this is a response", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      getData();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div>
        <div className="font-semibold text-4xl py-3 pl-3">Verse vibe</div>
        <hr className="mt-2 " />
        <div className="grid grid-cols-[70%_30%] mt-4">
          <div className="flex mt-5">
            {" "}
            <div className="   ml-14">
              {" "}
              <Image
                src={data.profile_image}
                alt="Example Image"
                width={500}
                height={500}
                className="h-12 w-12 mr-3 mt-2 rounded-full"
              />
            </div>
            <div className="text-xl ">
              {data.last_name}
              {data.first_name}
              <div className="font-normal text-sm mt-2">
                <h1 className="text-gray-500">AUG 26,2034 . 3 stories</h1>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={data.profile_image}
              alt="Example Image"
              width={500}
              height={500}
              className="h-32 w-32 rounded-full"
            />
            <div className="font-semibold text-xl">
              {data.last_name}
              {data.first_name}
            </div>
            <a className="text-green-500 text-xs mt-32">Edit profile</a>
          </div>
        </div>
      </div>
    </>
  );
}
