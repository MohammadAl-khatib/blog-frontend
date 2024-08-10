import Link from "next/link";
import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";

import { UserContext } from "@/contexts/UserContext";
import styles from "./EditButton.module.scss";

export default function EditButton({ _id, author, className, showText }) {
  const {
    userData: { username },
  } = useContext(UserContext);

  if (!(author.username === username)) return null;

  return (
    <Link
      className={`${styles.editButton} ${className}`}
      href={`/edit/${_id}`}>
      <FaEdit />
      {showText && <span className={styles.buttonText}>Edit Blog</span>}
    </Link>
  );
}
