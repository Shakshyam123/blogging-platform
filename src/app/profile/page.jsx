"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:5000/register", {});
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!data) {
  //   return <div>Error loading data</div>;
  // }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg w-full">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/img.jpg"
              alt="Example Image"
              width={500}
              height={500}
              className="h-72 w-72 rounded-full"
            />
          </div>
        </div>

        <div className="md:flex md:space-x-6">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {/* {data.first_name} {data.last_name} */}
              </h2>
              <p className="text-gray-600">Web Designer</p>
              <p className="text-sm text-gray-500">
                <i className="fas fa-map-marker-alt"></i> Nepal, NP
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Send Message
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                Contacts
              </button>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Work</h3>
              <div className="space-y-2">
                <div className="p-4 bg-gray-100 rounded flex justify-between">
                  <div>
                    <h4 className="font-bold">Spotify New York</h4>
                    <p className="text-sm text-gray-600">
                      170 William Street, New York, NY 10038
                    </p>
                  </div>
                  <span className="text-blue-500">Primary</span>
                </div>
                <div className="p-4 bg-gray-100 rounded flex justify-between">
                  <div>
                    <h4 className="font-bold">Metropolitan Museum</h4>
                    <p className="text-sm text-gray-600">
                      534 E 65th Street, New York, NY 10651
                    </p>
                  </div>
                  <span className="text-blue-500">Secondary</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Android</span>
                  <div className="w-1/2 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Web Design</span>
                  <div className="w-1/2 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>UI/UX</span>
                  <div className="w-1/2 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Video Editing</span>
                  <div className="w-1/2 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold">Contact Information</h4>
                  <p className="text-sm text-gray-600">
                    Phone:{" "}
                    <a href="tel:+1234567890" className="text-blue-500">
                      +1 234 567 890
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: Nepal, Banepa 07, Kavre
                  </p>
                  <p className="text-sm text-gray-600">
                    E-mail:{" "}
                    <a
                      href="mailto:boharashakshyam@gmail.com"
                      className="text-blue-500"
                    >
                      boharashakshyam@gmail.com
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">Basic Information</h4>
                  <p className="text-sm text-gray-600">
                    Birthday: Nov 25, 2008
                  </p>
                  <p className="text-sm text-gray-600">Gender: </p>
                  {/* {data.gender} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
