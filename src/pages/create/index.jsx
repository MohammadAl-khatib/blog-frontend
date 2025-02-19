import { useContext, useState } from "react";
import dynamic from "next/dynamic";

import Modal from "@/components/Modal/Modal";
import styles from "./Create.module.scss";
import { API } from "../../../constants";
import { UserContext } from "@/contexts/UserContext";

const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false, // don't render server side, this uses document
});

async function createNewPost({ event, title, summary, file, content, setModalMessage, setShowModal }) {
  event.preventDefault();

  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  data.set("file", file);

  const response = await fetch(`${API}/post`, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.status === 200) {
    const blogData = await response.json();
    setModalMessage(`${blogData.title} has been published successfully`);
  } else {
    setModalMessage("Something went wrong, try again later");
  }
  setShowModal(true);
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFIle] = useState("");
  const [content, setContent] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {
    userData: { username: isLoggedIn },
  } = useContext(UserContext);

  if (!isLoggedIn) return <h1>Please register and login to publish posts!</h1>;

  return (
    <div className={styles.container}>
      <form
        onSubmit={(event) => createNewPost({ event, title, summary, file, content, setModalMessage, setShowModal })}
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
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
