import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 p-4">
      <div className="flex justify-between items-center container mx-auto w-[95%]">
        <Link to="/">
          <h1 className="font-bold">Auth app</h1>
        </Link>

        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-in">SignIn</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
