"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
("@fortawesome/free-solid-svg-icons");
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div>
      <footer className="bg-black text-white h-80">
        <div className="flex gap-16 p-14">
          <div>
            <h1 className="text-white  text-2xl mb-3">Important Links</h1>
            <ul className="text-white hover:text-yellow-300 ">
              <li className="text-white hover:text-yellow-300 mb-2">
                Ministry of Loand Management{" "}
              </li>
              <li className="text-white hover:text-yellow-300 mb-2">
                Nepal Rastra Bank
              </li>
              <li className="text-white hover:text-yellow-300 mb-2">
                National Cooperative Development Board{" "}
              </li>
              <li className="text-white hover:text-yellow-300 mb-2">
                Ministry of Loand Management{" "}
              </li>
              <li className="text-white hover:text-yellow-300 mb-2">
                National Cooperative Federation of Nepal
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-white text-2xl mb-3">Important Links</h1>
            <p className="text-white hover:text-yellow-300 mb-2">
              Ministry of Loand Management{" "}
            </p>
            <p className="text-white hover:text-yellow-300 mb-2">
              Department of Cooperative
            </p>
            <p className="text-white hover:text-yellow-300 mb-2">
              National Cooperative Development Board
            </p>
            <p className="text-white hover:text-yellow-300 mb-2">
              Nepal Rastra Bank
            </p>
            <p className="text-white hover:text-yellow-300 mb-2">
              National Cooperative Federation of Nepal
            </p>
          </div>
          <div>
            <h1 className="text-white text-4xl mb-5">Contact At</h1>
            <div className="text-center">
              <div className="text-4xl">
                <FontAwesomeIcon icon={faFacebook} style={{ color: "blue" }} />
              </div>
              <div className="text-4xl">
                <FontAwesomeIcon icon={faInstagram} style={{ color: "pink" }} />
              </div>
              <div className="text-4xl">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "skyblue" }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer
        style={{
          textAlign: "center",
          padding: "9px",

          backgroundColor: "#abbaba",
          color: "#000",
        }}
      >
        Copyright © 2023 BloggingPlatform Website. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Footer;
