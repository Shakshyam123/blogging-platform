import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function Modal({ open, onClose, childern }) {
  if (!open) {
    return null;
  }
  return (
    <div>
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
                <FontAwesomeIcon icon={faCirclePlus} />
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
        </div>
      </div>
    </div>
  );
}

export default Modal;
