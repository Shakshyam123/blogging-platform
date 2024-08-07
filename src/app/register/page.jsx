"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(data) {
    console.log("data:", data);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/nepal",
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          birthdate: data.birthdate,
          gender: data.gender,
          country: data.country,
        },
      });

      console.log("response:", response);
      router.push("/login?register=true");
    } catch (error) {
      console.error("Error response:", error.response);
      setErrorMessage(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div
        className="flex border-2 h-fit  shadow-lg justify-center items-center bg-black border-white"
        // style={{ backgroundColor: "#282C35" }}
      >
        <div className=" mt-11 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-5 bg-white">
            <h1 className="text-4xl block font-semibold text-center ">
              Register
            </h1>

            <label className="block text-base mb-2  font-medium mt-3">
              First Name:
            </label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none = p-2"
              type="text"
              placeholder="First Name"
              {...register("first_name", {
                required: "! Please enter a valid first name !",
                maxLength: {
                  value: 15,
                  message: "! First name cannot exceed 15 characters !",
                },
                minLength: {
                  value: 3,
                  message: "! First name must be at least 3 characters !",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid first name",
                },
              })}
            />
            <div className="text-red-700">
              {errors.first_name && errors.first_name.message}
            </div>

            <label className="block text-base mb-2 font-medium mt-3">
              Last Name:
            </label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none  p-2"
              type="text"
              placeholder="Last Name"
              {...register("last_name", {
                required: "! Please enter a valid last name !",
                maxLength: {
                  value: 15,
                  message: "! Last name cannot exceed 15 characters !",
                },
                minLength: {
                  value: 3,
                  message: "! Last name must be at least 3 characters !",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid last name",
                },
              })}
            />
            <div className="text-red-700">
              {errors.last_name && errors.last_name.message}
            </div>

            <label className="block text-base mb-2 font-medium mt-3">
              Email:
            </label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none  p-2"
              type="email"
              placeholder="Email"
              {...register("email", {
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
            <div className="text-red-700">
              {errors.email && errors.email.message}
            </div>

            <label className="block text-base mb-2 font-medium mt-3">
              Password:
            </label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none p-2"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "! Please enter a valid password !",
                maxLength: {
                  value: 15,
                  message: "! Password cannot exceed 15 characters !",
                },
                minLength: {
                  value: 4,
                  message: "! Password must be at least 4 characters !",
                },
                pattern: {
                  value: /^[A-Za-z0-9]*$/,
                  message: "! Password must contain only letters and numbers !",
                },
              })}
            />
            <div className="text-red-700">
              {errors.password && errors.password.message}
            </div>

            <label className="block text-base mb-2 font-medium mt-3">
              Birth Date:
            </label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-nonep-2"
              type="datetime-local"
              placeholder="Birth Date"
              {...register("birthdate", {
                required: "! Please enter your birth date !",
              })}
            />
            <div className="text-red-700">
              {errors.birthdate && errors.birthdate.message}
            </div>

            <label className="block text-base mb-2 font-medium mt-3">
              Gender:
            </label>
            <div>
              <input
                {...register("gender", {
                  required: "! Please select a gender !",
                })}
                type="radio"
                value="male"
              />
              <label>Male</label>
              &nbsp;
              <input
                {...register("gender", {
                  required: "! Please select a gender !",
                })}
                type="radio"
                value="female"
              />
              <label>Female</label>
            </div>
            <div className="text-red-700">
              {errors.gender && errors.gender.message}
            </div>

            <label className="block text-base mb-2 font-medium mt-3">
              Country:
            </label>
            <select
              {...register("country", {
                required: "! Please select a country !",
              })}
              className="border w-full text-base px-2 py-1 focus:outline-none p-2"
            >
              <option value="">Select</option>
              <option value="Nepal">Nepal</option>
              <option value="China">China</option>
              <option value="India">India</option>
            </select>
            <div className="text-red-700">
              {errors.country && errors.country.message}
            </div>

            <button
              type="submit"
              className="border-3 text-white border-indigo-700 bg-black py-1 w-full rounded-md mt-3"
            >
              Register
            </button>
            <div className="text-red-600 font-semibold">{errorMessage}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
