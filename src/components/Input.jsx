import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import AttachIcon from "../assets/attach_icon.png";
import PhotoIcon from "../assets/photo_icon.png";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = async () => {
    if (image) {
      // const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(ref(storage, uuid()), image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // await updateDoc(doc(db, "userChats", currentUser.uid), {
    //   [data.chatId + ".lastMessages"]: { text },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });
    // await updateDoc(doc(db, "userChats", data.user.uid), {
    //   [data.chatId + ".lastMessages"]: { text },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });

    setImage(null);
    setText("");
  };
  return (
    <div className="input">
      <input
        type="text"
        name=""
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Message"
        value={text}
      />
      <div className="send">
        {/* <img src={AttachIcon} alt="" /> */}

        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={AttachIcon} alt="" />
        </label>

        <button type="submit" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
