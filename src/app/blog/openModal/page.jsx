import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@mui/material";

function Modal({ open, onClose, childern }) {
  if (!open) {
    return null;
  }
  return (
    <div className="w-64">
      <div
        onClick={onClose}
        className={`relative transition-colors${
          open ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`bg-white rounded-xl shadow p-6 transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-500  bg-white hover:bg-gray-50 hover:text-gray-700"
          >
            ×
          </button>
          <div className="m-3">
            <div className="gap-3">
              <button>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  style={{ backgroundColor: "white" }}
                />
              </button>
              &nbsp; Show more
            </div>
            Recommend more stories like this to me
          </div>
          <div className="m-3">
            <div>
              <button>
                <FontAwesomeIcon icon={faCircleMinus} />
              </button>
              &nbsp; Show less
            </div>
            Recommed less stories Likes this to me
          </div>
          {childern}
          <hr className="mb-2 w-full" />
          <div className="ml-3 m-4">
            <h1 className="mb-2 hover:text-black cursor-pointer">
              dislike this post
            </h1>
            <h1 className=" hover:text-black coursor-pointer">liked</h1>
          </div>
          <hr />
          <div className=" m-4">
            <h1 className="mb-2  hover:text-black coursor-pointer">
              Mute autor
            </h1>
            <h1 className="mb-2  hover:text-black coursor-pointer">
              Mute Publication
            </h1>
            <h1 className="text-red-600  cursor-pointer">Report story...</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
