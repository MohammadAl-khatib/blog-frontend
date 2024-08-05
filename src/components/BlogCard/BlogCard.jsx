/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import { formatISO9075 } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";

import styles from "./BlogCard.module.scss";
import { UserContext } from "@/contexts/UserContext";

export default function BlogCard({ _id, cover, title, author, createdAt, summary }) {
  const {
    userData: { username },
  } = useContext(UserContext);

  const imageUrl = cover ? `http://localhost:4000/${cover}` : "https://via.placeholder.com/340x200/eeeeee/cccccc?text=Image+Placeholder";

  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <Link href={`/blog/${_id}`}>
          <img
            src={imageUrl}
            alt="blog cover"
          />
        </Link>
        {author.username === username && (
          <Link className={styles.editButton} href={`/edit/${_id}`}>
            <FaEdit />
          </Link>
        )}
      </div>
      <div className={styles.texts}>
        <Link href={`/blog/${_id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <p className={styles.info}>
          <a className={styles.author}>{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
}
