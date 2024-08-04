import { useState } from "react";
import styles from "./Create.module.scss";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false, // don't render server side, this uses document
});

async function createNewPost({ event, title, summary, file, content }) {
  event.preventDefault();

  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  data.set("file", file);

  await fetch("http://localhost:4000/post", {
    method: "POST",
    body: data,
    credentials: "include",
  });
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFIle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className={styles.container}>
      <form
        onSubmit={(event) => createNewPost({ event, title, summary, file, content })}
        className={styles.form}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.input} ${styles.title}`}
        />
        <textarea
          placeholder="Summary"
          name="summary"
          rows="4"
          cols="50"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={`${styles.input} ${styles.summary}`}
        />
        <input
          type="file"
          onChange={(e) => setFIle(e.target.files[0])}
          className={`${styles.input} ${styles.file}`}
        />
        <Editor
          value={content}
          onChange={setContent}
        />
        <button className={styles.button}>Publish Post</button>
      </form>
    </div>
  );
}
