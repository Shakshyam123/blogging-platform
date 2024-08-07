"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../navbar/page";
import axios from "axios";
import Footer from "../footer/page";
import { ErrorRounded } from "@mui/icons-material";

function ContactCopy() {
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
      <div className="">
        <h1 className="text-3xl pl-14 pr-10 pt-10 ml-7">
          <a href="" className="text-4xl">
            Contact
          </a>{" "}
          <br />
          <p className="text-xl text-gray-400 pt-3">Get in Touch With us</p>
          <nav className=" text-gray-500 text-sm flex justify-end mb-4">
            <ul className="flex ">
              <li>
                <a href="/home">Home</a>
              </li>
              &nbsp;/&nbsp;
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </nav>
        </h1>
        <hr className="mb-10" />
        <div className="flex">
          <div style={{ width: "50%", marginLeft: "40px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="m-9">
                  <div className="flex gap-5 ">
                    <div className="w-1/2 ">
                      <label className="block text-base mb-2 text-left font-medium mt-3">
                        Name *
                        <input
                          type="text"
                          {...register("Name", {
                            required: "This field is required",
                            max: 15,
                            min: 3,
                            maxLength: 15,
                          })}
                          className="border w-full text-base px-2 py-1 p-2 rounded-md h-10"
                        />
                        <div className="text-red-500 text-sm font-light">
                          {errors.Name && errors.Name.message}
                        </div>
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-base  text-left font-medium mt-3  ">
                        Email *
                      </label>
                      <input
                        className="border w-full text-base px-2 py-1 focus:outline-none p-2 rounded-md h-10"
                        type="email"
                        {...register("Email", {
                          required: "This field is required",
                          maxLength: {
                            value: 30,
                            message: "Email cannot exceed 30 characters",
                          },
                          minLength: {
                            value: 5,
                            message: "!Email must be at least 5 characters!",
                          },
                          pattern: {
                            value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "! Invalid email address !",
                          },
                        })}
                      />
                      <div className="text-red-500 font-light text-sm">
                        {errors.Email && errors.Email.message}
                      </div>
                    </div>
                  </div>
                  <label className="block text-base mb-2 text-left font-medium mt-3 ">
                    PhoneNumber *
                  </label>
                  <input
                    type="text"
                    className="border w-full text-base px-2 py-1 p-2 rounded-md h-10"
                    {...register("PhoneNumber", {
                      required: "This field is required",
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
                  <div className="text-red-500 font-light text-sm">
                    {errors.PhoneNumber && errors.PhoneNumber.message}
                  </div>
                  <label className="block text-base mb-2 text-left font-medium mt-3 ">
                    Message *
                  </label>
                  <textarea
                    rows="4"
                    cols="50"
                    {...register("Message", {
                      required: "This field is required",
                    })}
                    className="border w-full text-base px-2 py-1 p-2 rounded-md h-40"
                  />
                  <div className="text-red-500 font-light text-sm">
                    {errors.Message && errors.Message.message}
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-right  font-semibold mt-4 pl-6 pr-6 pt-3 pb-3 text-white rounded-sm shadow-md hover:bg-yellow-400"
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ width: "50%", marginTop: "35px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7065.2877315871165!2d85.33180000000003!3d27.69740000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1721978785936!5m2!1sen!2snp"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactCopy;
