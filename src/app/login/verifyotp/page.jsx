"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VerifyOtp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await router.push("/login/updatepassword");
    console.log(errors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex border-2 h-screen bg-black shadow-lg justify-center items-center">
          <div className="w-96 rounded-md bg-white p-5">
            <h1 className="text-xl font-bold mb-2">Enter OTP</h1>
            <input
              className="w-full border-2 p-2 rounded-lg"
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              pattern="[0-9]*"
              inputMode="numeric"
              {...register("otp", {
                required: "Please enter the OTP",
                maxLength: {
                  value: 6,
                  message: "OTP cannot exceed 6 characters",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter only numeric characters",
                },
              })}
            />
            <div className="text-red-700">
              {errors.otp && errors.otp.message}
            </div>

            <div className="flex justify-end mt-3 gap-2">
              <Link href="/login/forgotPassword">
                <button className="bg-slate-300 p-1 rounded-lg font-semibold">
                  Cancel
                </button>
              </Link>
              <button
                className="bg-green-500 p-1 rounded-lg text-white font-semibold"
                type="submit"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
