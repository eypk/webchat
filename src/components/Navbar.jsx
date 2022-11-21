import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Web Chat</span>
      <div className="user">
        <img src="" alt="" />
        <span>user</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;