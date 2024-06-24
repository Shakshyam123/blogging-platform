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
  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <div>
      <div className="flex border-2 h-fit bg-black shadow-lg justify-center items-center ">
        <div className=" mt-11 rounded-md bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-5">
            <h1 className="text-center font-extrabold text-5xl">Form</h1>
            <label>Heading:</label>
            <input type="text" placeholder="heading" {...register} />
            <textarea {...register} />
            <br />
            <label>Title:</label>

            <input type="text" placeholder="title" {...register} />
            <textarea {...register} />
            <textarea {...register("title", {})} />
            <br />
            <label>Content:</label>
            <input type="text" placeholder="content" {...register} />
            <textarea {...register} />
            <textarea {...register("theading", {})} />
            <textarea {...register("content", {})} />
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
