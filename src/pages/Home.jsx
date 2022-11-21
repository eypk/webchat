import React from "react";
import SideBar from "../components/SideBar";
import ChatBar from "../components/ChatBar";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <ChatBar />
      </div>
    </div>
  );
};

export default Home;
