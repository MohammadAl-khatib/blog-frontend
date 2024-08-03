import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./register.module.scss";
import Modal from "@/components/Modal/Modal";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let errors = [];
    if (username.trim() === "") {
      errors.push("Username cannot be empty.");
    }
    if (password.length < 5) {
      errors.push("Password must be at least 5 characters long.");
    } else {
      if (!/[a-z]/.test(password)) errors.push("Password must include at least one lowercase letter.");
      if (!/[A-Z]/.test(password)) errors.push("Password must include at least one uppercase letter.");
      if (!/[!@#$%^&*]/.test(password)) errors.push("Password must include at least one character from !@#$%^&*");
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setModalMessage(errors.join(" "));
    } else {
      setModalMessage("Registration successful!");
    }
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          className={`${styles.userName} ${styles.input}`}
          type="text"
          placeholder="username"
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
