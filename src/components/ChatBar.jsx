import React from "react";
import { useContext } from "react";
// import { cameraIcon, addFriendIcon, moreIcon } from "../assets/imgUrls";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";
// import CameraIcon from "../assets/camera_icon.png";
// import AttachIcon from "../assets/attach_icon.png";
import UnKnownUser from "../assets/unknownUser_icon.png";

const ChatBar = () => {
  const { data } = useContext(ChatContext);
  console.log("chatBar data:", data);
  return (
    <div className="chatBar">
      <div className="chatInfo">
        <div>
          {data.user && (
            <div>
              <img src={data.user.photoURL} alt="" height={20} />
              <span> {data.user.displayName}</span>
            </div>
          )}
        </div>
        <div className="chatIcons">
          {/* <img src={CameraIcon} alt="" />
          <img src={AttachIcon} alt="" /> */}
          {/* <img src={cameraIcon} alt="" />
          <img src={addFriendIcon} alt="" />
          <img src={moreIcon} alt="" /> */}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default ChatBar;
