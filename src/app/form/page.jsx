"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/blogPost",
        data: data,
      });
      console.log(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex border-2 h-fit bg-black shadow-lg justify-center items-center ">
        <div className=" mt-11 rounded-md bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-5 mb-3">
            <h1 className="text-center font-extrabold text-5xl">Form</h1>
            <label>AuthorName:</label>
            <input
              type="text"
              placeholder="AuthorName"
              {...register("AuthorName", {})}
            />
            <br />
            <label>imageLink:</label>
            <input
              type="text"
              placeholder="imageLink"
              {...register("imageLink", {})}
            />
            <br />

            <label>title:</label>
            <input type="text" placeholder="title" {...register("title", {})} />

            <br />
            <label>heading:</label>

            <textarea
              type="text"
              placeholder="heading"
              {...register("heading", {})}
            />
            <br />
            <label>content:</label>

            <textarea
              type="text"
              placeholder="content"
              {...register("content", {})}
            />
            <button
              type="submit"
              className="border-3 text-white border-indigo-700 bg-black py-1 w-full rounded-md mt-3"
            >
              click me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
