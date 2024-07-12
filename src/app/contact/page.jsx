"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../navbar/page";
import axios from "axios";
import { ErrorRounded } from "@mui/icons-material";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  async function onSubmit(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/contact",

        data: data,
      });
      console.log("this is a response", response);
      console.log("this is a data", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-600 ">
        <h1 className=" text-4xl text-white text-center p-4">
          How Can We Help You?
        </h1>
        <h1 className="text-3xl text-white text-center p-4">
          <a href="" className="text-blue-700">
            contact us
          </a>{" "}
          here
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" h-screen  w-96 text-center m-auto bg-gray-600 mx-auto">
            <div className="m-3">
              <label className="block text-base mb-2 text-left font-medium mt-3">
                <div className="text-white"> Name</div>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("Name", {
                    required: "!please enter valid Name!",
                    max: 15,
                    min: 3,
                    maxLength: 15,
                  })}
                  className="border w-full text-base px-2 py-1 p-2 bg-slate-200"
                />
                <div className="text-red-500 text-sm text-center">
                  {errors.Name && errors.Name.message}
                </div>
              </label>
              <label className="block text-base mb-2 text-left font-medium mt-3 text-white">
                Email
              </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none p-2 bg-slate-200"
                type="email"
                placeholder="Email"
                {...register("Email", {
                  required: "! Please enter a valid email !",
                  maxLength: {
                    value: 30,
                    message: "! Email cannot exceed 30 characters !",
                  },
                  minLength: {
                    value: 5,
                    message: "! Email must be at least 5 characters !",
                  },
                  pattern: {
                    value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "! Invalid email address !",
                  },
                })}
              />
              <div className="text-red-500 text-sm">
                {errors.Email && errors.Email.message}
              </div>
              <label className="block text-base mb-2 text-left font-medium mt-3 text-white">
                PhoneNumber
              </label>
              <input
                type="text"
                placeholder="PhoneNumber"
                className="border w-full text-base px-2 py-1 p-2 bg-slate-200"
                {...register("PhoneNumber", {
                  required: "Please enter a valid phone number!",
                  maxLength: {
                    value: 10,
                    message: "PhoneNumber cannot exceed 10 digits!",
                  },
                  minLength: {
                    value: 10,
                    message: "PhoneNumber must be 10 digits!",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must be numeric!",
                  },
                })}
              />
              <div className="text-red-500">
                {errors.PhoneNumber && errors.PhoneNumber.message}
              </div>
              <label className="block text-base mb-2 text-left font-medium mt-3 text-white">
                Message
              </label>
              <textarea
                rows="4"
                cols="50"
                placeholder="Your Message..."
                {...register("Message", {})}
                className="border w-full text-base px-2 py-1 p-2 bg-slate-200"
              />
              <button
                type="submit"
                className="bg-yellow-500 w-full p-1 text-white rounded-lg font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
