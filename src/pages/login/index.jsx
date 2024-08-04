import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { UserContext } from "@/contexts/UserContext";
import Modal from "@/components/Modal/Modal";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";

async function handleSubmit({ event, username, password, setUserData, setModalMessage, setShowModal, router }) {
  event.preventDefault();

  if(!username || !password) {
    setModalMessage("Please, enter username and password");
    setShowModal(true);
    return;
  }

  const baseUrl = "http://localhost:4000/login";
  const params = new URLSearchParams({
    username,
    password,
  });
  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url, {
    method: "get",
    headers: { 
      "Content-Type": "application/json",
     },
    credentials: "include",
  });

 const { status } = response;
  
  if (status === 200) {
    response.json().then((userData) => {
      setUserData(userData);
    });

    // Redirect to homepage
    router.push('/');
  } else if(status === 400) {
    setModalMessage("Wrong username or password!");
    setShowModal(true);
  } else {
    setModalMessage("An unexpected error occurred. Please try again later.");
    setShowModal(true);
  }
}

export default function Login() {
  const { setUserData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form
        className={styles.form}
        onSubmit={(event) => handleSubmit({ event, setModalMessage, setShowModal, username, password, setUserData, router })}
      >
        <input
          className={`${styles.userName} ${styles.input}`}
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <div className={styles.passwordContainer}>
          <input
            className={`${styles.password} ${styles.input}`}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button
            type="button"
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          className={styles.button}
          type="submit"
        >
          Login
        </button>
      </form>
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
