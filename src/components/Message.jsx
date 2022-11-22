import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      // className={`message ${message.senderId === currentUser.uid && "owner"}`}
      className={"message owner"}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <span>Just Now</span> */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" width={24} />}
        {message.image && (
          <a href={message.image} target="_blank" rel="noreferrer">
            Preview
          </a>
        )}
        {/* {message.image && (
          <video
            width="320"
            height="240"
            src={message.image}
            type="video/mp4"
            controls
          ></video>
        )} */}
      </div>
    </div>
  );
};

export default Message;
