"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword === data.confirmPassword) {
      await router.push("/login?updated=true");
    } else {
      setErrorMessage("Passwords do not match!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex border-2 h-screen bg-indigo-600 shadow-lg justify-center items-center">
        <div className="w-96 rounded-md bg-white p-5">
          <h1 className="font-bold text-xl mb-4">Update Password</h1>
          <input
            {...register("newPassword", {
              required: "Please enter a new password",
            })}
            className="w-full border-2 p-2 rounded-lg mb-2"
            type="password"
            placeholder="New password"
            maxLength={6}
            pattern="[0-9]*"
            inputMode="numeric"
            title="Please enter only numeric characters."
          />
          {errors.newPassword && (
            <div className="text-red-600">{errors.newPassword.message}</div>
          )}
          <input
            {...register("confirmPassword", {
              required: "Please confirm your new password",
            })}
            className="w-full border-2 p-2 rounded-lg mb-2"
            type="password"
            placeholder="Confirm new password"
            maxLength={6}
            pattern="[0-9]*"
            inputMode="numeric"
            title="Please enter only numeric characters."
          />
          {errors.confirmPassword && (
            <div className="text-red-600">{errors.confirmPassword.message}</div>
          )}
          <div className="text-red-600 mb-2">{errorMessage}</div>
          <div className="flex justify-end mt-3 gap-2">
            <Link
              href="/login/verifyotp"
              className="bg-slate-300 p-1 rounded-lg font-semibold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-green-500 p-1 rounded-lg text-white font-semibold"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
