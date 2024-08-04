import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { FaFileAlt, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPen } from "react-icons/fa";
import styles from "./Header.module.scss";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const { username } = userData;
  const isLoggedIn = !!username;

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
                  onClick={() => setUserData({})}
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
