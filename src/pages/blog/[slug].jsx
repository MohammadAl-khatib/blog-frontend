/* eslint-disable @next/next/no-img-element */
import React from "react";
import { formatISO9075 } from "date-fns";
import styles from "./Blog.module.scss";
import { API } from "../../../constants";

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(`${API}/post/${params.slug}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Blog({ data }) {
  const { title, createdAt, author, cover, content } = data;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{title}</h1>
      <time className={styles.createdAt}>{formatISO9075(new Date(createdAt))}</time>
      <div className={styles.author}>by @{author.username}</div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={`${API}/${cover}`}
          alt=""
        />
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
