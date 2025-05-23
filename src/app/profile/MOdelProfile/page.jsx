"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

function Modal({ open, onClose, childern }) {
  const router = useRouter();
  const token = Cookie.get("token");
  const Logout = () => {
    Cookie.remove("token", { path: "" });
    router.push("/login");
  };
  if (!open) {
    return null;
  }
  return (
    <div className="w-fit mt-40 text-gray-600">
      <div onClick={onClose} className={`relative transition-colors`}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`bg-white rounded-sm shadow p-6 transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-500  hover:text-gray-700"
          >
            ×
          </button>

          <div className="flex gap-2 mb-3">
            <button>
              <FontAwesomeIcon icon={faUser} />
            </button>
            <Link href="/profile">profile</Link>
          </div>
          <hr />
          <div className="flex cursor-pointer" onClick={Logout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="mt-4" />
            <div className="m-3">signout </div>
          </div>
          {childern}
        </div>
      </div>
    </div>
  );
}

export default Modal;
