"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Cookie from "js-cookie";

function LoginForm() {
  const cookie = Cookie.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: data.email,
        password: data.password,
      });
      Cookie.set("token", response.data.token, { path: "" });
      console.log(response.data);
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
      setSuccessMessage(" Successfully registered!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [searchParams]);

  return (
    <>
      {!cookie ? null : router.push("/blog")}
      <div className="flex h-screen bg-black justify-center items-center">
        <div className="w-96 p-6 rounded-md bg-white shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-semibold text-center mb-4">
              <div className="text-green-600 text-lg">{successMessage}</div>
              Login
            </h1>

            {error && (
              <div className="text-red-600 text-center mb-2">{error}</div>
            )}

            {/* Email */}
            <label className="block text-base mb-1 font-medium">Email</label>
            <input
              className="border w-full text-base px-2 py-2 focus:outline-none rounded-lg"
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
            <div className="text-red-700 text-sm">
              {errors.email && errors.email.message}
            </div>

            {/* Password */}
            <label className="block text-base mb-1 mt-4 font-medium">
              Password
            </label>
            <input
              className="border w-full text-base px-2 py-2 focus:outline-none rounded-lg"
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
            <div className="text-red-700 text-sm">
              {errors.password && errors.password.message}
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <input type="checkbox" {...register("rememberMe")} />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <Link
                href="/login/forgotPassword"
                className="text-blue-500 text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-5 bg-black text-white py-2 w-full rounded-md hover:bg-gray-800 transition"
            >
              Login
            </button>

            <h1 className="text-center text-lg mt-5 font-medium">
              Or login with
            </h1>

            <div className="flex justify-center gap-4 mt-3">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-600 text-2xl hover:scale-110 transition"
              />
              <FontAwesomeIcon
                icon={faGithub}
                className="text-black text-2xl hover:scale-110 transition"
              />
              <div>
                <FontAwesomeIcon
                  onClick={google}
                  icon={faGoogle}
                  className="text-orange-300 text-2xl hover:scale-110 transition"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
