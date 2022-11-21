import React, { useState } from "react";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // console.log(file.name?.split(".").pop());
    // console.log(`${displayName}-${Date.now()}.${file.name?.split(".").pop()}`);

    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("registered user :  ", res.user.displayName);

      // create storage
      // #1 const storageRef = ref(
      //   storage,
      //   `${displayName}-${Date.now()}.${file.name?.split(".").pop()}`
      // );
      // #2 const storageRef = ref(storage, displayName);
      // const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadTask = uploadBytesResumable(ref(storage, displayName), file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setError(true);
        },
        () => {
          //gets downloadURL from storage to put on db
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user doc on db with downloadURL
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //creates userChats doc on db
            await setDoc(doc(db, "userChats", res.user.uid), {});

            //after all go to app home page
            navigate("/");
          });
        }
      );
    } catch (error) {
      // catch (error) {
      //   // A full list of error codes is available at
      //   // https://firebase.google.com/docs/storage/web/handle-errors
      //   switch (error.code) {
      //     case "storage/unauthorized":
      //       // User doesn't have permission to access the object
      //       break;
      //     case "storage/canceled":
      //       // User canceled the upload
      //       break;

      //     // ...

      //     case "storage/unknown":
      //       // Unknown error occurred, inspect error.serverResponse
      //       break;
      //   }
      // }

      setError(true);
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Web Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required type="file" />
          {/* todo: input tag to be changed */}
          <button>Register</button>
        </form>
        {error && <span>Something went wrong!</span>}
        <p>
          You do have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
