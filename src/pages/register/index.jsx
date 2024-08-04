import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Register.module.scss";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/router";

const validateForm = ({ username, password }) => {
  let errors = [];
  if (username.trim() === "") {
    errors.push("Username cannot be empty.");
  }
  if (password.length < 5) {
    errors.push("Password must be at least 5 characters long.");
  } else {
    if (!/[a-z]/.test(password)) errors.push("Password must include at least one lowercase letter.");
    if (!/[A-Z]/.test(password)) errors.push("Password must include at least one uppercase letter.");
    if (!/[!@#$%^&*_]/.test(password)) errors.push("Password must include at least one character from !@#$%^&*_");
  }
  return errors;
};

const handleSubmit = async ({ event, setModalMessage, setShowModal, username, password, setPassword, setUsername, router }) => {
  event.preventDefault();
  const errors = validateForm({ username, password });
  if (errors.length > 0) {
    setModalMessage(errors.join(" "));
    setShowModal(true);

    // Don't hit register endpoint
    return;
  }

  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (response.status === 201) {
    setModalMessage("Registration successful!");
    setShowModal(true);

    // Clear inputs
    setPassword("");
    setUsername("");
    router.push('/login')
  } else if (data.error === "Duplicate Key") {
    // Duplicate user name
    setModalMessage("Username already in use, try another name");
  } else {
    setModalMessage("Registration failed, try again");
  }
  setShowModal(true);
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      <form
        className={styles.form}
        onSubmit={(event) => handleSubmit({ event, setModalMessage, setShowModal, username, password, setPassword, setUsername, router })}
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
          Register
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
