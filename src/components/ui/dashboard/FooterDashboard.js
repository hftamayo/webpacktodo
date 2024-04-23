import React from "react";
import { Link } from "react-router-dom";

function FooterDashboard() {
  return (
    <div className="w-full h-16 bg-blue-600 flex items-center px-10 py-2 justify-between mt-auto">
      <Link to="/">
        <h1 className="text-white text-sm font-semibold font-Montserrat">
          Tamayo y Asociados, all rights reserved
        </h1>
      </Link>
    </div>
  );
}

export default FooterDashboard;
