import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { FaFileAlt, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPen } from "react-icons/fa";
import styles from "./Header.module.scss";
import { API } from "../../../constants";

async function logout({ setUserData }) {
  setUserData({});
  await fetch(`${API}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export default function Header() {
  const {
    userData: { username: isLoggedIn },
    setUserData,
  } = useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.homeSection}>
          <Link
            href="/"
            className={styles.homeLink}>
            <FaFileAlt className={styles.homeIcon} />
            <span className={styles.platformName}>Blogify</span>
          </Link>
          <span className={styles.description}>Ideas Worth Sharing</span>
        </div>
        <ul className={styles.navList}>
          {isLoggedIn && (
            <>
              <li>
                <Link
                  href="/create"
                  className={styles.navLink}>
                  <FaPen className={styles.navIcon} /> Compose
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={() => logout({ setUserData })}
                  className={styles.navLink}>
                  <FaSignOutAlt className={styles.navIcon} /> Logout
                </Link>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link
                  href="/login"
                  className={styles.navLink}>
                  <FaSignInAlt className={styles.navIcon} /> Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={styles.navLink}>
                  <FaUserPlus className={styles.navIcon} /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
