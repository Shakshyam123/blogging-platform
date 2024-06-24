"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../navbar/page";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/name", {
        email: data.email,
        password: data.password,
      });

      console.log(response.data);

      router.push("/home");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    const registerParam = searchParams.get("register");
    if (registerParam === "true") {
      setSuccessMessage("!!Successfully registered!!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [searchParams]);

  return (
    <div>
      <Navbar />
      <div className="flex border-2 h-screen bg-black shadow-lg justify-center items-center">
        <div className="w-96 p-6 rounded-md bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl block font-semibold">
              <div className="text-green-600 text-2xl">{successMessage}</div>
              <i className="fa-solid fa-user"></i>&nbsp;Login
            </h1>

            <label className="block text-base mb-2 font-medium mt-3">
              Email
            </label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none rounded-lg p-2"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Please enter a valid email",
                maxLength: {
                  value: 30,
                  message: "Email cannot exceed 30 characters",
                },
                minLength: {
                  value: 5,
                  message: "Email must be at least 5 characters",
                },
                pattern: { value: /@./, message: "Invalid email address" },
              })}
            />
            <div className="text-red-700">
              {errors.email && errors.email.message}
            </div>

            <br />

            <label className="block text-base mb-2 font-medium">Password</label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none rounded-lg p-2"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Please enter a valid password",
                maxLength: {
                  value: 15,
                  message: "Password cannot exceed 15 characters",
                },
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9]*$/,
                  message: "Password must contain only letters and numbers",
                },
              })}
            />
            <div className="text-red-700">
              {errors.password && errors.password.message}
            </div>

            <br />
            <div className="flex items-center justify-between ">
              <div>
                <input type="checkbox" {...register("rememberMe")} />
                <label className="ml-2">Remember me</label>
              </div>
              <div>
                <Link href="/login/forgotPassword">Forgot Password?</Link>
              </div>
            </div>
            <br />

            <button
              type="submit"
              className="border-3 text-white border-indigo-700 bg-black py-1 w-full rounded-md"
            >
              Login
            </button>
            <div className="text-red-500">{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
