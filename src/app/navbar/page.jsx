"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useStore from "../../store/useStore.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../profile/MOdelProfile/page.jsx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinksRef = useRef(null);
  const { login, logout, isAuthenticated } = useStore();
  const [open, setOpen] = useState(false);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-black">
      <nav className="flex justify-between items-center w-[92%] mx-auto bg-black h-20">
        <div>
          <h1 className="font-serif text-white font-extrabold text-4xl ">
            <Link href="/home">VerseVibe</Link>
          </h1>
        </div>
        <div
          ref={navLinksRef}
          className={`md:static absolute md:min-h-fit min-h-[60vh] left-[40%] ${
            isMenuOpen ? "top-[10%] bg-red-300" : "top-[-130%]"
          } md:w-auto w-full flex items-center px-5 transition-all duration-300`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-black md:text-white">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div className="mt-2 flex gap-2 text-white">
          {!isAuthenticated ? (
            <>
              {logout ? (
                <>
                  <Link href="/login" className="mt-3">
                    <span className="mr-2 cursor-pointer ">LOG IN</span>
                  </Link>
                  <Link
                    href="/register"
                    className="border-2 p-2 rounded-lg bg-transparent "
                  >
                    GET STARTED
                  </Link>
                </>
              ) : (
                <Link href="/profile" className="mb-2">
                  <Image
                    src="/image3.jpg"
                    alt="Example Image"
                    width={50}
                    height={50}
                    className="rounded-full mb-3 "
                  />
                </Link>
              )}
            </>
          ) : (
            <>
              {login ? (
                <>
                  <div>
                    <div className="mb-2" onClick={setOpen}>
                      <Image
                        src="/image3.jpg"
                        alt="Example Image"
                        width={50}
                        height={50}
                        className="rounded-full  mr-7 cursor-pointer "
                      />
                    </div>
                    <Modal
                      className=""
                      open={open}
                      onClose={() => {
                        setOpen(false);
                      }}
                    ></Modal>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="mt-3">
                    <span className="mr-2 cursor-pointer ">LOG IN</span>
                  </Link>
                  <Link
                    href="/register"
                    className="border-2 px-5 py-2 rounded-lg bg-transparent"
                  >
                    GET STARTED
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {faBars ? (
          <div className="flex items-center gap-6 md:hidden bg-gray-500 ">
            <button className="bg-zinc-50" onClick={onToggleMenu}>
              <FontAwesomeIcon
                icon={faBars}
                className="text-3xl cursor-pointer"
              />
            </button>
          </div>
        ) : (
          <FontAwesomeIcon icon={faXmark} />
        )}
      </nav>
    </div>
  );
}

export default Navbar;
